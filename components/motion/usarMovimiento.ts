"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/* ============================================================
   ¿HAY QUE MOVER ALGO?
   Un único hook decide si las animaciones de JavaScript corren o no.

   Devuelve false hasta que el componente monta, aunque el sistema
   pida movimiento reducido. No es un descuido: el servidor no puede
   conocer la preferencia del visitante, así que si el primer render
   del cliente ya la aplicara, el HTML no coincidiría con el del
   servidor y React tiraría toda la página abajo para rehacerla
   (error de hidratación). Se renderiza igual que el servidor y en el
   primer efecto, antes de que se pinte nada, se pasa al valor real.

   Las animaciones puramente CSS no dependen de esto: las corta el
   bloque @media (prefers-reduced-motion) de globals.css.
   ============================================================ */
export function usarMovimientoReducido(): boolean {
  const preferencia = useReducedMotion();
  const [montado, setMontado] = useState(false);

  useEffect(() => setMontado(true), []);

  return montado ? preferencia === true : false;
}
