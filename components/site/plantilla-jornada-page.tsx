import Link from "@/components/i18n/Enlace";
import { ContactDock, SiteFooter, SiteNav } from "@/components/site/chrome";
import { Download } from "lucide-react";
import type { Idioma } from "@/lib/i18n";

/* ============================================================
   /plantillas/registro-de-jornada — EL IMÁN DE ARRIBA DEL TODO

   POR QUÉ UNA PLANTILLA Y NO OTRO ARTÍCULO. En el barrido de demanda,
   «plantilla» aparece pegada a casi todo lo que busca un empresario:
   no busca su dolor, busca una herramienta, un precio, una ley o una
   plantilla. Esta es la plantilla que más se busca de lo nuestro, y
   además es la única que podemos regalar diciendo la verdad: el
   registro en papel o en hoja de cálculo SIGUE SIENDO LEGAL, así que
   regalarla no es un cebo, es la respuesta correcta para quien tiene
   cuatro personas y un taller.

   Y POR ESO FUNCIONA COMERCIALMENTE. La sección de abajo no dice
   «ahora compradnos el fichaje»: dice en qué tres situaciones
   concretas esta hoja deja de servir. Quien no esté en ninguna se
   lleva su plantilla y se va contento, y quien se reconozca en una ya
   sabe por qué nos escribe.

   EL ARCHIVO ES ESTÁTICO y está en public/plantillas/. Lo genera
   scripts/plantilla-jornada.mjs, que se ejecuta a mano y cuyo
   resultado se commitea: el despliegue no depende del script.
   ============================================================ */

const ARCHIVO: Record<Idioma, string> = {
  es: "/plantillas/registro-de-jornada-nexo4pymes-es.xlsx",
  en: "/plantillas/registro-de-jornada-nexo4pymes-en.xlsx",
  de: "/plantillas/registro-de-jornada-nexo4pymes-de.xlsx",
};

const TX = {
  es: {
    kicker: "Plantilla gratis",
    h1: "Plantilla de registro de jornada en Excel",
    lead: "Una hoja con las columnas que pide el artículo 34.9 del Estatuto de los Trabajadores y el total de horas calculado solo. Sin registro, sin correo y sin condiciones: es un archivo.",
    descarga: "Descargar la plantilla (.xlsx)",
    nota: "Se abre con Excel, con LibreOffice y con Google Sheets.",
    queLleva: "Qué lleva dentro",
    columnas: [
      ["Fecha", "Una fila por persona y día. El registro tiene que ser diario."],
      ["Persona trabajadora", "Nombre y apellidos, o el identificador que uséis en nóminas."],
      ["Hora de entrada y hora de salida", "Son las dos únicas que la ley nombra expresamente."],
      ["Pausas (min)", "No las exige la ley, pero sin ellas el total no cuadra con lo que se trabajó."],
      ["Horas del día", "Se calcula solo en cuanto hay entrada y salida. No se toca."],
      ["Observaciones", "Para lo que luego nadie recuerda: una visita a urgencias, un cambio de turno."],
    ],
    legalH: "¿Esto es suficiente para cumplir?",
    legalP: "Sí, si se rellena de verdad todos los días y se guarda cuatro años. La ley obliga a registrar la jornada desde el 12 de mayo de 2019, pero no dice en qué soporte: el papel y la hoja de cálculo siguen siendo válidos. Hay un proyecto de real decreto que obligaría a que el registro sea digital y consultable a distancia, y a 1 de noviembre de 2026 no está publicado en el BOE.",
    legalEnlace: "Las tres obligaciones que sí tienen fecha",
    cuandoH: "Cuándo esta hoja deja de serviros",
    cuandoP: "Lo decimos porque es lo honesto y porque es lo que de verdad decide, no porque vendamos lo otro. Si no estáis en ninguno de estos tres casos, quedaos con la plantilla y no nos escribáis.",
    cuando: [
      ["La gente no está donde está la hoja.", "Si el equipo trabaja en casa del cliente, el registro acaba rellenándose de memoria el viernes. Un registro rellenado de memoria no es fiable, y la fiabilidad sí la exige la ley."],
      ["Alguien tiene que sumar las horas para las nóminas.", "Con cuatro personas se hace en diez minutos. Con quince, es media jornada al mes de alguien que cobra, todos los meses."],
      ["Os piden el registro y hay que buscarlo.", "La Inspección puede pedirlo y no da semanas. Si están en doce archivos y tres ordenadores, el problema ya no es cumplir: es demostrarlo."],
    ],
    ctaH: "¿Vuestro caso es de los de abajo?",
    ctaP: "Contadnos cuánta gente sois y dónde trabajan. Si con la hoja vais servidos, os lo decimos y se acabó la conversación.",
    ctaBoton: "Ver cómo es el fichaje desde el móvil",
  },
  en: {
    kicker: "Free template",
    h1: "Working-time record template for Excel",
    lead: "A sheet with the columns article 34.9 of the Spanish Workers' Statute asks for, and the daily total worked out for you. No sign-up, no email, no conditions: it is a file.",
    descarga: "Download the template (.xlsx)",
    nota: "Opens in Excel, LibreOffice and Google Sheets.",
    queLleva: "What is inside",
    columnas: [
      ["Date", "One row per person per day. The record has to be daily."],
      ["Employee", "Full name, or whatever identifier you use on the payroll."],
      ["Start time and end time", "The only two the law names explicitly."],
      ["Breaks (min)", "Not required by law, but without them the total does not match what was worked."],
      ["Hours worked", "Calculated as soon as start and end are there. Leave it alone."],
      ["Notes", "For what nobody remembers later: a trip to A&E, a swapped shift."],
    ],
    legalH: "Is this enough to comply?",
    legalP: "Yes, if it is genuinely filled in every day and kept for four years. Spanish law has required working-time records since 12 May 2019, but says nothing about the medium: paper and spreadsheets remain valid. A draft royal decree would require records to be digital and remotely accessible, and as of 1 November 2026 it is not published in the official gazette.",
    legalEnlace: "The three duties that do have dates",
    cuandoH: "When this sheet stops being enough",
    cuandoP: "We say this because it is honest and because it is what actually decides, not because we sell the alternative. If none of these three is you, keep the template and do not write to us.",
    cuando: [
      ["The people are not where the sheet is.", "If the team works at the customer's site, the record ends up filled in from memory on Friday. A record filled in from memory is not reliable, and reliability is required."],
      ["Someone has to add the hours up for payroll.", "With four people that takes ten minutes. With fifteen it is half a day a month of someone who draws a salary, every month."],
      ["You are asked for the record and have to go looking.", "The labour inspectorate can ask, and it does not give you weeks. If it lives in twelve files on three computers, the problem is no longer complying: it is proving it."],
    ],
    ctaH: "Is your case one of those?",
    ctaP: "Tell us how many people you are and where they work. If the sheet is enough for you, we will say so and that is the end of the conversation.",
    ctaBoton: "See what clocking in from a phone looks like",
  },
  de: {
    kicker: "Kostenlose Vorlage",
    h1: "Vorlage zur Arbeitszeiterfassung für Excel",
    lead: "Eine Tabelle mit den Spalten, die Artikel 34.9 des spanischen Arbeitnehmerstatuts verlangt, und der Tagessumme, die sich selbst berechnet. Ohne Anmeldung, ohne E-Mail, ohne Bedingungen: es ist eine Datei.",
    descarga: "Vorlage herunterladen (.xlsx)",
    nota: "Öffnet sich in Excel, LibreOffice und Google Sheets.",
    queLleva: "Was darin steckt",
    columnas: [
      ["Datum", "Eine Zeile pro Person und Tag. Die Erfassung muss täglich erfolgen."],
      ["Beschäftigte Person", "Vor- und Nachname oder die Kennung aus Ihrer Lohnabrechnung."],
      ["Beginn und Ende", "Die beiden Einzigen, die das Gesetz ausdrücklich nennt."],
      ["Pausen (Min.)", "Gesetzlich nicht verlangt, aber ohne sie passt die Summe nicht zur geleisteten Zeit."],
      ["Stunden am Tag", "Berechnet sich, sobald Beginn und Ende stehen. Nicht anfassen."],
      ["Anmerkungen", "Für das, woran sich später niemand erinnert: ein Arztbesuch, ein Schichttausch."],
    ],
    legalH: "Reicht das, um die Vorgaben zu erfüllen?",
    legalP: "Ja, wenn sie wirklich täglich ausgefüllt und vier Jahre aufbewahrt wird. In Spanien ist die Arbeitszeiterfassung seit dem 12. Mai 2019 Pflicht, das Gesetz sagt aber nichts über die Form: Papier und Tabelle bleiben zulässig. Ein Entwurf eines Königlichen Dekrets würde eine digitale, aus der Ferne einsehbare Erfassung verlangen, und zum 1. November 2026 ist er nicht im Gesetzblatt veröffentlicht.",
    legalEnlace: "Die drei Pflichten, die sehr wohl Fristen haben",
    cuandoH: "Wann diese Tabelle nicht mehr genügt",
    cuandoP: "Wir sagen das, weil es ehrlich ist und weil es tatsächlich entscheidet, nicht weil wir die Alternative verkaufen. Trifft keiner der drei Punkte auf Sie zu, behalten Sie die Vorlage und schreiben Sie uns nicht.",
    cuando: [
      ["Die Leute sind nicht dort, wo die Tabelle ist.", "Arbeitet das Team beim Kunden, wird die Erfassung freitags aus dem Gedächtnis ausgefüllt. Eine aus dem Gedächtnis ausgefüllte Erfassung ist nicht verlässlich, und Verlässlichkeit ist verlangt."],
      ["Jemand muss die Stunden für die Lohnabrechnung addieren.", "Bei vier Personen sind das zehn Minuten. Bei fünfzehn ein halber Arbeitstag im Monat einer Person, die Gehalt bezieht — jeden Monat."],
      ["Die Erfassung wird verlangt und muss erst gesucht werden.", "Die Arbeitsinspektion kann sie anfordern und lässt keine Wochen Zeit. Liegt sie in zwölf Dateien auf drei Rechnern, ist das Problem nicht mehr das Erfüllen, sondern der Nachweis."],
    ],
    ctaH: "Ist Ihr Fall einer davon?",
    ctaP: "Sagen Sie uns, wie viele Sie sind und wo sie arbeiten. Reicht die Tabelle, sagen wir das, und das Gespräch ist beendet.",
    ctaBoton: "Ansehen, wie Erfassung per Handy aussieht",
  },
} as const;

export function PlantillaJornadaPage({ lang }: { lang: Idioma }) {
  const tx = TX[lang];
  return (
    <div className="bg-bg text-fg">
      <SiteNav />
      <main id="contenido" className="px-5 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-20">
        <div className="mx-auto max-w-[720px]">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] font-medium tracking-[0.16em] text-brand uppercase">
            <span aria-hidden="true" className="h-px w-6 bg-brand/50" />
            {tx.kicker}
          </span>
          <h1 className="mt-4 text-[clamp(1.9rem,5vw,2.6rem)] leading-tight text-fg">{tx.h1}</h1>
          <p className="mt-5 text-[17px] leading-relaxed text-fg-2">{tx.lead}</p>

          {/* El botón va arriba y no al final: quien llega buscando una
              plantilla ha venido a por el archivo, y esconderlo detrás
              de mil palabras es lo que hace que la gente se vaya. Lo que
              hay debajo es para quien se quede. */}
          <a
            href={ARCHIVO[lang]}
            download
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 text-[15px] font-semibold text-bg"
          >
            <Download className="size-[18px]" aria-hidden="true" />
            {tx.descarga}
          </a>
          <p className="mt-3 text-[14px] text-fg-3">{tx.nota}</p>

          <h2 className="mt-14 font-display text-[24px] font-semibold tracking-[-0.01em]">{tx.queLleva}</h2>
          <dl className="mt-5 grid gap-4">
            {tx.columnas.map(([col, texto]) => (
              <div key={col} className="border-t border-line pt-4">
                <dt className="font-display text-[16px] font-semibold text-fg">{col}</dt>
                <dd className="mt-1 text-[15.5px] leading-relaxed text-fg-2">{texto}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-14 font-display text-[24px] font-semibold tracking-[-0.01em]">{tx.legalH}</h2>
          <p className="mt-4 text-[16.5px] leading-relaxed text-fg-2">{tx.legalP}</p>
          <p className="mt-4 text-[15.5px]">
            <Link href="/obligaciones" className="text-brand">
              {tx.legalEnlace} →
            </Link>
          </p>

          <h2 className="mt-14 font-display text-[24px] font-semibold tracking-[-0.01em]">{tx.cuandoH}</h2>
          <p className="mt-4 text-[16.5px] leading-relaxed text-fg-2">{tx.cuandoP}</p>
          <ul className="mt-6 grid gap-4">
            {tx.cuando.map(([fuerte, texto]) => (
              <li key={fuerte} className="rounded-xl border border-line bg-surface-2 px-5 py-4">
                <strong className="font-semibold text-fg">{fuerte}</strong>{" "}
                <span className="text-[15.5px] leading-relaxed text-fg-2">{texto}</span>
              </li>
            ))}
          </ul>

          <div className="mt-14 rounded-2xl border border-brand/30 bg-brand-soft p-6 sm:p-7">
            <h2 className="font-display text-[22px] leading-snug font-semibold">{tx.ctaH}</h2>
            <p className="mt-3 text-[16px] leading-relaxed text-fg-2">{tx.ctaP}</p>
            <p className="mt-5">
              <Link href="/modulos/control-horario" className="text-[15px] font-semibold text-brand">
                {tx.ctaBoton} →
              </Link>
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
      <ContactDock />
    </div>
  );
}

export { ARCHIVO as ARCHIVO_PLANTILLA, TX as TEXTOS_PLANTILLA };
