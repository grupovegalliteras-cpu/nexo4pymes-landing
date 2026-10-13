import type { ReactNode } from "react";

/* ============================================================
   TARJETA DE CONTENIDO

   QUÉ ERA Y POR QUÉ HA CAMBIADO. Era un cristal oscuro con un
   resplandor radial que seguía al cursor, de la paleta anterior. Ese
   efecto necesita un fondo casi negro para leerse: sobre el fondo
   claro de ahora el resplandor no se ve, y lo único que quedaba era
   el coste de repintar una capa de 380 px en cada movimiento del
   ratón. En el modo oscuro tampoco hacía falta: las sombras del
   sistema (shadow-e1/e2) ya separan la tarjeta del fondo.

   Lo que sí se queda es el levantamiento en hover, que es lo que
   dice "esto se puede pulsar", y ahora funciona igual en los dos
   modos porque el borde y el fondo salen de variables.

   SIGUE SIENDO UN COMPONENTE Y NO UNA CLASE porque lo usan seis
   secciones; y mantiene la prop `color` sin usarla para no tocar
   esas seis llamadas. Es una tarjeta: no tiene que saber de colores.
   ============================================================ */
export function TarjetaGlow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
  /** Ya no se usa. Queda para no reescribir las llamadas que lo pasan. */
  color?: string;
}) {
  return (
    <div
      className={`group border-line bg-surface shadow-e1 hover:shadow-e2 relative overflow-hidden rounded-2xl border p-5 transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-0.5 sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}
