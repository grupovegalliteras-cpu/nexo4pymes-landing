"use client";

import Link from "@/components/i18n/Enlace";
import { MessageCircle, PlayCircle } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { useIdioma } from "@/components/i18n/idioma";
import type { Idioma } from "@/lib/i18n";
import { MovilErp } from "./movil";
import { PANTALLAS } from "@/lib/pantallas-erp";
import { quietoPorPreferencia } from "./decision-movimiento";
import { Magnetico } from "./interaccion";

/* ===========================================================================
   HERO DE LA PORTADA

   LA COMPOSICIÓN. Zona noche con todo centrado: rótulo, titular, botones y las
   cuatro piezas, y debajo un amanecer carmesí del que sube el móvil, cortado
   por la tira de sellos. El móvil asoma en la primera pantalla y eso invita a
   bajar.

   DE DÓNDE SALE. El gesto de abrir centrado sobre una luz de horizonte con el
   producto subiendo viene de wope.com, que trajo el cliente como referencia
   en noviembre de 2026. El móvil 3D es el que ya había, de la web de Priora.

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
  es: { piezas: "Lo que construimos" },
  en: { piezas: "What we build" },
  de: { piezas: "Was wir bauen" },
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
  const huecoMovil = useRef<HTMLDivElement>(null);
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
    }, CADA);
    return () => window.clearInterval(id);
  }, [manual]);

  const elegir = useCallback((i: number) => {
    setManual(true);
    setActiva(i);
  }, []);

  const pieza = PANTALLAS[activa]!;

  return (
    <section data-theme="dark" className="dt-hero relative isolate overflow-hidden bg-bg text-fg">
      {/* ---------------------------------------------------------- el fondo */}
      <div className="absolute inset-0 -z-20" aria-hidden="true">
        <div className="dt-rejilla absolute inset-0" />
        {/* El amanecer: la luz detrás del móvil. Es lo que ata el móvil al
            fondo en vez de dejarlo flotando sobre el negro. */}
        <div className="dt-amanecer" />
      </div>

      {/* --------------------------------------------------------- el móvil */}
      <MovilErp
        pantalla={activa}
        nota={pieza.nota}
        hueco={huecoMovil}
        className="pointer-events-none absolute inset-0 -z-10"
      />

      {/* ------------------------------------------------------ el contenido */}
      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-5 pt-24 text-center sm:px-6 lg:pt-24">
        <div data-scrub="salida-hero" className="relative z-10 flex flex-col items-center">
          <div className="dt-entra inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 pr-3.5 pl-2.5 text-[13px] font-medium text-fg-2 sm:text-[14px]">
            <i className="size-2 shrink-0 rounded-full bg-melocoton" />
            {kicker}
          </div>

          <h1 className="mt-6 font-display text-[46px] leading-[0.97] font-semibold tracking-[-0.01em] text-fg min-[400px]:text-[52px] sm:text-[72px] lg:text-[80px]">
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
            className="dt-entra mt-6 max-w-[600px] text-[16px] leading-relaxed text-fg-2 sm:text-[18px]"
            style={{ "--d": "200ms" } as CSSProperties}
          >
            {linea}
          </p>
          {/* La frase que de verdad nos separa de una agencia («si no os hace
              falta, os lo decimos») se queda, en una línea y más floja. */}
          <p
            className="dt-entra mt-2.5 max-w-[520px] text-[14.5px] leading-relaxed text-fg-3"
            style={{ "--d": "230ms" } as CSSProperties}
          >
            {p}
          </p>

          <div
            className="dt-entra mt-8 flex w-full flex-col justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center"
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
                <MessageCircle className="size-5 text-melocoton" /> <span>{escribenos}</span>
              </a>
            </Magnetico>
          </div>
        </div>

        {/* Las cuatro piezas, en una barra. Tocar una cambia el móvil de abajo. */}
        <ul
          aria-label={hx.piezas}
          className="dt-entra relative z-10 mt-8 grid w-full max-w-3xl grid-cols-2 gap-1 rounded-2xl border border-line bg-surface p-1 sm:grid-cols-4"
          style={{ "--d": "420ms" } as CSSProperties}
        >
          {PANTALLAS.map((p, i) => {
            const viva = i === activa;
            return (
              <li key={p.pieza} className="min-w-0">
                <button
                  type="button"
                  onClick={() => elegir(i)}
                  aria-pressed={viva}
                  className={`dt-pieza w-full rounded-xl border px-3 py-2.5 transition-colors ${
                    viva ? "border-carmesi bg-carmesi text-crema" : "border-transparent text-fg-2 hover:bg-crema/8 hover:text-fg"
                  }`}
                >
                  <span className="block text-[14px] leading-tight font-semibold">{p.pieza}</span>
                  <span className={`mt-0.5 block truncate text-[12.5px] leading-tight ${viva ? "text-crema/85" : "text-fg-3"}`}>{p.nombre}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Solo marca dónde va el móvil y cuánto mide; no pinta nada. El margen
            negativo hace que la tira de sellos le corte la parte de abajo. */}
        <div
          ref={huecoMovil}
          aria-hidden="true"
          className="pointer-events-none mt-8 -mb-20 h-[430px] w-[64%] max-w-[260px] lg:-mb-28 lg:h-[620px] lg:w-[33%] lg:max-w-[360px]"
        />
      </div>

      {/* Los cuatro sellos, en una tira que cierra el hero. No van logos de
          clientes: no los tenemos y aquí no se inventa ninguno. */}
      <div className="relative z-10 border-t border-line bg-bg">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 px-5 sm:px-6 lg:grid-cols-4">
          {sellos.map((x) => (
            <li key={x} className="flex items-center justify-center gap-2 px-2 py-5 text-center text-[13.5px] font-medium text-fg-2">
              <i className="size-1.5 shrink-0 rounded-full bg-melocoton" aria-hidden="true" />
              {x}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
