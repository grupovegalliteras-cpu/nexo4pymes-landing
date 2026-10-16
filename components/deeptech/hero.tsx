"use client";

import Link from "@/components/i18n/Enlace";
import { Check, MessageCircle, PlayCircle } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useIdioma } from "@/components/i18n/idioma";
import type { Idioma } from "@/lib/i18n";
import type { ControlNucleo } from "./nucleo-escena";
import { Nucleo } from "./nucleo";
import { quietoPorPreferencia } from "./decision-movimiento";
import { Magnetico } from "./interaccion";

/* Hero de la portada: el núcleo WebGL a la derecha (arriba en el móvil) y
   el texto a la izquierda. La escena es abstracta, así que va explicada en
   tres pasos con palabras de todos los días: llegan los avisos, se ordenan
   solos, sale el trabajo. En escritorio, alrededor del núcleo; en el
   móvil, en una fila debajo.

   El cuadro de abajo repite el día de ejemplo del recorrido de la portada
   (las mismas horas y los mismos pasos) y cada línea nueva lanza una onda
   por la red. Dice «de ejemplo» porque lo es. */

const HX = {
  es: {
    pasos: [
      ["Llegan los avisos", "Llamadas, WhatsApp, email y web"],
      ["Se ordenan solos", "La IA los clasifica y los asigna"],
      ["Sale el trabajo", "Orden, parte, factura y cobro"],
    ],
    registro: "Un día de ejemplo",
    desliza: "Cómo funciona, aquí debajo",
  },
  en: {
    pasos: [
      ["Requests come in", "Calls, WhatsApp, email and web"],
      ["They sort themselves", "AI classifies and assigns them"],
      ["The job goes out", "Order, report, invoice and payment"],
    ],
    registro: "A sample day",
    desliza: "Scroll to see how it works",
  },
  de: {
    pasos: [
      ["Anfragen kommen rein", "Anrufe, WhatsApp, E-Mail und Web"],
      ["Sie ordnen sich selbst", "Die KI ordnet sie ein und weist sie zu"],
      ["Der Auftrag geht raus", "Auftrag, Bericht, Rechnung und Zahlung"],
    ],
    registro: "Ein Beispieltag",
    desliza: "Scrollen Sie, um zu sehen, wie es funktioniert",
  },
} satisfies Record<Idioma, unknown>;

export type EventoHero = { hora: string; texto: string };

export function HeroNucleo({
  kicker,
  a,
  b,
  linea,
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
  /** Qué es lo de debajo: el programa de servicios como ejemplo del software a medida. */
  linea: string;
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
    <section ref={seccion} className="dt-hero relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="dt-rejilla absolute inset-0" />
        <div className="dt-luz-volumen" />
        <Nucleo ancla={ancla} seccion={seccion} control={control} />
        <div className="dt-velo absolute inset-0" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl flex-1 items-center gap-4 px-5 pt-20 pb-6 sm:px-6 lg:grid-cols-[1.06fr_1fr] lg:gap-2 lg:pt-24">
        <div data-scrub="salida-hero" className="dt-sobre-escena relative z-10 max-lg:pt-[12svh]">
          <div className="dt-entra inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-[#070a10] py-1.5 pr-3.5 pl-2.5 text-[13px] font-medium text-fg-2 sm:text-[14px]">
            <i className="size-2 shrink-0 rounded-full bg-[var(--dt-menta)] shadow-[0_0_12px_var(--dt-menta)]" />
            {kicker}
          </div>

          <h1 className="mt-6 font-display text-[44px] leading-[0.98] font-semibold tracking-[-0.045em] text-fg min-[400px]:text-[48px] sm:text-[64px] lg:text-[70px] xl:text-[80px]">
            <span className="block">
              {palabras.map((w, i) => (
                <span key={i} className="dt-palabra" style={{ "--d": `${40 + i * 50}ms` } as CSSProperties}>
                  {w}
                  {i < palabras.length - 1 ? " " : ""}
                </span>
              ))}
            </span>
            <span className="dt-palabra dt-texto-luz block pb-1" style={{ "--d": `${80 + palabras.length * 50}ms` } as CSSProperties}>
              {b}
            </span>
          </h1>

          <p className="dt-entra mt-6 max-w-[560px] text-[17px] leading-snug font-medium text-fg sm:text-[19px]" style={{ "--d": "180ms" } as CSSProperties}>
            {linea}
          </p>
          <p className="dt-entra mt-3 max-w-[560px] text-[16px] leading-relaxed text-fg-2 sm:text-[17px]" style={{ "--d": "220ms" } as CSSProperties}>
            {p}
          </p>

          <div className="dt-entra mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center" style={{ "--d": "260ms" } as CSSProperties}>
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

          <ul className="dt-entra mt-8 grid max-w-[560px] grid-cols-2 gap-x-5 gap-y-2 text-[14px] text-fg-2" style={{ "--d": "320ms" } as CSSProperties}>
            {sellos.map((x) => (
              <li key={x} className="flex items-center gap-2">
                <Check className="size-4 shrink-0 text-[var(--dt-menta)]" /> {x}
              </li>
            ))}
          </ul>

          {/* en el móvil, los tres pasos que explican la escena de detrás */}
          <ol className="dt-entra mt-7 grid grid-cols-3 gap-2 text-center lg:hidden" style={{ "--d": "380ms" } as CSSProperties}>
            {hx.pasos.map(([titulo], i) => (
              <li key={titulo} className={`dt-hud-${["violeta", "cian", "menta"][i]} rounded-xl border border-white/[0.08] bg-[#070a10]/80 px-1.5 py-2 text-[12px] leading-tight font-semibold text-fg`}>
                <span className="mb-0.5 block text-[11px] text-[var(--tono)]">{i + 1}</span>
                {titulo}
              </li>
            ))}
          </ol>
        </div>

        {/* El ancla solo marca dónde va el núcleo y cuánto mide. En el móvil
            cubre la parte de arriba del hero, así que el núcleo queda DETRÁS
            del titular (antes iba en un bloque aparte encima y la portada
            parecía partida en dos). En escritorio ocupa la columna derecha.
            Sin marco ni esquinas: la escena es fondo, no una caja. */}
        <div ref={ancla} className="dt-ancla pointer-events-none absolute inset-x-0 top-0 h-[58%] lg:relative lg:inset-auto lg:mx-auto lg:aspect-square lg:h-auto lg:w-full lg:max-w-[600px]">
          <Paso n={1} titulo={hx.pasos[0][0]} texto={hx.pasos[0][1]} className="top-[14%] left-[3%]" tono="violeta" />
          <Paso n={2} titulo={hx.pasos[1][0]} texto={hx.pasos[1][1]} className="top-[2%] right-[2%] items-end text-right" tono="cian" />
          <Paso n={3} titulo={hx.pasos[2][0]} texto={hx.pasos[2][1]} className="right-[-2%] bottom-[16%] items-end text-right" tono="menta" />
          <Registro eventos={eventos} control={control} titulo={hx.registro} />
        </div>
      </div>

      <div className="dt-entra relative mx-auto hidden w-full max-w-7xl items-center px-6 pb-7 lg:flex" style={{ "--d": "500ms" } as CSSProperties}>
        <span className="flex items-center gap-3 text-[13px] text-fg-3">
          <span className="dt-raton" aria-hidden="true" />
          {hx.desliza}
        </span>
      </div>
    </section>
  );
}

function Paso({ n, titulo, texto, className, tono }: { n: number; titulo: string; texto: string; className?: string; tono: "cian" | "violeta" | "menta" }) {
  return (
    <div className={`dt-hud dt-hud-${tono} dt-entra absolute hidden flex-col gap-0.5 lg:flex ${className ?? ""}`} style={{ "--d": `${360 + n * 90}ms` } as CSSProperties}>
      <span className="flex items-center gap-2 text-[14px] font-semibold">
        <span className="grid size-5 place-items-center rounded-full border border-current text-[11px]">{n}</span>
        {titulo}
      </span>
      <span className="text-[13px] text-fg-2">{texto}</span>
    </div>
  );
}

function Registro({ eventos, control, titulo }: { eventos: EventoHero[]; control: React.RefObject<ControlNucleo | null>; titulo: string }) {
  const [i, setI] = useState(0);
  const n = eventos.length;
  useEffect(() => {
    /* El registro deja de rotar solo si decidimos respetar la
       preferencia del sistema; hoy no. Ver ./decision-movimiento.ts */
    if (quietoPorPreferencia()) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setI((x) => (x + 1) % n);
      control.current?.onda();
    }, 3400);
    return () => window.clearInterval(id);
  }, [n, control]);
  const lineas = [i - 2, i - 1, i].map((k) => eventos[(k + n) % n]);
  return (
    <div className="dt-registro dt-entra absolute bottom-[1%] left-[2%] hidden w-[min(320px,62%)] lg:block" style={{ "--d": "650ms" } as CSSProperties} data-no-onda>
      <div className="border-b border-white/[0.07] px-3.5 py-2 text-[12px] font-medium text-fg-3">{titulo}</div>
      <ol className="grid gap-1.5 px-3.5 py-2.5 text-[13px] leading-snug" aria-live="off">
        {lineas.map((e, k) => (
          <li key={`${i}-${k}`} className={k === 2 ? "dt-linea-nueva text-fg" : k === 1 ? "text-fg-2" : "text-fg-3"}>
            <span className="tabular text-[var(--dt-cian)]">{e.hora}</span> · {e.texto}
          </li>
        ))}
      </ol>
    </div>
  );
}
