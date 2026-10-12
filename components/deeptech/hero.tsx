"use client";

import Link from "@/components/i18n/Enlace";
import { Check, MessageCircle, PlayCircle } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useIdioma } from "@/components/i18n/idioma";
import type { Idioma } from "@/lib/i18n";
import type { ControlNucleo } from "./nucleo-escena";
import { Nucleo } from "./nucleo";
import { Descifrar, Magnetico } from "./interaccion";

/* Hero de la portada: el núcleo WebGL a la derecha (arriba en el móvil),
   el texto a la izquierda y, alrededor del núcleo, un HUD que explica lo
   que se ve: entra el caos, el núcleo lo ordena, sale el trabajo.

   El registro de abajo repite el día de ejemplo del recorrido de la
   portada (las mismas horas y los mismos pasos) y cada línea nueva lanza
   una onda por la red. Lleva «demo» en el rótulo: son datos de ejemplo. */

const HX = {
  es: { entrada: "Entrada", entradaD: "Llamadas · WhatsApp · Email · Web", nucleo: "Núcleo IA", nucleoD: "Clasifica · Prioriza · Asigna", salida: "Salida", salidaD: "Orden · Parte · Factura · Cobro", registro: "Registro en vivo · demo", pulsa: "Pulsa", desliza: "Desliza", enLinea: "Sistema en línea" },
  en: { entrada: "Input", entradaD: "Calls · WhatsApp · Email · Web", nucleo: "AI core", nucleoD: "Sorts · Prioritises · Assigns", salida: "Output", salidaD: "Order · Report · Invoice · Payment", registro: "Live log · demo", pulsa: "Click", desliza: "Scroll", enLinea: "System online" },
  de: { entrada: "Eingang", entradaD: "Anrufe · WhatsApp · E-Mail · Web", nucleo: "KI-Kern", nucleoD: "Ordnet · Priorisiert · Weist zu", salida: "Ausgang", salidaD: "Auftrag · Bericht · Rechnung · Zahlung", registro: "Live-Protokoll · Demo", pulsa: "Klicken", desliza: "Scrollen", enLinea: "System online" },
} satisfies Record<Idioma, Record<string, string>>;

export type EventoHero = { hora: string; texto: string; modulo: string };

export function HeroNucleo({
  kicker,
  a,
  b,
  p,
  verDemo,
  escribenos,
  waHref,
  sellos,
  eventos,
}: {
  kicker: string;
  a: string;
  b: string;
  p: string;
  verDemo: string;
  escribenos: string;
  waHref: string;
  sellos: readonly string[];
  eventos: EventoHero[];
}) {
  const lang = useIdioma();
  const hx = HX[lang];
  const seccion = useRef<HTMLElement>(null);
  const ancla = useRef<HTMLDivElement>(null);
  const control = useRef<ControlNucleo | null>(null);
  const palabras = a.split(" ");

  return (
    <section ref={seccion} className="dt-hero relative isolate flex min-h-[100svh] flex-col overflow-hidden" data-cursor="3d" data-cursor-texto={hx.pulsa}>
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="dt-rejilla absolute inset-0" />
        <div className="dt-luz-volumen" />
        <Nucleo ancla={ancla} seccion={seccion} control={control} />
        <div className="dt-velo absolute inset-0" />
        <div className="grain absolute inset-0 opacity-[0.05] mix-blend-overlay" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl flex-1 items-center gap-4 px-5 pt-20 pb-6 sm:px-6 lg:grid-cols-[1.06fr_1fr] lg:gap-2 lg:pt-24">
        <div data-scrub="salida-hero" className="relative z-10 max-lg:order-2">
          <div className="dt-entra dt-mono inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pr-3.5 pl-2.5 text-[10px] tracking-[0.06em] text-fg-2 uppercase backdrop-blur-md min-[400px]:text-[11px] sm:text-[11.5px] sm:tracking-[0.12em]">
            <span className="relative grid size-2 place-items-center">
              <i className="absolute inset-0 animate-ping rounded-full bg-[var(--dt-menta)] opacity-60" />
              <i className="size-2 rounded-full bg-[var(--dt-menta)] shadow-[0_0_12px_var(--dt-menta)]" />
            </span>
            {kicker}
          </div>

          <h1 className="mt-6 font-display text-[44px] leading-[0.98] font-semibold tracking-[-0.045em] text-fg min-[400px]:text-[48px] sm:text-[64px] lg:text-[70px] xl:text-[80px]">
            <span className="block">
              {palabras.map((w, i) => (
                <span key={i} className="dt-palabra" style={{ "--d": `${80 + i * 70}ms` } as CSSProperties}>
                  {w}
                  {i < palabras.length - 1 ? " " : ""}
                </span>
              ))}
            </span>
            <span className="dt-palabra dt-texto-luz block pb-1" style={{ "--d": `${120 + palabras.length * 70}ms` } as CSSProperties}>
              {b}
            </span>
          </h1>

          <p className="dt-entra mt-6 max-w-[560px] text-[16.5px] leading-relaxed text-fg-2 sm:text-[18px]" style={{ "--d": "380ms" } as CSSProperties}>
            {p}
          </p>

          <div className="dt-entra mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center" style={{ "--d": "480ms" } as CSSProperties}>
            <Magnetico className="max-sm:w-full">
              <Link href="/demo?tour=1" className="dt-boton dt-boton-primario h-13 w-full px-6 text-[16px] sm:h-12 sm:w-auto sm:text-[15px]">
                <PlayCircle className="size-5" /> <span>{verDemo}</span>
              </Link>
            </Magnetico>
            <Magnetico className="max-sm:w-full">
              <a href={waHref} target="_blank" rel="noreferrer" className="dt-boton dt-boton-cristal h-13 w-full px-6 text-[16px] sm:h-12 sm:w-auto sm:text-[15px]">
                <MessageCircle className="size-5 text-[#25d366]" /> <span>{escribenos}</span>
              </a>
            </Magnetico>
          </div>

          <ul className="dt-entra dt-mono mt-9 grid max-w-[560px] grid-cols-2 gap-x-5 gap-y-2.5 text-[11.5px] tracking-[0.08em] text-fg-3 uppercase" style={{ "--d": "600ms" } as CSSProperties}>
            {sellos.map((x) => (
              <li key={x} className="flex items-center gap-2">
                <Check className="size-3.5 shrink-0 text-[var(--dt-menta)]" /> {x}
              </li>
            ))}
          </ul>
        </div>

        <div ref={ancla} className="dt-ancla relative mx-auto h-[min(270px,32svh)] w-full max-lg:order-1 lg:aspect-square lg:h-auto lg:max-w-[600px]">
          <i className="dt-esquina dt-esquina-1" />
          <i className="dt-esquina dt-esquina-2" />
          <i className="dt-esquina dt-esquina-3" />
          <i className="dt-esquina dt-esquina-4" />
          <Hud num="01" titulo={hx.entrada} texto={hx.entradaD} className="top-[9%] left-[-6%] xl:left-[-10%]" tono="violeta" />
          <Hud num="02" titulo={hx.nucleo} texto={hx.nucleoD} className="top-[2%] right-[2%] items-end text-right" tono="cian" />
          <Hud num="03" titulo={hx.salida} texto={hx.salidaD} className="right-[-2%] bottom-[16%] items-end text-right" tono="menta" />
          <Registro eventos={eventos} control={control} titulo={hx.registro} />
        </div>
      </div>

      <div className="dt-entra relative mx-auto hidden w-full max-w-7xl items-center justify-between px-6 pb-7 lg:flex" style={{ "--d": "800ms" } as CSSProperties}>
        <span className="dt-mono flex items-center gap-3 text-[11px] tracking-[0.18em] text-fg-3 uppercase">
          <span className="dt-raton" aria-hidden="true" />
          {hx.desliza}
        </span>
        <span className="dt-mono flex items-center gap-4 text-[11px] tracking-[0.14em] text-fg-3 uppercase">
          <span>39.5696° N · 2.6502° E · Palma</span>
          <span className="flex items-center gap-1.5 text-[var(--dt-menta)]">
            <i className="size-1.5 rounded-full bg-current shadow-[0_0_8px_currentColor]" /> {hx.enLinea}
          </span>
        </span>
      </div>
    </section>
  );
}

function Hud({ num, titulo, texto, className, tono }: { num: string; titulo: string; texto: string; className?: string; tono: "cian" | "violeta" | "menta" }) {
  return (
    <div className={`dt-hud dt-hud-${tono} dt-entra absolute hidden flex-col gap-1 lg:flex ${className ?? ""}`} style={{ "--d": `${700 + Number(num) * 140}ms` } as CSSProperties}>
      <span className="dt-mono flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] uppercase">
        <span className="opacity-60">{num}</span>
        <i className="dt-hud-raya" />
        {titulo}
      </span>
      <span className="text-[12.5px] text-fg-2">{texto}</span>
    </div>
  );
}

function Registro({ eventos, control, titulo }: { eventos: EventoHero[]; control: React.RefObject<ControlNucleo | null>; titulo: string }) {
  const [i, setI] = useState(0);
  const n = eventos.length;
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setI((x) => (x + 1) % n);
      control.current?.onda();
    }, 3400);
    return () => window.clearInterval(id);
  }, [n, control]);
  const lineas = [i - 2, i - 1, i].map((k) => eventos[(k + n) % n]);
  return (
    <div className="dt-registro dt-entra absolute bottom-[1%] left-[2%] hidden w-[min(330px,64%)] lg:block" style={{ "--d": "1200ms" } as CSSProperties} data-no-onda>
      <div className="dt-mono flex items-center justify-between border-b border-white/[0.07] px-3.5 py-2 text-[10px] tracking-[0.18em] text-fg-3 uppercase">
        <span>{titulo}</span>
        <span className="dt-parpadeo text-[var(--dt-menta)]">● rec</span>
      </div>
      <ol className="dt-mono grid gap-1 px-3.5 py-2.5 text-[11.5px] leading-snug" aria-live="off">
        {lineas.map((e, k) => (
          <li key={`${i}-${k}`} className={k === 2 ? "text-fg" : k === 1 ? "text-fg-2" : "text-fg-3"}>
            <span className="text-[var(--dt-cian)]">[{e.hora}]</span> {k === 2 ? <Descifrar texto={e.texto} /> : e.texto}
            <span className="text-fg-3"> → {e.modulo}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
