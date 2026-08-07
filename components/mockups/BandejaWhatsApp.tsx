"use client";

import { useEffect, useRef, useState } from "react";
import { usarMovimientoReducido } from "@/components/motion/usarMovimiento";
import { motion, useInView } from "framer-motion";
import { Search } from "lucide-react";

/* ============================================================
   BANDEJA DE WHATSAPP SATURADA — mockup en código
   Los mensajes van cayendo en secuencia y el contador de no leídos
   sube con ellos. La incomodidad es el argumento: esto es lo que
   pasa en la clínica un martes a las nueve de la noche.

   Es una recreación ilustrativa, no la bandeja de un cliente real.
   ============================================================ */

const mensajes = [
  { de: "Marta · Nala 🐕", texto: "Hola, ¿tenéis hueco esta semana?", hora: "20:14" },
  { de: "Javi · Rocco", texto: "Le toca la vacuna, ¿qué días vais bien?", hora: "20:31" },
  { de: "Ana · Kira 🐈", texto: "Perdón, ¿os llegó mi mensaje de ayer?", hora: "20:47" },
  { de: "Luis · Toby", texto: "Necesito cambiar la cita del jueves", hora: "21:02" },
  { de: "Sara · Mia 🐈", texto: "¿Puedo pasar mañana sin cita?", hora: "21:19" },
  { de: "Pedro · Bruno", texto: "¿Cuánto cuesta la desparasitación?", hora: "21:36" },
];

export function BandejaWhatsApp({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.35 });
  const reducido = usarMovimientoReducido();
  const [mostrados, setMostrados] = useState(0);

  useEffect(() => {
    if (!visible) return;
    if (reducido) {
      setMostrados(mensajes.length);
      return;
    }

    const temporizadores = mensajes.map((_, i) =>
      setTimeout(() => setMostrados(i + 1), 320 + i * 380),
    );
    return () => temporizadores.forEach(clearTimeout);
  }, [visible, reducido]);

  return (
    <div
      ref={ref}
      className={`relative mx-auto w-full max-w-[330px] ${className}`}
      role="img"
      aria-label="Recreación de una bandeja de WhatsApp de una clínica veterinaria con seis mensajes sin responder pidiendo cita"
    >
      {/* Halo cálido: el problema es urgente, no neutro. */}
      <div
        aria-hidden="true"
        className="anim-respirar pointer-events-none absolute -inset-6 -z-10 rounded-[40px] bg-coral/18 blur-3xl"
      />

      <div className="overflow-hidden rounded-[26px] border border-white/12 bg-bottle-800 shadow-[0_30px_70px_-25px_rgba(0,0,0,.75)]">
        {/* Barra superior */}
        <div className="flex items-center justify-between border-b border-white/8 bg-bottle-900/70 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-mint/15 font-titular text-[13px] font-semibold text-mint">
              CV
            </span>
            <div className="leading-tight">
              <p className="text-[12px] font-medium text-white">Clínica · WhatsApp</p>
              <p className="font-mono text-[9px] uppercase tracking-wider text-white/40">
                martes, 21:36
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-white/35">
            <Search size={14} />
            <motion.span
              key={mostrados}
              initial={reducido ? false : { scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-5 min-w-5 items-center justify-center rounded-full bg-coral px-1.5 font-mono text-[10px] font-semibold text-white"
            >
              {mostrados}
            </motion.span>
          </div>
        </div>

        {/* Lista de mensajes */}
        <ul className="divide-y divide-white/6">
          {mensajes.map((m, i) => {
            const visto = i < mostrados;
            return (
              <motion.li
                key={m.de}
                initial={reducido ? { opacity: 0 } : { opacity: 0, y: -14 }}
                animate={visto ? { opacity: 1, y: 0 } : { opacity: 0, y: reducido ? 0 : -14 }}
                transition={{ duration: reducido ? 0.001 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-3 px-4 py-3"
              >
                <span className="mt-0.5 h-8 w-8 shrink-0 rounded-full bg-white/8" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="truncate text-[12.5px] font-medium text-white/90">{m.de}</p>
                    <span className="shrink-0 font-mono text-[9px] text-coral">{m.hora}</span>
                  </div>
                  <p className="truncate text-[11.5px] text-white/55">{m.texto}</p>
                </div>
                <span
                  aria-hidden="true"
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-coral"
                />
              </motion.li>
            );
          })}
        </ul>

        <div className="border-t border-white/8 bg-bottle-900/60 px-4 py-2.5 text-center">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-coral">
            {mostrados} sin responder
          </p>
        </div>
      </div>

      <p className="mt-3 text-center text-[11px] text-white/40">
        Recreación ilustrativa del caso veterinario
      </p>
    </div>
  );
}
