import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

/* Envoltorio de sección: fija el ritmo vertical, el ancho máximo y
   el par antetítulo + H2, que se repite en todas las secciones.

   ============================================================
   LOS TONOS, DESPUÉS DE UNIFICAR LA ESTÉTICA

   Aquí había cuatro: dos claros (crema) y dos oscuros (casi negro).
   Eran de cuando la web tenía su propia paleta, distinta de la de la
   portada. Ahora hay una sola paleta y además tiene modo claro y
   modo oscuro, así que un fondo escrito a mano («bg-bottle») sería
   justo lo que rompe el modo oscuro: se queda negro cuando el resto
   de la página se aclara.

   Quedan dos, y los dos salen de variables: `bg` es el fondo de la
   página y `surface-2` el de las bandas que se separan de él. Esa
   alternancia es lo que da ritmo al bajar sin pintar ningún color
   fijo. Los nombres viejos siguen aceptándose para no reescribir las
   veinte secciones que los pasan.
   ============================================================ */

type Tono = "claro" | "alt" | "oscuro" | "oscuro-hondo";

const tonos: Record<Tono, string> = {
  claro: "bg-bg text-fg",
  alt: "bg-surface-2 text-fg",
  /* "oscuro" y "oscuro-hondo" ya no son oscuros: son las bandas que
     contrastan con el fondo. El nombre se queda porque lo pasan las
     secciones; cambiarlo es un renombrado de veinte archivos que no
     cambia ni un píxel. */
  oscuro: "bg-surface-2 text-fg",
  "oscuro-hondo": "bg-surface text-fg",
};

export function Seccion({
  id,
  tono = "claro",
  children,
  className = "",
  ancho = "normal",
}: {
  id?: string;
  tono?: Tono;
  children: ReactNode;
  className?: string;
  ancho?: "normal" | "ancho" | "medido";
}) {
  const anchos = {
    normal: "max-w-[1120px]",
    ancho: "max-w-[1280px]",
    medido: "max-w-[760px]",
  };

  return (
    <section
      id={id}
      className={`relative scroll-mt-20 overflow-hidden px-5 py-14 sm:px-6 sm:py-20 ${tonos[tono]} ${className}`}
    >
      <div className={`relative mx-auto ${anchos[ancho]}`}>{children}</div>
    </section>
  );
}

/* El antetítulo en versalitas con su rayita. `tono` ya no decide
   nada: el acento es el azul de marca, que tiene su propio valor en
   claro y en oscuro. Se mantiene el parámetro porque lo pasan diez
   secciones y no estorba. */
export function Antetitulo({ children }: { children: ReactNode; tono?: "claro" | "oscuro" }) {
  return (
    <Reveal as="span" className="block">
      <span className="inline-flex items-center gap-2 font-mono text-[11px] font-medium tracking-[0.16em] text-brand uppercase">
        <span aria-hidden="true" className="h-px w-6 bg-brand/50" />
        {children}
      </span>
    </Reveal>
  );
}

/* OJO: las clases de tipografía van explícitas y no se pueden quitar.
   Antes las ponía una regla base (h1..h4 { font-family }) que vivía en
   el CSS de la plantilla de la web; al unificar las dos plantillas esa
   regla desapareció, y un h2 sin clase sale con la tipografía de texto. */
export function TituloSeccion({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Reveal>
      <h2
        className={`font-display mt-4 text-[clamp(1.75rem,4.6vw,2.6rem)] leading-[1.08] font-semibold tracking-tight text-balance ${className}`}
      >
        {children}
      </h2>
    </Reveal>
  );
}
