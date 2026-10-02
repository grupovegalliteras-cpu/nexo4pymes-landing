"use client";

import { useEffect, useRef, useState } from "react";
import { Check, FilePenLine, Handshake, Languages, LockOpen, MapPin, MessageCircle, PlayCircle, ServerCog, ShieldCheck } from "lucide-react";
import { padel } from "@/content/padel";
import { CONTACTO, whatsappLink } from "@/data/site";
import { cn } from "@/lib/utils";
import { ItemStagger, Reveal, Stagger } from "@/components/motion/Reveal";
import { Caustics } from "./caustics";
import { ContactDock, SiteFooter, SiteNav } from "./chrome";
import { Calculadora, ChatAnimado, LineaDelDia, Preguntas, VistaDemo } from "./padel-animado";

/* /padel — Nexo Pádel, el producto para clubes y escuelas de pádel.
   Usa la misma cabecera, pie y colores que las páginas de sectores, pero con su propio menú:
   los enlaces de arriba llevan a las secciones de esta página y el botón principal, al
   WhatsApp de pádel. Las piezas con movimiento están en padel-animado.tsx.
   La demo es un HTML aparte (public/padel/demo.html, servido en /padel/demo):
   por eso los enlaces a ella son <a> normales y no el Link con idioma. */

const DEMO = "/padel/demo";

const ICONOS_CONFIANZA = { datos: ServerCog, contrato: FilePenLine, whatsapp: ShieldCheck, pistas: Handshake } as const;
const ICONOS_EQUIPO = [Check, Languages, LockOpen];

const titulo2 = "font-display text-[28px] leading-tight font-semibold tracking-tight text-balance sm:text-[38px]";
const etiqueta = "text-[13px] font-semibold tracking-wide text-brand uppercase";

export function PadelPage() {
  const wa = whatsappLink(padel.whatsapp);
  return (
    <div className="pagina-padel bg-bg text-fg">
      <SiteNav dark enlaces={padel.nav} demo={DEMO} cta={{ texto: padel.navCta, href: wa }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#041820] text-white">
        <div className="absolute inset-0">
          <FondoHero />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(4_24_32/0.55),rgb(4_24_32/0.9))] lg:bg-[linear-gradient(90deg,rgb(4_24_32/0.92),rgb(4_24_32/0.3))]" />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pt-24 pb-14 sm:px-6 sm:pt-28 lg:grid-cols-2 lg:gap-10 lg:pb-20">
          <div>
            <div className="fade-up inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[13px] text-white/80 backdrop-blur">🎾 {padel.hero.etiqueta}</div>
            <h1 className="mt-5 font-display text-[36px] leading-[1.05] font-semibold tracking-tight min-[400px]:text-[40px] sm:text-[56px]">
              <Titular texto={padel.hero.titulo} resaltar="WhatsApp" />
            </h1>
            <p className="fade-up mt-4 max-w-xl text-[16px] text-white/75 sm:text-[17px]" style={{ animationDelay: "0.35s" }}>
              {padel.hero.texto}
            </p>
            <div className="fade-up mt-7 grid gap-3 sm:mt-8 sm:flex sm:flex-wrap" style={{ animationDelay: "0.5s" }}>
              <a href={DEMO} className="flex h-13 items-center justify-center gap-2 rounded-xl bg-sun px-5 text-[16px] font-semibold text-[#1d1300] shadow-[0_10px_30px_-10px_rgb(245_171_46/0.6)] transition hover:-translate-y-0.5 hover:brightness-105 sm:h-12 sm:text-[15px]">
                <PlayCircle className="size-5" /> {padel.hero.verDemo}
              </a>
              <a href={wa} target="_blank" rel="noreferrer" className="vibrar flex h-13 items-center justify-center gap-2 rounded-xl bg-[#1faa59] px-5 text-[16px] font-semibold text-white hover:brightness-110 sm:h-12 sm:text-[15px]">
                <MessageCircle className="size-5" /> {padel.hero.pedir}
              </a>
            </div>
            <ul className="fade-up mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-white/70" style={{ animationDelay: "0.65s" }}>
              {padel.hero.garantias.map((g) => (
                <li key={g} className="flex items-center gap-1.5">
                  <Check className="size-4 text-[#25d366]" /> {g}
                </li>
              ))}
            </ul>
          </div>
          <div className="fade-up" style={{ animationDelay: "0.3s" }}>
            <ChatAnimado />
          </div>
        </div>
      </section>

      {/* Confianza */}
      <section className="border-b border-line bg-surface">
        <Stagger as="ul" className="mx-auto grid max-w-7xl gap-x-6 gap-y-5 px-5 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {padel.confianza.map(([icono, titulo, texto]) => {
            const Icono = ICONOS_CONFIANZA[icono as keyof typeof ICONOS_CONFIANZA] ?? ShieldCheck;
            return (
              <ItemStagger as="li" key={titulo} className="flex gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
                  <Icono className="size-5" />
                </span>
                <span>
                  <span className="block text-[15px] font-semibold">{titulo}</span>
                  <span className="block text-[14px] text-fg-2">{texto}</span>
                </span>
              </ItemStagger>
            );
          })}
        </Stagger>
      </section>

      {/* Problemas */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20">
        <Reveal>
          <h2 className={cn(titulo2, "max-w-3xl")}>{padel.problemas.titulo}</h2>
        </Reveal>
        <Stagger className="mt-8 grid gap-4 sm:grid-cols-2">
          {padel.problemas.items.map(([titulo, hoy, ahora]) => (
            <ItemStagger key={titulo} className="group rounded-2xl border border-line bg-surface p-6 transition hover:-translate-y-0.5 hover:shadow-e2">
              <div className="font-display text-[19px] font-semibold">{titulo}</div>
              <p className="mt-3 text-[15px] text-fg-2">
                <span className="mr-2 rounded-md bg-bad-soft px-1.5 py-0.5 text-[12px] font-semibold text-bad">Hoy</span>
                {hoy}
              </p>
              <p className="mt-3 text-[15px] font-medium">
                <span className="mr-2 rounded-md bg-ok-soft px-1.5 py-0.5 text-[12px] font-semibold text-ok">Con Nexo Pádel</span>
                <span className="text-brand">{ahora}</span>
              </p>
            </ItemStagger>
          ))}
        </Stagger>
      </section>

      {/* El programa por dentro */}
      <section id="como-funciona" className="scroll-mt-16 border-y border-line bg-surface-2/60">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal className="max-w-2xl">
              <div className={etiqueta}>{padel.panel.etiqueta}</div>
              <h2 className={cn(titulo2, "mt-2")}>{padel.panel.titulo}</h2>
              <p className="mt-3 text-[16px] text-fg-2">{padel.panel.texto}</p>
            </Reveal>
            <Reveal retraso={0.05} className="hidden md:block">
              <a href={DEMO} className="inline-flex h-12 items-center gap-2 rounded-xl bg-sun px-5 text-[15px] font-semibold text-[#1d1300] transition hover:-translate-y-0.5 hover:brightness-105">
                <PlayCircle className="size-5" /> {padel.panel.cta}
              </a>
              <p className="mt-2 text-center text-[13px] text-fg-3">{padel.panel.nota}</p>
            </Reveal>
          </div>
          <Reveal direccion="escala" retraso={0.1} className="mt-8 sm:mt-10">
            <VistaDemo />
          </Reveal>
        </div>
      </section>

      {/* Un día en el club */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20">
        <Reveal className="text-center">
          <h2 className={titulo2}>{padel.dia.titulo}</h2>
          <p className="mt-3 text-[16px] text-fg-2">{padel.dia.texto}</p>
        </Reveal>
        <LineaDelDia />
      </section>

      {/* Club y escuela */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20">
          <Reveal>
            <h2 className={titulo2}>Un solo programa para la recepción y para la escuela</h2>
          </Reveal>
          <Stagger className="mt-8 grid gap-4 lg:grid-cols-2">
            {padel.partes.map((p) => (
              <ItemStagger key={p.titulo} className="rounded-2xl border border-line bg-bg p-6 transition hover:shadow-e2">
                <div className="text-[13px] font-semibold text-sun">{p.titulo}</div>
                <div className="mt-1 font-display text-[22px] font-semibold">{p.lema}</div>
                <ul className="mt-4 grid gap-2.5 text-[15px]">
                  {p.items.map((x) => (
                    <li key={x} className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-ok" /> {x}
                    </li>
                  ))}
                </ul>
              </ItemStagger>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Calculadora */}
      <section id="calculadora" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-14 sm:px-6 sm:py-20">
        <Reveal>
          <div className={etiqueta}>{padel.calculadora.etiqueta}</div>
          <h2 className={cn(titulo2, "mt-2")}>{padel.calculadora.titulo}</h2>
          <p className="mt-3 text-[16px] text-fg-2">{padel.calculadora.texto}</p>
        </Reveal>
        <Reveal retraso={0.05}>
          <Calculadora />
        </Reveal>
      </section>

      {/* Cómo empezamos */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20">
          <Reveal>
            <h2 className={titulo2}>{padel.empezar.titulo}</h2>
            <p className="mt-3 text-[16px] text-fg-2">{padel.empezar.texto}</p>
          </Reveal>
          <Stagger className="relative mt-10 grid gap-8 md:grid-cols-3 md:gap-6" intervalo={0.12}>
            <span className="absolute top-7 right-[17%] left-[17%] hidden h-px bg-[repeating-linear-gradient(90deg,var(--border-strong)_0_6px,transparent_6px_12px)] md:block" aria-hidden />
            {padel.empezar.pasos.map(([titulo, texto], i) => (
              <ItemStagger key={titulo} className="relative px-2 text-center">
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-[#041820] font-display text-[22px] font-semibold text-sun ring-8 ring-surface">{i + 1}</span>
                <div className="mt-4 font-display text-[20px] font-semibold">{titulo}</div>
                <p className="mt-2 text-[15px] text-fg-2">{texto}</p>
              </ItemStagger>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Fases y piloto */}
      <section id="piloto" className="relative scroll-mt-16 overflow-hidden bg-[#041820] text-white">
        <div className="pointer-events-none absolute -top-40 right-0 size-[420px] rounded-full bg-sun/10 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20">
          <Reveal>
            <h2 className={cn(titulo2, "max-w-3xl")}>{padel.fases.titulo}</h2>
            <p className="mt-3 max-w-2xl text-[16px] text-white/70">{padel.fases.texto}</p>
          </Reveal>
          <Stagger as="div" className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {padel.fases.items.map(([cuando, que], i) => (
              <ItemStagger key={cuando} className="rounded-2xl border border-white/12 bg-white/5 p-5 transition hover:border-sun/40 hover:bg-white/[0.07]">
                <div className="flex items-center gap-2 text-[13px] font-semibold text-sun">
                  <span className="grid size-6 place-items-center rounded-full bg-sun text-[12px] text-[#1d1300]">{i + 1}</span> {cuando}
                </div>
                <p className="mt-3 text-[15px] text-white/80">{que}</p>
              </ItemStagger>
            ))}
          </Stagger>
          <Reveal retraso={0.1}>
            <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-sun/40 bg-sun/10 p-6 lg:flex-row lg:items-center lg:justify-between">
              <p className="max-w-3xl text-[16px]">{padel.fases.piloto}</p>
              <a href={wa} target="_blank" rel="noreferrer" className="vibrar flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#1faa59] px-5 text-[15px] font-semibold text-white hover:brightness-110">
                <MessageCircle className="size-5" /> {padel.fases.cta}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Precios */}
      <section id="precios" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-14 sm:px-6 sm:py-20">
        <Reveal>
          <h2 className={titulo2}>{padel.precios.titulo}</h2>
          <p className="mt-3 text-[16px] text-fg-2">{padel.precios.texto}</p>
        </Reveal>
        <Stagger className="mt-8 grid gap-4 lg:grid-cols-3">
          {padel.precios.planes.map((p) => (
            <ItemStagger key={p.nombre} className={cn("relative flex flex-col rounded-2xl border bg-surface p-6 transition hover:-translate-y-0.5", p.destacado ? "border-sun shadow-e3 lg:-my-2 lg:py-8" : "border-line hover:shadow-e2")}>
              {p.destacado && <span className="absolute -top-3 left-6 rounded-full bg-sun px-3 py-0.5 text-[12px] font-semibold text-[#1d1300]">{padel.precios.recomendado}</span>}
              <div className="font-display text-[22px] font-semibold">{p.nombre}</div>
              <div className="text-[14px] text-fg-3">{p.para}</div>
              <div className="mt-4 font-display text-[36px] font-semibold">
                {p.precio}
                {p.precio.endsWith("€") && <span className="text-[15px] font-normal text-fg-3"> /mes</span>}
              </div>
              <ul className="mt-4 grid gap-2 text-[15px]">
                {p.items.map((x) => (
                  <li key={x} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-ok" /> {x}
                  </li>
                ))}
              </ul>
            </ItemStagger>
          ))}
        </Stagger>
        <Reveal retraso={0.1}>
          <p className="mt-6 flex items-start gap-2 rounded-xl bg-ok-soft px-4 py-3 text-[15px] font-medium text-ok">
            <Check className="mt-0.5 size-4 shrink-0" /> {padel.precios.piloto}
          </p>
          <p className="mt-4 text-[13px] text-fg-3">{padel.precios.nota}</p>
        </Reveal>
      </section>

      {/* Quién hay detrás */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <Reveal>
            <div className={etiqueta}>{padel.equipo.etiqueta}</div>
            <h2 className={cn(titulo2, "mt-2")}>{padel.equipo.titulo}</h2>
            <p className="mt-3 text-[16px] text-fg-2">{padel.equipo.texto}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={wa} target="_blank" rel="noreferrer" className="flex h-12 items-center gap-2 rounded-xl bg-[#1faa59] px-5 text-[15px] font-semibold text-white hover:brightness-110">
                <MessageCircle className="size-5" /> WhatsApp {CONTACTO.whatsappVisible}
              </a>
              <span className="flex items-center gap-1.5 text-[14px] text-fg-2">
                <MapPin className="size-4 text-brand" /> {CONTACTO.ciudad}
              </span>
            </div>
          </Reveal>
          <Stagger className="grid gap-3">
            {padel.equipo.puntos.map(([titulo, texto], i) => {
              const Icono = ICONOS_EQUIPO[i] ?? Check;
              return (
                <ItemStagger key={titulo} direccion="derecha" className="flex gap-4 rounded-2xl border border-line bg-bg p-5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
                    <Icono className="size-5" />
                  </span>
                  <span>
                    <span className="block font-semibold">{titulo}</span>
                    <span className="mt-0.5 block text-[15px] text-fg-2">{texto}</span>
                  </span>
                </ItemStagger>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Preguntas */}
      <section id="preguntas" className="scroll-mt-20">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 sm:py-20">
          <Reveal>
            <h2 className={titulo2}>Lo que nos suelen preguntar</h2>
          </Reveal>
          <Preguntas />
        </div>
      </section>

      {/* Cierre */}
      <section className="relative overflow-hidden bg-[#041820] text-white">
        <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden>
          <Caustics />
        </div>
        <Reveal className="relative mx-auto max-w-7xl px-5 py-16 text-center sm:px-6 sm:py-24">
          <h2 className="font-display text-[34px] leading-tight font-semibold tracking-tight sm:text-[48px]">{padel.cierre.titulo}</h2>
          <p className="mt-3 text-[16px] text-white/70 sm:text-[17px]">{padel.cierre.texto}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={wa} target="_blank" rel="noreferrer" className="vibrar flex h-12 items-center gap-2 rounded-xl bg-[#1faa59] px-5 text-[15px] font-semibold text-white hover:brightness-110">
              <MessageCircle className="size-5" /> {padel.hero.pedir}
            </a>
            <a href={DEMO} className="flex h-12 items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 text-[15px] font-semibold text-white transition hover:bg-white/10">
              <PlayCircle className="size-5" /> Probar la demo ahora
            </a>
          </div>
          <p className="mt-6 text-[13px] text-white/50">
            {padel.hero.garantias.join(" · ")} · WhatsApp {CONTACTO.whatsappVisible}
          </p>
        </Reveal>
      </section>

      <SiteFooter />
      <ContactDock demoHref={DEMO} mensaje={padel.whatsapp} />
    </div>
  );
}

/** Titular que entra palabra a palabra con CSS (sin depender de JavaScript). Con
    «reducir movimiento» la regla de globals.css deja las palabras quietas desde el principio. */
function Titular({ texto, resaltar }: { texto: string; resaltar?: string }) {
  const palabras = texto.split(" ");
  return (
    <>
      {palabras.map((p, i) => (
        <span key={i}>
          <span className={cn("palabra-sube", resaltar && p.includes(resaltar) && "texto-whatsapp")} style={{ animationDelay: `${0.05 + i * 0.045}s` }}>
            {p}
          </span>
          {i < palabras.length - 1 && " "}
        </span>
      ))}
    </>
  );
}

/** Fondo del hero: el vídeo del dron si lo hay, y si no, el fondo animado.
    Con «reducir movimiento» activado en el sistema se queda la imagen fija del vídeo. */
function FondoHero() {
  const video = padel.hero.video;
  const ref = useRef<HTMLVideoElement>(null);
  const [quieto, setQuieto] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setQuieto(m.matches);
    const cambio = () => setQuieto(m.matches);
    m.addEventListener("change", cambio);
    return () => m.removeEventListener("change", cambio);
  }, []);
  // algunos navegadores no arrancan solos el vídeo tras cargar la página: se lo pedimos.
  // Si lo bloquean (ahorro de batería, por ejemplo), se queda la imagen fija.
  useEffect(() => {
    ref.current?.play().catch(() => {});
  }, [quieto]);
  if (!video) return <Caustics />;
  if (quieto) return <img src={video.poster} alt="" className="size-full object-cover" />;
  return (
    <video ref={ref} autoPlay muted loop playsInline preload="auto" poster={video.poster} aria-hidden className="size-full object-cover">
      {video.vertical && <source src={video.vertical} type="video/mp4" media="(max-width: 767px)" />}
      <source src={video.horizontal} type="video/mp4" />
    </video>
  );
}
