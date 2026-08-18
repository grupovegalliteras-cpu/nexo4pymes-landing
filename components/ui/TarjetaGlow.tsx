"use client";

import { useRef, useState, type ReactNode } from "react";
import { usarPunteroFino } from "@/components/motion/usarMovimiento";

/* ============================================================
   TARJETA CON BRILLO (equivalente a `data-glow` de la maqueta)
   Cristal oscuro con un resplandor radial que sigue al cursor y un
   ligero levantamiento en hover. La posición del resplandor se
   escribe en variables CSS (--x/--y): no dispara render de React ni
   recalcula layout, solo repinta una capa.

   `color` es un triplete RGB ("76,125,255") para poder variar el
   tinte del brillo por tarjeta, como en la maqueta.
   ============================================================ */
export function TarjetaGlow({
  children,
  className = "",
  color = "76,125,255",
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [activo, setActivo] = useState(false);
  /* Sin ratón no se engancha nada. En táctil el navegador emula
     mouseenter al tocar la tarjeta: eso disparaba un render de React y
     pintaba un degradado radial de 380 px con cada toque, en el
     dispositivo más lento y justo mientras el dedo hace scroll. */
  const fino = usarPunteroFino();

  function mover(e: React.MouseEvent<HTMLDivElement>) {
    const caja = ref.current?.getBoundingClientRect();
    if (!caja || !ref.current) return;
    ref.current.style.setProperty("--x", `${e.clientX - caja.left}px`);
    ref.current.style.setProperty("--y", `${e.clientY - caja.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={fino ? mover : undefined}
      onMouseEnter={fino ? () => setActivo(true) : undefined}
      onMouseLeave={fino ? () => setActivo(false) : undefined}
      className={`group relative overflow-hidden rounded-panel border border-white/9 bg-gradient-to-br
                  from-white/[.065] to-white/[.015] p-5 sm:p-7 shadow-[0_24px_60px_-24px_rgba(0,0,0,.55)]
                  backdrop-blur-xl transition-[transform,border-color,box-shadow] duration-400
                  ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-1.5 hover:border-white/22 ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        style={{
          background: activo
            ? `radial-gradient(380px circle at var(--x) var(--y), rgba(${color},.18), transparent 65%)`
            : undefined,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
