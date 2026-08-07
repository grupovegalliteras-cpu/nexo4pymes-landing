"use client";

import { motion } from "framer-motion";
import { usarMovimientoReducido } from "@/components/motion/usarMovimiento";
import { SALIDA } from "./Reveal";

/* Revela un titular palabra a palabra. Se usa solo en los dos heroes:
   fuera de ahí distrae más de lo que aporta.

   Cada palabra va envuelta en un <span> con overflow oculto para que
   la palabra suba desde debajo de su propia línea. El texto completo
   sigue siendo un único nodo accesible: los lectores de pantalla leen
   la frase entera, no palabra por palabra. */
export function TextoPorPalabras({
  texto,
  className,
  retraso = 0,
  resaltar,
}: {
  texto: string;
  className?: string;
  retraso?: number;
  /** Palabras que se pintan con el degradado de marca. */
  resaltar?: string;
}) {
  const reducido = usarMovimientoReducido();
  const palabras = texto.split(" ");
  const resaltadas = resaltar ? resaltar.split(" ") : [];

  // Sin movimiento se pierde la animación, no el diseño: las palabras
  // resaltadas conservan el degradado de marca.
  if (reducido) {
    return (
      <span className={className}>
        {palabras.map((palabra, i) => (
          <span
            key={`${palabra}-${i}`}
            className={resaltadas.includes(palabra) ? "texto-degradado" : undefined}
          >
            {palabra}
            {i < palabras.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className={className}>
      {/* El texto real para lectores de pantalla; la versión animada
          queda oculta para no leer palabra por palabra. */}
      <span className="sr-only">{texto}</span>
      {palabras.map((palabra, i) => (
        <span
          key={`${palabra}-${i}`}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]"
        >
          <motion.span
            className={
              resaltadas.includes(palabra) ? "inline-block texto-degradado" : "inline-block"
            }
            initial={{ y: "108%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.72,
              delay: retraso + i * 0.045,
              ease: SALIDA,
            }}
          >
            {palabra}
          </motion.span>
          {i < palabras.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
