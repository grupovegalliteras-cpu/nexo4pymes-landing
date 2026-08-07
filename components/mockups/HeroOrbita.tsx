"use client";

import { useRef } from "react";
import { usarMovimientoReducido } from "@/components/motion/usarMovimiento";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Bell,
  CalendarCheck,
  CheckCheck,
  MessageCircle,
  Star,
  Syringe,
  Zap,
} from "lucide-react";

/* ============================================================
   ILUSTRACIÓN DEL HERO — construida en código, no es una imagen
   Un panel central con satélites flotando alrededor, unidos por
   líneas que se dibujan solas. Dos variantes:
     · "home" → panel de automatizaciones genérico
     · "vet"  → WhatsApp + agenda + recordatorio de vacuna

   Cómo se mantiene barato:
   - Solo se anima transform y opacity.
   - El parallax de ratón usa motion values (no re-renderiza React).
   - El giro está limitado a ±6°: más que eso marea y descoloca el texto.
   - En móvil no hay parallax (no hay ratón) y se ocultan los satélites
     de menos peso informativo.
   - Con prefers-reduced-motion se queda todo quieto en su sitio final.
   ============================================================ */

type Variante = "home" | "vet";

export function HeroOrbita({ variante = "home" }: { variante?: Variante }) {
  const contenedor = useRef<HTMLDivElement>(null);
  const reducido = usarMovimientoReducido();

  const ratonX = useMotionValue(0);
  const ratonY = useMotionValue(0);
  const suaveX = useSpring(ratonX, { stiffness: 90, damping: 22, mass: 0.6 });
  const suaveY = useSpring(ratonY, { stiffness: 90, damping: 22, mass: 0.6 });

  const rotarY = useTransform(suaveX, [-0.5, 0.5], [6, -6]);
  const rotarX = useTransform(suaveY, [-0.5, 0.5], [-6, 6]);

  function seguirRaton(e: React.MouseEvent<HTMLDivElement>) {
    if (reducido) return;
    const caja = contenedor.current?.getBoundingClientRect();
    if (!caja) return;
    ratonX.set((e.clientX - caja.left) / caja.width - 0.5);
    ratonY.set((e.clientY - caja.top) / caja.height - 0.5);
  }

  function soltar() {
    ratonX.set(0);
    ratonY.set(0);
  }

  const esVet = variante === "vet";

  return (
    <div
      ref={contenedor}
      onMouseMove={seguirRaton}
      onMouseLeave={soltar}
      className="relative mx-auto w-full max-w-[520px] select-none [perspective:1400px] lg:max-w-[560px]"
      aria-hidden="true"
    >
      {/* Luz ambiental detrás del panel. */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[105%] w-[105%] -translate-x-1/2 -translate-y-1/2">
        <div className="anim-respirar absolute inset-0 rounded-full bg-mint/12 blur-[70px]" />
        <div
          className="anim-respirar absolute left-[58%] top-[62%] h-[45%] w-[45%] rounded-full bg-coral/22 blur-[60px]"
          style={{ animationDelay: "1.6s" }}
        />
      </div>

      <motion.div
        style={reducido ? undefined : { rotateX: rotarX, rotateY: rotarY }}
        className="relative aspect-[4/5] w-full [transform-style:preserve-3d] sm:aspect-[5/5]"
      >
        <LineasConexion esVet={esVet} />

        {/* ---------- PANEL CENTRAL ---------- */}
        <Flotante
          /* Centrado con left/width, no con translate: la capa de fuera ya
             usa transform para la profundidad. */
          className="left-[9%] top-[19%] w-[82%] sm:left-[13%] sm:top-[22%] sm:w-[74%]"
          profundidad={0}
          retraso={0}
          duracionFlote={9}
        >
          <PanelCentral esVet={esVet} />
        </Flotante>

        {/* ---------- SATÉLITES ----------
            En móvil solo quedan dos y no se solapan con el panel: a 375 px,
            cuatro tarjetas superpuestas tapan el propio panel que ilustran.
            A partir de sm vuelven las cuatro y se cruzan a propósito, que es
            de donde sale la sensación de profundidad. */}
        <Flotante
          className="left-0 top-0 w-[62%] sm:left-[-4%] sm:top-[6%] sm:w-[57%]"
          profundidad={70}
          retraso={0.45}
          duracionFlote={7}
        >
          <TarjetaWhatsApp esVet={esVet} />
        </Flotante>

        <Flotante
          className="bottom-0 right-0 w-[52%] sm:bottom-auto sm:right-[-5%] sm:top-[26%] sm:w-[50%]"
          profundidad={50}
          retraso={0.65}
          duracionFlote={8.5}
        >
          {esVet ? <TarjetaVacuna /> : <TarjetaAgenda />}
        </Flotante>

        <Flotante
          className="bottom-[8%] left-[-2%] hidden w-[52%] sm:block"
          profundidad={40}
          retraso={0.85}
          duracionFlote={7.8}
        >
          {esVet ? <TarjetaAgenda /> : <TarjetaAutomatizacion />}
        </Flotante>

        <Flotante
          className="bottom-[1%] right-[2%] hidden w-[44%] sm:block"
          profundidad={85}
          retraso={1.05}
          duracionFlote={6.4}
        >
          {esVet ? <TarjetaRecordatorio /> : <TarjetaResena />}
        </Flotante>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Flotante({
  children,
  className,
  profundidad,
  retraso,
  duracionFlote,
}: {
  children: React.ReactNode;
  className: string;
  profundidad: number;
  retraso: number;
  duracionFlote: number;
}) {
  const reducido = usarMovimientoReducido();

  /* Tres envoltorios, y cada uno es dueño de su propia transformación.
     Si se juntaran en un solo elemento se pisarían entre ellas: la que
     escribe Framer Motion en el atributo style gana siempre a la clase
     de Tailwind, y la profundidad o el centrado desaparecerían sin más.
       · fuera  → posición y profundidad (translateZ)
       · medio  → animación de entrada (Framer)
       · dentro → deriva en bucle (CSS) */
  return (
    <div className={`absolute ${className}`} style={{ transform: `translateZ(${profundidad}px)` }}>
      <motion.div
        initial={reducido ? { opacity: 0 } : { opacity: 0, y: 26, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: reducido ? 0.001 : 0.85,
          delay: reducido ? 0 : retraso,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div
          className="anim-flotar"
          style={{ animationDuration: `${duracionFlote}s`, animationDelay: `${retraso}s` }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}

function LineasConexion({ esVet }: { esVet: boolean }) {
  const reducido = usarMovimientoReducido();

  // Trazos del panel central a cada satélite, en coordenadas 0-100.
  const trazos = [
    "M50 50 C 36 44, 30 30, 22 20",
    "M50 50 C 64 48, 70 40, 78 36",
    "M50 50 C 38 58, 32 70, 24 80",
    "M50 50 C 62 62, 68 76, 74 88",
  ];

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      {trazos.map((d, i) => (
        <g key={d}>
          <motion.path
            d={d}
            fill="none"
            stroke={esVet && i === 1 ? "#E8623A" : "#12E2B0"}
            strokeWidth={1}
            strokeLinecap="round"
            strokeDasharray="2 3"
            vectorEffect="non-scaling-stroke"
            opacity={0.42}
            initial={reducido ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: reducido ? 0.001 : 1.2,
              delay: reducido ? 0 : 0.5 + i * 0.18,
              ease: "easeOut",
            }}
          />
          {/* Punto de datos que recorre la línea: es lo que sugiere que la
              información se mueve entre sistemas. */}
          {!reducido && (
            <circle r={0.9} fill={esVet && i === 1 ? "#E8623A" : "#12E2B0"}>
              <animateMotion dur={`${4 + i}s`} repeatCount="indefinite" path={d} />
            </circle>
          )}
        </g>
      ))}
    </svg>
  );
}

/* ---------- Tarjetas ---------- */

const tarjeta =
  "rounded-2xl border border-white/12 bg-bottle-800/85 p-3.5 shadow-[0_18px_45px_-18px_rgba(0,0,0,.7)] backdrop-blur-md";

function PanelCentral({ esVet }: { esVet: boolean }) {
  const filas = esVet
    ? [
        { texto: "Cita confirmada · Nala", ok: true },
        { texto: "Recordatorio 24h enviado", ok: true },
        { texto: "Vacuna en 7 días · aviso", ok: true },
        { texto: "Urgencia → pasa al equipo", ok: false },
      ]
    : [
        { texto: "WhatsApp respondido", ok: true },
        { texto: "Cita confirmada", ok: true },
        { texto: "Reseña solicitada", ok: true },
        { texto: "Factura pendiente · aviso", ok: false },
      ];

  const barras = [38, 62, 45, 78, 56, 88, 70];

  return (
    <div className={`${tarjeta} p-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-mint/15 text-mint">
            <Zap size={14} strokeWidth={2.2} />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/55">
            {esVet ? "Clínica · hoy" : "Automatizaciones · hoy"}
          </span>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-mint/12 px-2 py-0.5 font-mono text-[9px] text-mint">
          <span className="h-1.5 w-1.5 rounded-full bg-mint anim-respirar" />
          activo
        </span>
      </div>

      {/* Mini gráfico. Las barras crecen con scaleY, no con height. */}
      <div className="mt-4 flex h-16 items-end gap-1.5">
        {barras.map((alto, i) => (
          <motion.span
            key={i}
            className="flex-1 origin-bottom rounded-sm bg-gradient-to-t from-mint/25 to-mint/70"
            style={{ height: `${alto}%` }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.7, delay: 0.6 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </div>

      <div className="mt-4 space-y-2">
        {filas.map((fila, i) => (
          <motion.div
            key={fila.texto}
            className="flex items-center gap-2 rounded-lg bg-white/[.04] px-2.5 py-1.5"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.9 + i * 0.13 }}
          >
            <span className={fila.ok ? "text-mint" : "text-coral"}>
              {fila.ok ? <CheckCheck size={12} /> : <Bell size={12} />}
            </span>
            <span className="truncate text-[11px] text-white/72">{fila.texto}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TarjetaWhatsApp({ esVet }: { esVet: boolean }) {
  return (
    <div className={tarjeta}>
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-mint/15 text-mint">
          <MessageCircle size={12} />
        </span>
        <span className="font-mono text-[9px] uppercase tracking-wider text-white/50">
          WhatsApp · 21:47
        </span>
      </div>
      <p className="mt-2 rounded-lg rounded-tl-sm bg-white/8 px-2.5 py-1.5 text-[11px] leading-snug text-white/80">
        {esVet ? "Hola! Quería cita para Nala 🐶" : "Hola, ¿cuánto costaría?"}
      </p>
      <motion.p
        className="mt-1.5 rounded-lg rounded-tr-sm bg-mint/15 px-2.5 py-1.5 text-[11px] leading-snug text-mint"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        {esVet ? "Tengo el jueves a las 17:30 ✅" : "Te lo miro ahora mismo ✅"}
      </motion.p>
    </div>
  );
}

function TarjetaAgenda() {
  return (
    <div className={tarjeta}>
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/8 text-white/70">
          <CalendarCheck size={12} />
        </span>
        <span className="font-mono text-[9px] uppercase tracking-wider text-white/50">Agenda</span>
      </div>
      <div className="mt-2 space-y-1">
        {["16:30", "17:00", "17:30"].map((hora, i) => (
          <motion.div
            key={hora}
            className={`flex items-center justify-between rounded-md px-2 py-1 text-[10px] ${
              i === 2 ? "bg-mint/15 text-mint" : "bg-white/[.05] text-white/55"
            }`}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 1.2 + i * 0.12 }}
          >
            <span className="font-mono">{hora}</span>
            <span>{i === 2 ? "confirmada" : "ocupado"}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TarjetaAutomatizacion() {
  const pasos = ["Entra", "Clasifica", "Responde"];
  return (
    <div className={tarjeta}>
      <span className="font-mono text-[9px] uppercase tracking-wider text-white/50">
        Flujo activo
      </span>
      <div className="mt-2.5 flex items-center gap-1.5">
        {pasos.map((paso, i) => (
          <div key={paso} className="flex flex-1 items-center gap-1.5">
            <motion.span
              className="flex-1 rounded-md bg-white/[.06] px-1.5 py-1 text-center text-[9px] text-white/70"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.3 + i * 0.2 }}
            >
              {paso}
            </motion.span>
            {i < pasos.length - 1 && <span className="text-mint/60 text-[9px]">→</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function TarjetaResena() {
  return (
    <div className={tarjeta}>
      <span className="font-mono text-[9px] uppercase tracking-wider text-white/50">
        Reseña pedida
      </span>
      <div className="mt-2 flex gap-0.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.span
            key={i}
            className="text-coral"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: 1.6 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
          >
            <Star size={13} fill="currentColor" strokeWidth={0} />
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function TarjetaVacuna() {
  return (
    <div className={tarjeta}>
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-coral/15 text-coral">
          <Syringe size={12} />
        </span>
        <span className="font-mono text-[9px] uppercase tracking-wider text-white/50">
          Vacuna · en 7 días
        </span>
      </div>
      <p className="mt-2 text-[11px] leading-snug text-white/75">
        Nala · vacuna anual
        <br />
        <span className="text-coral">Aviso programado</span>
      </p>
    </div>
  );
}

function TarjetaRecordatorio() {
  return (
    <div className={`${tarjeta} flex items-center gap-2.5`}>
      <span className="anim-respirar flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-coral/18 text-coral">
        <Bell size={13} />
      </span>
      <div className="min-w-0">
        <p className="truncate font-mono text-[9px] uppercase tracking-wider text-white/50">
          Recordatorio
        </p>
        <p className="truncate text-[11px] text-white/78">24h antes</p>
      </div>
    </div>
  );
}

