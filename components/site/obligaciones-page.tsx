import Link from "@/components/i18n/Enlace";
import { ContactDock, SiteFooter, SiteNav } from "@/components/site/chrome";
import { COMPROBADO, OBLIGACIONES, fechaHito, type EstadoNorma, type Hito } from "@/content/obligaciones";
import { FAQ_OBLIGACIONES } from "@/content/obligaciones-faq";
import { LOCALE, type Idioma } from "@/lib/i18n";
import { waLink } from "@/lib/whatsapp";

/* ============================================================
   /obligaciones — QUÉ OBLIGA A UNA EMPRESA ESPAÑOLA, Y CUÁNDO

   POR QUÉ ESTA PÁGINA EXISTE. De todo lo que se busca en nuestro
   nicho, esto es lo único que cumple las cuatro condiciones a la vez:
   lo busca mucha gente, lo busca en España, el que lo busca tiene una
   fecha encima y paga por resolverlo, y se gana siendo exacto en vez
   de siendo barato. Automatizar o montar una web se aprende en
   YouTube; cumplir con el BOE español, no.

   LO QUE LA DIFERENCIA DE LAS MIL PÁGINAS QUE HAY SOBRE ESTO. Dos
   cosas, y las dos son renuncias:

   Una, separa lo que está EN VIGOR de lo ANUNCIADO y de lo que está
   EN TRÁMITE, y lo dice en cada fila. La mayoría de las páginas del
   sector mezclan los tres estados porque un plazo inminente vende
   mejor que un plazo lejano.

   Dos, dice cuándo NO hace falta comprar nada: que el fichaje en papel
   sigue siendo legal, y que VeriFactu no obliga a cambiar de programa
   sino a que el programa cumpla. Eso lo calla todo el que vende una
   app de fichaje o un software de facturación. Decirlo es lo que hace
   que esta página se cite y se enlace.

   NO ES UNA PÁGINA DE PRODUCTO. Vende por ser útil. El enlace a lo
   nuestro va al final de cada bloque y una vez, no en cada párrafo.

   LAS FECHAS NO SE ESCRIBEN AQUÍ: salen de content/obligaciones.ts,
   que es también de donde sale la fecha de comprobación. Si alguna vez
   hay que tocar un plazo en este archivo, es que algo se montó mal.
   ============================================================ */

const TX = {
  es: {
    kicker: "Obligaciones legales",
    h1: "Qué obliga de verdad a una empresa española, y a partir de cuándo",
    lead: "Tres normas distintas, tres calendarios distintos y mucha gente vendiéndoos la urgencia equivocada. Esto es lo que está publicado en el BOE a día de hoy, separado de lo que solo está anunciado.",
    enVigor: "En vigor",
    anunciado: "Anunciado, sin publicar",
    enTramite: "En trámite, no obliga",
    sinFecha: "Sin fecha",
    queObliga: "Qué obliga",
    nadieCuenta: "Lo que no suele contarse",
    calendario: "Fechas",
    fuentes: "Fuentes",
    nuestra: "Lo que hacemos nosotros sobre esto",
    comprobado: (f: string) => `Textos consolidados del BOE leídos el ${f}. Si veis una fecha distinta en otra web, comprobadla en el enlace al BOE antes de creerla, venga de donde venga.`,
    faqH: "Lo que nos preguntan",
    ctaH: "¿Queréis saber qué os toca a vosotros y qué no?",
    ctaP: "Contadnos con qué facturáis y cómo lleváis las horas. Os decimos qué tenéis que mover antes de 2027, qué puede esperar y qué no hace falta tocar. Si con una actualización de vuestro proveedor vais servidos, también os lo decimos.",
    ctaBoton: "Escribidnos por WhatsApp",
  },
  en: {
    kicker: "Legal obligations",
    h1: "What actually binds a Spanish business, and from when",
    lead: "Three separate rules, three separate timetables, and plenty of people selling you the wrong urgency. This is what is published in the Spanish official gazette today, kept apart from what has only been announced.",
    enVigor: "In force",
    anunciado: "Announced, unpublished",
    enTramite: "In process, not binding",
    sinFecha: "No date",
    queObliga: "What it requires",
    nadieCuenta: "What usually goes unsaid",
    calendario: "Dates",
    fuentes: "Sources",
    nuestra: "What we do about this",
    comprobado: (f: string) => `Consolidated texts read in the Spanish official gazette on ${f}. If another site shows a different date, check it against the gazette link before believing it, whoever it comes from.`,
    faqH: "What people ask us",
    ctaH: "Want to know which of these applies to you, and which does not?",
    ctaP: "Tell us what you invoice with and how you track hours. We will tell you what has to move before 2027, what can wait and what needs no change at all. If an update from your current provider is enough, we will say so.",
    ctaBoton: "Message us on WhatsApp",
  },
  de: {
    kicker: "Gesetzliche Pflichten",
    h1: "Was einen spanischen Betrieb wirklich bindet, und ab wann",
    lead: "Drei verschiedene Vorschriften, drei verschiedene Zeitpläne und viele, die Ihnen die falsche Dringlichkeit verkaufen. Das hier steht heute im spanischen Gesetzblatt — getrennt von dem, was nur angekündigt ist.",
    enVigor: "In Kraft",
    anunciado: "Angekündigt, unveröffentlicht",
    enTramite: "Im Verfahren, nicht bindend",
    sinFecha: "Ohne Datum",
    queObliga: "Was verlangt wird",
    nadieCuenta: "Was meist verschwiegen wird",
    calendario: "Fristen",
    fuentes: "Quellen",
    nuestra: "Was wir dazu machen",
    comprobado: (f: string) => `Konsolidierte Texte am ${f} im spanischen Gesetzblatt gelesen. Zeigt eine andere Seite ein abweichendes Datum, prüfen Sie es über den Link zum Gesetzblatt — ganz gleich, von wem es kommt.`,
    faqH: "Was man uns fragt",
    ctaH: "Wollen Sie wissen, was für Sie gilt und was nicht?",
    ctaP: "Sagen Sie uns, womit Sie fakturieren und wie Sie Stunden erfassen. Wir sagen Ihnen, was vor 2027 bewegt werden muss, was warten kann und was gar nicht angefasst werden muss. Reicht ein Update Ihres Anbieters, sagen wir auch das.",
    ctaBoton: "Schreiben Sie uns per WhatsApp",
  },
} as const;

const ETIQUETA: Record<EstadoNorma, keyof (typeof TX)["es"]> = {
  "en-vigor": "enVigor",
  anunciado: "anunciado",
  "en-tramite": "enTramite",
};

/* El color dice lo mismo que la palabra, nunca en su lugar: quien no
   distingue colores lee igual «En vigor» que «En trámite». */
const TONO: Record<EstadoNorma, string> = {
  "en-vigor": "bg-brand-soft text-brand",
  anunciado: "bg-surface-3 text-fg-2",
  "en-tramite": "bg-surface-3 text-fg-2",
};

function Fila({ h, lang }: { h: Hito; lang: Idioma }) {
  const tx = TX[lang];
  const fecha = fechaHito(h, lang);
  return (
    <li className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-line pt-3">
      <span className={`rounded-full px-2 py-0.5 text-[12px] font-semibold ${TONO[h.estado]}`}>
        {tx[ETIQUETA[h.estado]] as string}
      </span>
      <span className="text-[15.5px] font-semibold tabular">{fecha ?? tx.sinFecha}</span>
      <span className="text-[15px] text-fg-2">{h.quien[lang]}</span>
      <span className="text-[13px] text-fg-3">· {h.norma}</span>
    </li>
  );
}

export function ObligacionesPage({ lang }: { lang: Idioma }) {
  const tx = TX[lang];
  const fmt = new Intl.DateTimeFormat(LOCALE[lang], { day: "numeric", month: "long", year: "numeric" });
  return (
    <div className="bg-bg text-fg">
      <SiteNav />
      <main id="contenido" className="px-5 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-20">
        <div className="mx-auto max-w-[760px]">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] font-medium tracking-[0.16em] text-brand uppercase">
            <span aria-hidden="true" className="h-px w-6 bg-brand/50" />
            {tx.kicker}
          </span>
          <h1 className="mt-4 text-[clamp(1.9rem,5vw,2.7rem)] leading-tight text-fg">{tx.h1}</h1>
          <p className="mt-5 text-[17px] leading-relaxed text-fg-2">{tx.lead}</p>

          <div className="mt-12 grid gap-10">
            {OBLIGACIONES.map((o) => (
              <section key={o.id} id={o.id} className="scroll-mt-24 rounded-2xl border border-line bg-surface p-6 sm:p-7">
                <h2 className="font-display text-[24px] leading-snug font-semibold tracking-[-0.01em]">
                  {o.nombre[lang]}
                </h2>
                <p className="mt-3 text-[16px] leading-relaxed text-fg-2">{o.queObliga[lang]}</p>

                <h3 className="mt-7 font-mono text-[11px] tracking-[0.14em] text-fg-3 uppercase">{tx.calendario}</h3>
                <ul className="mt-3 grid gap-3">
                  {o.hitos.map((h) => (
                    <Fila key={`${o.id}-${h.fecha}-${h.norma}`} h={h} lang={lang} />
                  ))}
                </ul>

                {/* La frase por la que esta página se enlaza. Va destacada
                    porque es lo que alguien copia y pega a un compañero. */}
                <div className="mt-7 border-l-2 border-brand pl-5">
                  <h3 className="font-mono text-[11px] tracking-[0.14em] text-fg-3 uppercase">{tx.nadieCuenta}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-fg">{o.loQueNadieCuenta[lang]}</p>
                </div>

                <h3 className="mt-7 font-mono text-[11px] tracking-[0.14em] text-fg-3 uppercase">{tx.fuentes}</h3>
                <ul className="mt-2 grid gap-1">
                  {o.fuentes.map((f) => (
                    <li key={f.boe} className="text-[14px] leading-relaxed text-fg-2">
                      <a href={f.url} rel="noopener" className="text-brand underline underline-offset-2">
                        {f.nombre}
                      </a>{" "}
                      <span className="text-fg-3">({f.boe})</span>
                    </li>
                  ))}
                </ul>

                {o.ruta ? (
                  <p className="mt-6 text-[15px]">
                    <Link href={o.ruta} className="text-brand">
                      {tx.nuestra} →
                    </Link>
                  </p>
                ) : null}
              </section>
            ))}
          </div>

          <p className="mt-8 text-[14px] leading-relaxed text-fg-3">
            {tx.comprobado(fmt.format(new Date(`${COMPROBADO}T12:00:00Z`)))}
          </p>

          <h2 className="mt-16 font-display text-[26px] font-semibold tracking-[-0.01em]">{tx.faqH}</h2>
          <div className="mt-6 grid gap-7">
            {FAQ_OBLIGACIONES[lang].map(([p, r]) => (
              <div key={p}>
                {/* Sin acordeón a propósito: la respuesta va en el HTML y
                    a la vista. Ver el arreglo de components/ui/Acordeon. */}
                <h3 className="font-display text-[18px] font-semibold text-fg">{p}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-fg-2">{r}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-brand/30 bg-brand-soft p-6 sm:p-7">
            <h2 className="font-display text-[22px] leading-snug font-semibold">{tx.ctaH}</h2>
            <p className="mt-3 text-[16px] leading-relaxed text-fg-2">{tx.ctaP}</p>
            <a
              href={waLink("GENERAL", undefined, lang)}
              rel="noopener"
              className="mt-5 inline-flex h-11 items-center rounded-full bg-brand px-5 text-[14px] font-semibold text-bg"
            >
              {tx.ctaBoton}
            </a>
          </div>
        </div>
      </main>
      <SiteFooter />
      <ContactDock />
    </div>
  );
}
