"use client";

import { useState } from "react";
import { usarMovimientoReducido } from "@/components/motion/usarMovimiento";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Reveal } from "@/components/motion/Reveal";
import { Icono } from "@/components/ui/Icono";
import { areas } from "@/content/home";

/* Cuatro áreas en pestañas. El indicador se desliza entre pestañas con
   layoutId (una sola capa animada, no cuatro), y el contenido cambia en
   crossfade corto.

   En móvil las pestañas hacen scroll horizontal en vez de partirse en
   dos filas: mantiene la lectura en una sola línea y deja claro que hay
   más a la derecha.

   Accesibilidad: roles tab/tablist/tabpanel y navegación con flechas. */

export function QueAutomatizamos() {
  const [activa, setActiva] = useState(0);
  const reducido = usarMovimientoReducido();
  const bloque = areas.bloques[activa];

  function conTeclado(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") setActiva((n) => (n + 1) % areas.bloques.length);
    if (e.key === "ArrowLeft")
      setActiva((n) => (n - 1 + areas.bloques.length) % areas.bloques.length);
  }

  return (
    <Seccion id="que-automatizar" tono="claro">
      <div className="malla-clara absolute inset-0 opacity-70" aria-hidden="true" />

      <div className="relative max-w-[62ch]">
        <Antetitulo>{areas.categoria}</Antetitulo>
        <TituloSeccion>{areas.titular}</TituloSeccion>
        <Reveal retraso={0.06}>
          <p className="mt-6 text-[16.5px] leading-relaxed text-suave">{areas.entradilla}</p>
        </Reveal>
      </div>

      <Reveal retraso={0.1}>
        <div
          role="tablist"
          aria-label="Áreas que se pueden automatizar"
          onKeyDown={conTeclado}
          className="mt-10 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {areas.bloques.map((item, i) => {
            const esActiva = i === activa;
            return (
              <button
                key={item.id}
                role="tab"
                id={`pestana-${item.id}`}
                aria-selected={esActiva}
                aria-controls={`panel-${item.id}`}
                tabIndex={esActiva ? 0 : -1}
                onClick={() => setActiva(i)}
                className={`relative shrink-0 cursor-pointer rounded-full px-4 py-2.5 text-[14px] transition-colors sm:px-5 ${
                  esActiva ? "text-white" : "text-suave hover:text-bottle"
                }`}
              >
                {esActiva && (
                  <motion.span
                    layoutId="pestana-activa"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-bottle"
                    transition={{
                      duration: reducido ? 0.001 : 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <Icono nombre={item.icono} size={15} />
                  {item.titulo}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <Reveal retraso={0.12}>
        <div className="mt-5 rounded-[22px] border border-linea bg-white p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={bloque.id}
              role="tabpanel"
              id={`panel-${bloque.id}`}
              aria-labelledby={`pestana-${bloque.id}`}
              initial={reducido ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reducido ? 0 : -8 }}
              transition={{ duration: reducido ? 0.001 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-[21px] text-bottle">{bloque.tituloLargo}</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {bloque.items.map((item, i) => (
                  <motion.li
                    key={item.fuerte}
                    initial={reducido ? { opacity: 0 } : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reducido ? 0.001 : 0.35,
                      delay: reducido ? 0 : 0.06 + i * 0.07,
                    }}
                    className="flex gap-3 rounded-xl bg-cream px-4 py-3.5"
                  >
                    <Check
                      size={14}
                      strokeWidth={3}
                      className="mt-1.5 shrink-0 text-teal"
                      aria-hidden="true"
                    />
                    <p className="text-[14.5px] leading-relaxed text-suave">
                      <strong className="font-medium text-bottle">{item.fuerte}</strong>{" "}
                      {item.texto}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>
    </Seccion>
  );
}
