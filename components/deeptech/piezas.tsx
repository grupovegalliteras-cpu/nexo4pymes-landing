import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* Piezas de texto comunes a las secciones de la portada. Sin estado: valen
   igual en servidor que en cliente. */

/** Rótulo de sección al estilo de un panel de control: número, raya y nombre. */
export function Etiqueta({ num, children, className }: { num?: string; children: ReactNode; className?: string }) {
  return (
    <div data-revelar className={cn("dt-mono flex items-center gap-3 text-[11.5px] font-medium tracking-[0.18em] text-[var(--dt-cian)] uppercase", className)}>
      {num && <span className="text-fg-3">{num}</span>}
      <i className="h-px w-8 bg-gradient-to-r from-[var(--dt-cian)] to-transparent" />
      <span>{children}</span>
    </div>
  );
}

/** Titular de sección que entra enfocándose, con un glitch breve de color
    (rojo y cian desplazados) la primera vez que aparece. */
export function TituloGlitch({ children, className, as: Tag = "h2" }: { children: string; className?: string; as?: "h2" | "h3" | "div" }) {
  return (
    <Tag data-glitch data-texto={children} className={cn("dt-glitch font-display leading-[1.04] font-semibold tracking-[-0.035em] text-fg", className)}>
      {children}
    </Tag>
  );
}
