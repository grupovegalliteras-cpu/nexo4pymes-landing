"use client";

import { useCallback, useRef } from "react";
import { usarMovimientoReducido, usarPunteroFino } from "@/components/motion/usarMovimiento";

/* ============================================================
   BOTÓN MAGNÉTICO
   El CTA sigue un poco al cursor y crece al pasar por encima, en vez
   de limitarse a cambiar de color. Se escribe directo en el DOM (ref),
   no por estado de React: si esto disparara un render en cada
   mousemove, el hover se notaría con tirones.
   ============================================================ */
export function useMagnetico<T extends HTMLElement>(fuerzaX = 0.22, fuerzaY = 0.3) {
  const ref = useRef<T>(null);
  const reducido = usarMovimientoReducido();
  const fino = usarPunteroFino();

  const alMover = useCallback(
    (e: React.MouseEvent<T>) => {
      // En táctil el navegador emula mousemove al pulsar y el botón se
      // quedaba desplazado después del toque. Sin ratón, no se mueve.
      if (!fino || reducido || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * fuerzaX;
      const y = (e.clientY - (r.top + r.height / 2)) * fuerzaY;
      ref.current.style.transform = `translate(${x}px, ${y}px) scale(1.03)`;
    },
    [fino, reducido, fuerzaX, fuerzaY],
  );

  const alSalir = useCallback(() => {
    if (ref.current) ref.current.style.transform = "";
  }, []);

  return { ref, onMouseMove: alMover, onMouseLeave: alSalir };
}
