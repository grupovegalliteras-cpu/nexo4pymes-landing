"use client";

import Link from "@/components/i18n/Enlace";
import { motion } from "motion/react";
import { Check, MessageCircle, PhoneIncoming, PlayCircle, Smartphone } from "lucide-react";
import { whatsappLink } from "@/data/site";
import { useEffect } from "react";
import type { SectorId } from "@/data/sectors";
import { sectorDe, sectoresDe } from "@/data/sectors-i18n";
import { textoSector } from "@/content/sectores-seo-i18n";
import { useFmt, useIdioma } from "@/components/i18n/idioma";

/* Rótulos de las secciones nuevas. El texto largo de cada sector vive
   en content/sectores-seo.ts (y sus hermanos en/ y de/). */
const TX2 = {
  es: {
    comoEs: "Cómo es el día en",
    queCambia: "Qué cambia con Nexo4Pymes",
    preguntas: "Preguntas frecuentes",
    seguir: "Para seguir leyendo",
    posts: [
      ["Cómo organizar llamadas, WhatsApp y avisos de clientes", "/blog/centralizar-avisos-llamadas-whatsapp-mallorca"],
      ["Cómo dejar de hacer presupuestos a mano", "/blog/automatizar-presupuestos-pymes-mallorca"],
      ["Qué construimos y cómo trabajamos", "/servicios"],
    ] as [string, string][],
  },
  en: {
    comoEs: "What the day looks like:",
    queCambia: "What changes with Nexo4Pymes",
    preguntas: "Frequently asked questions",
    seguir: "Further reading",
    posts: [
      ["How to organise calls, WhatsApp and customer requests", "/blog/centralizar-avisos-llamadas-whatsapp-mallorca"],
      ["How to stop writing quotes by hand", "/blog/automatizar-presupuestos-pymes-mallorca"],
      ["What we build and how we work", "/servicios"],
    ] as [string, string][],
  },
  de: {
    comoEs: "So sieht der Tag aus:",
    queCambia: "Was sich mit Nexo4Pymes ändert",
    preguntas: "Häufige Fragen",
    seguir: "Weiterlesen",
    posts: [
      ["Anrufe, WhatsApp und Kundenanfragen ordnen", "/blog/centralizar-avisos-llamadas-whatsapp-mallorca"],
      ["Aufhören, Angebote von Hand zu schreiben", "/blog/automatizar-presupuestos-pymes-mallorca"],
      ["Was wir bauen und wie wir arbeiten", "/servicios"],
    ] as [string, string][],
  },
};

const TX = {
  es: { h1: (n: string) => `Tu empresa de ${n.toLowerCase()}, sin papeles ni llamadas perdidas`, asi: "Así lo resolvemos para empresas como la tuya.", verDemo: "Ver la demo", de: (e: string) => ` de ${e}`, enVivo: " en vivo", pide: "Pide la tuya por WhatsApp", tipico: "Un aviso típico", parte: "El parte del técnico", mediciones: "Mediciones propias del sector", a: "a", servicios: "Servicios y precios de ejemplo en la demo", desde: "Desde", otros: "Otros sectores", msg: (n: string) => `Hola, tengo una empresa de ${n.toLowerCase()} y he visto vuestra demo. Me gustaría verla con los datos de mi empresa.` },
  en: { h1: (n: string) => `Your ${n.toLowerCase()} business, with no paperwork and no missed calls`, asi: "This is how we solve it for companies like yours.", verDemo: "See the demo", de: (e: string) => ` of ${e}`, enVivo: " live", pide: "Get yours via WhatsApp", tipico: "A typical request", parte: "The technician's job report", mediciones: "Industry-specific readings", a: "to", servicios: "Sample services and prices in the demo", desde: "From", otros: "Other industries", msg: (n: string) => `Hi, I run a ${n.toLowerCase()} business and I've seen your demo. I'd like to see it with my company's data.` },
  de: { h1: (n: string) => `Ihr Betrieb (${n}) ohne Papierkram und verpasste Anrufe`, asi: "So lösen wir das für Firmen wie Ihre.", verDemo: "Demo ansehen", de: (e: string) => `: ${e}`, enVivo: " live", pide: "Ihre Version per WhatsApp anfragen", tipico: "Eine typische Anfrage", parte: "Der Arbeitsbericht des Technikers", mediciones: "Branchenspezifische Messwerte", a: "bis", servicios: "Beispielleistungen und -preise in der Demo", desde: "Ab", otros: "Weitere Branchen", msg: (n: string) => `Hallo, ich habe einen Betrieb im Bereich ${n} und habe eure Demo gesehen. Ich würde sie gern mit den Daten meiner Firma sehen.` },
};
import { useDemo } from "@/store/demo";
import { useHydrated } from "@/components/providers";
import { Icon } from "@/components/icon";
import { Caustics } from "./caustics";
import { ContactDock, SiteFooter, SiteNav } from "./chrome";
import { HeroAnim } from "./hero-anim";

export function SectorPage({ id }: { id: SectorId }) {
  const lang = useIdioma();
  const tx = TX[lang];
  const fmt = useFmt();
  const s = sectorDe(lang, id);
  const seo = textoSector(lang, id);
  const t2 = TX2[lang];
  const hydrated = useHydrated();
  const mensaje = tx.msg(s.nombre);
  // Una sola vez al abrir: si luego otra pestaña cambia de sector, no se lo disputamos (evita un bucle entre pestañas).
  useEffect(() => {
    if (!hydrated) return;
    const st = useDemo.getState();
    if (st.sector !== id) st.setSector(id);
  }, [hydrated, id]);

  return (
    <div className="bg-bg text-fg">
      <SiteNav dark />
      <section className="relative overflow-hidden bg-[#041820] text-white">
        <div className="absolute inset-0">
          <Caustics />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(4_24_32/0.55),rgb(4_24_32/0.9))] lg:bg-[linear-gradient(90deg,rgb(4_24_32/0.92),rgb(4_24_32/0.3))]" />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pt-24 pb-14 sm:px-6 sm:pt-28 lg:grid-cols-2 lg:gap-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-[13px] text-white/75">
              <Icon name={s.icono} className="size-4" /> {s.nombre}
            </div>
            <h1 className="mt-5 font-display text-[36px] leading-[1.05] font-semibold tracking-tight min-[400px]:text-[40px] sm:text-[56px]">
              {tx.h1(s.nombre)}
            </h1>
            <p className="mt-4 max-w-xl text-[16px] text-white/70 sm:text-[17px]">{s.dolor} {tx.asi}</p>
            <div className="mt-7 grid gap-3 sm:mt-8 sm:flex sm:flex-wrap">
              <Link href={`/demo?sector=${s.id}&tour=1`} className="flex h-13 items-center justify-center gap-2 rounded-xl bg-sun px-5 text-[16px] font-semibold text-[#1d1300] sm:h-12 sm:text-[15px]">
                <PlayCircle className="size-5" /> {tx.verDemo}
                <span className="-ml-2 max-sm:hidden">{tx.de(s.empresa)}</span>
                <span className="-ml-2 sm:hidden">{tx.enVivo}</span>
              </Link>
              <a href={whatsappLink(mensaje)} target="_blank" rel="noreferrer" className="vibrar flex h-13 items-center justify-center gap-2 rounded-xl bg-[#1faa59] px-5 text-[16px] font-semibold text-white hover:brightness-110 sm:h-12 sm:text-[15px]">
                <MessageCircle className="size-5" /> {tx.pide}
              </a>
            </div>
          </div>
          <HeroAnim />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl border border-line bg-surface p-6">
            <h2 className="flex items-center gap-2 text-[13px] font-semibold text-sun">
              <PhoneIncoming className="size-4" /> {tx.tipico}
            </h2>
            <p className="mt-3 font-display text-[20px] leading-snug font-semibold">«{s.llamada.lineas.find((l) => l[0] === "cliente" && l[1].length > 40)?.[1]}»</p>
            <p className="mt-3 text-[14px] text-fg-2">{s.llamada.resumen}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="rounded-2xl border border-line bg-surface p-6">
            <h2 className="flex items-center gap-2 text-[13px] font-semibold text-brand">
              <Smartphone className="size-4" /> {tx.parte}
            </h2>
            <ul className="mt-3 grid gap-2 text-[14px]">
              {s.checklist.map((c) => (
                <li key={c} className="flex items-center gap-2">
                  <Check className="size-4 text-ok" /> {c}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.16 }} className="rounded-2xl border border-line bg-surface p-6">
            <h2 className="text-[13px] font-semibold text-ai">{tx.mediciones}</h2>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {s.mediciones.map((m) => (
                <div key={m.nombre} className="rounded-xl bg-surface-2 p-3">
                  <div className="text-[12px] text-fg-3">{m.nombre}</div>
                  <div className="font-display text-lg font-semibold tabular">
                    {fmt.num(m.ok[0], m.dec)} {tx.a} {fmt.num(m.ok[1], m.dec)} <span className="text-xs font-normal text-fg-3">{m.unidad}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="mt-6 rounded-2xl border border-line bg-surface p-6">
          <h2 className="text-[13px] font-semibold text-fg-2">{tx.servicios}</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {s.servicios.map((x) => (
              <div key={x.nombre} className="rounded-xl bg-surface-2 p-3">
                <div className="text-[14px] font-medium">{x.nombre}</div>
                <div className="text-[13px] text-fg-3">
                  {tx.desde} {fmt.eur0(x.precio)}, {fmt.dur(x.min)}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* ---------- Cómo es el día ----------
            Prosa, y no otra tarjeta más. Una página de sector sin texto
            corrido no contesta a ninguna búsqueda: es el motivo por el
            que estas ocho páginas existían y no las encontraba nadie. */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <div>
            <h2 className="font-display text-[24px] leading-tight font-semibold tracking-tight sm:text-[30px]">
              {t2.comoEs} {s.nombre.toLowerCase()}
            </h2>
            {seo.intro.map((parrafo) => (
              <p key={parrafo.slice(0, 40)} className="mt-4 max-w-[62ch] text-[16px] leading-relaxed text-fg-2 sm:text-[17px]">
                {parrafo}
              </p>
            ))}
          </div>

          <div>
            <h2 className="font-display text-[24px] leading-tight font-semibold tracking-tight sm:text-[30px]">
              {t2.queCambia}
            </h2>
            <ul className="mt-5 grid gap-4">
              {seo.claves.map((clave) => (
                <li key={clave.titulo} className="rounded-2xl border border-line bg-surface p-5">
                  <h3 className="flex items-start gap-2 text-[15.5px] font-semibold">
                    <Check className="mt-0.5 size-4 shrink-0 text-ok" />
                    {clave.titulo}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-fg-2">{clave.texto}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------- Preguntas ----------
            Las mismas que se publican como FAQPage en la página de
            servidor. Cada respuesta tiene que poder leerse suelta: así
            es como la recorta un buscador de respuestas. */}
        <div className="mt-14 max-w-[70ch]">
          <h2 className="font-display text-[24px] leading-tight font-semibold tracking-tight sm:text-[30px]">
            {t2.preguntas}
          </h2>
          <dl className="mt-6 grid gap-6">
            {seo.faq.map(([pregunta, respuesta]) => (
              <div key={pregunta} className="border-t border-line pt-5">
                <dt className="text-[16.5px] font-semibold">{pregunta}</dt>
                <dd className="mt-2 text-[15.5px] leading-relaxed text-fg-2">{respuesta}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-12 rounded-2xl border border-line bg-surface-2/60 p-5 sm:p-6">
          <h2 className="text-[13px] font-semibold text-fg-3">{t2.seguir}</h2>
          <ul className="mt-3 grid gap-2.5 sm:grid-cols-3">
            {t2.posts.map(([titulo, href]) => (
              <li key={href}>
                <Link href={href} className="flex items-start gap-2 text-[14.5px] leading-snug text-brand hover:underline">
                  <span aria-hidden="true" className="mt-0.5">→</span>
                  {titulo}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14">
          <h2 className="text-[13px] font-semibold text-fg-3">{tx.otros}</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {sectoresDe(lang).filter((x) => x.id !== s.id).map((x) => (
              <Link key={x.id} href={`/sectores/${x.id}`} className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2 text-[14px] hover:bg-surface-2">
                <Icon name={x.icono} className="size-4 text-brand" /> {x.nombre}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
      <ContactDock demoHref={`/demo?sector=${s.id}&tour=1`} mensaje={mensaje} />
    </div>
  );
}
