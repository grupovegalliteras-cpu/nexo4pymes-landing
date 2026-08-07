"use client";

import Link from "next/link";
import type { ReactNode } from "react";

/* ============================================================
   BOTÓN
   Tres variantes. Regla de marca: el coral relleno ("principal")
   aparece una sola vez por pantalla. Si está en todas partes deja
   de significar "pulsa aquí".

   El glow es un pseudo-elemento con blur que solo cambia de
   opacidad y escala en hover: nada de animar box-shadow, que
   repinta en cada frame.
   ============================================================ */

type Variante = "principal" | "secundario" | "claro";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "transition-[transform,background-color,border-color,color] duration-300 ease-[cubic-bezier(.22,1,.36,1)] " +
  "hover:-translate-y-0.5 active:translate-y-0 select-none";

const variantes: Record<Variante, string> = {
  principal:
    "bg-coral text-white shadow-[0_10px_30px_-10px_rgba(232,98,58,.75)] hover:bg-[#f0714b]",
  secundario:
    "border border-bottle/25 text-bottle hover:border-bottle/60 hover:bg-bottle/[.04] " +
    "[.oscuro_&]:border-white/25 [.oscuro_&]:text-white [.oscuro_&]:hover:border-mint/60 [.oscuro_&]:hover:bg-white/[.06]",
  claro: "bg-white text-bottle hover:bg-cream",
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
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const clases = `${base} ${variantes[variante]} ${tamanos[tamano]} ${className}`;

  const contenido = (
    <>
      {/* Halo de la variante principal. Sube de opacidad en hover. */}
      {variante === "principal" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-2 -z-10 rounded-full bg-coral/35 blur-xl opacity-0
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
      <a href={href} target="_blank" rel="noopener" className={clases}>
        {contenido}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={clases}>
        {contenido}
      </Link>
    );
  }

  return (
    <button type={type ?? "button"} onClick={onClick} disabled={disabled} className={clases}>
      {contenido}
    </button>
  );
}
