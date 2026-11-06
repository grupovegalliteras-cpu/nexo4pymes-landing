import NextLink from "next/link";
import { ContactDock, SiteFooter, SiteNav } from "@/components/site/chrome";
import { PLANES, AYUDA, REACTIVACION, entraEnLaAyuda } from "@/content/producto";
import { conIdioma, type Idioma } from "@/lib/i18n";
import { waLink } from "@/lib/whatsapp";
import { marca } from "@/content/marca";

/* ============================================================
   LA PORTADA

   Sustituye a <Landing/>, que vendía un catálogo: cinco módulos,
   ocho sectores y un estudio de software a medida. Search Console
   dijo lo que dio ese catálogo en 90 días: 0 clics comerciales en
   104 páginas. Los 61 clics del trimestre eran gente escribiendo
   «nexo4pymes» en Google.

   Ahora la portada vende UNA cosa, la misma que /recepcionia probó
   en estático: un empleado de IA en el WhatsApp del negocio.

   ES UNA PÁGINA DE SERVIDOR Y NO LLEVA JAVASCRIPT PROPIO. La
   conversación del móvil es markup, no una animación: una pyme que
   la abre con mala cobertura ve el ejemplo igual, y no hay nada que
   pueda quedarse a medias.
   ============================================================ */

type Props = { lang: Idioma };

const SECTORES = [
  "Fontanería", "Electricidad", "Calderas", "Aire acondicionado", "Reformas", "Limpieza",
  "Cerrajería", "Climatización", "Mantenimiento", "Pintura", "Albañilería", "Desatascos",
];

/* La conversación de ejemplo. Es un caso de servicios a domicilio:
   avería de noche, que es justo cuando nadie contesta. */
const CONVERSACION: { de: "cliente" | "nexo"; texto: string; hora: string }[] = [
  { de: "cliente", texto: "Buenas, tengo una fuga en el baño. ¿Podéis venir mañana?", hora: "22:41" },
  { de: "nexo", texto: "Buenas noches. Sí, mañana tenemos hueco. ¿La fuga sigue saliendo ahora mismo o ya la has cortado?", hora: "22:41" },
  { de: "cliente", texto: "Cortada con la llave de paso.", hora: "22:43" },
  { de: "nexo", texto: "Perfecto. Te puedo dar mañana a las 9:30 o a las 16:00. ¿Cuál te va mejor?", hora: "22:43" },
  { de: "cliente", texto: "A las 9:30", hora: "22:44" },
  { de: "nexo", texto: "Hecho. Mañana 9:30 en tu dirección. Te mando un recordatorio por la mañana.", hora: "22:44" },
];

const PASOS = [
  { n: "01", t: "Te escriben", p: "Un cliente manda un WhatsApp a cualquier hora. Se le contesta al momento, con el tono de tu negocio." },
  { n: "02", t: "Se atiende sola", p: "Resuelve la duda con lo que le has contado, recoge nombre, teléfono y qué necesita, y propone hueco en tu agenda." },
  { n: "03", t: "Tú solo cierras", p: "Te llega el aviso ya ordenado. Si hace falta una persona, te lo dice. Si el cliente no responde, lo persigue." },
];

const DOLOR = [
  { t: "Mensajes fuera de horario", p: "Los que entran de noche, en festivo o mientras estás con otro cliente. Nadie los contesta hasta el día siguiente." },
  { t: "Las mismas preguntas, veinte veces", p: "Precio, horario, dónde estáis, si hay hueco. Tiempo que no vuelve y que no vende." },
  { t: "Presupuestos que se enfrían", p: "«Ya te digo algo» y se olvida. Sin seguimiento, el cliente se decide por otro." },
];

const FUNCIONES = [
  { plan: "Desde Atiende", t: "Atiende 24 horas", p: "Contesta por WhatsApp de noche, en festivos y fines de semana, con la información de tu negocio." },
  { plan: "Desde Atiende", t: "Sabe qué es una urgencia", p: "Si sale agua, le dice que cierre la llave de paso y avisa al de guardia. Si huele a gas, le manda salir de casa y llamar al 112." },
  { plan: "Desde Atiende", t: "Comprueba que estás en zona", p: "Antes de prometer nada mira si la dirección entra en tu radio de trabajo. Se acabó ir a un aviso a cuarenta kilómetros." },
  { plan: "Desde Atiende", t: "Recoge los datos y te avisa", p: "Nombre, teléfono, dirección y qué pasa, siempre en el mismo formato. Y una notificación distinta cuando es urgente." },
  { plan: "Desde Agenda", t: "Apunta la visita", p: "Ofrece dos o tres horas reales de tu agenda y reserva. Recuerda la visita el día antes, y la cambia o la anula si al cliente no le va bien." },
  { plan: "Desde Agenda", t: "Persigue al que no contesta", p: "Vuelve a escribirle a los 3 y a los 7 días con un mensaje normal. Nunca de noche y nunca en domingo." },
  { plan: "En Cierra", t: "Reactiva a los antiguos", p: "«Hace un año de la revisión de tu caldera, ¿te la hacemos?». Contesta, apunta la visita y te llena huecos del mes que viene." },
  { plan: "En Cierra", t: "Fichaje por WhatsApp", p: "Tu equipo escribe «entro» y «salgo». Sin app que instalar y sin reloj en la pared." },
  { plan: "Siempre", t: "Pasa a una persona", p: "Una queja, un presupuesto cerrado o alguien que pide hablar contigo: te avisa y se calla. No hay bucle del que no se salga." },
];

const PARA_QUIEN = [
  { t: "Fontanería y desatascos", p: "Donde la mitad de los avisos entran rotos y con prisa.", ej: "Fuga a las 22:00: le dice que cierre la llave de paso, recoge la dirección y cita para las 9:30." },
  { t: "Electricidad", p: "Averías, cuadros, instalaciones y boletines.", ej: "Se ha ido la luz de media casa: comprueba que no es el diferencial del vecino antes de mover a nadie." },
  { t: "Calderas y aire acondicionado", p: "Instalación, averías y las revisiones que tocan cada año.", ej: "Si huele a gas, sale de casa y llama al 112. Lo demás, cita y presupuesto." },
  { t: "Limpieza y reformas", p: "Presupuestos que tardan en decidirse y clientes que repiten.", ej: "Pide metros y fotos, manda el presupuesto y vuelve a escribir a los tres días." },
];

export const PREGUNTAS: [string, string][] = [
  [
    "¿Se nota que es una IA?",
    "Se nota, y lo decimos nosotros: en la primera respuesta se identifica como asistente. Esconderlo sale mal, y además el Reglamento Europeo de IA obliga a que una persona sepa que está hablando con una máquina. Lo que no se nota es que sea un robot de menú con opciones del 1 al 5.",
  ],
  [
    "¿Y si le preguntan algo que no sabe?",
    "No se lo inventa. Dice que lo consulta y te pasa la pregunta entera a ti para que contestes. Cada vez que lo haces, esa respuesta queda aprendida para la próxima.",
  ],
  [
    "¿Tengo que cambiar de número?",
    "No. Funciona sobre el WhatsApp del negocio que ya usas y que tus clientes ya tienen guardado.",
  ],
  [
    "¿Puedo ver lo que contesta?",
    "Sí, todas las conversaciones. Y puedes entrar a escribir tú en cualquier momento: cuando lo haces, se aparta y deja de contestar en esa conversación.",
  ],
  [
    "¿Hay permanencia?",
    "No. Es mes a mes y se cancela cuando quieras. El alta no se devuelve, porque es trabajo ya hecho.",
  ],
  [
    "¿Qué pasa con los datos de mis clientes?",
    "Se tratan como encargados del tratamiento, con su contrato firmado, y se quedan en servidores de la Unión Europea. No se usan para entrenar modelos.",
  ],
];

export function Portada({ lang }: Props) {
  const L = (href: string) => conIdioma(lang, href);

  return (
    <div data-theme="dark" className="portada bg-bg text-fg">
      {/* La cabecera va en modo oscuro: esta página es noche entera. */}
      <SiteNav dark />

      {/* ========================= HERO ========================= */}
      <section className="relative px-5 pt-28 pb-10 sm:px-8 lg:pt-32">
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

            <p className="mt-6 max-w-[58ch] text-[17px] leading-[1.6] text-fg-2 sm:text-[19px]">
              Contesta el WhatsApp a cualquier hora, sabe qué hacer cuando la avería es urgente,
              apunta la visita en tu agenda y persigue al que no contesta. Tú solo hablas con quien
              ya quiere que vayas.
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
                className="vibrar inline-flex h-12 items-center gap-2 rounded-xl bg-carmesi px-6 text-[15px] font-semibold text-crema transition-colors hover:bg-carmesi-oscuro"
              >
                Pruébalo por WhatsApp
              </a>
              <a
                href={marca.calendly}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-line-strong px-6 text-[15px] font-semibold text-fg transition-colors hover:bg-surface-2"
              >
                Demo de 15 minutos
              </a>
            </div>

            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-fg-3">
              <li>Lo dejamos montado nosotros</li>
              <li>Sin instalar programas</li>
              <li>Te avisa cuando hace falta una persona</li>
            </ul>
          </div>

          {/* EL MÓVIL. En pantalla grande el teléfono se inclina y las
              tres cifras van debajo en fila; no flotan sobre el texto
              porque a 1280 px se comían el titular. */}
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
                <ol className="flex flex-col gap-2 px-3 py-4">
                  {CONVERSACION.map((m, i) => (
                    <li
                      key={i}
                      className={
                        m.de === "cliente"
                          ? "max-w-[82%] self-start rounded-2xl rounded-bl-md bg-surface-3 px-3.5 py-2.5"
                          : "max-w-[82%] self-end rounded-2xl rounded-br-md bg-carmesi/90 px-3.5 py-2.5 text-crema"
                      }
                    >
                      <p className="text-[13.5px] leading-[1.45]">{m.texto}</p>
                      <span className={m.de === "cliente" ? "mt-1 block text-right text-[10.5px] text-fg-3" : "mt-1 block text-right text-[10.5px] text-crema/70"}>
                        {m.hora}
                      </span>
                    </li>
                  ))}
                </ol>
                <p className="border-t border-line px-4 py-2.5 text-center text-[11.5px] text-fg-3">
                  Responde con la información de tu negocio
                </p>
              </div>
            </div>

            <ul className="mt-5 grid grid-cols-3 gap-2.5">
              {[
                { b: "24/7", s: "atendido, también de noche y en festivos" },
                { b: PLANES[0].precio + " €", s: "al mes desde, sin permanencia" },
                { b: "14 días", s: "gratis para probarlo" },
              ].map((c) => (
                <li key={c.b} className="cristal rounded-2xl px-3 py-3">
                  <b className="block font-display text-[22px] leading-none font-semibold">{c.b}</b>
                  <span className="mt-1 block text-[11.5px] leading-snug text-fg-3">{c.s}</span>
                </li>
              ))}
            </ul>

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
              Hasta {AYUDA.importeMaximo.toLocaleString("es-ES")} € del Govern, y cubre el {AYUDA.porcentaje} %
            </b>
            <span className="mt-1 block text-[14.5px] text-fg-2">
              Si tu empresa está en Baleares, se pide del {AYUDA.abreTexto} al {AYUDA.cierraTexto}. Va por orden de entrada.
            </span>
          </span>
          <span className="shrink-0 rounded-xl bg-carmesi px-5 py-3 text-center text-[14.5px] font-semibold text-crema">
            Ver si te toca
          </span>
        </NextLink>
      </section>

      {/* ==================== CINTA DE SECTORES ==================== */}
      <div className="overflow-hidden border-y border-line py-4">
        <p className="mb-3 text-center text-[12.5px] tracking-wide text-fg-3 uppercase">
          Hecho para quien vive del teléfono
        </p>
        <div className="cinta-pista gap-8 px-4" aria-hidden="true">
          {[...SECTORES, ...SECTORES].map((s, i) => (
            <span key={i} className="text-[15px] whitespace-nowrap text-fg-3">{s}</span>
          ))}
        </div>
      </div>

      {/* ======================== EL DOLOR ======================== */}
      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <span className="text-[13px] font-medium tracking-wide text-brand uppercase">Lo que pasa hoy</span>
            <h2 className="mt-3 font-display text-[clamp(30px,4.4vw,46px)] leading-[1.08] font-semibold tracking-tight">
              El cliente que no recibe respuesta, <em className="text-brand not-italic">se va a otro.</em>
            </h2>
            <p className="mt-5 max-w-[52ch] text-[17px] leading-[1.6] text-fg-2">
              Estás con un cliente, o es de noche, o es domingo. Entra un WhatsApp preguntando precio.
              Cuando lo ves, <b className="text-fg">ya ha escrito a tres más</b> y le ha contestado el primero.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {DOLOR.map((d) => (
              <li key={d.t} className="rounded-2xl border border-line bg-surface px-5 py-5">
                <h3 className="font-display text-[19px] font-semibold">{d.t}</h3>
                <p className="mt-2 text-[15px] leading-[1.55] text-fg-2">{d.p}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ====================== CÓMO FUNCIONA ====================== */}
      <section id="como-funciona" className="scroll-mt-24 px-5 pb-20 sm:px-8 lg:pb-28">
        <div className="mx-auto max-w-[1200px]">
          <span className="text-[13px] font-medium tracking-wide text-brand uppercase">Cómo funciona</span>
          <h2 className="mt-3 max-w-[20ch] font-display text-[clamp(30px,4.4vw,46px)] leading-[1.08] font-semibold tracking-tight">
            Del mensaje a la cita, <em className="text-brand not-italic">sin que toques nada.</em>
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
      <section id="funciones" className="scroll-mt-24 px-5 pb-20 sm:px-8 lg:pb-28">
        <div className="mx-auto max-w-[1200px]">
          <span className="text-[13px] font-medium tracking-wide text-brand uppercase">Qué hace</span>
          <h2 className="mt-3 max-w-[20ch] font-display text-[clamp(30px,4.4vw,46px)] leading-[1.08] font-semibold tracking-tight">
            Un empleado completo, <em className="text-brand not-italic">no un bot de menú.</em>
          </h2>
          <p className="mt-4 max-w-[60ch] text-[16.5px] leading-[1.6] text-fg-2">
            Cada plan suma sobre el anterior. La etiqueta de cada tarjeta dice desde qué plan está disponible.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FUNCIONES.map((f) => (
              <li key={f.t} className="rounded-2xl border border-line bg-surface px-5 py-5">
                <span className="inline-block rounded-md bg-brand-soft px-2 py-1 text-[11.5px] font-medium text-brand">{f.plan}</span>
                <h3 className="mt-3 font-display text-[19px] font-semibold">{f.t}</h3>
                <p className="mt-2 text-[14.5px] leading-[1.55] text-fg-2">{f.p}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ======================== PARA QUIÉN ======================== */}
      <section id="para-quien" className="scroll-mt-24 px-5 pb-20 sm:px-8 lg:pb-28">
        <div className="mx-auto max-w-[1200px]">
          <span className="text-[13px] font-medium tracking-wide text-brand uppercase">Para quién</span>
          <h2 className="mt-3 max-w-[20ch] font-display text-[clamp(30px,4.4vw,46px)] leading-[1.08] font-semibold tracking-tight">
            Negocios que <em className="text-brand not-italic">viven del WhatsApp.</em>
          </h2>
          <p className="mt-4 max-w-[60ch] text-[16.5px] leading-[1.6] text-fg-2">
            Si tus clientes te preguntan precio, piden cita o piden presupuesto por mensaje, esto es para ti.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {PARA_QUIEN.map((s) => (
              <li key={s.t} className="rounded-2xl border border-line bg-surface px-6 py-6">
                <h3 className="font-display text-[21px] font-semibold">{s.t}</h3>
                <p className="mt-2 text-[15px] leading-[1.55] text-fg-2">{s.p}</p>
                <p className="mt-4 rounded-xl bg-surface-2 px-4 py-3 text-[14px] leading-[1.5] text-fg-2">
                  <b className="mb-1 block text-[12px] tracking-wide text-fg-3 uppercase">Un caso típico</b>
                  {s.ej}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ========================= PRECIOS ========================= */}
      <section id="precios" className="marca-agua relative scroll-mt-24 px-5 pb-20 sm:px-8 lg:pb-28" data-agua="Precios">
        <div className="mx-auto max-w-[1200px]">
          <span className="text-[13px] font-medium tracking-wide text-brand uppercase">Precios</span>
          <h2 className="mt-3 max-w-[22ch] font-display text-[clamp(30px,4.4vw,46px)] leading-[1.08] font-semibold tracking-tight">
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
                  <b className="font-display text-[48px] leading-none font-semibold">{plan.precio} €</b>
                  <span className="text-[14px] text-fg-3">/mes + IVA</span>
                </p>
                <p className="mt-2 text-[13.5px] text-fg-3">
                  {plan.alta === 0 ? "Sin alta: se configura solo" : `Alta única de ${plan.alta} €`}
                  {" · "}
                  {plan.conversaciones.toLocaleString("es-ES")} conversaciones al mes
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
                  className={`mt-6 flex h-12 items-center justify-center rounded-xl text-[15px] font-semibold transition-colors ${
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

          <p className="mt-6 text-[14px] text-fg-3">
            ¿Te pasas de conversaciones? Te avisamos antes, no después. No hay factura sorpresa.
          </p>
        </div>
      </section>

      {/* ======================== PREGUNTAS ======================== */}
      <section id="preguntas" className="scroll-mt-24 px-5 pb-20 sm:px-8 lg:pb-28">
        <div className="mx-auto max-w-[840px]">
          <span className="text-[13px] font-medium tracking-wide text-brand uppercase">Preguntas</span>
          <h2 className="mt-3 font-display text-[clamp(30px,4.4vw,46px)] leading-[1.08] font-semibold tracking-tight">
            Lo que nos preguntan <em className="text-brand not-italic">antes de decidir.</em>
          </h2>
          <dl className="mt-9 divide-y divide-line border-y border-line">
            {PREGUNTAS.map(([p, r]) => (
              <div key={p} className="py-5">
                <dt className="font-display text-[19px] font-semibold">{p}</dt>
                <dd className="mt-2 text-[15.5px] leading-[1.6] text-fg-2">{r}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ========================= CIERRE ========================= */}
      <section id="contacto" className="scroll-mt-24 px-5 pb-24 sm:px-8">
        <div className="cristal mx-auto max-w-[1200px] rounded-3xl px-7 py-12 text-center sm:px-12 lg:py-16">
          <h2 className="mx-auto max-w-[18ch] font-impacto text-[clamp(32px,5.4vw,62px)] leading-[0.95] font-normal tracking-tight uppercase">
            Pruébalo con tu propio negocio
          </h2>
          <p className="mx-auto mt-5 max-w-[56ch] text-[17px] leading-[1.6] text-fg-2">
            Escríbenos por WhatsApp y montamos el ejemplo con los datos reales de tu empresa, para que veas
            qué contestaría. Si no te convence, no has perdido más que el mensaje.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={waLink("GENERAL", undefined, lang)}
              target="_blank"
              rel="noreferrer"
              className="vibrar inline-flex h-12 items-center rounded-xl bg-carmesi px-7 text-[15px] font-semibold text-crema transition-colors hover:bg-carmesi-oscuro"
            >
              Escribir por WhatsApp
            </a>
            <a
              href={marca.calendly}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center rounded-xl border border-line-strong px-7 text-[15px] font-semibold transition-colors hover:bg-surface-2"
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
