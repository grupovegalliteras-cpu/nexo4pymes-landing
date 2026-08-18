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

/* ============================================================
   ¿HAY UN RATÓN DE VERDAD?
   Tres efectos del sitio solo tienen sentido con puntero fino: la
   inclinación 3D de la tarjeta del hero, el botón magnético y el
   resplandor que sigue al cursor en las tarjetas.

   En un móvil no es solo que no se vean: los navegadores táctiles
   emulan mouseenter/mouseleave al tocar, así que el resplandor
   dispara un render de React y pinta un degradado radial de 380 px
   con cada toque, y el botón magnético puede quedarse desplazado
   después de pulsarlo.

   Devuelve true en el primer render, igual que asume el servidor, y
   pasa al valor real en el primer efecto: así el HTML del cliente
   coincide con el del servidor y no hay error de hidratación.
   ============================================================ */
export function usarPunteroFino(): boolean {
  const [fino, setFino] = useState(true);

  useEffect(() => {
    const consulta = window.matchMedia("(hover: hover) and (pointer: fine)");
    const actualizar = () => setFino(consulta.matches);
    actualizar();
    consulta.addEventListener("change", actualizar);
    return () => consulta.removeEventListener("change", actualizar);
  }, []);

  return fino;
}
