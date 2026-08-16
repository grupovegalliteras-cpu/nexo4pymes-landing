"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useMagnetico } from "@/components/motion/useMagnetico";

/* ============================================================
   BOTÓN
   Tres variantes. La "principal" es el degradado azul → violeta de
   marca: aparece una sola vez por pantalla como máximo. Si está en
   todas partes deja de significar "pulsa aquí".

   El glow es un pseudo-elemento con blur que solo cambia de
   opacidad y escala en hover: nada de animar box-shadow, que
   repinta en cada frame.

   `magnetico` añade el efecto de la maqueta: el botón sigue un poco
   al cursor y crece levemente. Solo se usa en los CTA más
   importantes de cada pantalla — puesto en todos los botones deja
   de notarse.
   ============================================================ */

type Variante = "principal" | "secundario" | "claro";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-[cubic-bezier(.22,1,.36,1)] " +
  "active:translate-y-0 select-none";

const variantes: Record<Variante, string> = {
  principal:
    "bg-gradient-to-br from-azul to-violeta text-white shadow-[0_14px_40px_-12px_rgba(76,125,255,.55)] " +
    "hover:-translate-y-0.5 hover:shadow-[0_20px_54px_-10px_rgba(130,110,250,.65)]",
  secundario:
    "border border-white/14 bg-white/[.03] text-white hover:-translate-y-0.5 hover:border-azul/45 hover:bg-azul/10",
  claro: "bg-white text-bottle-900 hover:-translate-y-0.5 hover:bg-white/90",
};

const tamanos = {
  md: "px-6 py-3 text-[15px]",
  lg: "px-7 py-4 text-[16px] sm:text-[17px]",
};

export function Boton({
  children,
  href,
  variante = "principal",
  tamano = "md",
  externo = false,
  flecha = false,
  magnetico = false,
  className = "",
  type,
  onClick,
  disabled,
}: {
  children: ReactNode;
  href?: string;
  variante?: Variante;
  tamano?: keyof typeof tamanos;
  externo?: boolean;
  flecha?: boolean;
  magnetico?: boolean;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const clases = `${base} ${variantes[variante]} ${tamanos[tamano]} ${className}`;
  const imanBase = useMagnetico<HTMLAnchorElement & HTMLButtonElement>();
  const iman = magnetico ? imanBase : null;

  const contenido = (
    <>
      {/* Halo de la variante principal. Sube de opacidad en hover. */}
      {variante === "principal" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-2 -z-10 rounded-full bg-azul/35 blur-xl opacity-0
                     transition-opacity duration-500 group-hover:opacity-100"
        />
      )}
      <span>{children}</span>
      {flecha && (
        <span
          aria-hidden="true"
          className="transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1"
        >
          →
        </span>
      )}
    </>
  );

  if (href && externo) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener"
        className={clases}
        ref={iman?.ref}
        onMouseMove={iman?.onMouseMove}
        onMouseLeave={iman?.onMouseLeave}
      >
        {contenido}
      </a>
    );
  }

  if (href) {
    return (
      <Link
        href={href}
        className={clases}
        ref={iman?.ref}
        onMouseMove={iman?.onMouseMove}
        onMouseLeave={iman?.onMouseLeave}
      >
        {contenido}
      </Link>
    );
  }

  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      disabled={disabled}
      className={clases}
      ref={iman?.ref}
      onMouseMove={iman?.onMouseMove}
      onMouseLeave={iman?.onMouseLeave}
    >
      {contenido}
    </button>
  );
}
