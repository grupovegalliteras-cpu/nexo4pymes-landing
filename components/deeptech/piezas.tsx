import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* Piezas de texto comunes a las secciones de la portada. Sin estado: valen
   igual en servidor que en cliente. */

/** Rótulo pequeño encima del titular de cada sección. En palabras de
    todos los días: lo lee el gerente de una pyme, no un ingeniero.
    Es la misma píldora del hero: el bloque exterior se revela y deja que el
    padre decida si va centrada o a la izquierda. */
export function Etiqueta({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div data-revelar className={className}>
      <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1.5 pr-3.5 pl-2.5 text-[13px] font-semibold text-fg-2">
        <i className="size-1.5 rounded-full bg-[var(--dt-acento)]" />
        {children}
      </span>
    </div>
  );
}

/** Titular de sección. Entra con un fundido corto; se lee desde el primer momento. */
export function Titulo({ children, className, as: Tag = "h2" }: { children: ReactNode; className?: string; as?: "h2" | "h3" | "div" }) {
  return (
    <Tag data-revelar className={cn("font-display leading-[1.06] font-semibold tracking-[-0.01em] text-fg", className)}>
      {children}
    </Tag>
  );
}
