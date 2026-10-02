"use client";

import { AnimatePresence, motion, useInView, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowRight, Bell, CalendarCheck, CheckCheck, CloudRain, Euro, MessageCircle, Plus, Sparkles, UserRoundX, Users } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { padel } from "@/content/padel";
import { whatsappLink } from "@/data/site";
import { usarMovimientoReducido } from "@/components/motion/usarMovimiento";
import { SALIDA } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/* Piezas con movimiento de /padel. Todas respetan «reducir movimiento»: con él activado
   se ve el estado final, sin animar. */

const DEMO = "/padel/demo";

/* ---------------- Chat del hero ---------------- */

/* Qué se ve en cada momento de la conversación (ms desde que empieza): cuántos mensajes,
   si el club está escribiendo y cuántos avisos han salido. Al final vuelve a empezar. */
const GUION = [
  { t: 500, ver: 1, escribe: false, avisos: 0 },
  { t: 1400, ver: 1, escribe: true, avisos: 0 },
  { t: 3000, ver: 2, escribe: false, avisos: 0 },
  { t: 4500, ver: 3, escribe: false, avisos: 0 },
  { t: 5200, ver: 3, escribe: true, avisos: 0 },
  { t: 6400, ver: 4, escribe: false, avisos: 0 },
  { t: 7400, ver: 4, escribe: false, avisos: 1 },
  { t: 10400, ver: 4, escribe: false, avisos: 2 },
];
const CICLO = 16000;
const FINAL = GUION[GUION.length - 1];

export function ChatAnimado() {
  const reducido = usarMovimientoReducido();
  const caja = useRef<HTMLDivElement>(null);
  const enPantalla = useInView(caja, { amount: 0.3 });
  const [paso, setPaso] = useState(-1);
  const [vuelta, setVuelta] = useState(0);

  useEffect(() => {
    if (reducido || !enPantalla) return;
    setPaso(-1);
    const relojes = GUION.map((g, i) => setTimeout(() => setPaso(i), g.t));
    relojes.push(setTimeout(() => setVuelta((v) => v + 1), CICLO));
    return () => relojes.forEach(clearTimeout);
  }, [vuelta, reducido, enPantalla]);

  const estado = reducido ? FINAL : (GUION[paso] ?? { ver: 0, escribe: false, avisos: 0 });
  const chat = padel.hero.chat;

  return (
    <div ref={caja} className="relative mx-auto w-full max-w-sm">
      <div className="rounded-3xl border border-white/10 bg-[#0b141a]/95 p-4 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.7)] backdrop-blur">
        <div className="flex items-center gap-3 border-b border-white/10 pb-3">
          <span className="grid size-9 place-items-center rounded-full bg-sun font-display text-[14px] font-bold text-[#1d1300]">PD</span>
          <div>
            <div className="text-[14px] font-semibold">Club Pádel Demo</div>
            <div className={cn("text-[12px] transition-colors", estado.escribe ? "text-[#25d366]" : "text-white/50")}>{estado.escribe ? "escribiendo…" : "Asistente · en línea"}</div>
          </div>
        </div>
        <div className="mt-3 grid gap-2">
          {chat.map((m, i) => {
            const visible = i < estado.ver;
            const escribiendoAqui = estado.escribe && i === estado.ver && m.de === "club";
            return (
              <div key={i} className={cn("relative max-w-[85%]", m.de === "cliente" ? "justify-self-start" : "justify-self-end")}>
                <motion.div
                  initial={false}
                  animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: reducido ? 0 : 0.35, ease: SALIDA }}
                  className={cn(
                    "rounded-2xl px-3 py-2 text-[14px] leading-snug",
                    m.de === "cliente" ? "rounded-tl-sm bg-[#202c33]" : "rounded-tr-sm bg-[#005c4b]",
                  )}
                >
                  {m.de === "club" && (
                    <span className="mb-0.5 flex items-center gap-1 text-[10px] font-semibold tracking-wide text-[#7ee2c6]">
                      <Sparkles className="size-3" /> Respuesta automática
                    </span>
                  )}
                  {m.texto}
                  <span className="ml-2 inline-flex items-center gap-0.5 align-bottom text-[11px] text-white/50">
                    {m.hora}
                    {m.de === "cliente" && <CheckCheck className="size-3.5 text-[#53bdeb]" />}
                  </span>
                </motion.div>
                <AnimatePresence>
                  {escribiendoAqui && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute top-0 right-0 flex gap-1 rounded-2xl rounded-tr-sm bg-[#005c4b] px-3 py-3"
                      aria-hidden
                    >
                      {[0, 1, 2].map((p) => (
                        <motion.i
                          key={p}
                          className="block size-1.5 rounded-full bg-white/70"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 0.9, repeat: Infinity, delay: p * 0.15 }}
                        />
                      ))}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-center text-[11px] text-white/40 lg:pb-5">Club y personas de ejemplo</p>
      </div>

      {/* Lo que el programa hace solo mientras tanto: un aviso cada vez, en la esquina del chat */}
      <div className="relative mt-3 h-[58px] lg:absolute lg:-bottom-9 lg:-left-14 lg:mt-0 lg:w-[290px]">
        <AnimatePresence mode="wait">
          {estado.avisos > 0 &&
            (() => {
              const i = estado.avisos - 1;
              const [titulo, detalle] = padel.hero.avisos[i];
              return (
                <motion.div
                  key={titulo}
                  initial={reducido ? false : { opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: SALIDA }}
                  className="flex items-center gap-2.5 rounded-2xl bg-white px-3 py-2.5 text-[#0c1a22] shadow-[0_18px_40px_-14px_rgb(0_0_0/0.55)]"
                >
                  <span className={cn("grid size-8 shrink-0 place-items-center rounded-full", i === 0 ? "bg-[#e1f3ea] text-[#13845a]" : "bg-[#fdf1dc] text-[#b7740a]")}>
                    {i === 0 ? <CalendarCheck className="size-4" /> : <Bell className="size-4" />}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13px] leading-tight font-semibold">{titulo}</span>
                    <span className="block text-[12px] text-[#465661]">{detalle}</span>
                  </span>
                  <span className="ml-auto self-start text-[10px] font-semibold tracking-wide text-[#13845a]">AUTO</span>
                </motion.div>
              );
            })()}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------------- La demo de verdad, en pequeño ---------------- */

/** La demo (public/padel/demo.html) dentro de la página, a escala y sin poder tocarla:
    un clic en cualquier sitio abre la demo completa. Se carga al acercarse a ella. */
export function VistaDemo() {
  const caja = useRef<HTMLDivElement>(null);
  const [ancho, setAncho] = useState(0);
  const [cargar, setCargar] = useState(false);
  const [lista, setLista] = useState(false);

  useEffect(() => {
    const el = caja.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setAncho(el.clientWidth));
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setCargar(true), { rootMargin: "500px" });
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  // en el móvil se enseña la versión móvil del panel, que a escala se sigue leyendo
  const escritorio = ancho >= 720;
  const base = escritorio ? 1280 : 420;
  const alto = escritorio ? 720 : 760;
  const escala = ancho ? ancho / base : 0;

  return (
    <a href={DEMO} className="group block overflow-hidden rounded-2xl border border-line bg-bg shadow-e3 transition hover:-translate-y-0.5 hover:shadow-[0_30px_70px_-20px_rgb(12_26_34/0.4)]" aria-label={padel.panel.cta}>
      <div ref={caja} className="relative overflow-hidden" style={{ height: escala ? alto * escala : 560 }}>
        {cargar && escala > 0 && (
          <div inert className="absolute inset-0">
            <iframe
              src={`${DEMO}?incrustada`}
              title="Vista previa de la demo de Nexo Pádel"
              tabIndex={-1}
              onLoad={() => setLista(true)}
              className={cn("pointer-events-none absolute top-0 left-0 origin-top-left border-0 transition-opacity duration-500", lista ? "opacity-100" : "opacity-0")}
              style={{ width: base, height: alto, transform: `scale(${escala})` }}
            />
          </div>
        )}
        {!lista && <div className="skeleton absolute inset-4 rounded-xl" aria-hidden />}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-surface to-transparent" />
        <span className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-fg px-4 py-2.5 text-[14px] font-semibold whitespace-nowrap text-bg shadow-e3 transition group-hover:gap-3">
          {padel.panel.cta} <ArrowRight className="size-4" />
        </span>
      </div>
    </a>
  );
}

/* ---------------- Calculadora ---------------- */

/** Número que sube desde 0 la primera vez que se ve y después sigue a las barras. */
function NumeroAnimado({ valor, formato }: { valor: number; formato: (n: number) => string }) {
  const reducido = usarMovimientoReducido();
  const ref = useRef<HTMLSpanElement>(null);
  const visto = useInView(ref, { once: true, amount: 0.5 });
  const muelle = useSpring(0, { stiffness: 90, damping: 20 });
  const texto = useTransform(muelle, (n) => formato(n));
  useEffect(() => {
    if (reducido) muelle.jump(valor);
    else if (visto) muelle.set(valor);
  }, [valor, reducido, visto, muelle]);
  return (
    <motion.span ref={ref} className="tabular">
      {texto}
    </motion.span>
  );
}

const entero = (n: number) => Math.round(n).toLocaleString("es-ES");
const SEMANAS_MES = 4.33;

export function Calculadora() {
  const c = padel.calculadora;
  const [v, setV] = useState<Record<string, number>>(() => Object.fromEntries(c.campos.map((f) => [f.id, f.inicial])));
  const [coste, setCoste] = useState(c.coste.inicial);

  const minutosMes = c.campos.reduce((total, f) => total + v[f.id] * f.minutos * (f.unidad === "al día" ? 30 : SEMANAS_MES), 0);
  const horas = minutosMes / 60;
  const euros = horas * coste;
  const mensaje = `Hola, tengo un club de pádel. Contestamos unos ${v.mensajes} WhatsApp al día, tenemos unas ${v.faltas} faltas con recuperación a la semana y unos ${v.partidos} partidos a la semana a los que les falta alguien. Me gustaría ver Nexo Pádel con nuestros datos.`;

  return (
    <div className="mt-8 grid overflow-hidden rounded-3xl border border-line bg-surface shadow-e2 lg:grid-cols-[1.15fr_1fr]">
      <div className="grid gap-6 p-6 sm:p-8">
        {c.campos.map((f) => (
          <Barra key={f.id} id={f.id} texto={f.texto} valor={v[f.id]} min={f.min} max={f.max} paso={f.paso} sufijo={f.unidad} onCambio={(n) => setV((x) => ({ ...x, [f.id]: n }))} />
        ))}
        <Barra id="coste" texto={c.coste.texto} valor={coste} min={c.coste.min} max={c.coste.max} paso={1} sufijo="€/hora" onCambio={setCoste} />
      </div>
      <div className="relative flex flex-col justify-between gap-6 overflow-hidden bg-[#041820] p-6 text-white sm:p-8">
        <div className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-sun/15 blur-3xl" aria-hidden />
        <div className="relative">
          <div className="font-display text-[64px] leading-none font-semibold text-sun sm:text-[76px]">
            <NumeroAnimado valor={horas} formato={entero} />
            <span className="ml-2 text-[22px] text-sun/80">h</span>
          </div>
          <p className="mt-2 text-[16px] text-white/80">{c.resultado}</p>
          <div className="mt-5 flex items-baseline gap-2 border-t border-white/10 pt-5">
            <span className="font-display text-[30px] font-semibold">
              ≈ <NumeroAnimado valor={euros} formato={entero} /> €
            </span>
            <span className="text-[14px] text-white/60">{c.euros}</span>
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-white/55">{c.explicacion}</p>
        </div>
        <a href={whatsappLink(mensaje)} target="_blank" rel="noreferrer" className="vibrar relative flex h-12 items-center justify-center gap-2 rounded-xl bg-[#1faa59] px-5 text-[15px] font-semibold text-white hover:brightness-110">
          <MessageCircle className="size-5" /> {c.cta}
        </a>
      </div>
    </div>
  );
}

function Barra({ id, texto, valor, min, max, paso, sufijo, onCambio }: { id: string; texto: string; valor: number; min: number; max: number; paso: number; sufijo: string; onCambio: (n: number) => void }) {
  const lleno = ((valor - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={`calc-${id}`} className="text-[15px] font-medium">
          {texto}
        </label>
        <output htmlFor={`calc-${id}`} className="shrink-0 font-display text-[20px] font-semibold tabular">
          {valor} <span className="text-[13px] font-normal text-fg-3">{sufijo}</span>
        </output>
      </div>
      <input
        id={`calc-${id}`}
        type="range"
        min={min}
        max={max}
        step={paso}
        value={valor}
        onChange={(e) => onCambio(Number(e.target.value))}
        className="barra-padel mt-3 w-full"
        style={{ "--lleno": `${lleno}%` } as CSSProperties}
      />
    </div>
  );
}

/* ---------------- Un día en el club ---------------- */

const ICONOS_DIA = [UserRoundX, Users, MessageCircle, UserRoundX, CloudRain, Bell, Euro];

/** El día en el club como una línea de tiempo que se va llenando al bajar. */
export function LineaDelDia() {
  const reducido = usarMovimientoReducido();
  const lista = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: lista, offset: ["start 80%", "end 55%"] });
  const progreso = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <ol ref={lista} className="relative mx-auto mt-10 grid max-w-3xl gap-4">
      <span className="absolute top-2 bottom-2 left-[19px] w-0.5 rounded-full bg-line" aria-hidden />
      <motion.span style={{ scaleY: reducido ? 1 : progreso }} className="absolute top-2 bottom-2 left-[19px] w-0.5 origin-top rounded-full bg-gradient-to-b from-sun to-brand" aria-hidden />
      {padel.dia.items.map(([hora, titulo, texto], i) => {
        const Icono = ICONOS_DIA[i] ?? Bell;
        return (
          <motion.li
            key={hora}
            initial={reducido ? false : { opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{ duration: reducido ? 0 : 0.45, ease: SALIDA }}
            className="relative pl-14"
          >
            <span className="absolute top-3 left-0 grid size-10 place-items-center rounded-full bg-surface text-brand shadow-e1 ring-1 ring-line">
              <Icono className="size-[18px]" />
            </span>
            <div className="rounded-2xl border border-line bg-bg p-4 transition hover:border-line-strong sm:p-5">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="rounded-md bg-sun-soft px-2 py-0.5 font-mono text-[13px] font-semibold text-[#8a5a00] dark:text-sun">{hora}</span>
                <span className="font-semibold">{titulo}</span>
              </div>
              <p className="mt-1.5 text-[15px] text-fg-2">{texto}</p>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}

/* ---------------- Preguntas ---------------- */

export function Preguntas() {
  const reducido = usarMovimientoReducido();
  const [abierta, setAbierta] = useState<number | null>(0);
  return (
    <div className="mt-6 grid gap-2">
      {padel.faq.map(([p, r], i) => {
        const activa = abierta === i;
        return (
          <div key={p} className={cn("rounded-xl border bg-bg transition-colors", activa ? "border-line-strong" : "border-line")}>
            <h3>
              <button
                type="button"
                onClick={() => setAbierta(activa ? null : i)}
                aria-expanded={activa}
                aria-controls={`faq-${i}`}
                className="flex w-full items-center justify-between gap-4 p-4 text-left font-semibold"
              >
                {p}
                <Plus className={cn("size-5 shrink-0 text-brand transition-transform duration-300", activa && "rotate-45")} aria-hidden />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {activa && (
                <motion.div
                  id={`faq-${i}`}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reducido ? 0 : 0.35, ease: SALIDA }}
                  className="overflow-hidden"
                >
                  <p className="px-4 pb-4 text-[15px] text-fg-2">{r}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
