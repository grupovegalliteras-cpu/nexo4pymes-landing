/* ============================================================
   EL ESTADO LEGAL DEL REGISTRO DE JORNADA, EN UN SOLO SITIO

   POR QUÉ EXISTE ESTE ARCHIVO. Medido con el autocompletado de Google
   el 4 de noviembre de 2026: de 826 consultas del grupo «obligaciones
   laborales y de facturación», 443 son de jornada y fichaje, y de esas
   80 llevan la palabra «digital». De esas 80, VEINTIUNA preguntan
   cuándo entra en vigor y OCHO preguntan directamente por el BOE
   («registro de jornada digital obligatorio boe», «fichaje digital
   obligatorio 2026 boe», «ley fichaje digital obligatorio boe»).

   Es decir: la consulta más fuerte de todo nuestro nicho —«registro de
   jornada digital obligatorio cuando entra en vigor»— pregunta por la
   fecha de un reglamento QUE NO ESTÁ PUBLICADO. Media internet
   responde con una fecha inventada o con la del último titular. La
   respuesta correcta es «no hay fecha en el BOE, y esto es lo que sí
   está publicado», y es la que casi nadie da.

   Toponímico: 3 de 826. Lo nacional vuelve a ganar por goleada. Ver
   content/verifactu-estado.ts para el mismo razonamiento en fiscal.

   LA DISTINCIÓN QUE HAY QUE RESPETAR AL ESCRIBIR, la misma que en
   VeriFactu: una cosa es lo que está EN VIGOR —publicado en el BOE— y
   otra lo TRAMITADO o lo ANUNCIADO. Mientras el reglamento del fichaje
   digital no salga en el BOE, lo que obliga es el artículo 34.9 y nada
   más. Decir lo contrario es lo que hacen los que venden con miedo, y
   es justo lo que esta web no hace.

   CÓMO SE ACTUALIZA. Se vuelve a leer el texto consolidado del
   Estatuto, se comprueba si ya existe un artículo 34 bis (hoy no
   existe: cero apariciones), se pone la fecha en COMPROBADO y se
   despliega.

   FUENTES PRIMARIAS, siempre antes que cualquier gestoría:
     Estatuto de los Trabajadores, texto consolidado
     https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430
     LISOS (infracciones y sanciones), texto consolidado
     https://www.boe.es/buscar/act.php?id=BOE-A-2000-15060
   ============================================================ */

import type { Idioma } from "@/lib/i18n";

/** Último día en que una persona leyó el BOE y lo confirmó. */
export const COMPROBADO = "2026-11-04";

/* QUÉ SE COMPROBÓ EXACTAMENTE ESE DÍA, para que el que venga detrás no
   tenga que adivinar qué significa la fecha de arriba:

   1. El artículo 34.9 del Estatuto sigue con la redacción del RD-ley
      8/2019, palabra por palabra: registro diario, «el horario concreto
      de inicio y finalización de la jornada de trabajo de cada persona
      trabajadora», organización por convenio o acuerdo de empresa y
      conservación durante CUATRO AÑOS a disposición de las personas
      trabajadoras, sus representantes y la Inspección.
   2. NO existe ningún «artículo 34 bis»: cero apariciones en el texto
      consolidado. El reglamento del fichaje digital sigue sin publicar.
   3. El registro de jornada está nombrado expresamente en el artículo
      7.5 de la LISOS, que lo califica de infracción GRAVE. Las cuantías
      del artículo 40.1.b) siguen siendo 751–1.500 € en grado mínimo,
      1.501–3.750 € en medio y 3.751–7.500 € en máximo. */

/** El medio en que hay que fichar: lo que la ley exige y lo que no. */
export const EXIGE_DIGITAL = false;

/** Años que hay que conservar los registros (art. 34.9 ET). */
export const ANOS_CONSERVACION = 4;

/** Desde cuándo obliga el registro diario (RD-ley 8/2019). */
export const EN_VIGOR_DESDE = "2019-05-12";

/* LAS CUANTÍAS DE VERDAD, que es lo que nadie pone.
   Importan porque el argumento de venta es «os van a multar si no
   tenéis una app», y la respuesta honesta no es «no os multarán»: es
   que la multa existe, es ésta, y es por NO LLEVAR el registro, no por
   llevarlo en papel. */
export const SANCION = {
  calificacion: "grave" as const,
  norma: "art. 7.5 y 40.1.b) LISOS",
  grados: [
    { grado: { es: "mínimo", en: "minimum", de: "Mindeststufe" }, importe: "751 – 1.500 €" },
    { grado: { es: "medio", en: "medium", de: "Mittelstufe" }, importe: "1.501 – 3.750 €" },
    { grado: { es: "máximo", en: "maximum", de: "Höchststufe" }, importe: "3.751 – 7.500 €" },
  ],
};

const LOCALE: Record<Idioma, string> = { es: "es-ES", en: "en-GB", de: "de-DE" };

/** La fecha de comprobación escrita para leer, no para parsear. */
export function comprobadoTexto(lang: Idioma): string {
  return new Intl.DateTimeFormat(LOCALE[lang], {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${COMPROBADO}T12:00:00Z`));
}

/** Para los datos estructurados: dateModified en formato ISO. */
export const COMPROBADO_ISO = `${COMPROBADO}T00:00:00.000Z`;
