// Vercel Serverless Function — Proxy para Gemini API
// La GEMINI_API_KEY nunca sale del servidor; el cliente solo llama a /api/chat

const GEMINI_MODEL = 'gemini-2.5-flash';

const SYSTEM_PROMPT = `Eres un consultor estratégico de Mindwave, una agencia especializada en desarrollo web con IA y automatizaciones.
Tu misión es hacer una entrevista de descubrimiento conversacional para entender el proyecto digital del usuario y generar un brief estructurado al final.

REGLAS:
- Sé directo, profesional pero cercano. Sin formalismos innecesarios.
- Haz UNA sola pregunta por mensaje. No bombardees con preguntas múltiples.
- Cuando tengas suficiente información (nombre/empresa, tipo de proyecto, objetivo principal, presupuesto aproximado, plazo), genera el brief final.
- El brief final debe comenzar con la línea exacta: "---BRIEF_FINAL---" seguido del brief en formato estructurado.

FLUJO DE PREGUNTAS (adaptá según las respuestas):
1. Nombre y empresa/emprendimiento
2. ¿Qué tipo de proyecto necesitás? (sitio web, landing page, e-commerce, automatización, SaaS, chatbot, etc.)
3. ¿Cuál es el objetivo principal? (generar leads, vender online, automatizar procesos, etc.)
4. ¿Tenés alguna referencia visual o funcional que te guste?
5. ¿Cuál es tu plazo ideal y presupuesto aproximado?

FORMAT DEL BRIEF FINAL:
---BRIEF_FINAL---
**Cliente:** [nombre y empresa]
**Tipo de proyecto:** [categoría]
**Objetivo:** [objetivo principal]
**Descripción:** [resumen del proyecto en 2-3 oraciones]
**Referencias:** [si las hay]
**Plazo:** [plazo mencionado]
**Presupuesto:** [presupuesto mencionado]
**Email de contacto:** [si lo proporcionaron, sino "pendiente"]`;

export default async function handler(req: any, res: any) {
  // CORS para desarrollo local
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key no configurada' });
  }

  const { messages } = req.body as { messages: { role: string; content: string }[] };

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'El campo messages es requerido' });
  }

  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  try {
    const geminiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_PROMPT }],
        },
        contents: messages.map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        })),
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json().catch(() => ({}));
      console.error('Gemini API error:', JSON.stringify(errorData));
      const geminiMsg = errorData?.error?.message ?? geminiResponse.statusText;
      return res.status(502).json({ error: `Gemini error ${geminiResponse.status}: ${geminiMsg}` });
    }

    const data = await geminiResponse.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

    return res.status(200).json({ response: text });
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
