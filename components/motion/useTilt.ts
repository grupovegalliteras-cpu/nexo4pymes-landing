"use client";

import { useCallback, useRef } from "react";
import { usarMovimientoReducido, usarPunteroFino } from "@/components/motion/usarMovimiento";

/* ============================================================
   INCLINACIÓN 3D
   La tarjeta del hero gira levemente siguiendo el cursor, como en la
   maqueta. Igual que useMagnetico: se escribe directo en el DOM para
   no disparar un render por cada mousemove.
   ============================================================ */
export function useTilt<T extends HTMLElement>(grados = 9) {
  const ref = useRef<T>(null);
  const reducido = usarMovimientoReducido();
  const fino = usarPunteroFino();

  const alMover = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      // Sin ratón de verdad no se inclina nada: en táctil el navegador
      // emula eventos de ratón al tocar y la tarjeta se quedaba torcida.
      if (!fino || reducido || !ref.current) return;
      const r = e.currentTarget.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      ref.current.style.transform = `perspective(1000px) rotateY(${px * grados * 2}deg) rotateX(${
        -py * grados * 2
      }deg) translateZ(0)`;
    },
    [fino, reducido, grados],
  );

  const alSalir = useCallback(() => {
    if (ref.current) ref.current.style.transform = "";
  }, []);

  return { ref, onMouseMove: alMover, onMouseLeave: alSalir };
}
