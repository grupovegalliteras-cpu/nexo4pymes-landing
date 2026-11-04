import { HITOS as HITOS_VERIFACTU } from "@/content/verifactu-estado";
import type { Idioma } from "@/lib/i18n";

/* ============================================================
   LAS TRES OBLIGACIONES QUE LE CAEN ENCIMA A UNA PYME ESPAÑOLA

   POR QUÉ ESTE ARCHIVO. La misma razón que content/verifactu-estado.ts,
   pero para las tres normas a la vez: VeriFactu, la factura electrónica
   entre empresas y el registro de jornada. Si las fechas viven dentro de
   la prosa, el día que se muevan —y se mueven— hay que cazarlas por
   media web y alguna se queda atrás. Publicar un plazo equivocado en la
   página de quien vende software de facturación es peor que no tener la
   página.

   POR QUÉ ESTAS TRES Y NO OTRAS. Son el único sitio de nuestro nicho
   donde un estudio de dos personas en Palma juega en casa. Lo demás que
   se busca mucho —automatizar, IA, hacer una web— se aprende en YouTube
   o se compra barato fuera de España. Cumplir con el BOE español, no.
   Y quien busca esto tiene una fecha encima, que es la diferencia entre
   una visita y un cliente.

   LA DISTINCIÓN QUE MANDA EN TODO EL ARCHIVO. Una cosa es lo que está
   EN VIGOR —publicado en el BOE— y otra lo ANUNCIADO. Media internet
   las mezcla, y precisamente por eso la gente busca. La página gana
   explicando la diferencia, no repitiendo el lío.

   CÓMO SE ACTUALIZA: se tocan los valores, se pone la fecha de hoy en
   COMPROBADO y se despliega. Las fuentes están abajo con su
   identificador del BOE para que la comprobación sea de un vistazo.
   ============================================================ */

/** Qué peso tiene una fecha. `anunciado` NO obliga. */
export type EstadoNorma = "en-vigor" | "anunciado" | "en-tramite";

export type Texto = Record<Idioma, string>;

export type Hito = {
  /** A quién le cae, dicho como lo diría quien lo busca, no como el BOE. */
  quien: Texto;
  /** "YYYY-MM-DD" cuando hay día cierto; "YYYY-MM" cuando solo hay mes. */
  fecha: string;
  estado: EstadoNorma;
  /** La norma concreta. Sin esto es un rumor con formato de dato. */
  norma: string;
};

export type Obligacion = {
  id: "verifactu" | "factura-electronica" | "registro-jornada";
  nombre: Texto;
  /** Una frase: qué te obliga a hacer. */
  queObliga: Texto;
  /** La frase que deshace el malentendido más caro de cada norma. */
  loQueNadieCuenta: Texto;
  hitos: Hito[];
  /** Identificadores del BOE, para poder comprobarlo sin buscar. */
  fuentes: { nombre: string; boe: string; url: string }[];
  /* LA PÁGINA PROFUNDA DE ESTA NORMA, cuando la tiene. Esta página es
     el hub —las tres normas juntas, para quien aún no sabe qué le
     toca— y no puede posicionar por sí sola: «obligaciones de una
     empresa» autocompleta casi entero a Latinoamérica, medido el 3 de
     noviembre de 2026. Quien posiciona es la página de cada norma, que
     va a por el término que sí se teclea. De momento solo VeriFactu
     tiene la suya; factura electrónica y registro de jornada son las
     dos siguientes. */
  paginaPropia?: string;
  /** Nuestra página sobre el tema, si la hay. */
  ruta?: string;
};

/* Último día en que una persona abrió el BOE y leyó los textos
   consolidados uno por uno. No es la fecha del despliegue. */
export const COMPROBADO = "2026-11-03";

/* ------------------------------------------------------------------
   1. VERIFACTU
   Las fechas salen de content/verifactu-estado.ts, que ya existía y es
   el que pinta el calendario de /modulos/facturacion-verifactu. Aquí se
   traducen a la forma de este archivo en vez de copiarse: dos listas de
   fechas que digan lo mismo acaban diciendo cosas distintas.

   COMPROBADO HOY en el texto consolidado del RD 1007/2023: la
   disposición final cuarta sigue diciendo "antes del 1 de enero de
   2027" para los del artículo 3.1.a) y "antes del 1 de julio de 2027"
   para el resto. El Real Decreto-ley 2/2026 NO lo modificó, aunque su
   título lleve a pensarlo: el consolidado solo lista como modificadores
   el RD 254/2025 y el RD-ley 15/2025.
   ------------------------------------------------------------------ */
const QUIEN_VERIFACTU: Record<string, Texto> = {
  "2025-07-29": {
    es: "Fabricantes de software de facturación",
    en: "Invoicing software vendors",
    de: "Hersteller von Rechnungssoftware",
  },
  "2027-01-01": {
    es: "Empresas que tributan por el Impuesto sobre Sociedades",
    en: "Companies paying Spanish corporate income tax",
    de: "Unternehmen, die Körperschaftsteuer zahlen",
  },
  "2027-07-01": {
    es: "Autónomos y resto de obligados tributarios",
    en: "Self-employed and all other taxpayers",
    de: "Selbstständige und übrige Steuerpflichtige",
  },
  "2028-10": {
    es: "Empresas y autónomos que facturan menos de 8 M€",
    en: "Businesses invoicing under €8M",
    de: "Betriebe mit weniger als 8 Mio. € Umsatz",
  },
};

const verifactu: Obligacion = {
  id: "verifactu",
  nombre: { es: "VeriFactu", en: "VeriFactu", de: "VeriFactu" },
  queObliga: {
    es: "Que el programa con el que facturáis firme cada factura y encadene su huella, para que no se pueda borrar ni retocar una ya emitida.",
    en: "The software you invoice with has to sign every invoice and chain its hash, so an issued invoice cannot be deleted or altered.",
    de: "Ihre Rechnungssoftware muss jede Rechnung signieren und ihren Hash verketten, damit eine erstellte Rechnung nicht gelöscht oder verändert werden kann.",
  },
  loQueNadieCuenta: {
    es: "No os obliga a cambiar de programa: obliga a que el programa cumpla. Si el vuestro se adapta, no hay nada que comprar.",
    en: "It does not force you to change software: it forces the software to comply. If yours adapts, there is nothing to buy.",
    de: "Sie müssen nicht die Software wechseln: die Software muss die Vorgaben erfüllen. Passt Ihre sich an, gibt es nichts zu kaufen.",
  },
  hitos: HITOS_VERIFACTU.map((h) => ({
    quien: QUIEN_VERIFACTU[h.fecha],
    fecha: h.fecha,
    estado: h.estado as EstadoNorma,
    norma: h.norma,
  })),
  fuentes: [
    {
      nombre: "RD 1007/2023, de 5 de diciembre (texto consolidado)",
      boe: "BOE-A-2023-24840",
      url: "https://www.boe.es/buscar/act.php?id=BOE-A-2023-24840",
    },
    {
      nombre: "RD-ley 15/2025, de 2 de diciembre",
      boe: "BOE-A-2025-24446",
      url: "https://www.boe.es/buscar/doc.php?id=BOE-A-2025-24446",
    },
  ],
  paginaPropia: "/verifactu",
  ruta: "/modulos/facturacion-verifactu",
};

/* ------------------------------------------------------------------
   2. FACTURA ELECTRÓNICA ENTRE EMPRESAS

   ESTA ES LA NOVEDAD, Y CASI NADIE LA TIENE BIEN. El reglamento (RD
   238/2026) dejaba los plazos colgando de una orden ministerial que
   todavía no existía, así que durante medio año todo el mundo escribió
   "pendiente de la orden". La orden salió: Orden HAC/1028/2026, de 2 de
   octubre, publicada el 5 y EN VIGOR EL 6 DE OCTUBRE DE 2026. Ese día
   arrancó el reloj.

   La disposición final cuarta del RD 238/2026, literal: la aplicación
   efectiva queda diferida "contados desde la entrada en vigor de la
   orden ministerial", "doce meses después" para quien superó los 8
   millones de euros de volumen de operaciones el año anterior, y
   "veinticuatro meses después, para el resto de los empresarios y
   profesionales". De ahí salen las dos fechas de abajo, que no son una
   estimación: son una cuenta sobre una fecha publicada.
   ------------------------------------------------------------------ */
const facturaElectronica: Obligacion = {
  id: "factura-electronica",
  nombre: {
    es: "Factura electrónica entre empresas",
    en: "Business-to-business e-invoicing",
    de: "Elektronische Rechnung zwischen Unternehmen",
  },
  queObliga: {
    es: "Que las facturas que os hacéis entre empresas y profesionales viajen en formato electrónico estructurado, y que se informe de si están pagadas o no.",
    en: "Invoices between businesses and professionals have to travel as structured electronic documents, and their payment status has to be reported.",
    de: "Rechnungen zwischen Unternehmen und Freiberuflern müssen als strukturierte elektronische Dokumente laufen, und ihr Zahlungsstatus ist zu melden.",
  },
  loQueNadieCuenta: {
    es: "Un PDF por correo no es una factura electrónica. Lo que vale es un fichero que la máquina del otro lea sola; el PDF solo acompaña, y solo durante los doce primeros meses.",
    en: "A PDF by email is not an electronic invoice. What counts is a file the other side's software reads by itself; the PDF only rides along, and only for the first twelve months.",
    de: "Ein PDF per E-Mail ist keine elektronische Rechnung. Es zählt eine Datei, die die Software der Gegenseite selbst liest; das PDF begleitet sie nur, und nur in den ersten zwölf Monaten.",
  },
  hitos: [
    {
      quien: {
        es: "La solución pública de la Agencia Tributaria queda regulada: arranca el reloj",
        en: "The tax agency's public platform is regulated: the clock starts",
        de: "Die öffentliche Lösung der Steuerverwaltung ist geregelt: die Frist läuft",
      },
      fecha: "2026-10-06",
      estado: "en-vigor",
      norma: "Orden HAC/1028/2026",
    },
    {
      quien: {
        es: "Empresas con más de 8 M€ de volumen de operaciones el año anterior",
        en: "Businesses turning over more than €8M the previous year",
        de: "Betriebe mit mehr als 8 Mio. € Umsatz im Vorjahr",
      },
      fecha: "2027-10-06",
      estado: "en-vigor",
      norma: "RD 238/2026, disp. final 4.ª a)",
    },
    {
      quien: {
        es: "El resto de empresas y profesionales, incluidos autónomos",
        en: "Every other business and professional, self-employed included",
        de: "Alle übrigen Betriebe und Freiberufler, auch Selbstständige",
      },
      fecha: "2028-10-06",
      estado: "en-vigor",
      norma: "RD 238/2026, disp. final 4.ª b)",
    },
  ],
  fuentes: [
    {
      nombre: "RD 238/2026, de 25 de marzo (texto consolidado)",
      boe: "BOE-A-2026-7295",
      url: "https://www.boe.es/buscar/act.php?id=BOE-A-2026-7295",
    },
    {
      nombre: "Orden HAC/1028/2026, de 2 de octubre",
      boe: "BOE-A-2026-20587",
      url: "https://www.boe.es/buscar/act.php?id=BOE-A-2026-20587",
    },
    {
      nombre: "Ley 18/2022, de 28 de septiembre («Crea y Crece»)",
      boe: "BOE-A-2022-15818",
      url: "https://www.boe.es/buscar/act.php?id=BOE-A-2022-15818",
    },
  ],
};

/* ------------------------------------------------------------------
   3. REGISTRO DE JORNADA

   AQUÍ LA NOTICIA ES QUE NO HAY NOTICIA, y es justo lo que casi nadie
   escribe porque casi todos los que escriben de esto venden una app de
   fichaje. Registrar la jornada es obligatorio desde el 12 de mayo de
   2019 —la disposición final sexta.4 del RD-ley 8/2019 difirió el
   artículo 10 "a los dos meses de su publicación", y se publicó el 12
   de marzo de 2019—. Hacerlo en digital NO es obligatorio.

   COMPROBADO HOY: el texto consolidado del Estatuto de los
   Trabajadores, actualizado el 21 de octubre de 2026, sigue teniendo el
   artículo 34.9 y no tiene ningún artículo 34 bis. El proyecto de real
   decreto del registro horario digital sigue en tramitación en el
   Ministerio de Trabajo y no está en el BOE.

   LO QUE NO SE PUEDE ESCRIBIR AQUÍ: una fecha para el real decreto. Ha
   habido tres calendarios distintos en prensa del sector durante 2026 y
   ninguno se ha cumplido. Mientras no salga en el BOE, esto se queda en
   "en trámite" y sin fecha.
   ------------------------------------------------------------------ */
const registroJornada: Obligacion = {
  id: "registro-jornada",
  nombre: {
    es: "Registro de jornada",
    en: "Working-time records",
    de: "Arbeitszeiterfassung",
  },
  queObliga: {
    es: "Anotar cada día la hora a la que empieza y termina cada persona de la plantilla, y guardarlo cuatro años.",
    en: "Recording when each employee starts and finishes every day, and keeping it for four years.",
    de: "Täglich Beginn und Ende der Arbeitszeit jeder beschäftigten Person festhalten und vier Jahre aufbewahren.",
  },
  loQueNadieCuenta: {
    es: "Es obligatorio registrar; no es obligatorio hacerlo con una app. El papel sigue siendo legal. Quien os diga lo contrario os está vendiendo algo.",
    en: "Recording is mandatory; using an app is not. Paper is still legal. Anyone telling you otherwise is selling you something.",
    de: "Die Erfassung ist Pflicht, eine App nicht. Papier ist weiterhin zulässig. Wer etwas anderes behauptet, will Ihnen etwas verkaufen.",
  },
  hitos: [
    {
      quien: {
        es: "Todas las empresas con personas contratadas, en papel o en digital",
        en: "Every employer, on paper or digitally",
        de: "Alle Arbeitgeber, auf Papier oder digital",
      },
      fecha: "2019-05-12",
      estado: "en-vigor",
      norma: "RD-ley 8/2019, art. 34.9 ET",
    },
    {
      quien: {
        es: "Registro obligatoriamente digital y accesible a distancia",
        en: "Mandatory digital records, accessible remotely",
        de: "Zwingend digitale, aus der Ferne einsehbare Erfassung",
      },
      /* Sin fecha a propósito. Ver el comentario de arriba. */
      fecha: "",
      estado: "en-tramite",
      norma: "proyecto de real decreto, sin publicar",
    },
  ],
  fuentes: [
    {
      nombre: "Estatuto de los Trabajadores, art. 34.9 (texto consolidado)",
      boe: "BOE-A-2015-11430",
      url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430",
    },
    {
      nombre: "RD-ley 8/2019, de 8 de marzo",
      boe: "BOE-A-2019-3481",
      url: "https://www.boe.es/buscar/act.php?id=BOE-A-2019-3481",
    },
  ],
  /* LA PÁGINA PROFUNDA DE ESTA NORMA. Aquí no es una página nueva como
     en VeriFactu: es el artículo del blog, que ya está en el #1 y cuyo
     título y ángulo ya son los correctos. Crear una cuarta página de
     control horario habría partido la misma intención en dos y nos
     habría puesto a competir contra nuestra propia página mejor
     posicionada. Medido el 4 de noviembre de 2026. */
  paginaPropia: "/blog/control-horario-obligatorio-mallorca",
  ruta: "/modulos/control-horario",
};

export const OBLIGACIONES: Obligacion[] = [facturaElectronica, verifactu, registroJornada];

export function obligacionDe(id: Obligacion["id"]) {
  return OBLIGACIONES.find((o) => o.id === id);
}

/** "6 de octubre de 2027" / "October 2028" según lo que haya. */
export function fechaHito(h: Hito, lang: Idioma): string | null {
  if (!h.fecha) return null;
  const locale = lang === "es" ? "es-ES" : lang === "de" ? "de-DE" : "en-GB";
  /* Mediodía UTC: con la medianoche, en husos al oeste la fecha
     retrocede un día. Mismo criterio que content/articulos.ts. */
  if (h.fecha.length === 7) {
    return new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(
      new Date(`${h.fecha}-15T12:00:00Z`),
    );
  }
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(`${h.fecha}T12:00:00Z`),
  );
}

/* La primera fecha que obliga de verdad y todavía no ha pasado.

   POR QUÉ LA REFERENCIA ES COMPROBADO Y NO new Date(). La portada es
   una página estática: el HTML se genera al desplegar y el navegador
   lo vuelve a calcular al hidratar. Con `new Date()` por defecto, el día
   que un plazo se pasa el servidor sigue diciendo una cosa y el
   navegador dice otra, y React avisa de que no coinciden. Con una
   fecha fija no puede pasar.

   Y además es más honesto: lo que se enseña es la situación en la
   fecha en que una persona leyó el BOE, que es lo que la página dice
   un poco más abajo. */
export function proximoHito(o: Obligacion, hoy = new Date(`${COMPROBADO}T12:00:00Z`)): Hito | undefined {
  return o.hitos
    .filter((h) => h.estado === "en-vigor" && h.fecha.length === 10)
    .sort((a, b) => a.fecha.localeCompare(b.fecha))
    .find((h) => new Date(`${h.fecha}T12:00:00Z`) > hoy);
}
