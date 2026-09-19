import { datosLegales, marcadorPendiente } from "@/content/marca";

/* ============================================================
   CONTROL DE LOS DATOS LEGALES

   La web estuvo meses publicando "[PENDIENTE]" en el CIF, el
   domicilio y los datos registrales. No fue mala fe: fue que nadie
   se enteró. Un hueco en el aviso legal no rompe nada, no sale en
   ningún error y no lo ve quien despliega — solo lo ve el cliente
   que entra a comprobar si la empresa existe, que es justo el que
   estaba a punto de fiarse.

   Así que ahora el build lo dice. `revisarDatosLegales()` se llama
   al construir la página de /legal y escribe un aviso bien visible
   en el registro del despliegue si queda algo por rellenar.

   AVISA, NO ROMPE. Tumbar el build por esto dejaría la web sin
   desplegar por un dato que probablemente se está tramitando en
   una notaría. El objetivo es que no pase desapercibido, no
   bloquear el trabajo.

   Cuando esté todo relleno, esta función deja de escribir nada y
   no hay que quitarla: si un día se añade un campo nuevo sin
   completar, vuelve a avisar sola.
   ============================================================ */

/** Campos obligatorios por el artículo 10 de la LSSI-CE. */
const OBLIGATORIOS = [
  ["titular", datosLegales.titular],
  ["identificacion", datosLegales.identificacion],
  ["domicilio", datosLegales.domicilio],
] as const;

/** Nombres de los campos que siguen sin rellenar. Vacío si está todo. */
export function datosLegalesPendientes(): string[] {
  return OBLIGATORIOS.filter(
    ([, valor]) => !valor || valor.includes(marcadorPendiente),
  ).map(([campo]) => campo);
}

/** ¿Este valor concreto es todavía un marcador? */
export function esPendiente(valor: string): boolean {
  return !valor || valor.includes(marcadorPendiente);
}

/**
 * Escribe el aviso en el registro del build. Se llama una vez, desde
 * la página de /legal.
 */
export function revisarDatosLegales(): void {
  const pendientes = datosLegalesPendientes();
  if (pendientes.length === 0) return;

  console.warn(
    [
      "",
      "  ⚠  AVISO LEGAL INCOMPLETO",
      "",
      `  Faltan por rellenar: ${pendientes.join(", ")}`,
      "  Se editan en content/marca.ts → datosLegales",
      "",
      "  El artículo 10 de la LSSI-CE obliga a identificar a quien",
      "  responde del sitio. Mientras falten, la página lo dice en",
      "  vez de inventarse un dato.",
      "",
    ].join("\n"),
  );
}
