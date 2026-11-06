import type { Metadata } from "next";
import NextLink from "next/link";
import { ContactDock, SiteFooter, SiteNav } from "@/components/site/chrome";
import { PLANES, AYUDA } from "@/content/producto";
import { alternativas, conIdioma, idiomaOBase, type Idioma } from "@/lib/i18n";
import { esquemaFaq, grafoPagina, urlAbsoluta } from "@/lib/esquema";
import { waLink } from "@/lib/whatsapp";
import { marca } from "@/content/marca";

/* ============================================================
   /SERVICIOS — LA PÁGINA DE «QUÉ ES ESTO», NO UN CATÁLOGO

   Antes esto era el catálogo de software a medida, con su reja de
   servicios y sus ocho sectores. Lo midió Search Console: 1 clic en
   90 días, y de una búsqueda de marca.

   AHORA TIENE OTRO TRABAJO, QUE SALE DEL EMBUDO REAL. La gente no
   nos va a descubrir en Google: nos va a ver en un vídeo de
   Instagram y DESPUÉS va a buscar «qué es un agente de IA», «cómo
   funciona» o «cuánto cuesta» para decidir si se fía. Esta página
   es la que tiene que estar ahí: explicación completa, precios a la
   vista y sin humo. Es SEO de reputación, no de captación.

   POR ESO EL TÍTULO ES GENÉRICO Y NO LOCAL. «Agente de IA para
   empresas» es lo que la gente escribe; «Mallorca» lo escriben cero
   personas al mes, según el barrido de 75 términos de noviembre.
   ============================================================ */

const TITULO = {
  es: "Agentes de IA para empresas: qué son, qué hacen y cuánto cuestan",
  en: "AI agents for small businesses: what they are, what they do and what they cost",
  de: "KI-Agenten für Unternehmen: was sie sind, was sie können und was sie kosten",
};
const DESCRIPCION = {
  es: "Explicado sin humo: qué hace un agente de IA en el WhatsApp de una pyme, qué no hace, qué hace falta para montarlo y los precios reales, desde 39 €/mes.",
  en: "No hype: what an AI agent does on a small company's WhatsApp, what it does not do, what it takes to set up and the real prices, from EUR 39/month.",
  de: "Ohne Marketing-Nebel: was ein KI-Agent im WhatsApp eines KMU leistet, was nicht, was die Einrichtung braucht und was es wirklich kostet.",
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = idiomaOBase((await params).lang);
  return {
    title: TITULO[lang],
    description: DESCRIPCION[lang],
    alternates: alternativas(lang, "/servicios"),
  };
}

const QUE_SI: [string, string][] = [
  ["Contestar a cualquier hora", "Un mensaje a las 23:40 recibe respuesta a las 23:40, no a las 9:00 del día siguiente."],
  ["Resolver lo repetido", "Precio, horario, zona, qué servicios dais, si hay hueco. Es el 70 u 80 % de lo que entra por WhatsApp en un negocio de servicios."],
  ["Recoger y ordenar", "Nombre, teléfono, qué necesita y con qué urgencia, siempre en el mismo formato. Deja de haber datos en seis conversaciones distintas."],
  ["Apuntar la cita", "Mira tu calendario, propone huecos reales y reserva. Sin la ida y vuelta de «¿te va bien el martes?»."],
  ["Insistir sin ser pesado", "Al que se queda a medias le escribe a los 1, 3 y 7 días. Esto es lo que casi nadie hace a mano, y es donde está el dinero."],
  ["Saber cuándo apartarse", "Si la conversación se complica o el cliente pide una persona, te avisa y para."],
];

const QUE_NO: [string, string][] = [
  ["No lleva tu contabilidad", "Guarda los tickets ordenados para tu gestor. Contabilizar es otra cosa y tiene responsabilidad fiscal: eso lo sigue haciendo él."],
  ["No se inventa respuestas", "Si no sabe algo, dice que lo consulta y te pasa la pregunta. Preferimos un «te confirmo en un momento» a un precio inventado."],
  ["No sustituye a nadie", "Hace lo repetido para que las personas hagan lo que requiere criterio. Un negocio que ya contesta rápido gana mucho menos con esto."],
  ["No es magia instantánea", "Hay que contarle cómo funciona tu negocio. En el plan de 39 € lo haces tú con una ficha; en los otros dos lo hacemos nosotros."],
];

const PASOS = [
  { n: "01", t: "Nos cuentas el negocio", p: "Qué vendes, a qué precio, en qué zona, qué preguntan más y qué no quieres que conteste nunca. Media hora, por WhatsApp o por videollamada." },
  { n: "02", t: "Lo montamos", p: "Conectamos tu WhatsApp, cargamos tu información, enlazamos el calendario y escribimos el tono. Entre tres y siete días según el plan." },
  { n: "03", t: "Lo pruebas 14 días", p: "Funciona de verdad, con clientes de verdad. Si no te convence, se apaga y no pagas la cuota." },
  { n: "04", t: "Lo vamos afinando", p: "Cada semana revisas lo que ha contestado. Lo que corriges, se queda aprendido. A partir del segundo mes casi no hay que tocarlo." },
];

const PREGUNTAS: [string, string][] = [
  [
    "¿Qué es exactamente un agente de IA?",
    "Un programa que entiende lo que le escriben y actúa en consecuencia: busca en la información de tu negocio, consulta tu calendario, reserva una cita y te avisa. La diferencia con un chatbot de toda la vida es que no sigue un guion de opciones: entiende la frase y decide qué hacer con ella.",
  ],
  [
    "¿Me sale rentable?",
    "Depende de cuánto valga para ti un cliente. Si un trabajo medio te deja 300 € y el agente te recupera uno al mes que antes se perdía, el plan de 169 € ya se ha pagado dos veces. Si tu ticket medio son 20 € y recibes tres mensajes a la semana, probablemente no te compense: te lo diremos nosotros antes de venderte nada.",
  ],
  [
    "¿Cuánto tarda en estar funcionando?",
    "El plan de 39 € lo tienes el mismo día, porque se configura solo. Los otros dos, entre tres y siete días desde que nos pasas la información del negocio.",
  ],
  [
    "¿Hace falta cambiar de programa de gestión?",
    "No. Se conecta a lo que ya usas. Si no usas nada, funciona igual: lo que recoge queda ordenado en un sitio y te llega a ti.",
  ],
  [
    "¿Esto cumple el reglamento europeo de IA?",
    "La obligación que afecta a un asistente como este es la de transparencia: quien habla con él tiene que saber que es una máquina. Por eso se identifica en la primera respuesta y no se puede quitar. Los datos se tratan bajo contrato de encargado del tratamiento y se quedan en la Unión Europea.",
  ],
  [
    "¿También hacéis automatizaciones e integraciones a medida?",
    "Sí, pero no es lo que vendemos de catálogo. Si tienes un proceso concreto que quieres automatizar, cuéntalo y te decimos si tiene sentido y qué costaría. Lo construimos sobre herramientas de código abierto, que además es lo que pide la ayuda del Govern.",
  ],
];

export default async function Servicios({ params }: { params: Promise<{ lang: string }> }) {
  const lang: Idioma = idiomaOBase((await params).lang);
  const L = (href: string) => conIdioma(lang, href);

  return (
    <div data-theme="dark" className="portada bg-bg text-fg">
      <SiteNav dark />

      <section className="relative px-5 pt-28 pb-12 sm:px-8 lg:pt-32">
        <div className="mx-auto max-w-[900px]">
          <span className="text-[13px] font-medium tracking-wide text-brand uppercase">Qué hacemos</span>
          <h1 className="portada-h1 mt-4 font-impacto text-[clamp(40px,6.6vw,92px)] leading-[0.94] font-normal tracking-[-0.01em] uppercase">
            Un agente de IA,
            <em>explicado sin humo.</em>
          </h1>
          <p className="mt-6 max-w-[64ch] text-[17px] leading-[1.6] text-fg-2 sm:text-[19px]">
            Si has llegado aquí desde un vídeo y quieres saber qué es esto antes de hablar con nadie, esta es
            la página. Lo que hace, lo que no hace, lo que hay que poner de tu parte y lo que cuesta.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <NextLink
              href={L("/#precios")}
              className="inline-flex h-12 items-center rounded-xl bg-carmesi px-6 text-[15px] font-semibold text-crema transition-colors hover:bg-carmesi-oscuro"
            >
              Ver los precios
            </NextLink>
            <NextLink
              href={L("/ayudas")}
              className="inline-flex h-12 items-center rounded-xl border border-line-strong px-6 text-[15px] font-semibold transition-colors hover:bg-surface-2"
            >
              Hasta {AYUDA.importeMaximo.toLocaleString("es-ES")} € del Govern
            </NextLink>
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-8 lg:pb-20">
        <div className="mx-auto max-w-[900px]">
          <h2 className="font-display text-[clamp(28px,4.2vw,42px)] leading-[1.1] font-semibold tracking-tight">
            Lo que <em className="text-brand not-italic">sí hace.</em>
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {QUE_SI.map(([t, p]) => (
              <li key={t} className="rounded-2xl border border-line bg-surface px-5 py-5">
                <h3 className="font-display text-[19px] font-semibold">{t}</h3>
                <p className="mt-2 text-[15px] leading-[1.55] text-fg-2">{p}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-8 lg:pb-20">
        <div className="mx-auto max-w-[900px]">
          <h2 className="font-display text-[clamp(28px,4.2vw,42px)] leading-[1.1] font-semibold tracking-tight">
            Lo que <em className="text-brand not-italic">no hace.</em>
          </h2>
          <p className="mt-4 max-w-[62ch] text-[16.5px] leading-[1.6] text-fg-2">
            Esta parte nos la preguntan poco y es la que más problemas evita.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {QUE_NO.map(([t, p]) => (
              <li key={t} className="rounded-2xl border border-line bg-surface px-5 py-5">
                <h3 className="font-display text-[19px] font-semibold">{t}</h3>
                <p className="mt-2 text-[15px] leading-[1.55] text-fg-2">{p}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-8 lg:pb-20">
        <div className="mx-auto max-w-[900px]">
          <h2 className="font-display text-[clamp(28px,4.2vw,42px)] leading-[1.1] font-semibold tracking-tight">
            Cómo se monta, <em className="text-brand not-italic">paso a paso.</em>
          </h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2">
            {PASOS.map((p) => (
              <li key={p.n} className="rounded-2xl border border-line bg-surface px-6 py-6">
                <span aria-hidden="true" className="font-impacto text-[36px] leading-none text-brand/50">{p.n}</span>
                <h3 className="mt-3 font-display text-[20px] font-semibold">{p.t}</h3>
                <p className="mt-2 text-[15px] leading-[1.55] text-fg-2">{p.p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-8 lg:pb-20">
        <div className="mx-auto max-w-[900px]">
          <h2 className="font-display text-[clamp(28px,4.2vw,42px)] leading-[1.1] font-semibold tracking-tight">
            Lo que cuesta, <em className="text-brand not-italic">sin pedir presupuesto.</em>
          </h2>
          <p className="mt-4 max-w-[62ch] text-[16.5px] leading-[1.6] text-fg-2">
            Está publicado a propósito. Una web de agencia que esconde el precio detrás de un formulario te
            está diciendo que el precio depende de la cara que pongas.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {PLANES.map((plan) => (
              <li key={plan.id} className="cristal rounded-2xl px-6 py-6">
                <h3 className="font-display text-[20px] font-semibold">{plan.nombre}</h3>
                <p className="mt-3 flex items-baseline gap-1.5">
                  <b className="font-display text-[38px] leading-none font-semibold">{plan.precio} €</b>
                  <span className="text-[13px] text-fg-3">/mes + IVA</span>
                </p>
                <p className="mt-2 text-[13.5px] text-fg-3">
                  {plan.alta === 0 ? "Sin alta" : `Alta de ${plan.alta} €`} ·{" "}
                  {plan.conversaciones.toLocaleString("es-ES")} conversaciones
                </p>
                <p className="mt-3 text-[14.5px] leading-[1.5] text-fg-2">{plan.para}</p>
              </li>
            ))}
          </ul>
          <NextLink href={L("/#precios")} className="mt-6 inline-block text-[15px] font-medium text-brand underline underline-offset-4">
            Ver qué incluye cada uno
          </NextLink>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-8 lg:pb-20">
        <div className="mx-auto max-w-[840px]">
          <h2 className="font-display text-[clamp(28px,4.2vw,42px)] leading-[1.1] font-semibold tracking-tight">
            Preguntas <em className="text-brand not-italic">de alguien que acaba de ver un anuncio.</em>
          </h2>
          <dl className="mt-8 divide-y divide-line border-y border-line">
            {PREGUNTAS.map(([p, r]) => (
              <div key={p} className="py-5">
                <dt className="font-display text-[19px] font-semibold">{p}</dt>
                <dd className="mt-2 text-[15.5px] leading-[1.6] text-fg-2">{r}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8">
        <div className="cristal mx-auto max-w-[900px] rounded-3xl px-7 py-12 text-center sm:px-12">
          <h2 className="mx-auto max-w-[20ch] font-impacto text-[clamp(28px,4.6vw,52px)] leading-[0.98] font-normal tracking-tight uppercase">
            ¿Te encaja o no te encaja?
          </h2>
          <p className="mx-auto mt-5 max-w-[56ch] text-[17px] leading-[1.6] text-fg-2">
            Cuéntanos tu negocio por WhatsApp y te decimos si esto te sirve. Si vemos que no, te lo decimos:
            nos interesa menos vender una cuota que quitárnosla dos meses después.
          </p>
          <a
            href={waLink("GENERAL", undefined, lang)}
            target="_blank"
            rel="noreferrer"
            className="vibrar mt-8 inline-flex h-12 items-center rounded-xl bg-carmesi px-7 text-[15px] font-semibold text-crema transition-colors hover:bg-carmesi-oscuro"
          >
            Escribir por WhatsApp
          </a>
          <p className="mt-6 text-[13.5px] text-fg-3">{marca.whatsappVisible}</p>
        </div>
      </section>

      <SiteFooter />
      <ContactDock />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            grafoPagina([
              esquemaFaq(
                PREGUNTAS.map(([p, r]) => ({ p, r })),
                urlAbsoluta(lang, "/servicios") + "#faq",
                lang,
              ),
            ]),
          ),
        }}
      />
    </div>
  );
}
