import type { Metadata } from "next";
import { ContactDock, SiteFooter, SiteNav } from "@/components/site/chrome";
import { AYUDA, PLANES, primerAno, entraEnLaAyuda } from "@/content/producto";
import { alternativas, idiomaOBase, type Idioma } from "@/lib/i18n";
import { esquemaFaq, grafoPagina, urlAbsoluta } from "@/lib/esquema";
import { waLink } from "@/lib/whatsapp";
import { marca } from "@/content/marca";

/* ============================================================
   /AYUDAS — LA CAMPAÑA DEL 1 DE DICIEMBRE

   La línia 3.1 del Govern balear cubre el 100 % de un proyecto de
   digitalización, de 1.800 a 6.000 €, y se pide del 1 de diciembre
   de 2026 al 5 de enero de 2027 por orden de entrada.

   TODO LO QUE DICE ESTA PÁGINA ESTÁ CONTRASTADO contra el texto
   consolidado de la convocatoria (versión de 26/02/2026) y la ficha
   del trámite 6064112 de la Seu Electrònica. Los datos viven en
   content/producto.ts, no escritos a mano aquí.

   NO SOMOS EL GOVERN Y HAY QUE DECIRLO. Esta página explica una
   ayuda pública y ofrece un servicio privado; si alguien se lleva
   la impresión de que tramitamos nosotros la subvención o de que
   está garantizada, el problema vuelve. De ahí el aviso del final y
   el enlace a la ficha oficial en tres sitios distintos.

   CUANDO PASE EL 5 DE ENERO DE 2027: esta página no se borra, se
   actualiza con la convocatoria siguiente. Si no hay, se deja
   diciendo que el plazo se cerró y cuándo se espera el próximo. Una
   página de ayudas caducada que sigue diciendo «pídela ya» quema la
   confianza de todo lo demás.
   ============================================================ */

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = idiomaOBase((await params).lang);
  return {
    title: `Hasta ${AYUDA.importeMaximo.toLocaleString("es-ES")} € del Govern para digitalizar tu pyme en Baleares`,
    /* Por debajo de 160 caracteres: con las fechas y los importes
       metidos, la frase del presupuesto se quedaba fuera del
       resultado de búsqueda. */
    description: `El Govern cubre el ${AYUDA.porcentaje} % del proyecto, de ${AYUDA.importeMinimo.toLocaleString("es-ES")} a ${AYUDA.importeMaximo.toLocaleString("es-ES")} €. Se pide del ${AYUDA.abreTexto} al ${AYUDA.cierraTexto}, por orden de entrada.`,
    alternates: alternativas(lang, "/ayudas"),
  };
}

const PREGUNTAS: [string, string][] = [
  [
    "¿Esto es el Kit Digital?",
    "No. El Kit Digital es del Estado y está cerrado: sus cinco convocatorias terminaron, y la última para autónomos y microempresas venció el 31 de octubre de 2025. Esta ayuda es del Govern de les Illes Balears, se financia con fondos FEDER y es solo para empresas de las islas.",
  ],
  [
    "¿Cobramos por preparar la solicitud?",
    "No, y no es generosidad: la propia convocatoria dice que redactar o tramitar la solicitud no es un gasto subvencionable. Te preparamos el presupuesto y la memoria técnica sin coste. Si luego no la pides, o si te la deniegan, no nos debes nada.",
  ],
  [
    "¿Hay que pedir tres presupuestos?",
    "Para esta línia, no. La obligación de presentar tres ofertas empieza en los 15.000 € y aquí el máximo es de 6.000 €.",
  ],
  [
    "¿Tenéis que estar acreditados como en el Kit Digital?",
    "No. La convocatoria solo pide un proveedor externo, no un agente digitalizador homologado. Por eso se puede empezar en cuanto te concedan la ayuda.",
  ],
  [
    "¿Qué pasa si ya contraté antes de pedirla?",
    "Ese gasto no cuenta. La convocatoria solo admite lo gastado después de presentar la solicitud. Por eso el orden importa: primero se pide, después se contrata.",
  ],
  [
    "¿Está garantizado que me la den?",
    "No. Se resuelve por orden de entrada hasta que se agota el crédito, así que quien presenta el primer día tiene más opciones que quien presenta el último. Nosotros no decidimos nada: resuelve el Govern.",
  ],
];

export default async function Ayudas({ params }: { params: Promise<{ lang: string }> }) {
  const lang: Idioma = idiomaOBase((await params).lang);
  const planes = PLANES.filter(entraEnLaAyuda);

  return (
    <div data-theme="dark" className="portada mueve-siempre bg-bg text-fg">
      <SiteNav dark />

      {/* ========================= HERO ========================= */}
      <section className="relative px-5 pt-28 pb-12 sm:px-8 lg:pt-32">
        <div className="mx-auto max-w-[900px]">
          <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface-2/60 px-3 py-1.5 text-[13px] font-medium text-fg-2">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
            {AYUDA.organismo} · {AYUDA.fondo}
          </span>

          <h1 className="portada-h1 mt-5 font-impacto text-[clamp(44px,7.4vw,104px)] leading-[0.92] font-normal tracking-[-0.01em] uppercase">
            Hasta {AYUDA.importeMaximo.toLocaleString("es-ES")} €
            <em>y no pones un euro.</em>
          </h1>

          <p className="mt-6 max-w-[62ch] text-[17px] leading-[1.6] text-fg-2 sm:text-[19px]">
            El Govern cubre el <b className="text-fg">{AYUDA.porcentaje} %</b> de un proyecto de digitalización,
            de {AYUDA.importeMinimo.toLocaleString("es-ES")} a {AYUDA.importeMaximo.toLocaleString("es-ES")} € por empresa.
            La convocatoria nombra por su nombre lo que nosotros hacemos: CRM, implantar inteligencia artificial
            y automatizar procesos.
          </p>

          <dl className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { t: "Se pide", d: `Del ${AYUDA.abreTexto} al ${AYUDA.cierraTexto}` },
              { t: "Cubre", d: `El ${AYUDA.porcentaje} % del gasto` },
              { t: "Se reparte", d: "Por orden de entrada, hasta agotar crédito" },
            ].map((c) => (
              <div key={c.t} className="cristal rounded-2xl px-5 py-4">
                <dt className="text-[12px] tracking-wide text-fg-3 uppercase">{c.t}</dt>
                <dd className="mt-1.5 font-display text-[18px] leading-tight font-semibold">{c.d}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={waLink("GENERAL", "Hola, quiero que me preparéis la solicitud de la ayuda del Govern", lang)}
              target="_blank"
              rel="noreferrer"
              className="vibrar inline-flex h-12 items-center rounded-xl bg-carmesi px-6 text-[15px] font-semibold text-crema transition-colors hover:bg-carmesi-oscuro"
            >
              Quiero que me la preparéis
            </a>
            <a
              href={AYUDA.fichaOficial}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center rounded-xl border border-line-strong px-6 text-[15px] font-semibold transition-colors hover:bg-surface-2"
            >
              Ver la ficha oficial del Govern
            </a>
          </div>
        </div>
      </section>

      {/* ===================== QUÉ CUBRE ===================== */}
      <section className="px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-[900px]">
          <h2 className="font-display text-[clamp(28px,4.2vw,42px)] leading-[1.1] font-semibold tracking-tight">
            Qué paga, <em className="text-brand not-italic">con las palabras de la convocatoria.</em>
          </h2>
          <p className="mt-4 max-w-[62ch] text-[16.5px] leading-[1.6] text-fg-2">
            No es una interpretación nuestra. Estas son las actuaciones que el anexo de la línia 3.1 enumera,
            y son justo las que montamos.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {AYUDA.cubre.map((c) => (
              <li key={c} className="flex gap-3 rounded-2xl border border-line bg-surface px-5 py-4 text-[15px] leading-[1.5]">
                <span aria-hidden="true" className="mt-[9px] size-1.5 shrink-0 rounded-full bg-brand" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================ QUÉ SALDRÍA GRATIS ================ */}
      <section className="px-5 pb-16 sm:px-8 lg:pb-20">
        <div className="mx-auto max-w-[900px]">
          <h2 className="font-display text-[clamp(28px,4.2vw,42px)] leading-[1.1] font-semibold tracking-tight">
            Qué te saldría <em className="text-brand not-italic">a cero.</em>
          </h2>
          <p className="mt-4 max-w-[62ch] text-[16.5px] leading-[1.6] text-fg-2">
            La ayuda tiene un mínimo de {AYUDA.importeMinimo.toLocaleString("es-ES")} €, así que lo que entra es el
            primer año completo: el alta más doce meses. Estos dos planes llegan.
          </p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {planes.map((plan) => (
              <li key={plan.id} className="cristal rounded-3xl p-7">
                <h3 className="font-display text-[22px] font-semibold">{plan.nombre}</h3>
                <p className="mt-1.5 text-[14px] text-fg-3">{plan.para}</p>
                <p className="mt-5 flex items-baseline gap-2">
                  <b className="font-display text-[42px] leading-none font-semibold">
                    {primerAno(plan).toLocaleString("es-ES")} €
                  </b>
                  <span className="text-[14px] text-fg-3">el primer año</span>
                </p>
                <p className="mt-2 text-[13.5px] text-fg-3">
                  Alta de {plan.alta} € + 12 meses a {plan.precio} €
                </p>
                <p className="mt-5 rounded-xl border border-dashed border-brand/50 px-4 py-3 text-[14px] leading-[1.45]">
                  Dentro de la horquilla de la ayuda.{" "}
                  <b className="text-fg">Te lo puede cubrir entero.</b>
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-[14.5px] leading-[1.6] text-fg-3">
            El plan de {PLANES[0].precio} € no llega al mínimo de {AYUDA.importeMinimo.toLocaleString("es-ES")} € ni
            sumando el año entero, así que ese no entra en la ayuda. Lo decimos aquí y no en la letra pequeña.
          </p>
        </div>
      </section>

      {/* ================== A QUIÉN LE TOCA ================== */}
      <section className="px-5 pb-16 sm:px-8 lg:pb-20">
        <div className="mx-auto max-w-[900px]">
          <h2 className="font-display text-[clamp(28px,4.2vw,42px)] leading-[1.1] font-semibold tracking-tight">
            A quién le toca, <em className="text-brand not-italic">y a quién no.</em>
          </h2>
          <p className="mt-4 max-w-[62ch] text-[16.5px] leading-[1.6] text-fg-2">
            Preferimos que lo descartes aquí en treinta segundos que después de dos reuniones.
          </p>
          <ul className="mt-8 flex flex-col gap-3">
            {AYUDA.condiciones.map((c) => (
              <li key={c} className="flex gap-3 rounded-2xl border border-line bg-surface px-5 py-4 text-[15.5px] leading-[1.55]">
                <span aria-hidden="true" className="mt-[10px] size-1.5 shrink-0 rounded-full bg-brand" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= CÓMO LO HACEMOS ================= */}
      <section className="px-5 pb-16 sm:px-8 lg:pb-20">
        <div className="mx-auto max-w-[900px]">
          <h2 className="font-display text-[clamp(28px,4.2vw,42px)] leading-[1.1] font-semibold tracking-tight">
            Lo que hacemos nosotros, <em className="text-brand not-italic">y lo que haces tú.</em>
          </h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { n: "01", t: "Miramos si encajas", p: "Cinco minutos por WhatsApp: tu CNAE, dónde tributas y qué quieres montar. Si no encajas, te lo decimos y hasta aquí." },
              { n: "02", t: "Preparamos la solicitud", p: "Presupuesto y memoria técnica listos para presentar el primer día. Esto no te cuesta nada, pase lo que pase después." },
              { n: "03", t: "La presentas tú", p: "La solicitud va a nombre de tu empresa y la firmas tú con tu certificado. Nosotros no entramos en tu sede electrónica." },
            ].map((p) => (
              <li key={p.n} className="rounded-2xl border border-line bg-surface px-6 py-6">
                <span aria-hidden="true" className="font-impacto text-[38px] leading-none text-brand/50">{p.n}</span>
                <h3 className="mt-3 font-display text-[20px] font-semibold">{p.t}</h3>
                <p className="mt-2 text-[15px] leading-[1.55] text-fg-2">{p.p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===================== PREGUNTAS ===================== */}
      <section className="px-5 pb-16 sm:px-8 lg:pb-20">
        <div className="mx-auto max-w-[840px]">
          <h2 className="font-display text-[clamp(28px,4.2vw,42px)] leading-[1.1] font-semibold tracking-tight">
            Preguntas <em className="text-brand not-italic">que conviene hacer.</em>
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

      {/* ======================= CIERRE ======================= */}
      <section className="px-5 pb-24 sm:px-8">
        <div className="cristal mx-auto max-w-[900px] rounded-3xl px-7 py-12 text-center sm:px-12">
          <h2 className="mx-auto max-w-[20ch] font-impacto text-[clamp(30px,5vw,56px)] leading-[0.96] font-normal tracking-tight uppercase">
            Se abre el {AYUDA.abreTexto}
          </h2>
          <p className="mx-auto mt-5 max-w-[56ch] text-[17px] leading-[1.6] text-fg-2">
            Va por orden de entrada, así que lo que decide no es la memoria más bonita: es llegar pronto.
            Si lo preparamos ahora, lo presentas el primer día.
          </p>
          <a
            href={waLink("GENERAL", "Hola, quiero que me preparéis la solicitud de la ayuda del Govern", lang)}
            target="_blank"
            rel="noreferrer"
            className="vibrar mt-8 inline-flex h-12 items-center rounded-xl bg-carmesi px-7 text-[15px] font-semibold text-crema transition-colors hover:bg-carmesi-oscuro"
          >
            Escribir por WhatsApp
          </a>
          <p className="mt-6 text-[13.5px] text-fg-3">{marca.whatsappVisible}</p>
        </div>

        {/* EL AVISO. Va al final, en texto pequeño pero legible: esta
            página la escribe una empresa privada, no la administración. */}
        <p className="mx-auto mt-8 max-w-[900px] text-[13px] leading-[1.6] text-fg-3">
          Nexo4Pymes es una empresa privada y no forma parte del {AYUDA.organismo}. Esta página resume la{" "}
          {AYUDA.nombre}, cofinanciada con fondos {AYUDA.fondo}, tal y como figura en el trámite{" "}
          {AYUDA.tramite} de la Seu Electrònica a fecha de 6 de noviembre de 2026. La información que manda
          siempre es la{" "}
          <a href={AYUDA.fichaOficial} target="_blank" rel="noreferrer" className="text-brand underline underline-offset-2">
            publicación oficial
          </a>
          , que puede cambiar. Conceder o denegar la ayuda es decisión del Govern; nosotros no intervenimos
          en la resolución ni podemos garantizar ningún resultado.
        </p>
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
                urlAbsoluta(lang, "/ayudas") + "#faq",
                lang,
              ),
            ]),
          ),
        }}
      />
    </div>
  );
}
