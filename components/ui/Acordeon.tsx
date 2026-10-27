"use client";

import { useState } from "react";
import { usarMovimientoReducido } from "@/components/motion/usarMovimiento";
import { motion } from "framer-motion";
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

  /* Ya no hay dos juegos de color. Los había porque el acordeón vivía
     sobre crema o sobre casi negro según la sección; ahora el fondo
     sale de variables y cambia solo con el modo claro/oscuro, así que
     un solo juego vale para los dos. `tono` se sigue aceptando. */
  const linea = "border-line";
  const textoP = "text-fg";
  const textoR = "text-fg-2";
  const acento = "text-brand";
  const hoverP = "hover:text-brand";

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
                            font-display text-[17px] font-semibold transition-colors sm:text-[19px]
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

            {/* ============================================================
                LA RESPUESTA ESTÁ SIEMPRE EN EL HTML, ABIERTA O CERRADA

                Aquí había un `{activa && …}` dentro de AnimatePresence, así
                que la respuesta no existía en el DOM hasta que alguien
                pulsaba. En /servicios el acordeón arranca con todas cerradas
                (`abiertaPorDefecto={null}`), de modo que las SEIS respuestas
                que la página publica como FAQPage no estaban en la página.

                Google pide que el contenido marcado esté en la página.
                Plegado detrás de un desplegable vale; ausente del DOM, no.
                El desajuste no se ve mirando la web y se paga perdiendo el
                resultado enriquecido.

                Ahora el panel se monta siempre y solo cambia de alto. La
                animación es la misma. SI ALGUIEN VUELVE A ENVOLVERLO EN UN
                CONDICIONAL, rompe los datos estructurados sin que se note. */}
            <motion.div
              id={`respuesta-${i}`}
              role="region"
              initial={false}
              animate={{ height: activa ? "auto" : 0, opacity: activa ? 1 : 0 }}
              transition={{
                duration: reducido ? 0.001 : 0.4,
                ease: SALIDA,
                opacity: { duration: reducido ? 0.001 : 0.25 },
              }}
              className="overflow-hidden"
              aria-hidden={!activa}
            >
              <p className={`max-w-[70ch] pb-6 text-[15.5px] leading-relaxed ${textoR}`}>
                {item.r}
              </p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
