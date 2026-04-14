import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface Message {
  role: 'user' | 'assistant';
  content: string;
  hidden?: boolean; // Mensajes ocultos en la UI pero enviados a la API (kickoff)
}

type Phase = 'intro' | 'chat' | 'complete';

// ─── Constantes ───────────────────────────────────────────────────────────────

const BRIEF_MARKER = '---BRIEF_FINAL---';
const N8N_BRIEF_URL = import.meta.env.VITE_N8N_BRIEF_URL as string | undefined;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function extractFromBrief(brief: string, field: string): string {
  const regex = new RegExp(`\\*\\*${field}:\\*\\*\\s*(.+)`);
  const match = brief.match(regex);
  return match ? match[1].trim() : '';
}

// Renderiza **bold** y saltos de línea sin dependencias externas
function renderBriefLine(line: string, idx: number): React.ReactNode {
  const parts = line.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p key={idx} className={line.startsWith('**') ? 'mt-3' : 'mt-1'}>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**')
          ? <strong key={i} className="text-mindwave-lime">{part.slice(2, -2)}</strong>
          : part
      )}
    </p>
  );
}

// ─── Subcomponentes ───────────────────────────────────────────────────────────

const TypingIndicator: React.FC = () => (
  <div className="flex items-end gap-3 mb-4">
    <div className="w-8 h-8 rounded-full bg-mindwave-cyan/20 border border-mindwave-cyan/30 flex items-center justify-center shrink-0 text-xs font-bold text-mindwave-cyan">
      AI
    </div>
    <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-bl-sm px-4 py-3">
      <div className="flex gap-1 items-center h-5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-2 h-2 rounded-full bg-mindwave-cyan/60"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  </div>
);

const MindwaveIcon: React.FC = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="#0f172a"/>
    <path d="M6 16 Q10 8 16 16 Q22 24 26 16" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <circle cx="16" cy="16" r="2" fill="#a3e635"/>
  </svg>
);

// ─── Componente Principal ─────────────────────────────────────────────────────

const DescubrimientoPage: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('intro');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [brief, setBrief] = useState('');
  const [briefSent, setBriefSent] = useState(false);
  const [briefSendError, setBriefSendError] = useState(false);
  const [apiError, setApiError] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll al último mensaje
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Auto-resize del textarea
  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
  }, [input]);

  // ── Llamada a la API ──
  const callApi = useCallback(async (history: Message[]) => {
    setIsLoading(true);
    setApiError(false);

    // Solo enviamos role + content a la API (sin el flag hidden)
    const apiMessages = history.map(({ role, content }) => ({ role, content }));

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      const aiText: string = data.response || 'Lo siento, no pude procesar la respuesta.';

      if (aiText.includes(BRIEF_MARKER)) {
        // La IA terminó la entrevista — separar el mensaje del brief
        const [msgPart, briefPart] = aiText.split(BRIEF_MARKER);
        const cleanBrief = briefPart.trim();
        const closingMsg = msgPart.trim() || '¡Excelente! Generé el brief completo de tu proyecto.';

        const finalHistory: Message[] = [...history, { role: 'assistant', content: closingMsg }];
        setMessages(finalHistory);
        setBrief(cleanBrief);
        setPhase('complete');
        sendBriefToN8n(cleanBrief);
      } else {
        setMessages([...history, { role: 'assistant', content: aiText }]);
      }
    } catch (err) {
      console.error('Error al llamar a /api/chat:', err);
      setApiError(true);
      setMessages([
        ...history,
        {
          role: 'assistant',
          content: 'Hubo un problema de conexión. ¿Podés intentar de nuevo?',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ── Enviar brief a n8n ──
  const sendBriefToN8n = async (briefText: string) => {
    if (!N8N_BRIEF_URL) {
      console.warn('VITE_N8N_BRIEF_URL no está configurada. Brief no enviado a n8n.');
      setBriefSent(true);
      return;
    }

    try {
      const clientName = extractFromBrief(briefText, 'Cliente');
      const clientEmail = extractFromBrief(briefText, 'Email de contacto');

      const res = await fetch(N8N_BRIEF_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brief: briefText, clientName, clientEmail }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setBriefSent(true);
    } catch (err) {
      console.error('Error al enviar brief a n8n:', err);
      setBriefSendError(true);
    }
  };

  // ── Iniciar chat ──
  const startChat = () => {
    setPhase('chat');
    // Mensaje de kickoff oculto: la IA saluda y hace la primera pregunta
    const kickoff: Message[] = [{ role: 'user', content: 'Iniciar entrevista.', hidden: true }];
    setMessages(kickoff);
    callApi(kickoff);
  };

  // ── Enviar mensaje del usuario ──
  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const newHistory: Message[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(newHistory);
    setInput('');
    callApi(newHistory);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const visibleMessages = messages.filter((m) => !m.hidden);

  // ────────────────────────────────────────────────────────────────────────────
  // RENDER
  // ────────────────────────────────────────────────────────────────────────────

  return (
    <section className="relative isolate min-h-screen px-4 lg:px-8 py-24 sm:py-28">
      <div className="mx-auto max-w-3xl">

        {/* ── FASE INTRO ── */}
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center text-center pt-8"
            >
              <div className="mb-6">
                <MindwaveIcon />
              </div>

              <span className="text-sm font-semibold tracking-widest text-mindwave-cyan uppercase mb-4">
                Paso 2 de 2
              </span>

              <h1 className="text-4xl font-black tracking-tighter text-white sm:text-5xl lg:text-6xl">
                Cuestionario de{' '}
                <span className="text-mindwave-lime">Descubrimiento</span>
              </h1>

              <p className="mt-6 text-lg leading-8 text-slate-300 max-w-xl">
                Nuestro consultor virtual de IA va a hacerte algunas preguntas para entender
                tu proyecto a fondo. La conversación dura <strong className="text-white">5–10 minutos</strong> y
                al final generamos un brief completo que llega directo a nuestro equipo.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center">
                <motion.button
                  onClick={startChat}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-full bg-mindwave-lime px-10 py-4 text-lg font-bold text-slate-900 shadow-lg shadow-mindwave-lime/20 hover:bg-lime-300 transition-colors"
                >
                  Comenzar entrevista →
                </motion.button>
              </div>

              <div className="mt-16 grid grid-cols-3 gap-6 text-center text-sm text-slate-400 max-w-md">
                {[
                  { icon: '🤖', label: 'Consultor IA' },
                  { icon: '⏱️', label: '5–10 min' },
                  { icon: '📋', label: 'Brief automático' },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center gap-2">
                    <span className="text-2xl">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── FASE CHAT ── */}
          {phase === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                <MindwaveIcon />
                <div>
                  <p className="font-bold text-white text-sm">Consultor Mindwave</p>
                  <p className="text-xs text-mindwave-cyan flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-mindwave-cyan inline-block animate-pulse" />
                    En línea
                  </p>
                </div>
              </div>

              {/* Área de mensajes */}
              <div className="space-y-0 min-h-[400px] max-h-[55vh] overflow-y-auto pr-1 mb-4 scroll-smooth">
                <AnimatePresence initial={false}>
                  {visibleMessages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex items-end gap-3 mb-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      {/* Avatar */}
                      {msg.role === 'assistant' ? (
                        <div className="w-8 h-8 rounded-full bg-mindwave-cyan/20 border border-mindwave-cyan/30 flex items-center justify-center shrink-0 text-xs font-bold text-mindwave-cyan">
                          AI
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-mindwave-lime/20 border border-mindwave-lime/30 flex items-center justify-center shrink-0 text-xs font-bold text-mindwave-lime">
                          Tú
                        </div>
                      )}

                      {/* Burbuja */}
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                          msg.role === 'assistant'
                            ? 'bg-slate-800 border border-slate-700 text-slate-200 rounded-bl-sm'
                            : 'bg-mindwave-lime/20 border border-mindwave-lime/30 text-white rounded-br-sm'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isLoading && <TypingIndicator />}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="flex items-end gap-3 bg-slate-900/80 border border-slate-700 rounded-2xl p-3 focus-within:border-mindwave-cyan/50 transition-colors">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                  placeholder="Escribí tu respuesta... (Enter para enviar, Shift+Enter para nueva línea)"
                  rows={1}
                  className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm resize-none outline-none leading-relaxed disabled:opacity-50 min-h-[24px]"
                />
                <motion.button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="shrink-0 w-9 h-9 rounded-xl bg-mindwave-lime text-slate-900 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                  aria-label="Enviar mensaje"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m22 2-7 20-4-9-9-4Z"/>
                    <path d="M22 2 11 13"/>
                  </svg>
                </motion.button>
              </div>

              {apiError && (
                <p className="mt-2 text-xs text-red-400 text-center">
                  Error de conexión. Verificá que estés usando <code className="bg-slate-800 px-1 rounded">vercel dev</code> para correr el proxy localmente.
                </p>
              )}
            </motion.div>
          )}

          {/* ── FASE COMPLETA (BRIEF GENERADO) ── */}
          {phase === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col"
            >
              {/* Encabezado de éxito */}
              <div className="text-center mb-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                  className="w-16 h-16 rounded-full bg-mindwave-lime/20 border border-mindwave-lime/40 flex items-center justify-center mx-auto mb-4"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mindwave-lime">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <path d="m9 11 3 3L22 4"/>
                  </svg>
                </motion.div>
                <h2 className="text-3xl font-black text-white">Brief generado</h2>
                <p className="mt-2 text-slate-400">
                  {briefSent
                    ? 'Tu brief fue enviado a nuestro equipo. Te contactaremos pronto.'
                    : briefSendError
                    ? 'Brief generado correctamente. Podés copiarlo y enviárnoslo por email.'
                    : 'Enviando tu brief al equipo de Mindwave...'}
                </p>
              </div>

              {/* Brief content */}
              <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-800">
                  <span className="inline-block w-2 h-2 rounded-full bg-mindwave-lime" />
                  <span className="text-xs font-bold tracking-widest uppercase text-mindwave-lime">
                    Brief de Descubrimiento — Mindwave
                  </span>
                </div>

                <div className="text-sm text-slate-300 leading-relaxed">
                  {brief.split('\n').filter(Boolean).map((line, idx) => renderBriefLine(line, idx))}
                </div>
              </div>

              {/* Acciones */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigator.clipboard.writeText(brief)}
                  className="flex-1 rounded-full border border-slate-700 px-6 py-3 text-sm font-medium text-slate-300 hover:border-slate-500 hover:text-white transition-colors"
                >
                  Copiar brief
                </button>
                <a
                  href="/"
                  className="flex-1 rounded-full bg-mindwave-lime px-6 py-3 text-sm font-bold text-slate-900 text-center hover:bg-lime-300 transition-colors"
                >
                  Volver al inicio
                </a>
              </div>

              {briefSendError && (
                <p className="mt-4 text-xs text-amber-400 text-center bg-amber-900/20 border border-amber-800/30 rounded-lg px-4 py-3">
                  No se pudo conectar con n8n. Copiá el brief y enviánoslo a{' '}
                  <strong>hola@mindwave.com</strong>
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default DescubrimientoPage;
