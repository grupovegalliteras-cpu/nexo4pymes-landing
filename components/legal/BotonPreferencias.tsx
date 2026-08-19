"use client";

import { abrirPreferencias } from "@/lib/consentimiento";

/* Reabre el panel de preferencias de cookies.

   No es un adorno: el RGPD exige que retirar el consentimiento sea
   tan fácil como darlo. Si la única forma de cambiar de opinión
   fuera borrar los datos del navegador, el consentimiento inicial
   no sería válido. Por eso este enlace vive en el pie de TODAS las
   páginas y también dentro de la política de cookies.

   `estilo` existe porque se usa en dos sitios con tipografías
   distintas: la lista del pie (filas de 44 px) y el cuerpo de la
   página legal. */
export function BotonPreferencias({
  estilo = "pie",
  children = "Preferencias de cookies",
}: {
  estilo?: "pie" | "enlace";
  children?: React.ReactNode;
}) {
  const clases =
    estilo === "pie"
      ? "flex min-h-[44px] items-center text-left text-[14px] text-white/60 transition-colors hover:text-white"
      : "inline-flex min-h-[44px] items-center text-[15.5px] text-[#9FB6FF] underline underline-offset-4 hover:text-white";

  return (
    <button type="button" onClick={abrirPreferencias} className={clases}>
      {children}
    </button>
  );
}
