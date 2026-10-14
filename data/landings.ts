import { MODULOS } from "./modules";

/* ============================================================
   LAS LANDINGS DE MÓDULO: CUÁLES, Y POR QUÉ NO LAS CUARENTA

   QUÉ ES ESTO. data/modules.ts tiene 40 módulos. Este archivo dice
   cuáles de ellos merecen una página propia. No son los 40, y la
   diferencia no es de gusto: es de demanda medida.

   CÓMO SE MIDIÓ. El 13 de octubre de 2026 se consultó el
   autocompletado de Google (es-ES) para los 40 módulos, con el
   término que usaría un comprador, no con el nombre interno. Google
   solo autocompleta lo que mucha gente escribe, así que una consulta
   sin sugerencias es una consulta que nadie hace.

   QUÉ SALIÓ. Doce módulos dieron CERO sugerencias: central-avisos,
   web-reservas, recordatorios, multi-centro, planificacion, informes,
   recurrente, cobros, gastos, rentabilidad, informes-automaticos y
   conexiones. Entre ellos Central Avisos, que es el producto estrella.
   No es que el producto sea flojo: es que nadie busca "gestión de
   avisos". Esos módulos se venden DENTRO de estas páginas, no con una
   página que se llame como ellos.

   POR QUÉ NO HACER LAS 40 IGUALMENTE. Porque ya tenemos la prueba en
   casa: /demo tiene 84 palabras y Search Console la da como
   "detectada: actualmente sin indexar". Google ya se negó a indexar
   una página fina nuestra. Cuarenta páginas de cuarenta palabras no
   son cuarenta oportunidades, son cuarenta motivos para que el sitio
   entero valga menos.

   LO QUE EL DATO DECÍA Y AQUÍ SE DESCARTA. contabilidad, nominas,
   clientes (CRM) y chat sacaron 10 sugerencias cada uno, de las más
   altas de la tabla. No están. Enfrente tienen a Sage, A3, Contasol,
   HubSpot, Zoho, Slack y Teams, y además no son nuestro producto de
   verdad. Volumen alto no es oportunidad si la pelea está perdida de
   salida: vale más "partes de trabajo app" con 4 sugerencias y nadie
   defendiéndolo.

   EL SLUG NO ES EL ID. El módulo se llama "fichaje" por dentro; la
   gente escribe "control horario". Manda cómo se busca.
   ============================================================ */

export type Landing = {
  /** Lo que va en la URL, escrito como lo teclea quien busca. */
  slug: string;
  /** Id en data/modules.ts del que cuelga. El nombre y la descripción salen de allí. */
  modulo: string;
  /** La consulta que esta página intenta ganar. Documenta la decisión. */
  consulta: string;
  /** Señal medida el 13/10/2026: variantes que Google autocompleta. */
  senal: number;
  /* EL ARTÍCULO DEL BLOG QUE LE HACE PAREJA.

     POR QUÉ CADA LANDING QUIERE UNO. La landing contesta a quien ya
     busca un programa («software control horario»). El artículo
     contesta a quien todavía busca entender el problema («es
     obligatorio el fichaje digital»), que es mucha más gente y llega
     antes. Si las dos cosas estuvieran en la misma página, competiría
     consigo misma y Google acabaría eligiendo solo una.

     Se enlazan en los dos sentidos a propósito: el artículo lleva a la
     landing cuando el lector ya quiere ver algo, y la landing lleva al
     artículo cuando todavía está decidiendo.

     Vacío mientras el artículo no esté escrito. No se inventa la ruta
     antes de tiempo: un enlace a una página que no existe es peor que
     no tener enlace. */
  articulo?: string;
};

export const LANDINGS = [
  { slug: "facturacion-verifactu", modulo: "facturacion", consulta: "software facturación VeriFactu", senal: 273, articulo: "/blog/verifactu-empresas-servicios-mallorca" },
  { slug: "control-horario", modulo: "fichaje", consulta: "control horario", senal: 215 },
  { slug: "partes-de-trabajo", modulo: "trabajos", consulta: "partes de trabajo app", senal: 169 },
  { slug: "presupuestos", modulo: "presupuestos", consulta: "software presupuestos", senal: 10, articulo: "/blog/automatizar-presupuestos-pymes-mallorca" },
  { slug: "chatbot-whatsapp", modulo: "asistente-atencion", consulta: "chatbot WhatsApp Business", senal: 10, articulo: "/blog/centralizar-avisos-llamadas-whatsapp-mallorca" },
] as const satisfies readonly Landing[];

export type LandingSlug = (typeof LANDINGS)[number]["slug"];

export function esLandingSlug(v: string): v is LandingSlug {
  return LANDINGS.some((l) => l.slug === v);
}

export function landingDe(slug: LandingSlug): Landing {
  /* El find no puede fallar: esLandingSlug ya lo ha comprobado y la
     lista es constante. El non-null es para el tipo, no para la lógica. */
  return LANDINGS.find((l) => l.slug === slug)!;
}

/* Que el módulo al que apunta cada landing exista de verdad. Si alguien
   renombra un id en modules.ts, esto revienta al arrancar y no seis
   meses después con una página en blanco en producción. */
for (const l of LANDINGS) {
  if (!MODULOS.some((m) => m.id === l.modulo)) {
    throw new Error(`landings.ts: la landing "${l.slug}" apunta al módulo "${l.modulo}", que no está en data/modules.ts`);
  }
}
