"use client";

import Link from "@/components/i18n/Enlace";
import { motion } from "motion/react";
import { Check, FileCheck2, MessageCircle, PlayCircle, ShieldCheck } from "lucide-react";
import { whatsappLink } from "@/data/site";
import { landingDe, type LandingSlug } from "@/data/landings";
import { moduloDe } from "@/data/modules-i18n";
import { textoLanding } from "@/content/landings-seo-i18n";
import { LANDINGS_PUBLICADAS } from "@/content/landings-seo-i18n";
import { COMPROBADO, HITOS } from "@/content/verifactu-estado";
import { useIdioma } from "@/components/i18n/idioma";
import { Icon } from "@/components/icon";
import { Caustics } from "./caustics";
import { ContactDock, SiteFooter, SiteNav } from "./chrome";

/* ============================================================
   UNA LANDING POR MÓDULO CON DEMANDA

   QUÉ ES. La página de un solo servicio, escrita para la consulta que
   la gente teclea de verdad. El nombre y el icono salen de
   data/modules.ts; el texto largo, de content/landings-seo.ts.

   LO QUE NO HACE: no repite la rejilla de los 40 módulos. Para eso
   está /modulos, que es la página madre. Esta responde una pregunta
   concreta y lleva a una conversación.
   ============================================================ */

const TX = {
  es: {
    volver: "Todos los módulos",
    queHace: "Qué hace exactamente",
    dudas: "Lo que nos preguntan",
    verDemo: "Ver la demo",
    pide: "Preguntar por WhatsApp",
    msg: (n: string) => `Hola, me interesa ${n}. ¿Me contáis cómo funciona?`,
    otras: "Otros módulos con página propia",
    calendario: "Qué obliga y desde cuándo",
    enVigor: "En vigor",
    anunciado: "Anunciado, sin publicar",
    comprobado: (f: string) => `Comprobado en la sede de la Agencia Tributaria el ${f}.`,
    aviso:
      "Un aplazamiento anunciado no es una norma. Mientras no salga en el BOE, lo que obliga son las fechas marcadas «en vigor».",
  },
  en: {
    volver: "All modules",
    queHace: "What it actually does",
    dudas: "What people ask us",
    verDemo: "See the demo",
    pide: "Ask on WhatsApp",
    msg: (n: string) => `Hello, I'm interested in ${n}. Could you tell me how it works?`,
    otras: "Other modules with their own page",
    calendario: "What binds, and from when",
    enVigor: "In force",
    anunciado: "Announced, not yet published",
    comprobado: (f: string) => `Checked on the Spanish tax agency's site on ${f}.`,
    aviso:
      "An announced postponement is not law. Until it appears in the official gazette, the dates marked “in force” are the ones that bind.",
  },
  de: {
    volver: "Alle Module",
    queHace: "Was es genau tut",
    dudas: "Was man uns fragt",
    verDemo: "Demo ansehen",
    pide: "Per WhatsApp fragen",
    msg: (n: string) => `Guten Tag, ich interessiere mich für ${n}. Wie funktioniert das?`,
    otras: "Weitere Module mit eigener Seite",
    calendario: "Was gilt, und ab wann",
    enVigor: "In Kraft",
    anunciado: "Angekündigt, nicht veröffentlicht",
    comprobado: (f: string) => `Am ${f} auf der Seite der spanischen Steuerverwaltung geprüft.`,
    aviso:
      "Eine angekündigte Verschiebung ist kein Gesetz. Solange sie nicht im Gesetzblatt steht, gelten die als „in Kraft“ markierten Fristen.",
  },
};

/* El calendario legal solo se pinta donde tiene sentido. Es la pieza
   que convierte esta página en la respuesta a "cuándo es obligatorio
   verifactu", que es de lejos lo más buscado del tema. */
function Calendario({ lang }: { lang: keyof typeof TX }) {
  const tx = TX[lang];
  const fmt = new Intl.DateTimeFormat(lang === "es" ? "es-ES" : lang === "de" ? "de-DE" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <section className="mx-auto max-w-4xl px-5 pb-4 sm:px-6">
      <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
        <h2 className="flex items-center gap-2 font-display text-[20px] font-semibold">
          <ShieldCheck className="size-5 text-brand" /> {tx.calendario}
        </h2>
        <ul className="mt-5 grid gap-3">
          {HITOS.map((h) => (
            <li key={h.quien} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-line pt-3">
              <span
                className={
                  "rounded-full px-2 py-0.5 text-[12px] font-semibold " +
                  (h.estado === "en-vigor" ? "bg-ok/15 text-ok" : "bg-sun/15 text-sun")
                }
              >
                {h.estado === "en-vigor" ? tx.enVigor : tx.anunciado}
              </span>
              <span className="text-[15.5px] font-semibold tabular">{h.fechaTexto}</span>
              <span className="text-[15px] text-fg-2">{h.quien}</span>
              <span className="text-[13px] text-fg-3">· {h.norma}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-[14px] leading-relaxed text-fg-2">{tx.aviso}</p>
        <p className="mt-2 text-[13px] text-fg-3">{tx.comprobado(fmt.format(new Date(COMPROBADO)))}</p>
      </div>
    </section>
  );
}

export function ModuloPage({ slug }: { slug: LandingSlug }) {
  const lang = useIdioma();
  const tx = TX[lang];
  const landing = landingDe(slug);
  /* No puede ser undefined: data/landings.ts comprueba al arrancar que
     el módulo de cada landing existe en data/modules.ts. */
  const m = moduloDe(lang, landing.modulo)!;
  const seo = textoLanding(lang, slug);
  const mensaje = tx.msg(m.nombre);
  const otras = LANDINGS_PUBLICADAS.filter((s) => s !== slug);

  return (
    <div className="bg-bg text-fg">
      <SiteNav dark />

      {/* El hero replica el de la portada: Caustics de fondo, velo en
          degradado (vertical en móvil, horizontal en escritorio),
          grano al 7 % y desvanecido al color base abajo. La primera
          version de esta pagina era un bloque liso y se notaba al
          instante que no era del mismo sitio. */}
      <section className="relative overflow-hidden bg-[#041820] text-white">
        <div className="absolute inset-0">
          <Caustics />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(4_24_32/0.5)_0%,rgb(4_24_32/0.78)_45%,rgb(4_24_32/0.92)_100%)] lg:bg-[linear-gradient(90deg,rgb(4_24_32/0.88)_0%,rgb(4_24_32/0.6)_55%,rgb(4_24_32/0.35)_100%)]" />
          <div className="grain absolute inset-0 opacity-[0.07] mix-blend-overlay" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#041820]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-5 pt-24 pb-14 sm:px-6 sm:pt-28 lg:pt-32 lg:pb-20">
          <Link href="/modulos" className="fade-up text-[13px] text-white/60 hover:text-white/90">
            ← {tx.volver}
          </Link>
          <div className="fade-up mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[12px] text-white/80 backdrop-blur sm:text-[13px]">
            <Icon name={m.icono} className="size-4" /> {m.nombre}
          </div>
          <h1
            className="fade-up mt-5 font-display text-[42px] leading-[1.02] font-semibold tracking-[-0.03em] min-[400px]:text-[46px] sm:text-[56px]"
            style={{ animationDelay: "80ms" }}
          >
            {seo.h1[0]}
            <br />
            <span className="text-[#8fd9ea]">{seo.h1[1]}</span>
          </h1>
          <p
            className="fade-up mt-4 max-w-xl text-[16px] leading-relaxed text-white/75 sm:mt-5 sm:text-[18px]"
            style={{ animationDelay: "160ms" }}
          >
            {seo.entradilla}
          </p>
          <div className="fade-up mt-7 grid gap-3 sm:mt-8 sm:flex sm:flex-wrap" style={{ animationDelay: "240ms" }}>
            {/* LA DEMO SE ABRE EN ESTE MÓDULO, no por el principio.
                Quien ha leído esta página quiere ver ESTO; que la demo
                arrancara por Dirección le obligaba a buscarlo en el
                menú lateral, que en el móvil ni se ve. El parámetro lo
                lee components/demo/demo-page.tsx. */}
            <Link
              href={`/demo?modulo=${landing.modulo}`}
              className="group flex h-13 items-center justify-center gap-2 rounded-xl bg-sun px-5 text-[16px] font-semibold text-[#1d1300] shadow-[0_10px_30px_-10px_rgb(245_171_46/0.7)] transition hover:brightness-105 sm:h-12 sm:text-[15px]"
            >
              <PlayCircle className="size-5" /> {tx.verDemo}
            </Link>
            <a
              href={whatsappLink(mensaje)}
              target="_blank"
              rel="noreferrer"
              className="vibrar flex h-13 items-center justify-center gap-2 rounded-xl bg-[#157e41] px-5 text-[16px] font-semibold text-white shadow-[0_10px_30px_-10px_rgb(21_126_65/0.7)] transition hover:brightness-110 sm:h-12 sm:text-[15px]"
            >
              <MessageCircle className="size-5" /> {tx.pide}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-5 text-[16.5px] leading-relaxed text-fg-2">
          {seo.intro.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>
      </section>

      {slug === "facturacion-verifactu" ? <Calendario lang={lang} /> : null}

      <section className="mx-auto max-w-4xl px-5 py-14 sm:px-6 sm:py-16">
        <h2 className="flex items-center gap-2 font-display text-[26px] font-semibold sm:text-[32px]">
          <FileCheck2 className="size-6 text-brand" /> {tx.queHace}
        </h2>
        <div className="mt-7 grid gap-5 sm:grid-cols-3">
          {seo.claves.map((c, i) => (
            <motion.div
              key={c.titulo}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-line bg-surface p-5"
            >
              <h3 className="flex items-start gap-2 text-[16px] font-semibold">
                <Check className="mt-0.5 size-4 shrink-0 text-ok" /> {c.titulo}
              </h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-fg-2">{c.texto}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16" id="faq">
          <h2 className="font-display text-[26px] font-semibold sm:text-[32px]">{tx.dudas}</h2>
          <dl className="mt-6 grid gap-6">
            {seo.faq.map(([pregunta, respuesta]) => (
              <div key={pregunta} className="border-t border-line pt-5">
                <dt className="text-[16.5px] font-semibold">{pregunta}</dt>
                <dd className="mt-2 text-[15.5px] leading-relaxed text-fg-2">{respuesta}</dd>
              </div>
            ))}
          </dl>
        </div>

        {otras.length > 0 ? (
          <div className="mt-14">
            <h2 className="text-[13px] font-semibold text-fg-3">{tx.otras}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {otras.map((s) => {
                const otro = moduloDe(lang, landingDe(s).modulo)!;
                return (
                  <Link
                    key={s}
                    href={`/modulos/${s}`}
                    className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2 text-[14px] hover:bg-surface-2"
                  >
                    <Icon name={otro.icono} className="size-4 text-brand" /> {otro.nombre}
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null}
      </section>

      <SiteFooter />
      <ContactDock demoHref={`/demo?modulo=${landing.modulo}`} mensaje={mensaje} />
    </div>
  );
}
