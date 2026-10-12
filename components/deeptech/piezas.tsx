import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* Piezas de texto comunes a las secciones de la portada. Sin estado: valen
   igual en servidor que en cliente. */

/** Rótulo pequeño encima del titular de cada sección. En palabras de
    todos los días: lo lee el gerente de una pyme, no un ingeniero. */
export function Etiqueta({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div data-revelar className={cn("flex items-center gap-2.5 text-[14px] font-semibold text-[var(--dt-cian)]", className)}>
      <i className="h-px w-6 bg-gradient-to-r from-[var(--dt-cian)] to-transparent" />
      <span>{children}</span>
    </div>
  );
}

/** Titular de sección. Entra con un fundido corto; se lee desde el primer momento. */
export function Titulo({ children, className, as: Tag = "h2" }: { children: ReactNode; className?: string; as?: "h2" | "h3" | "div" }) {
  return (
    <Tag data-revelar className={cn("font-display leading-[1.06] font-semibold tracking-[-0.03em] text-fg", className)}>
      {children}
    </Tag>
  );
}
