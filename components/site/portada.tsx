import NextLink from "next/link";
import { ContactDock, SiteFooter, SiteNav } from "@/components/site/chrome";
import { ChatDemo, type Mensaje } from "@/components/site/chat-demo";
import { PLANES, AYUDA, REACTIVACION, entraEnLaAyuda } from "@/content/producto";
import { conIdioma, type Idioma } from "@/lib/i18n";
import { waLink } from "@/lib/whatsapp";
import { marca } from "@/content/marca";

/** 6000 → «6.000». toLocaleString("es-ES") deja sin punto los números de cuatro cifras. */
const miles = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/* ============================================================
   LA PORTADA

   Sustituye a <Landing/>, que vendía un catálogo: cinco módulos,
   ocho sectores y un estudio de software a medida. Search Console
   dijo lo que dio ese catálogo en 90 días: 0 clics comerciales en
   104 páginas.

   6 DE NOVIEMBRE DE 2026 — SE RECORTA A LA MITAD.
   La primera versión tenía nueve secciones y unas 1.800 palabras:
   el dolor, nueve funciones, cuatro sectores con su caso de
   ejemplo y seis preguntas. Demasiado para lo que es esta página.

   Quien llega aquí viene de un vídeo de Instagram y decide en
   treinta segundos si esto le sirve. Lo que decide eso es ver la
   cosa funcionando y ver el precio, no leer.

   Ahora: hero con la conversación escribiéndose sola, la ayuda,
   tres pasos, cuatro funciones, los precios y tres preguntas. El
   detalle entero se fue a /servicios, que es la página de quien SÍ
   quiere leer antes de escribir.

   Y MIRÉ LO QUE HACE LA COMPETENCIA ANTES DE DECIDIRLO. Las webs
   de agencias de IA de Mallorca y de España que revisé no tienen
   ni vídeo, ni demo, ni capturas del producto: ponen etiquetas
   estáticas y piden una llamada. Enseñar la conversación en marcha
   es lo único que tenemos que no tiene ninguna.
   ============================================================ */

type Props = { lang: Idioma };

const SECTORES = [
  "Fontanería", "Electricidad", "Calderas", "Aire acondicionado", "Reformas", "Limpieza",
  "Cerrajería", "Climatización", "Mantenimiento", "Pintura", "Albañilería", "Desatascos",
];

/* El ejemplo es una avería de noche, que es cuando nadie contesta,
   y enseña el protocolo de urgencia, que es lo que nos diferencia. */
const CONVERSACION: Mensaje[] = [
  { de: "cliente", texto: "Buenas, tengo una fuga en el baño. ¿Podéis venir mañana?", hora: "22:41" },
  { de: "nexo", texto: "Buenas noches. Soy el asistente de la empresa. ¿La fuga sigue saliendo ahora mismo?", hora: "22:41" },
  { de: "cliente", texto: "Sí, no para", hora: "22:42" },
  { de: "nexo", texto: "Cierra la llave de paso, suele estar bajo el fregadero o en la entrada. Aviso al técnico de guardia.", hora: "22:42" },
  { de: "cliente", texto: "Ya está cortada. Mejor mañana entonces", hora: "22:44" },
  { de: "nexo", texto: "Perfecto. Mañana a las 9:30 o a las 16:00. ¿Cuál te va mejor?", hora: "22:44" },
];

const PASOS = [
  { n: "01", t: "Te escriben", p: "A cualquier hora. Contesta al momento, con el tono de tu negocio y solo con lo que tú le has contado." },
  { n: "02", t: "Se resuelve solo", p: "Si es urgente, te lo pasa ya. Si no, recoge los datos y apunta la visita en un hueco real de tu agenda." },
  { n: "03", t: "Tú solo vas", p: "Te llega el aviso ordenado: quién, qué, dónde y cuándo. Al que no contesta, lo persigue él." },
];

/* Cuatro, no nueve. Las otras cinco están en /servicios. */
const FUNCIONES = [
  { t: "Sabe qué es una urgencia", p: "Si sale agua, le dice que cierre la llave de paso y avisa al de guardia. Si huele a gas, le manda salir de casa y llamar al 112." },
  { t: "Apunta la visita", p: "Ofrece dos o tres horas reales de tu agenda, reserva, y la recuerda el día antes." },
  { t: "Persigue al que no contesta", p: "A los 3 y a los 7 días, con un mensaje normal. Nunca de noche y nunca en domingo." },
  { t: "Se aparta cuando toca", p: "Una queja, un presupuesto cerrado o alguien que pide hablar contigo: te avisa y se calla." },
];

export const PREGUNTAS: [string, string][] = [
  [
    "¿Se nota que es una IA?",
    "Se nota, y lo decimos nosotros: se identifica en la primera respuesta. El Reglamento Europeo de IA obliga a que una persona sepa que habla con una máquina. Lo que no se nota es que sea un bot de menú con opciones del 1 al 5.",
  ],
  [
    "¿Y si le preguntan algo que no sabe?",
    "No se lo inventa. Dice que lo consulta y te pasa la pregunta entera a ti. Cada vez que contestas, esa respuesta queda aprendida.",
  ],
  [
    "¿Tengo que cambiar de número?",
    "No. Funciona sobre el WhatsApp del negocio que ya usas y que tus clientes ya tienen guardado.",
  ],
];

export function Portada({ lang }: Props) {
  const L = (href: string) => conIdioma(lang, href);

  return (
    <div data-theme="dark" className="portada bg-bg text-fg">
      <SiteNav dark />

      {/* ========================= HERO ========================= */}
      <section className="relative px-5 pt-28 pb-12 sm:px-8 lg:pt-32">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface-2/60 px-3 py-1.5 text-[13px] font-medium text-fg-2">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
              Nexo · tu primer empleado de IA
            </span>

            <h1 className="portada-h1 mt-5 font-impacto text-[clamp(52px,8.4vw,120px)] leading-[0.9] font-normal tracking-[-0.01em] uppercase">
              Tu primer empleado
              <em>que no duerme.</em>
            </h1>

            <p className="mt-6 max-w-[52ch] text-[17px] leading-[1.6] text-fg-2 sm:text-[19px]">
              Contesta el WhatsApp de tu negocio a cualquier hora, sabe qué hacer cuando la avería
              es urgente y te apunta la visita en la agenda.{" "}
              <span className="lg:hidden">Míralo aquí abajo.</span>
              <span className="hidden lg:inline">Míralo aquí al lado.</span>
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px] text-fg-2">
              <span>Desde</span>
              <b className="font-display text-[34px] leading-none font-semibold text-fg">{PLANES[0].precio} €</b>
              <span>al mes + IVA · sin permanencia · 14 días gratis</span>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={waLink("GENERAL", undefined, lang)}
                target="_blank"
                rel="noreferrer"
                className="vibrar pulsar inline-flex h-12 items-center gap-2 rounded-xl bg-carmesi px-6 text-[15px] font-semibold text-crema transition-colors hover:bg-carmesi-oscuro"
              >
                Pruébalo por WhatsApp
              </a>
              <NextLink
                href={L("/#precios")}
                className="pulsar inline-flex h-12 items-center gap-2 rounded-xl border border-line-strong px-6 text-[15px] font-semibold text-fg transition-colors hover:bg-surface-2"
              >
                Ver los precios
              </NextLink>
            </div>
          </div>

          {/* EL MÓVIL. La conversación se escribe sola; si no hay JS,
              se ve entera. Ver components/site/chat-demo.tsx. */}
          <div className="relative mx-auto w-full max-w-[380px]">
            <div className="halo-tel relative isolate">
              <div className="overflow-hidden rounded-[34px] border border-line-strong bg-surface shadow-[0_50px_90px_-30px_#000] lg:rotate-[3deg]">
                <div className="flex items-center gap-3 border-b border-line bg-surface-2 px-4 py-3">
                  <span aria-hidden="true" className="grid size-9 place-items-center rounded-full bg-carmesi text-[15px] font-bold text-crema">N</span>
                  <span className="leading-tight">
                    <b className="block text-[14px]">Tu negocio</b>
                    <span className="text-[12px] text-fg-3">asistente de IA · en línea</span>
                  </span>
                </div>
                <ChatDemo mensajes={CONVERSACION} />
                <p className="border-t border-line px-4 py-2.5 text-center text-[11.5px] text-fg-3">
                  Responde con la información de tu negocio
                </p>
              </div>
            </div>
            <p className="mt-4 text-center text-[12px] text-fg-3">
              Conversación de ejemplo. El texto real se adapta a cada negocio.
            </p>
          </div>
        </div>
      </section>

      {/* ============== AVISO DE LA AYUDA — LA CAMPAÑA ============== */}
      <section className="px-5 py-6 sm:px-8">
        <NextLink
          href={L("/ayudas")}
          className="mx-auto flex max-w-[1200px] flex-col gap-3 rounded-2xl border border-dashed border-brand/60 bg-brand-soft/40 px-6 py-5 transition-colors hover:bg-brand-soft/60 sm:flex-row sm:items-center sm:justify-between"
        >
          <span>
            <b className="block font-display text-[21px] font-semibold text-fg sm:text-[24px]">
              Hasta {miles(AYUDA.importeMaximo)} € del Govern, y cubre el {AYUDA.porcentaje} %
            </b>
            <span className="mt-1 block text-[14.5px] text-fg-2">
              Si tu empresa está en Baleares, se pide del {AYUDA.abreTexto} al {AYUDA.cierraTexto}. Va por orden de entrada.
            </span>
          </span>
          <span className="pulsar shrink-0 rounded-xl bg-carmesi px-5 py-3 text-center text-[14.5px] font-semibold text-crema">
            Ver si te toca
          </span>
        </NextLink>
      </section>

      {/* ==================== CINTA DE SECTORES ==================== */}
      <div className="cinta overflow-hidden border-y border-line py-4">
        <p className="mb-3 text-center text-[12.5px] tracking-wide text-fg-3 uppercase">
          Hecho para quien vive del teléfono
        </p>
        <div className="cinta-pista gap-8 px-4" aria-hidden="true">
          {[...SECTORES, ...SECTORES].map((s, i) => (
            <span key={i} className="text-[15px] whitespace-nowrap text-fg-3">{s}</span>
          ))}
        </div>
      </div>

      {/* ====================== CÓMO FUNCIONA ====================== */}
      <section id="como-funciona" className="scroll-mt-24 px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="max-w-[20ch] font-display text-[clamp(30px,4.4vw,46px)] leading-[1.08] font-semibold tracking-tight">
            Del mensaje a la visita, <em className="text-brand not-italic">sin que toques nada.</em>
          </h2>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {PASOS.map((p) => (
              <li key={p.n} className="rounded-2xl border border-line bg-surface px-6 py-7">
                <span aria-hidden="true" className="font-impacto text-[40px] leading-none text-brand/50">{p.n}</span>
                <h3 className="mt-3 font-display text-[21px] font-semibold">{p.t}</h3>
                <p className="mt-2 text-[15px] leading-[1.55] text-fg-2">{p.p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ======================== FUNCIONES ======================== */}
      <section id="funciones" className="scroll-mt-24 px-5 pb-20 sm:px-8 lg:pb-24">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="max-w-[20ch] font-display text-[clamp(30px,4.4vw,46px)] leading-[1.08] font-semibold tracking-tight">
            Un empleado completo, <em className="text-brand not-italic">no un bot de menú.</em>
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {FUNCIONES.map((f) => (
              <li key={f.t} className="rounded-2xl border border-line bg-surface px-5 py-5">
                <h3 className="font-display text-[19px] font-semibold">{f.t}</h3>
                <p className="mt-2 text-[14.5px] leading-[1.55] text-fg-2">{f.p}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[15px] text-fg-2">
            Hace cinco cosas más.{" "}
            <NextLink href={L("/servicios")} className="font-medium text-brand underline underline-offset-4">
              Están todas explicadas aquí
            </NextLink>
            , junto con lo que no hace.
          </p>
        </div>
      </section>

      {/* ========================= PRECIOS ========================= */}
      <section id="precios" className="marca-agua relative scroll-mt-24 px-5 pb-20 sm:px-8 lg:pb-24" data-agua="Precios">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="max-w-[22ch] font-display text-[clamp(30px,4.4vw,46px)] leading-[1.08] font-semibold tracking-tight">
            Tres planes. <em className="text-brand not-italic">Ninguno con permanencia.</em>
          </h2>
          <p className="mt-4 max-w-[62ch] text-[16.5px] leading-[1.6] text-fg-2">
            Los tres incluyen 14 días gratis. El precio no sube por tener un mes bueno.
          </p>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {PLANES.map((plan) => (
              <div
                key={plan.id}
                className={`cristal relative flex flex-col rounded-3xl p-7 ${plan.destacado ? "cristal-top lg:-mt-5 lg:pb-9" : ""}`}
              >
                {plan.etiqueta ? (
                  <span className="absolute -top-3 left-7 rounded-full bg-carmesi px-3 py-1 text-[12px] font-semibold text-crema">
                    {plan.etiqueta}
                  </span>
                ) : null}
                <h3 className="font-display text-[23px] font-semibold">{plan.nombre}</h3>
                <p className="mt-1.5 text-[14px] leading-[1.5] text-fg-3">{plan.para}</p>
                <p className="mt-5 flex items-baseline gap-1.5">
                  <b className="font-display text-[48px] leading-none font-semibold tracking-[-0.02em] tabular-nums">{plan.precio} €</b>
                  <span className="text-[14px] text-fg-3">/mes + IVA</span>
                </p>
                <p className="mt-2 text-[13.5px] text-fg-3">
                  {plan.alta === 0 ? "Sin alta: se configura solo" : `Alta única de ${plan.alta} €`}
                  {" · "}
                  {miles(plan.conversaciones)} conversaciones al mes
                </p>
                <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                  {plan.incluye.map((i) => (
                    <li key={i} className="flex gap-2.5 text-[14.5px] leading-[1.5] text-fg-2">
                      <span aria-hidden="true" className="mt-[7px] size-1.5 shrink-0 rounded-full bg-brand" />
                      {i}
                    </li>
                  ))}
                </ul>
                {entraEnLaAyuda(plan) ? (
                  <p className="mt-5 rounded-xl border border-dashed border-brand/50 px-4 py-3 text-[13.5px] leading-[1.45] text-fg-2">
                    El primer año de este plan entra en la ayuda del Govern.{" "}
                    <NextLink href={L("/ayudas")} className="font-medium text-brand underline underline-offset-2">
                      Cómo se pide
                    </NextLink>
                  </p>
                ) : null}
                <a
                  href={waLink("GENERAL", undefined, lang)}
                  target="_blank"
                  rel="noreferrer"
                  className={`pulsar mt-6 flex h-12 items-center justify-center rounded-xl text-[15px] font-semibold transition-colors ${
                    plan.destacado
                      ? "bg-carmesi text-crema hover:bg-carmesi-oscuro"
                      : "border border-line-strong text-fg hover:bg-surface-2"
                  }`}
                >
                  Empezar con {plan.nombre}
                </a>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-dashed border-line-strong px-6 py-6">
            <span className="text-[12px] font-medium tracking-wide text-brand uppercase">
              Extra · se paga por resultado
            </span>
            <h3 className="mt-2 font-display text-[21px] font-semibold">{REACTIVACION.nombre}</h3>
            <p className="mt-2 max-w-[62ch] text-[15px] leading-[1.55] text-fg-2">
              {REACTIVACION.para} {REACTIVACION.explicacion}
            </p>
            <p className="mt-4 flex flex-wrap items-baseline gap-2">
              <b className="font-display text-[32px] leading-none font-semibold">
                {REACTIVACION.minimoPorVisita}–{REACTIVACION.maximoPorVisita} €
              </b>
              <span className="text-[14px] text-fg-3">por visita conseguida, no por mes</span>
            </p>
            <p className="mt-3 text-[13.5px] text-fg-3">
              Incluida en {PLANES[2].nombre}. En los otros dos planes se paga solo cuando entra la visita.
            </p>
          </div>
        </div>
      </section>

      {/* ======================== PREGUNTAS ======================== */}
      <section id="preguntas" className="scroll-mt-24 px-5 pb-20 sm:px-8 lg:pb-24">
        <div className="mx-auto max-w-[840px]">
          <h2 className="font-display text-[clamp(30px,4.4vw,46px)] leading-[1.08] font-semibold tracking-tight">
            Las tres de <em className="text-brand not-italic">siempre.</em>
          </h2>
          <dl className="mt-9 divide-y divide-line border-y border-line">
            {PREGUNTAS.map(([p, r]) => (
              <div key={p} className="py-5">
                <dt className="font-display text-[19px] font-semibold">{p}</dt>
                <dd className="mt-2 text-[15.5px] leading-[1.6] text-fg-2">{r}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-[15px] text-fg-2">
            <NextLink href={L("/servicios")} className="font-medium text-brand underline underline-offset-4">
              Las otras seis
            </NextLink>
            , incluida la de si te sale rentable.
          </p>
        </div>
      </section>

      {/* ========================= CIERRE ========================= */}
      <section id="contacto" className="scroll-mt-24 px-5 pb-24 sm:px-8">
        <div className="cristal mx-auto max-w-[1200px] rounded-3xl px-7 py-12 text-center sm:px-12 lg:py-16">
          <h2 className="mx-auto max-w-[18ch] font-impacto text-[clamp(32px,5.4vw,62px)] leading-[0.95] font-normal tracking-tight uppercase">
            Pruébalo con tu propio negocio
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-[17px] leading-[1.6] text-fg-2">
            Escríbenos y montamos el ejemplo con los datos reales de tu empresa. Si vemos que no te
            compensa, te lo decimos.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={waLink("GENERAL", undefined, lang)}
              target="_blank"
              rel="noreferrer"
              className="vibrar pulsar inline-flex h-12 items-center rounded-xl bg-carmesi px-7 text-[15px] font-semibold text-crema transition-colors hover:bg-carmesi-oscuro"
            >
              Escribir por WhatsApp
            </a>
            <a
              href={marca.calendly}
              target="_blank"
              rel="noreferrer"
              className="pulsar inline-flex h-12 items-center rounded-xl border border-line-strong px-7 text-[15px] font-semibold transition-colors hover:bg-surface-2"
            >
              Demo de 15 minutos
            </a>
          </div>
          <p className="mt-6 text-[13.5px] text-fg-3">
            Contestamos nosotros, no un formulario. {marca.whatsappVisible}
          </p>
        </div>
      </section>

      <SiteFooter />
      <ContactDock />
    </div>
  );
}
