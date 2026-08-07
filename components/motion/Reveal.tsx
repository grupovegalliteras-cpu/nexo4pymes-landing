"use client";

import { motion, type Variants } from "framer-motion";
import { usarMovimientoReducido } from "@/components/motion/usarMovimiento";
import type { ReactNode } from "react";

/* ============================================================
   PRIMITIVAS DE ANIMACIÓN
   Todo el sitio entra por aquí. Un único punto decide qué pasa
   con prefers-reduced-motion: si está activo, los elementos
   aparecen sin desplazarse (opacidad instantánea) en vez de
   quedarse invisibles.

   Se anima solo transform y opacity: son las dos propiedades que
   el navegador compone en GPU sin recalcular layout.
   ============================================================ */

export const SALIDA = [0.22, 1, 0.36, 1] as const;

type Direccion = "arriba" | "abajo" | "izquierda" | "derecha" | "escala";

function desplazamiento(direccion: Direccion) {
  switch (direccion) {
    case "abajo":
      return { y: -18, x: 0, scale: 1 };
    case "izquierda":
      return { y: 0, x: -28, scale: 1 };
    case "derecha":
      return { y: 0, x: 28, scale: 1 };
    case "escala":
      return { y: 12, x: 0, scale: 0.96 };
    default:
      return { y: 22, x: 0, scale: 1 };
  }
}

export function Reveal({
  children,
  direccion = "arriba",
  retraso = 0,
  duracion = 0.62,
  className,
  as = "div",
}: {
  children: ReactNode;
  direccion?: Direccion;
  retraso?: number;
  duracion?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "span";
}) {
  const reducido = usarMovimientoReducido();
  const d = desplazamiento(direccion);
  const Componente = motion[as];

  return (
    <Componente
      className={className}
      initial={reducido ? { opacity: 0 } : { opacity: 0, ...d }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -60px 0px" }}
      transition={{
        duration: reducido ? 0.001 : duracion,
        delay: reducido ? 0 : retraso,
        ease: SALIDA,
      }}
    >
      {children}
    </Componente>
  );
}

/* Contenedor que escalona a sus hijos directos <ItemStagger>. */
export function Stagger({
  children,
  className,
  intervalo = 0.08,
  retraso = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  intervalo?: number;
  retraso?: number;
  as?: "div" | "ul" | "section";
}) {
  const reducido = usarMovimientoReducido();
  const Componente = motion[as];

  const variantes: Variants = {
    oculto: {},
    visible: {
      transition: {
        staggerChildren: reducido ? 0 : intervalo,
        delayChildren: reducido ? 0 : retraso,
      },
    },
  };

  return (
    <Componente
      className={className}
      variants={variantes}
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -60px 0px" }}
    >
      {children}
    </Componente>
  );
}

export function ItemStagger({
  children,
  className,
  direccion = "arriba",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  direccion?: Direccion;
  as?: "div" | "li" | "article" | "span";
}) {
  const reducido = usarMovimientoReducido();
  const d = desplazamiento(direccion);
  const Componente = motion[as];

  const variantes: Variants = {
    oculto: reducido ? { opacity: 0 } : { opacity: 0, ...d },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: { duration: reducido ? 0.001 : 0.55, ease: SALIDA },
    },
  };

  return (
    <Componente className={className} variants={variantes}>
      {children}
    </Componente>
  );
}
