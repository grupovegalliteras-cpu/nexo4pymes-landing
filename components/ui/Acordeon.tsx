"use client";

import { useState } from "react";
import { usarMovimientoReducido } from "@/components/motion/usarMovimiento";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { SALIDA } from "@/components/motion/Reveal";

/* Acordeón de preguntas frecuentes.

   Se anima la altura con `height: auto` de Framer Motion, que mide
   el contenido y hace la transición sin saltos de layout. Es la
   única excepción a "solo transform y opacity" en todo el sitio:
   un acordeón que aparece de golpe se siente roto, y aquí el coste
   es un solo elemento fuera de pantalla.

   Accesibilidad: botón real con aria-expanded y aria-controls, y el
   panel enlazado por id. Funciona con teclado sin JS adicional. */

export function Acordeon({
  preguntas,
  tono = "claro",
  abiertaPorDefecto = 0,
}: {
  preguntas: { p: string; r: string }[];
  tono?: "claro" | "oscuro";
  abiertaPorDefecto?: number | null;
}) {
  const [abierta, setAbierta] = useState<number | null>(abiertaPorDefecto);
  const reducido = usarMovimientoReducido();

  const linea = tono === "oscuro" ? "border-white/12" : "border-linea";
  const textoP = tono === "oscuro" ? "text-white" : "text-bottle";
  const textoR = tono === "oscuro" ? "text-white/72" : "text-suave";
  const acento = tono === "oscuro" ? "text-mint" : "text-teal";
  const hoverP = tono === "oscuro" ? "hover:text-mint" : "hover:text-teal";

  return (
    <div className={`border-t ${linea}`}>
      {preguntas.map((item, i) => {
        const activa = abierta === i;
        return (
          <div key={item.p} className={`border-b ${linea}`}>
            <h3>
              <button
                type="button"
                onClick={() => setAbierta(activa ? null : i)}
                aria-expanded={activa}
                aria-controls={`respuesta-${i}`}
                className={`flex w-full cursor-pointer items-start justify-between gap-6 py-5 text-left
                            font-titular text-[17px] font-medium transition-colors sm:text-[19px]
                            ${textoP} ${hoverP}`}
              >
                <span className="flex-1">{item.p}</span>
                <span
                  aria-hidden="true"
                  className={`mt-1 shrink-0 transition-transform duration-400 ease-[cubic-bezier(.22,1,.36,1)] ${acento} ${
                    activa ? "rotate-[135deg]" : ""
                  }`}
                >
                  <Plus size={20} strokeWidth={2} />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {activa && (
                <motion.div
                  id={`respuesta-${i}`}
                  role="region"
                  key="contenido"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: reducido ? 0.001 : 0.4,
                    ease: SALIDA,
                    opacity: { duration: reducido ? 0.001 : 0.25 },
                  }}
                  className="overflow-hidden"
                >
                  <p className={`max-w-[70ch] pb-6 text-[15.5px] leading-relaxed ${textoR}`}>
                    {item.r}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
