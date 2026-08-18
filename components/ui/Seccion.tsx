import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

/* Envoltorio de sección: fija el ritmo vertical, el ancho máximo y
   el par antetítulo + H2, que se repite en todas las secciones.

   `tono` decide fondo y color de texto. La clase `.oscuro` la leen
   el botón secundario y el foco visible para invertir sus colores. */

type Tono = "claro" | "alt" | "oscuro" | "oscuro-hondo";

const tonos: Record<Tono, string> = {
  claro: "bg-cream text-ink",
  alt: "bg-cream-2 text-ink",
  oscuro: "oscuro bg-bottle text-white",
  "oscuro-hondo": "oscuro bg-bottle-900 text-white",
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
      className={`relative scroll-mt-20 overflow-hidden px-5 py-14 sm:px-8 sm:py-28 ${tonos[tono]} ${className}`}
    >
      <div className={`relative mx-auto ${anchos[ancho]}`}>{children}</div>
    </section>
  );
}

export function Antetitulo({ children, tono = "claro" }: { children: ReactNode; tono?: "claro" | "oscuro" }) {
  return (
    <Reveal as="span" className="block">
      <span
        className={`inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.16em] ${
          tono === "oscuro" ? "text-mint" : "text-teal"
        }`}
      >
        <span
          aria-hidden="true"
          className={`h-px w-6 ${tono === "oscuro" ? "bg-mint/60" : "bg-teal/40"}`}
        />
        {children}
      </span>
    </Reveal>
  );
}

export function TituloSeccion({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Reveal>
      <h2 className={`mt-4 text-[clamp(1.9rem,5.2vw,3.1rem)] ${className}`}>{children}</h2>
    </Reveal>
  );
}
