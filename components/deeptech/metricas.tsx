"use client";

import { useRef, type CSSProperties, type PointerEvent as PE } from "react";
import { gruposDe, modulosDe } from "@/data/modules-i18n";
import type { ModuleGroup } from "@/data/modules";
import { sectoresDe } from "@/data/sectors-i18n";
import { useIdioma } from "@/components/i18n/idioma";
import type { Idioma } from "@/lib/i18n";
import { Contador, moverFoco } from "./interaccion";
import { Etiqueta, Titulo } from "./piezas";

/* Telemetría del sistema: cifras del propio producto, ninguna inventada.
   Todas salen de los datos que usa la demo (data/modules.ts y
   data/sectors.ts), así que si se añade un módulo o un sector, el número
   cambia solo. El 8 son los pasos del recorrido de la portada y el 100 %
   es lo que dice la FAQ sobre el alojamiento de los datos.

   Aquí NO van clientes, facturación ni porcentajes de satisfacción: no
   hay datos reales que los respalden, y la portada ya avisa de que las
   cifras de la demo son ficticias. Ver «Testimonios» en el README. */

const TX = {
  es: {
    kicker: "En cifras",
    h2: "Un sistema entero, no una app suelta.",
    p: "Cifras del propio producto, no promesas: cada módulo y cada sector que se cuenta aquí lo puedes abrir en la demo ahora mismo.",
    barras: "Módulos por área",
    conectados: "módulos conectados",
    kpis: {
      modulos: { texto: "módulos que encajan entre sí", detalle: (d: number, m: number) => `${d} listos hoy · ${m} a medida` },
      sectores: { texto: "sectores con su propia demo", detalle: "Cambian empresa, servicios, checklists y mediciones" },
      pasos: { texto: "pasos de la llamada al cobro", detalle: "Y ninguno se teclea a mano" },
      ue: { texto: "de los datos, alojados en la UE", detalle: "Con copia de seguridad cada día" },
    },
  },
  en: {
    kicker: "In figures",
    h2: "A whole system, not a lone app.",
    p: "Figures from the product itself, not promises: every module and industry counted here can be opened in the demo right now.",
    barras: "Modules by area",
    conectados: "connected modules",
    kpis: {
      modulos: { texto: "modules that fit together", detalle: (d: number, m: number) => `${d} ready today · ${m} custom` },
      sectores: { texto: "industries with their own demo", detalle: "Company, services, checklists and readings change" },
      pasos: { texto: "steps from the call to payment", detalle: "And none of them typed by hand" },
      ue: { texto: "of the data, hosted in the EU", detalle: "With a backup every day" },
    },
  },
  de: {
    kicker: "In Zahlen",
    h2: "Ein ganzes System, keine einzelne App.",
    p: "Zahlen aus dem Produkt selbst, keine Versprechen: Jedes Modul und jede Branche, die hier gezählt wird, können Sie jetzt in der Demo öffnen.",
    barras: "Module nach Bereich",
    conectados: "verbundene Module",
    kpis: {
      modulos: { texto: "Module, die zusammenpassen", detalle: (d: number, m: number) => `${d} sofort einsatzbereit · ${m} individuell` },
      sectores: { texto: "Branchen mit eigener Demo", detalle: "Firma, Leistungen, Checklisten und Messwerte passen sich an" },
      pasos: { texto: "Schritte vom Anruf bis zur Zahlung", detalle: "Und keiner wird von Hand abgetippt" },
      ue: { texto: "der Daten, gehostet in der EU", detalle: "Mit täglichem Backup" },
    },
  },
} satisfies Record<Idioma, unknown>;

const COLOR_GRUPO: Record<ModuleGroup, string> = {
  captacion: "#38e1ff",
  clientes: "#5aa8ff",
  operaciones: "#7f8cff",
  finanzas: "#9d7bff",
  equipo: "#4fe3d2",
  datos: "#2cf5b0",
};

const PASOS_RECORRIDO = 8;

export function Metricas() {
  const lang = useIdioma();
  const tx = TX[lang];
  const grupos = gruposDe(lang);
  const modulos = modulosDe(lang);
  const nSectores = sectoresDe(lang).length;
  const listos = modulos.filter((m) => m.estado === "disponible").length;
  const claves = Object.keys(grupos) as ModuleGroup[];
  const porGrupo = claves.map((g) => ({ g, nombre: grupos[g].nombre, n: modulos.filter((m) => m.grupo === g).length }));
  const max = Math.max(...porGrupo.map((x) => x.n));

  const kpis = [
    { valor: modulos.length, sufijo: "", texto: tx.kpis.modulos.texto, detalle: tx.kpis.modulos.detalle(listos, modulos.length - listos), anillo: { tipo: "continuo" as const, p: listos / modulos.length }, color: "cian" },
    { valor: nSectores, sufijo: "", texto: tx.kpis.sectores.texto, detalle: tx.kpis.sectores.detalle, anillo: { tipo: "segmentos" as const, n: nSectores }, color: "violeta" },
    { valor: PASOS_RECORRIDO, sufijo: "", texto: tx.kpis.pasos.texto, detalle: tx.kpis.pasos.detalle, anillo: { tipo: "segmentos" as const, n: PASOS_RECORRIDO }, color: "menta" },
    { valor: 100, sufijo: "%", texto: tx.kpis.ue.texto, detalle: tx.kpis.ue.detalle, anillo: { tipo: "continuo" as const, p: 1 }, color: "cian" },
  ];

  return (
    <section id="telemetria" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="max-w-3xl">
          <Etiqueta>{tx.kicker}</Etiqueta>
          <Titulo className="mt-4 text-[34px] sm:text-[52px]">{tx.h2}</Titulo>
          <p data-revelar className="mt-4 max-w-2xl text-[17px] leading-relaxed text-fg-2 sm:text-[18px]" style={{ "--d": "60ms" } as CSSProperties}>
            {tx.p}
          </p>
        </div>

        <div className="dt-foco-grupo mt-12 grid gap-5 lg:grid-cols-[1.15fr_1fr]" onPointerMove={moverFoco}>
          <Barras3D datos={porGrupo} max={max} total={modulos.length} titulo={tx.barras} conectados={tx.conectados} lang={lang} />
          <div className="grid gap-5 sm:grid-cols-2">
            {kpis.map((k, i) => (
              <div key={k.texto} data-revelar data-al-ver className="dt-foco dt-cristal relative flex flex-col items-center rounded-[22px] p-5 text-center sm:p-6" style={{ "--d": `${i * 50}ms` } as CSSProperties}>
                <Anillo {...k.anillo} color={k.color} indice={i}>
                  <span className="font-display text-[36px] leading-none font-semibold tracking-[-0.04em] text-fg sm:text-[40px]">
                    <Contador valor={k.valor} locale={lang} retraso={i * 60} />
                    {k.sufijo && <span className="text-[0.55em] text-fg-2">{k.sufijo}</span>}
                  </span>
                </Anillo>
                <div className="mt-4 text-[15px] leading-snug font-semibold text-fg">{k.texto}</div>
                <div className="mt-1 text-[13.5px] leading-snug text-fg-3">{k.detalle}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Anillo de progreso que se dibuja solo al entrar en pantalla. El trazo usa
   pathLength=100, así el porcentaje es directamente el dasharray. */
function Anillo({ tipo, p = 1, n = 1, color, indice, children }: { tipo: "continuo" | "segmentos"; p?: number; n?: number; color: string; indice: number; children: React.ReactNode }) {
  const id = `dt-anillo-${indice}`;
  const hueco = 2.2;
  return (
    <div className={`dt-anillo dt-anillo-${color} relative grid size-[132px] place-items-center`}>
      <svg viewBox="0 0 140 140" className="absolute inset-0 size-full -rotate-90" aria-hidden="true">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--anillo-a)" />
            <stop offset="100%" stopColor="var(--anillo-b)" />
          </linearGradient>
        </defs>
        <circle cx="70" cy="70" r="66" className="dt-anillo-marcas" pathLength={120} />
        <circle cx="70" cy="70" r="56" className="dt-anillo-pista" />
        {tipo === "continuo" ? (
          <circle cx="70" cy="70" r="56" pathLength={100} className="dt-anillo-trazo" stroke={`url(#${id})`} style={{ "--p": (p * 100).toFixed(2) } as CSSProperties} />
        ) : (
          Array.from({ length: n }, (_, i) => (
            <circle
              key={i}
              cx="70"
              cy="70"
              r="56"
              pathLength={100}
              className="dt-anillo-segmento"
              stroke={`url(#${id})`}
              strokeDasharray={`${100 / n - hueco} ${100 - 100 / n + hueco}`}
              strokeDashoffset={-(i * 100) / n}
              style={{ "--i": i } as CSSProperties}
            />
          ))
        )}
      </svg>
      <div className="relative">{children}</div>
    </div>
  );
}

/* Barras de luz en 3D, hechas con CSS (preserve-3d): seis prismas de
   cristal sobre un suelo con rejilla, que crecen escalonados al entrar y se
   inclinan con el ratón. Sin WebGL: no compite con el núcleo del hero por
   la tarjeta gráfica y se ve nítido a cualquier resolución. */
function Barras3D({
  datos,
  max,
  total,
  titulo,
  conectados,
  lang,
}: {
  datos: { g: ModuleGroup; nombre: string; n: number }[];
  max: number;
  total: number;
  titulo: string;
  conectados: string;
  lang: Idioma;
}) {
  const escena = useRef<HTMLDivElement>(null);
  const inclinar = (e: PE<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !escena.current) return;
    const r = escena.current.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - 0.5;
    const dy = (e.clientY - r.top) / r.height - 0.5;
    escena.current.style.setProperty("--rz", `${-32 + dx * 22}deg`);
    escena.current.style.setProperty("--rx", `${58 - dy * 14}deg`);
  };
  const soltar = () => {
    escena.current?.style.removeProperty("--rz");
    escena.current?.style.removeProperty("--rx");
  };
  return (
    <div data-revelar data-al-ver className="dt-foco dt-cristal relative overflow-hidden rounded-[26px] p-5 sm:p-7">
      <div className="text-[14px] font-semibold text-fg-2">{titulo}</div>
      <div className="mt-2 flex items-baseline gap-2.5">
        <span className="font-display text-[52px] leading-none font-semibold tracking-[-0.05em] text-fg sm:text-[64px]">
          <Contador valor={total} locale={lang} />
        </span>
        <span className="text-[15px] text-fg-2">{conectados}</span>
      </div>

      <div ref={escena} className="dt-barras" onPointerMove={inclinar} onPointerLeave={soltar} aria-hidden="true">
        <div className="dt-suelo">
          {datos.map((d, i) => (
            <div key={d.g} className="dt-caja" style={{ "--k": d.n / max, "--i": i, "--c": COLOR_GRUPO[d.g], left: `${18 + i * 66}px` } as CSSProperties}>
              <i className="dt-charco" />
              <div className="dt-caja-cuerpo">
                <i className="dt-cara dt-cara-tapa" />
                <i className="dt-cara dt-cara-x dt-cara-atras" />
                <i className="dt-cara dt-cara-x dt-cara-frente" />
                <i className="dt-cara dt-cara-y dt-cara-izq" />
                <i className="dt-cara dt-cara-y dt-cara-der" />
              </div>
              <div className="dt-caja-dato">
                <span>{d.n}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ul className="relative mt-2 grid grid-cols-1 gap-x-6 gap-y-2.5 min-[440px]:grid-cols-2">
        {datos.map((d) => (
          <li key={d.g} className="flex min-w-0 items-center gap-2.5 text-[13px] text-fg-2">
            <i className="size-2 shrink-0 rounded-[2px]" style={{ background: COLOR_GRUPO[d.g], boxShadow: `0 0 10px ${COLOR_GRUPO[d.g]}` }} />
            <span className="truncate">{d.nombre}</span>
            <span className="ml-auto font-semibold text-fg tabular">{d.n}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
