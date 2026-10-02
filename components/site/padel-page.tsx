"use client";

import { useEffect, useState } from "react";
import { Check, CircleHelp, MessageCircle, PlayCircle } from "lucide-react";
import { padel } from "@/content/padel";
import { whatsappLink } from "@/data/site";
import { cn } from "@/lib/utils";
import { Caustics } from "./caustics";
import { ContactDock, SiteFooter, SiteNav } from "./chrome";

/* /padel — Nexo Pádel, el producto para clubes y escuelas de pádel.
   Usa la misma cabecera, pie y colores que las páginas de sectores.
   La demo es un HTML aparte (public/padel/demo.html, servido en /padel/demo):
   por eso los enlaces a ella son <a> normales y no el Link con idioma. */

const DEMO = "/padel/demo";

export function PadelPage() {
  const wa = whatsappLink(padel.whatsapp);
  return (
    <div className="bg-bg text-fg">
      <SiteNav dark />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#041820] text-white">
        <div className="absolute inset-0">
          <FondoHero />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(4_24_32/0.55),rgb(4_24_32/0.9))] lg:bg-[linear-gradient(90deg,rgb(4_24_32/0.92),rgb(4_24_32/0.3))]" />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pt-24 pb-14 sm:px-6 sm:pt-28 lg:grid-cols-2 lg:gap-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-[13px] text-white/75">🎾 {padel.hero.etiqueta}</div>
            <h1 className="mt-5 font-display text-[36px] leading-[1.05] font-semibold tracking-tight min-[400px]:text-[40px] sm:text-[56px]">{padel.hero.titulo}</h1>
            <p className="mt-4 max-w-xl text-[16px] text-white/70 sm:text-[17px]">{padel.hero.texto}</p>
            <div className="mt-7 grid gap-3 sm:mt-8 sm:flex sm:flex-wrap">
              <a href={DEMO} className="flex h-13 items-center justify-center gap-2 rounded-xl bg-sun px-5 text-[16px] font-semibold text-[#1d1300] sm:h-12 sm:text-[15px]">
                <PlayCircle className="size-5" /> {padel.hero.verDemo}
              </a>
              <a href={wa} target="_blank" rel="noreferrer" className="vibrar flex h-13 items-center justify-center gap-2 rounded-xl bg-[#1faa59] px-5 text-[16px] font-semibold text-white hover:brightness-110 sm:h-12 sm:text-[15px]">
                <MessageCircle className="size-5" /> {padel.hero.pedir}
              </a>
            </div>
          </div>
          <Chat />
        </div>
      </section>

      {/* Problemas */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20">
        <h2 className="max-w-3xl font-display text-[28px] leading-tight font-semibold tracking-tight sm:text-[38px]">{padel.problemas.titulo}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {padel.problemas.items.map(([titulo, hoy, ahora]) => (
            <div key={titulo} className="rounded-2xl border border-line bg-surface p-6">
              <div className="font-display text-[19px] font-semibold">{titulo}</div>
              <p className="mt-2 text-[15px] text-fg-2">{hoy}</p>
              <p className="mt-3 flex gap-2 text-[15px] font-medium text-brand">
                <span aria-hidden>→</span> {ahora}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Un día en el club */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20">
          <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight sm:text-[38px]">{padel.dia.titulo}</h2>
          <p className="mt-3 text-[16px] text-fg-2">{padel.dia.texto}</p>
          <ol className="mt-8 grid gap-3 lg:grid-cols-2">
            {padel.dia.items.map(([hora, titulo, texto]) => (
              <li key={hora} className="flex gap-4 rounded-2xl bg-surface-2 p-4">
                <span className="w-16 shrink-0 font-mono text-[14px] font-medium text-fg-3">{hora}</span>
                <span>
                  <span className="block font-semibold">{titulo}</span>
                  <span className="block text-[14px] text-fg-2">{texto}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Club y escuela */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20">
        <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight sm:text-[38px]">Un solo programa para la recepción y para la escuela</h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {padel.partes.map((p) => (
            <div key={p.titulo} className="rounded-2xl border border-line bg-surface p-6">
              <div className="text-[13px] font-semibold text-sun">{p.titulo}</div>
              <div className="mt-1 font-display text-[22px] font-semibold">{p.lema}</div>
              <ul className="mt-4 grid gap-2.5 text-[15px]">
                {p.items.map((x) => (
                  <li key={x} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-ok" /> {x}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Fases y piloto */}
      <section id="piloto" className="relative overflow-hidden bg-[#041820] text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20">
          <h2 className="max-w-3xl font-display text-[28px] leading-tight font-semibold tracking-tight sm:text-[38px]">{padel.fases.titulo}</h2>
          <p className="mt-3 max-w-2xl text-[16px] text-white/70">{padel.fases.texto}</p>
          <ol className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {padel.fases.items.map(([cuando, que], i) => (
              <li key={cuando} className="rounded-2xl border border-white/12 bg-white/5 p-5">
                <div className="flex items-center gap-2 text-[13px] font-semibold text-sun">
                  <span className="grid size-6 place-items-center rounded-full bg-sun text-[12px] text-[#1d1300]">{i + 1}</span> {cuando}
                </div>
                <p className="mt-3 text-[15px] text-white/80">{que}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-sun/40 bg-sun/10 p-6 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-3xl text-[16px]">{padel.fases.piloto}</p>
            <a href={wa} target="_blank" rel="noreferrer" className="vibrar flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#1faa59] px-5 text-[15px] font-semibold text-white hover:brightness-110">
              <MessageCircle className="size-5" /> {padel.fases.cta}
            </a>
          </div>
        </div>
      </section>

      {/* Precios */}
      <section id="precios" className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20">
        <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight sm:text-[38px]">{padel.precios.titulo}</h2>
        <p className="mt-3 text-[16px] text-fg-2">{padel.precios.texto}</p>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {padel.precios.planes.map((p) => (
            <div key={p.nombre} className={cn("flex flex-col rounded-2xl border bg-surface p-6", p.destacado ? "border-sun shadow-e3" : "border-line")}>
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
            </div>
          ))}
        </div>
        <p className="mt-4 text-[13px] text-fg-3">{padel.precios.nota}</p>
      </section>

      {/* Preguntas */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 sm:py-20">
          <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight sm:text-[38px]">Lo que nos suelen preguntar</h2>
          <div className="mt-6 grid gap-2">
            {padel.faq.map(([p, r]) => (
              <details key={p} className="group rounded-xl border border-line bg-bg p-4">
                <summary className="flex cursor-pointer list-none items-center gap-2 font-semibold">
                  <CircleHelp className="size-4 shrink-0 text-brand" /> {p}
                </summary>
                <p className="mt-2 text-[15px] text-fg-2">{r}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Cierre */}
      <section className="mx-auto max-w-7xl px-5 py-14 text-center sm:px-6 sm:py-20">
        <h2 className="font-display text-[32px] leading-tight font-semibold tracking-tight sm:text-[44px]">{padel.cierre.titulo}</h2>
        <p className="mt-3 text-[16px] text-fg-2">{padel.cierre.texto}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a href={wa} target="_blank" rel="noreferrer" className="vibrar flex h-12 items-center gap-2 rounded-xl bg-[#1faa59] px-5 text-[15px] font-semibold text-white hover:brightness-110">
            <MessageCircle className="size-5" /> {padel.hero.pedir}
          </a>
          <a href={DEMO} className="flex h-12 items-center gap-2 rounded-xl border border-line bg-surface px-5 text-[15px] font-semibold hover:bg-surface-2">
            <PlayCircle className="size-5" /> Probar la demo ahora
          </a>
        </div>
      </section>

      <SiteFooter />
      <ContactDock demoHref={DEMO} mensaje={padel.whatsapp} />
    </div>
  );
}

/** Fondo del hero: el vídeo del dron si lo hay, y si no, el fondo animado.
    Con «reducir movimiento» activado en el sistema se queda la imagen fija del vídeo. */
function FondoHero() {
  const video = padel.hero.video;
  const [quieto, setQuieto] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setQuieto(m.matches);
    const cambio = () => setQuieto(m.matches);
    m.addEventListener("change", cambio);
    return () => m.removeEventListener("change", cambio);
  }, []);
  if (!video) return <Caustics />;
  if (quieto) return <img src={video.poster} alt="" className="size-full object-cover" />;
  return (
    <video autoPlay muted loop playsInline preload="auto" poster={video.poster} aria-hidden className="size-full object-cover">
      {video.vertical && <source src={video.vertical} type="video/mp4" media="(max-width: 767px)" />}
      <source src={video.horizontal} type="video/mp4" />
    </video>
  );
}

/** Conversación de ejemplo, como se vería en el WhatsApp del club. */
function Chat() {
  return (
    <div className="mx-auto w-full max-w-sm rounded-3xl border border-white/10 bg-[#0b141a] p-4 shadow-e3">
      <div className="flex items-center gap-3 border-b border-white/10 pb-3">
        <span className="grid size-9 place-items-center rounded-full bg-sun font-display text-[14px] font-bold text-[#1d1300]">PD</span>
        <div>
          <div className="text-[14px] font-semibold">Club Pádel Demo</div>
          <div className="text-[12px] text-white/50">Asistente · en línea</div>
        </div>
      </div>
      <div className="mt-3 grid gap-2">
        {padel.hero.chat.map((m, i) => (
          <div
            key={i}
            className={cn(
              "max-w-[85%] rounded-2xl px-3 py-2 text-[14px] leading-snug",
              m.de === "cliente" ? "justify-self-start rounded-tl-sm bg-[#202c33]" : "justify-self-end rounded-tr-sm bg-[#005c4b]",
            )}
          >
            {m.texto}
            <span className="ml-2 align-bottom text-[11px] text-white/50">{m.hora}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[11px] text-white/40">Club y personas de ejemplo</p>
    </div>
  );
}
