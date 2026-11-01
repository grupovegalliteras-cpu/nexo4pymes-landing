"use client";

import Link from "@/components/i18n/Enlace";
import type { ReactNode } from "react";
import { useMagnetico } from "@/components/motion/useMagnetico";

/* ============================================================
   BOTÓN

   LAS TRES VARIANTES, EN LA PALETA DE MARCA.

     principal  → fondo carmesí con letra crema, en claro y en oscuro.
     secundario → contorno sobre el fondo de tarjeta.
     claro      → también carmesí. Era el verde de WhatsApp, y lo que
                  hay detrás sigue siendo «escribidnos por WhatsApp»,
                  pero la paleta no tiene verde y es el botón principal
                  de los cierres.

   RADIO: rounded-xl y no rounded-full. Todo lo pulsable del sitio
   nuevo (cabecera, demo, sectores) usa la esquina de 12 px; la
   píldora era de la estética anterior y aquí cantaba.

   Sin halo en la variante principal: un resplandor difuminado sobre
   fondo claro es una mancha.
   ============================================================ */

type Variante = "principal" | "secundario" | "claro";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold " +
  "transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-[cubic-bezier(.22,1,.36,1)] " +
  "active:translate-y-0 select-none";

const variantes: Record<Variante, string> = {
  principal: "bg-carmesi text-crema shadow-e1 hover:-translate-y-0.5 hover:bg-carmesi-oscuro hover:shadow-e2",
  secundario: "border border-line-strong bg-surface text-fg hover:-translate-y-0.5 hover:border-brand hover:text-brand",
  claro: "bg-carmesi text-crema hover:-translate-y-0.5 hover:bg-carmesi-oscuro",
};

/* OJO: el tamaño NO se puede sobrescribir desde `className`. Tailwind
   ordena las utilidades por su nombre en la hoja generada, no por el
   orden en que se escriben en el atributo class, así que `px-6` de aquí
   gana siempre a un `px-5` pasado por fuera. La cabecera llevaba
   `px-5 py-2.5 text-[13.5px]` en className y no se aplicaba ninguna de
   las tres: el botón medía 24 px de padding y 15 px de texto. Si hace
   falta otro tamaño, se añade aquí. */
const tamanos = {
  /* py-3 y no py-2.5: con 13 px de texto son los 44 px de alto que
     piden la WCAG 2.5.8 y las guías de iOS. Con py-2.5 se quedaba en 41. */
  sm: "px-4 py-3 text-[13px]",
  md: "px-5 py-3 text-[15px]",
  lg: "px-6 py-4 text-[16px] sm:text-[17px]",
};

export function Boton({
  children,
  href,
  variante = "principal",
  tamano = "md",
  externo = false,
  flecha = false,
  magnetico = false,
  className = "",
  type,
  onClick,
  disabled,
}: {
  children: ReactNode;
  href?: string;
  variante?: Variante;
  tamano?: keyof typeof tamanos;
  externo?: boolean;
  flecha?: boolean;
  magnetico?: boolean;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const clases = `${base} ${variantes[variante]} ${tamanos[tamano]} ${className}`;
  const imanBase = useMagnetico<HTMLAnchorElement & HTMLButtonElement>();
  const iman = magnetico ? imanBase : null;

  const contenido = (
    <>
      <span>{children}</span>
      {flecha && (
        <span
          aria-hidden="true"
          className="transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1"
        >
          →
        </span>
      )}
    </>
  );

  if (href && externo) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener"
        className={clases}
        ref={iman?.ref}
        onMouseMove={iman?.onMouseMove}
        onMouseLeave={iman?.onMouseLeave}
      >
        {contenido}
      </a>
    );
  }

  if (href) {
    return (
      <Link
        href={href}
        className={clases}
        ref={iman?.ref}
        onMouseMove={iman?.onMouseMove}
        onMouseLeave={iman?.onMouseLeave}
      >
        {contenido}
      </Link>
    );
  }

  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      disabled={disabled}
      className={clases}
      ref={iman?.ref}
      onMouseMove={iman?.onMouseMove}
      onMouseLeave={iman?.onMouseLeave}
    >
      {contenido}
    </button>
  );
}
