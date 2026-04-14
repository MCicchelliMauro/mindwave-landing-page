import React, { useEffect, useRef } from 'react';

// Estructura para el estado de las celdas
interface CellState {
    opacity: number;
}

const InteractiveGrid: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Cache para el rect del canvas y coordenadas
    const rectRef = useRef<DOMRect | null>(null);
    const mouse = useRef({ x: -1000, y: -1000 });

    // Almacén de estado de celdas activas
    const cellsRef = useRef<Map<string, CellState>>(new Map());

    // Offscreen canvas para elementos estáticos (Grid + Puntos)
    const staticCanvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d', { alpha: false }); // Optimización: Alpha false si es opaco
        if (!ctx) return;

        let animationFrameId: number;
        let width = 0;
        let height = 0;

        // Configuración
        const step = 80;
        const dotStep = 40;
        const bgColor = '#0F172A';
        const gridColor = 'rgba(255, 255, 255, 0.05)';
        const dotColor = 'rgba(34, 211, 238, 0.1)';

        const updateRect = () => {
            if (canvas) {
                rectRef.current = canvas.getBoundingClientRect();
            }
        };

        // Función para dibujar los elementos estáticos una sola vez
        const drawStaticElements = (w: number, h: number) => {
            if (!staticCanvasRef.current) {
                staticCanvasRef.current = document.createElement('canvas');
            }
            const sCanvas = staticCanvasRef.current;
            const sCtx = sCanvas.getContext('2d', { alpha: false });
            if (!sCtx) return;

            sCanvas.width = w;
            sCanvas.height = h;

            // Fondo
            sCtx.fillStyle = bgColor;
            sCtx.fillRect(0, 0, w, h);

            // Grid Lines
            sCtx.strokeStyle = gridColor;
            sCtx.lineWidth = 1;
            const offset = 40;

            // Verticales
            sCtx.beginPath();
            for (let x = offset; x <= w; x += step) {
                sCtx.moveTo(x + 0.5, 0);
                sCtx.lineTo(x + 0.5, h);
            }
            sCtx.stroke();

            // Horizontales
            sCtx.beginPath();
            for (let y = offset; y <= h; y += step) {
                sCtx.moveTo(0, y + 0.5);
                sCtx.lineTo(w, y + 0.5);
            }
            sCtx.stroke();

            // Puntos (Usando fillRect en lugar de arc para performance)
            sCtx.fillStyle = dotColor;
            sCtx.beginPath();
            for (let x = 0; x <= w; x += dotStep) {
                for (let y = 0; y <= h; y += dotStep) {
                    sCtx.rect(x - 1, y - 1, 2, 2); // Cuadrados pequeños son más rápidos que círculos
                }
            }
            sCtx.fill();
        };

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            updateRect();
            drawStaticElements(width, height); // Redibujar buffer estático
        };

        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('scroll', updateRect);

        const onMouseMove = (e: MouseEvent) => {
            if (!rectRef.current) return;
            mouse.current.x = e.clientX - rectRef.current.left;
            mouse.current.y = e.clientY - rectRef.current.top;
        };
        window.addEventListener('mousemove', onMouseMove);

        const draw = () => {
            // 1. Dibujar imagen estática (Background + Grid + Dots)
            // Esto es mucho más rápido que redibujar caminos vectoriales cada frame
            if (staticCanvasRef.current) {
                ctx.drawImage(staticCanvasRef.current, 0, 0);
            } else {
                // Fallback por si acaso
                ctx.fillStyle = bgColor;
                ctx.fillRect(0, 0, width, height);
            }

            // 2. Lógica de Highlights (Dinámico)
            const offset = 40;
            let currentKey = '';

            if (mouse.current.x > 0 && mouse.current.y > 0) {
                const adjustedX = mouse.current.x - offset;
                const adjustedY = mouse.current.y - offset;
                const col = Math.floor(adjustedX / step);
                const row = Math.floor(adjustedY / step);

                if (col >= 0 && row >= 0) {
                    currentKey = `${col}-${row}`;
                    cellsRef.current.set(currentKey, { opacity: 1 });
                }
            }

            // Dibujar celdas activas
            if (cellsRef.current.size > 0) {
                ctx.lineWidth = 3;
                // Batch drawing by opacity if possible? No, gradient needs position.
                // Guardamos el contexto para restaurar propiedades si fuera complejo, pero aquí es simple.

                cellsRef.current.forEach((state, key) => {
                    if (key !== currentKey) {
                        state.opacity -= 0.04; // Decay ligeramente más lento
                    }

                    if (state.opacity <= 0.01) {
                        cellsRef.current.delete(key);
                        return;
                    }

                    const [c, r] = key.split('-');
                    const col = parseInt(c);
                    const row = parseInt(r);
                    const cellX = offset + col * step;
                    const cellY = offset + row * step;

                    // Optimización: Si la opacidad es muy baja, no crear gradiente complejo?
                    // Mantengamos el gradiente pero quizás redondear alpha

                    const gradient = ctx.createLinearGradient(cellX, cellY, cellX + step, cellY + step);
                    gradient.addColorStop(0, `rgba(34, 211, 238, ${state.opacity})`);
                    gradient.addColorStop(1, `rgba(163, 230, 53, ${state.opacity})`);

                    ctx.strokeStyle = gradient;
                    ctx.strokeRect(cellX, cellY, step, step);
                });
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('scroll', updateRect);
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[-1] pointer-events-none">
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
};

export default InteractiveGrid;
