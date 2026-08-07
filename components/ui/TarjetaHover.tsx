"use client";

import { useRef, useState, type ReactNode } from "react";

/* ============================================================
   TARJETA CON PROFUNDIDAD
   El borde se ilumina siguiendo al cursor. Es un degradado radial
   cuya posición se escribe en dos custom properties: no re-renderiza
   React ni recalcula layout, solo repinta el fondo de una capa.

   En táctil no se dispara ningún evento de ratón, así que la tarjeta
   se queda en su estado plano sin coste alguno.
   ============================================================ */

export function TarjetaHover({
  children,
  className = "",
  tono = "claro",
}: {
  children: ReactNode;
  className?: string;
  tono?: "claro" | "oscuro";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [activo, setActivo] = useState(false);

  function mover(e: React.MouseEvent<HTMLDivElement>) {
    const caja = ref.current?.getBoundingClientRect();
    if (!caja || !ref.current) return;
    ref.current.style.setProperty("--x", `${e.clientX - caja.left}px`);
    ref.current.style.setProperty("--y", `${e.clientY - caja.top}px`);
  }

  const estilos =
    tono === "oscuro"
      ? "border-white/10 bg-white/[.04] hover:border-mint/30"
      : "border-linea bg-white hover:border-teal/30";

  return (
    <div
      ref={ref}
      onMouseMove={mover}
      onMouseEnter={() => setActivo(true)}
      onMouseLeave={() => setActivo(false)}
      className={`group relative overflow-hidden rounded-[20px] border p-6 transition-[transform,border-color,box-shadow]
                  duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1
                  hover:shadow-[0_24px_50px_-30px_rgba(14,59,54,.45)] ${estilos} ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: activo
            ? `radial-gradient(340px circle at var(--x) var(--y), ${
                tono === "oscuro" ? "rgba(18,226,176,.10)" : "rgba(28,110,99,.07)"
              }, transparent 62%)`
            : undefined,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
