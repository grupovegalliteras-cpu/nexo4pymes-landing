import Link from "@/components/i18n/Enlace";
import { ContactDock, SiteFooter, SiteNav } from "@/components/site/chrome";
import { COMPROBADO, HITOS, hayAplazamientoAnunciado } from "@/content/verifactu-estado";
import { FAQ_VERIFACTU, FUENTES_VERIFACTU, SANCIONES, SECCIONES } from "@/content/verifactu";
import { LOCALE, type Idioma } from "@/lib/i18n";
import { waLink } from "@/lib/whatsapp";

/* ============================================================
   /verifactu — LA PÁGINA PROFUNDA DE UNA SOLA NORMA

   El porqué está entero en content/verifactu.ts. Aquí solo el orden,
   que no es casual: lo primero que se ve es la respuesta a la pregunta
   que la gente está tecleando hoy —si está aplazado—, no una
   definición de qué es VeriFactu. Quien busca la definición la tiene
   justo debajo; quien busca la fecha se iría si tuviera que bajar.

   NINGUNA FECHA ESCRITA A MANO EN ESTE ARCHIVO. Todas salen de
   content/verifactu-estado.ts. Si alguna vez hay que cambiar un plazo
   aquí, es que algo se montó mal.
   ============================================================ */

const TX = {
  es: {
    kicker: "VeriFactu",
    h1: "VeriFactu: desde cuándo obliga y qué está aplazado de verdad",
    lead: "Hacienda ha movido este calendario tres veces. Esto es lo que está publicado en el BOE a día de hoy, separado de lo que solo está anunciado, y con el enlace a la norma para que no tengáis que fiaros de nosotros.",
    estadoH: "A día de hoy",
    enVigor: "En vigor",
    anunciado: "Anunciado, sin publicar",
    avisoAplazamiento:
      "Hay un aplazamiento anunciado que todavía no está publicado. Hasta que salga en el BOE, las fechas que obligan son las marcadas «En vigor».",
    calendarioH: "El calendario, fecha por fecha",
    sancionesH: "Las multas, con el artículo delante",
    sancionesLead:
      "Medio sector escribe «multa de 50.000 € por no tener VeriFactu». El artículo 201 bis de la Ley General Tributaria no dice eso: sanciona tener un sistema que debiendo estar certificado no lo está, o uno certificado que se ha alterado. Estas son las tres cifras y a qué se aplica cada una.",
    fuentesH: "Fuentes",
    faqH: "Lo que nos preguntan",
    comprobado: (f: string) =>
      `Texto consolidado del RD 1007/2023, artículo 201 bis de la Ley General Tributaria y sede de la AEAT, leídos el ${f}. Si veis una fecha distinta en otra web, comprobadla en el enlace al BOE antes de creerla, venga de donde venga.`,
    verHub: "Las otras dos obligaciones: factura electrónica y registro de jornada",
    verModulo: "Cómo lo resolvemos nosotros",
    ctaH: "¿Queréis saber si vuestro programa cumple?",
    ctaP: "Contadnos con qué facturáis. Os decimos si os sirve lo que ya tenéis, qué tendríais que preguntarle a vuestro proveedor y qué pasa si no contesta. Si con una actualización vais servidos, también os lo decimos.",
    ctaBoton: "Escribidnos por WhatsApp",
  },
  en: {
    kicker: "VeriFactu",
    h1: "VeriFactu: when it binds you, and what is really postponed",
    lead: "The Spanish Treasury has moved this timetable three times. This is what is published in the official gazette today, kept apart from what has only been announced, with a link to each rule so you do not have to take our word for it.",
    estadoH: "As things stand today",
    enVigor: "In force",
    anunciado: "Announced, unpublished",
    avisoAplazamiento:
      "A postponement has been announced but not yet published. Until it reaches the official gazette, the binding dates are the ones marked «In force».",
    calendarioH: "The timetable, date by date",
    sancionesH: "The penalties, with the article in front",
    sancionesLead:
      "Half the sector writes «€50,000 fine for not having VeriFactu». Article 201 bis of the General Tax Act does not say that: it penalises holding a system that should be certified and is not, or a certified one that has been tampered with. These are the three figures and what each applies to.",
    fuentesH: "Sources",
    faqH: "What people ask us",
    comprobado: (f: string) =>
      `Consolidated text of RD 1007/2023, article 201 bis of the General Tax Act and the AEAT site, all read on ${f}. If another site shows a different date, check it against the gazette link before believing it, whoever it comes from.`,
    verHub: "The other two duties: e-invoicing and working-time records",
    verModulo: "How we solve it",
    ctaH: "Want to know whether your software complies?",
    ctaP: "Tell us what you invoice with. We will tell you whether what you already have is enough, what to ask your provider, and what it means if they do not answer. If an update is all you need, we will say so.",
    ctaBoton: "Message us on WhatsApp",
  },
  de: {
    kicker: "VeriFactu",
    h1: "VeriFactu: ab wann es gilt und was wirklich verschoben ist",
    lead: "Das spanische Finanzministerium hat diesen Zeitplan dreimal verschoben. Das hier steht heute im Gesetzblatt — getrennt von dem, was nur angekündigt ist, mit Link zur jeweiligen Vorschrift, damit Sie uns nicht glauben müssen.",
    estadoH: "Stand heute",
    enVigor: "In Kraft",
    anunciado: "Angekündigt, unveröffentlicht",
    avisoAplazamiento:
      "Eine Verschiebung ist angekündigt, aber noch nicht veröffentlicht. Bis sie im Gesetzblatt steht, gelten die mit «In Kraft» markierten Fristen.",
    calendarioH: "Der Zeitplan, Frist für Frist",
    sancionesH: "Die Bußgelder, mit dem Artikel davor",
    sancionesLead:
      "Das halbe Gewerbe schreibt «50.000 € Strafe, wenn Sie kein VeriFactu haben». Artikel 201 bis des Allgemeinen Steuergesetzes sagt das nicht: er ahndet den Betrieb eines Systems, das zertifiziert sein müsste und es nicht ist, oder eines manipulierten zertifizierten Systems. Das sind die drei Beträge und worauf sie sich beziehen.",
    fuentesH: "Quellen",
    faqH: "Was man uns fragt",
    comprobado: (f: string) =>
      `Konsolidierter Text des RD 1007/2023, Artikel 201 bis des Allgemeinen Steuergesetzes und die AEAT-Seite, gelesen am ${f}. Zeigt eine andere Seite ein abweichendes Datum, prüfen Sie es über den Link zum Gesetzblatt — ganz gleich, von wem es kommt.`,
    verHub: "Die anderen beiden Pflichten: E-Rechnung und Arbeitszeiterfassung",
    verModulo: "Wie wir es lösen",
    ctaH: "Wollen Sie wissen, ob Ihre Software die Vorgaben erfüllt?",
    ctaP: "Sagen Sie uns, womit Sie fakturieren. Wir sagen Ihnen, ob das Vorhandene reicht, was Sie Ihren Anbieter fragen sollten und was es bedeutet, wenn er nicht antwortet. Genügt ein Update, sagen wir auch das.",
    ctaBoton: "Schreiben Sie uns per WhatsApp",
  },
} as const;

/* "2027-01-01" se lee entero; "2028-10" no tiene día y solo se dice el
   mes. Lo escribe Intl en el idioma de quien lee, no a mano. */
function fecha(iso: string, lang: Idioma) {
  const [a, m, d] = iso.split("-");
  const base = new Date(`${a}-${m}-${d ?? "01"}T12:00:00Z`);
  return new Intl.DateTimeFormat(LOCALE[lang], {
    day: d ? "numeric" : undefined,
    month: "long",
    year: "numeric",
  }).format(base);
}

export function VerifactuPage({ lang }: { lang: Idioma }) {
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

          {/* EL CALENDARIO VA ARRIBA DEL TODO. Es el dato por el que se
              entra; cualquier prosa delante es un peaje. */}
          <section className="mt-10 rounded-2xl border border-line bg-surface p-6 sm:p-7">
            <h2 className="font-mono text-[11px] tracking-[0.14em] text-fg-3 uppercase">{tx.calendarioH}</h2>
            <ul className="mt-4 grid gap-3">
              {HITOS.map((h) => (
                <li
                  key={`${h.fecha}-${h.norma}`}
                  className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-line pt-3"
                >
                  <span
                    className={`rounded-full px-2 py-0.5 text-[12px] font-semibold ${
                      h.estado === "en-vigor" ? "bg-brand-soft text-brand" : "bg-surface-3 text-fg-2"
                    }`}
                  >
                    {h.estado === "en-vigor" ? tx.enVigor : tx.anunciado}
                  </span>
                  <span className="text-[15.5px] font-semibold tabular">{fecha(h.fecha, lang)}</span>
                  <span className="text-[15px] text-fg-2">{h.quien}</span>
                  <span className="text-[13px] text-fg-3">· {h.norma}</span>
                </li>
              ))}
            </ul>
            {hayAplazamientoAnunciado() ? (
              <p className="mt-5 border-l-2 border-brand pl-5 text-[15px] leading-relaxed text-fg">
                {tx.avisoAplazamiento}
              </p>
            ) : null}
          </section>

          <div className="mt-12 grid gap-10">
            {SECCIONES.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="font-display text-[24px] leading-snug font-semibold tracking-[-0.01em]">
                  {s.titulo[lang]}
                </h2>
                {s.parrafos.map((p) => (
                  <p key={p.es} className="mt-3 text-[16px] leading-relaxed text-fg-2">
                    {p[lang]}
                  </p>
                ))}
                {s.destacado ? (
                  <p className="mt-5 border-l-2 border-brand pl-5 text-[16px] leading-relaxed text-fg">
                    {s.destacado[lang]}
                  </p>
                ) : null}
              </section>
            ))}

            <section id="sanciones" className="scroll-mt-24">
              <h2 className="font-display text-[24px] leading-snug font-semibold tracking-[-0.01em]">
                {tx.sancionesH}
              </h2>
              <p className="mt-3 text-[16px] leading-relaxed text-fg-2">{tx.sancionesLead}</p>
              <ul className="mt-5 grid gap-3">
                {SANCIONES.map((s) => (
                  <li key={s.importe} className="border-t border-line pt-3">
                    <span className="text-[17px] font-semibold tabular text-fg">{s.importe}</span>
                    <span className="ml-2 text-[13px] text-fg-3">{s.unidad[lang]}</span>
                    <p className="mt-1 text-[15.5px] leading-relaxed text-fg-2">{s.a[lang]}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <h3 className="mt-12 font-mono text-[11px] tracking-[0.14em] text-fg-3 uppercase">{tx.fuentesH}</h3>
          <ul className="mt-2 grid gap-1">
            {FUENTES_VERIFACTU.map((f) => (
              <li key={f.boe} className="text-[14px] leading-relaxed text-fg-2">
                <a href={f.url} rel="noopener" className="text-brand underline underline-offset-2">
                  {f.nombre}
                </a>{" "}
                <span className="text-fg-3">({f.boe})</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-[14px] leading-relaxed text-fg-3">
            {tx.comprobado(fmt.format(new Date(`${COMPROBADO}T12:00:00Z`)))}
          </p>

          <h2 className="mt-16 font-display text-[26px] font-semibold tracking-[-0.01em]">{tx.faqH}</h2>
          <div className="mt-6 grid gap-7">
            {FAQ_VERIFACTU[lang].map(([p, r]) => (
              <div key={p}>
                {/* Sin acordeón a propósito: la respuesta va en el HTML y
                    a la vista, que es lo que permite que la cite un modelo. */}
                <h3 className="font-display text-[18px] font-semibold text-fg">{p}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-fg-2">{r}</p>
              </div>
            ))}
          </div>

          {/* LOS DOS ENLACES QUE EVITAN QUE ESTA PÁGINA SEA UN CALLEJÓN:
              arriba al hub, al lado a la comercial. */}
          <nav className="mt-14 grid gap-2 border-t border-line pt-6 text-[15px]">
            <Link href="/obligaciones" className="text-brand">
              {tx.verHub} →
            </Link>
            <Link href="/modulos/facturacion-verifactu" className="text-brand">
              {tx.verModulo} →
            </Link>
          </nav>

          <div className="mt-10 rounded-2xl border border-brand/30 bg-brand-soft p-6 sm:p-7">
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
