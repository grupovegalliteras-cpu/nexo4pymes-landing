"use client";

import { useEffect, useRef, useState } from "react";
import { usarMovimientoReducido } from "@/components/motion/usarMovimiento";
import { useInView } from "framer-motion";

/* Número que sube al entrar en pantalla. Solo se usa donde la cifra
   es el mensaje (el precio, el caso del taller): un contador en un
   dato secundario es ruido.

   Con movimiento reducido pinta el valor final directamente. */
export function Contador({
  hasta,
  duracion = 1.1,
  prefijo = "",
  sufijo = "",
  className = "",
}: {
  hasta: number;
  duracion?: number;
  prefijo?: string;
  sufijo?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.6 });
  const reducido = usarMovimientoReducido();
  const [valor, setValor] = useState(0);

  useEffect(() => {
    if (!visible) return;
    if (reducido) {
      setValor(hasta);
      return;
    }

    let frame = 0;
    const inicio = performance.now();

    const tick = (ahora: number) => {
      const t = Math.min((ahora - inicio) / (duracion * 1000), 1);
      // easeOutExpo: arranca rápido y frena, que es como se lee un precio.
      const suave = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValor(Math.round(suave * hasta));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, hasta, duracion, reducido]);

  return (
    <span ref={ref} className={className}>
      {prefijo}
      {valor}
      {sufijo}
    </span>
  );
}
