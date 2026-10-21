"use client";

import Link from "@/components/i18n/Enlace";
import { MessageCircle, PlayCircle } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { useIdioma } from "@/components/i18n/idioma";
import type { Idioma } from "@/lib/i18n";
import type { ControlNucleo } from "./nucleo-escena";
import { Nucleo } from "./nucleo";
import { MovilErp } from "./movil";
import { PANTALLAS } from "@/lib/pantallas-erp";
import { quietoPorPreferencia } from "./decision-movimiento";
import { Magnetico } from "./interaccion";

/* ===========================================================================
   HERO DE LA PORTADA

   LA COMPOSICIÓN. Una sola imagen a sangre: un haz de luz que baja desde
   arriba, y dentro del haz una mano que sube desde abajo con un móvil
   flotando encima en el que va pasando un ERP. El texto, abajo a la
   izquierda, encima de la imagen; y abajo a la derecha, las cuatro piezas
   que se pueden tocar para cambiar lo que se ve en el móvil.

   DE DÓNDE SALE. De una referencia que trajo el cliente (un hero de
   Craftfolio: mano a contraluz subiendo dentro de un haz, texto abajo a la
   izquierda, dos bloques abajo a la derecha) y del móvil 3D de la web de
   Priora, que ya existía. Lo que no venía de ningún sitio es la mano, que se
   construye aquí (./mano.ts).

   POR QUÉ HAY MUCHO MENOS TEXTO QUE ANTES. El hero anterior tenía rótulo,
   titular, línea, párrafo, dos botones, cuatro sellos, tres pasos flotando
   alrededor del núcleo y un cuadro con un registro de ocho líneas. Trece
   piezas de texto. Esa cantidad funcionaba cuando el fondo era abstracto y
   había que explicarlo con palabras; con una imagen que se explica sola,
   sobra la mitad y estorba. Lo que se ha ido no se ha perdido:

     · los tres pasos y el registro los sustituye el móvil, que enseña lo
       mismo en vez de contarlo;
     · los cuatro sellos («diagnóstico primero», «sin contratos de 12 meses»…)
       bajan a una línea fina debajo de los botones;
     · el párrafo largo se queda en dos líneas.

   LAS CUATRO PIEZAS DE LA DERECHA SON EL ARGUMENTO. Cada pantalla del móvil
   es de una pieza distinta —gestión, configurador web, fichaje, facturación—,
   y eso es exactamente lo que decimos que hacemos. Un móvil enseñando cuatro
   pantallas de la MISMA app estaría diciendo «vendemos esta app», que es lo
   que se quitó de la portada. Si algún día alguien añade aquí una quinta
   pantalla del mismo programa, está deshaciendo eso.
   =========================================================================== */

const HX = {
  es: {
    piezas: "Lo que construimos",
    desliza: "Qué construimos, aquí debajo",
    tocar: "Tocad una para verla",
  },
  en: {
    piezas: "What we build",
    desliza: "What we build, just below",
    tocar: "Tap one to see it",
  },
  de: {
    piezas: "Was wir bauen",
    desliza: "Was wir bauen, hier darunter",
    tocar: "Tippen Sie eine an",
  },
} satisfies Record<Idioma, unknown>;

/* Cada cuánto pasa sola a la siguiente pieza. Cuatro segundos y medio: lo
   suficiente para leer el rótulo y mirar la pantalla sin que dé la sensación
   de que hay prisa. Al tocar una, deja de pasar sola. */
const CADA = 4500;

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
}: {
  kicker: string;
  a: string;
  b: string;
  /** La línea de debajo del titular: qué construimos. */
  linea: string;
  /** Y debajo, más floja y más corta, quiénes somos y la promesa incómoda. */
  p: string;
  verDemo: string;
  escribenos: string;
  waHref: string;
  sellos: readonly string[];
}) {
  const lang = useIdioma();
  const hx = HX[lang];
  const seccion = useRef<HTMLElement>(null);
  const anclaNucleo = useRef<HTMLDivElement>(null);
  const huecoMovil = useRef<HTMLDivElement>(null);
  const control = useRef<ControlNucleo | null>(null);
  const palabras = a.split(" ");

  const [activa, setActiva] = useState(0);
  const [manual, setManual] = useState(false);

  /* Pasa sola hasta que alguien toca una pieza. A partir de ahí manda quien
     está mirando: una lista que sigue cambiando sola debajo del dedo es de las
     cosas que más molestan de una web. */
  useEffect(() => {
    if (manual || quietoPorPreferencia()) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setActiva((x) => (x + 1) % PANTALLAS.length);
      control.current?.onda();
    }, CADA);
    return () => window.clearInterval(id);
  }, [manual]);

  const elegir = useCallback((i: number) => {
    setManual(true);
    setActiva(i);
    control.current?.onda();
  }, []);

  const pieza = PANTALLAS[activa]!;

  return (
    <section ref={seccion} className="dt-hero relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* ---------------------------------------------------------- el fondo */}
      <div className="absolute inset-0 -z-20" aria-hidden="true">
        <div className="dt-rejilla absolute inset-0" />
        {/* El haz: la columna de luz que baja desde arriba y dentro de la cual
            pasa todo. Es lo que ata la mano, el móvil y el texto a una misma
            escena en vez de dejarlos flotando sobre un fondo oscuro. */}
        <div className="dt-columna" />
        <Nucleo ancla={anclaNucleo} seccion={seccion} control={control} />
        <div className="dt-velo absolute inset-0" />
      </div>

      {/* EL ANCLA DEL NÚCLEO: dónde se concentran las partículas, y por tanto
          dónde cae el resplandor. Va ARRIBA DEL TODO, en la boca del haz, no
          detrás del móvil.

          Centrada en el hero —que es donde estaba— el núcleo dejaba su punto
          de luz justo encima de la pantalla del móvil y se comía las cifras
          del ERP, que es lo único que hay que ver ahí. Puesta arriba hace de
          foco: parece la lámpara de la que sale la columna de luz, y la
          pantalla se lee. */}
      <div
        ref={anclaNucleo}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[-10%] -z-20 h-[34%] lg:top-[-8%] lg:h-[38%]"
      />

      {/* ------------------------------------------------- la mano y el móvil */}
      <MovilErp
        pantalla={activa}
        nota={pieza.nota}
        hueco={huecoMovil}
        className="pointer-events-none absolute inset-0 -z-10"
      />
      {/* Solo marca dónde va el móvil y cuánto mide; no pinta nada. En el móvil
          ocupa la mitad de arriba, con el texto debajo; en escritorio va
          centrado y alto, y el texto se le monta encima por abajo. */}
      <div
        ref={huecoMovil}
        aria-hidden="true"
        className="pointer-events-none absolute top-[12%] left-1/2 h-[44%] w-[56%] max-w-[250px] -translate-x-1/2 lg:top-[11%] lg:h-[58%] lg:w-[33%] lg:max-w-[360px]"
      />

      {/* El velo de abajo: sin esto, el texto se pelea con la mano y con el
          brillo de la pantalla justo donde hay que leerlo. */}
      <div className="dt-pie-velo pointer-events-none absolute inset-x-0 bottom-0 -z-[5] h-[62%]" aria-hidden="true" />

      {/* -------------------------------------------------------- el contenido */}
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pt-20 pb-8 sm:px-6 lg:pb-12">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
          {/* --- abajo a la izquierda: lo que decimos --- */}
          <div data-scrub="salida-hero" className="dt-sobre-escena relative z-10">
            <div className="dt-entra inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-[#070a10]/80 py-1.5 pr-3.5 pl-2.5 text-[13px] font-medium text-fg-2 backdrop-blur-sm sm:text-[14px]">
              <i className="size-2 shrink-0 rounded-full bg-[var(--dt-menta)] shadow-[0_0_12px_var(--dt-menta)]" />
              {kicker}
            </div>

            <h1 className="mt-5 font-display text-[40px] leading-[0.97] font-semibold tracking-[-0.045em] text-fg min-[400px]:text-[44px] sm:text-[56px] lg:text-[58px] xl:text-[66px]">
              {/* EL ESPACIO VA FUERA DEL SPAN, y no es una manía.

                  Cada palabra entra con su propio retraso, así que necesita
                  ser un elemento aparte, y para poder desplazarla hacia
                  arriba tiene que ser inline-block. Y un inline-block recorta
                  el espacio que queda al final de su contenido: con el
                  espacio dentro, el titular se leía «Vuestronegocio». Pasaba
                  desapercibido mientras el titular fue «La llamada entra.»,
                  donde el punto final separaba igual. */}
              <span className="block">
                {palabras.map((w, i) => (
                  <span key={i}>
                    <span className="dt-palabra" style={{ "--d": `${40 + i * 50}ms` } as CSSProperties}>
                      {w}
                    </span>
                    {i < palabras.length - 1 ? " " : ""}
                  </span>
                ))}
              </span>
              <span
                className="dt-palabra dt-texto-luz block pb-1"
                style={{ "--d": `${80 + palabras.length * 50}ms` } as CSSProperties}
              >
                {b}
              </span>
            </h1>

            <p
              className="dt-entra mt-5 max-w-[520px] text-[16px] leading-relaxed text-fg-2 sm:text-[17px]"
              style={{ "--d": "200ms" } as CSSProperties}
            >
              {linea}
            </p>
            {/* La frase que de verdad nos separa de una agencia («si no os
                hace falta, os lo decimos») se queda, pero en una línea y más
                floja: en esta composición el texto comparte sitio con la
                imagen, y cada línea que crece aquí es una línea que se le come
                al móvil por arriba. */}
            <p
              className="dt-entra mt-2.5 max-w-[460px] text-[14.5px] leading-relaxed text-fg-3"
              style={{ "--d": "230ms" } as CSSProperties}
            >
              {p}
            </p>

            <div
              className="dt-entra mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
              style={{ "--d": "260ms" } as CSSProperties}
            >
              <Magnetico className="max-sm:w-full">
                <Link
                  href="/demo?tour=1"
                  className="dt-boton dt-boton-primario h-13 w-full px-6 text-[16px] sm:h-12 sm:w-auto sm:text-[15px]"
                >
                  <PlayCircle className="size-5" /> <span>{verDemo}</span>
                </Link>
              </Magnetico>
              <Magnetico className="max-sm:w-full">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noreferrer"
                  className="dt-boton dt-boton-cristal h-13 w-full px-6 text-[16px] sm:h-12 sm:w-auto sm:text-[15px]"
                >
                  <MessageCircle className="size-5 text-[#25d366]" /> <span>{escribenos}</span>
                </a>
              </Magnetico>
            </div>

            {/* Los cuatro sellos, en una línea fina. Antes ocupaban una rejilla
                de dos columnas con sus iconos; aquí estorbaban a la imagen. */}
            <ul
              className="dt-entra mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-fg-3"
              style={{ "--d": "320ms" } as CSSProperties}
            >
              {sellos.map((x, i) => (
                <li key={x} className="flex items-center gap-3">
                  {i > 0 && <span className="size-[3px] rounded-full bg-fg-3/60" aria-hidden="true" />}
                  {x}
                </li>
              ))}
            </ul>
          </div>

          {/* --- abajo a la derecha: las cuatro piezas --- */}
          <div
            className="dt-entra relative z-10 lg:w-[290px]"
            style={{ "--d": "420ms" } as CSSProperties}
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-mono text-[11px] tracking-[0.14em] text-fg-3 uppercase">{hx.piezas}</span>
              <span className="text-[11px] text-fg-3 max-lg:hidden">{hx.tocar}</span>
            </div>
            <ul className="mt-3 grid gap-1">
              {PANTALLAS.map((p, i) => {
                const viva = i === activa;
                return (
                  <li key={p.pieza}>
                    <button
                      type="button"
                      onClick={() => elegir(i)}
                      aria-pressed={viva}
                      className={`dt-pieza group flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors ${
                        viva
                          ? "border-white/15 bg-white/[0.06] text-fg"
                          : "border-transparent text-fg-3 hover:border-white/10 hover:bg-white/[0.03] hover:text-fg-2"
                      }`}
                    >
                      <span
                        className={`h-7 w-[3px] shrink-0 rounded-full transition-colors ${
                          viva ? "bg-[var(--dt-cian)] shadow-[0_0_10px_var(--dt-cian)]" : "bg-white/12"
                        }`}
                        aria-hidden="true"
                      />
                      <span className="min-w-0">
                        <span className="block text-[14px] leading-tight font-semibold">{p.pieza}</span>
                        <span className="mt-0.5 block truncate text-[12.5px] leading-tight text-fg-3">{p.nombre}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div
          className="dt-entra mt-8 hidden items-center lg:flex"
          style={{ "--d": "520ms" } as CSSProperties}
        >
          <span className="flex items-center gap-3 text-[13px] text-fg-3">
            <span className="dt-raton" aria-hidden="true" />
            {hx.desliza}
          </span>
        </div>
      </div>
    </section>
  );
}
