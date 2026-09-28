"use client";

import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Bell, BrainCircuit, CheckCheck, ClipboardList, Inbox, MessageCircle, RotateCcw, Send } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { whatsappLink } from "@/data/site";
import { leer, type Lectura } from "@/lib/lectura-aviso";
import { useDemo, useSector } from "@/store/demo";
import { cn, isoDay } from "@/lib/utils";
import { conIdioma } from "@/lib/i18n";
import { TIPO_AVISO } from "@/lib/etiquetas";
import { useFmt, useIdioma } from "@/components/i18n/idioma";

const hhmm = (d: Date) => `${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;

type Respuesta = { empresa: string; nombre: string; servicio: string; precio: string; municipio: string | null; cuando: string };

const TX = {
  es: {
    dias: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
    hoyCorto: (h: string) => `Hoy, ${h}`,
    hoyLargo: (h: string) => `hoy sobre las ${h}`,
    mananaCorto: "Mañana",
    diaLargo: (d: string, h: string) => `el ${d} a las ${h}`,
    mananaLargo: (h: string) => `mañana a las ${h}`,
    kicker: "Pruébalo tú",
    h2: "Escribe como si fueras tu cliente. Mira lo que pasa.",
    p: (e: string) => `Manda un aviso a ${e}, la empresa de ejemplo, con tus palabras: una avería, un presupuesto, una queja. Incluye el pueblo si quieres.`,
    escribiendo: "escribiendo…",
    enLinea: "en línea",
    otro: "Probar otro mensaje",
    ayuda: "Toca un ejemplo o escribe el tuyo. Nadie de la oficina va a intervenir.",
    enviado: "Mensaje enviado",
    placeholder: "Escribe tu aviso…",
    aria: "Tu mensaje como cliente",
    enviar: "Enviar",
    mientras: "Mientras tanto, en tu empresa",
    recibido: "Recibido en Central Avisos",
    entendido: "Entendido por la IA",
    urgencia: (u: string) => `Urgencia ${u}`,
    urg: { alta: "alta", media: "media", baja: "baja" },
    desde: (p: string) => `desde ${p}`,
    zona: "Zona por confirmar",
    orden: (n: number) => `Orden de trabajo OT-${n} creada`,
    ordenSin: "Orden de trabajo creada",
    tecnicoZona: (m: string) => `técnico de la zona de ${m}`,
    tecnico: "el técnico",
    carga: "con menos carga hoy",
    movil: "En el móvil del técnico",
    ahora: "ahora",
    urgente: "Trabajo urgente asignado",
    nuevo: "Nuevo trabajo asignado",
    respuesta: "Respuesta enviada al cliente",
    miraChat: "Con técnico y hora. Míralo en el chat.",
    todo: (s: string) => `Todo en ${s} segundos.`,
    nadie: "Sin que nadie de la oficina toque nada.",
    loQuiero: "Lo quiero en mi empresa",
    verPanel: "Verlo en el panel de oficina",
    waMsg: (m: string) => `Hola, he probado a mandar un aviso en vuestra demo y quiero esto para mi empresa. El mensaje era: «${m}»`,
    contactoPrueba: "Tu mensaje de prueba",
    coma: (s: string) => s.replace(".", ","),
    r: {
      presupuesto: (x: Respuesta) => `Hola, somos ${x.empresa}. Te preparamos el presupuesto de ${x.servicio.toLowerCase()} (desde ${x.precio}) y te lo enviamos hoy por aquí. Si quieres, ${x.nombre} puede pasar ${x.cuando} a verlo.`,
      queja: (x: Respuesta) => `Hola, somos ${x.empresa}. Sentimos mucho lo ocurrido. Lo hemos abierto como garantía y ${x.nombre} pasará ${x.cuando}, sin coste. Te avisamos cuando vaya de camino.`,
      consulta: (x: Respuesta) => `Hola, somos ${x.empresa}. Hemos recibido tu mensaje y lo tiene ya la oficina. Te dejamos a ${x.nombre} reservado ${x.cuando} por si hace falta pasar.`,
      averia: (x: Respuesta) => `Hola, somos ${x.empresa}. Recibido: ${x.servicio.toLowerCase()}${x.municipio ? ` en ${x.municipio}` : ""}. ${x.nombre} pasará ${x.cuando}. Te avisamos cuando vaya de camino.`,
    },
  },
  en: {
    dias: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    hoyCorto: (h: string) => `Today, ${h}`,
    hoyLargo: (h: string) => `today at around ${h}`,
    mananaCorto: "Tomorrow",
    diaLargo: (d: string, h: string) => `on ${d} at ${h}`,
    mananaLargo: (h: string) => `tomorrow at ${h}`,
    kicker: "Try it yourself",
    h2: "Write as if you were your customer. See what happens.",
    p: (e: string) => `Send a request to ${e}, the sample company, in your own words: a fault, a quote, a complaint. Add the town if you like.`,
    escribiendo: "typing…",
    enLinea: "online",
    otro: "Try another message",
    ayuda: "Tap an example or write your own. Nobody in the office will step in.",
    enviado: "Message sent",
    placeholder: "Write your request…",
    aria: "Your message as a customer",
    enviar: "Send",
    mientras: "Meanwhile, at your company",
    recibido: "Received in Central Avisos",
    entendido: "Understood by AI",
    urgencia: (u: string) => `${u} urgency`,
    urg: { alta: "High", media: "Medium", baja: "Low" },
    desde: (p: string) => `from ${p}`,
    zona: "Area to be confirmed",
    orden: (n: number) => `Work order WO-${n} created`,
    ordenSin: "Work order created",
    tecnicoZona: (m: string) => `the ${m} area technician`,
    tecnico: "the technician",
    carga: "with the lightest workload today",
    movil: "On the technician's phone",
    ahora: "now",
    urgente: "Urgent job assigned",
    nuevo: "New job assigned",
    respuesta: "Reply sent to the customer",
    miraChat: "With technician and time. See it in the chat.",
    todo: (s: string) => `All done in ${s} seconds.`,
    nadie: "Without anyone in the office lifting a finger.",
    loQuiero: "I want this for my company",
    verPanel: "See it in the office dashboard",
    waMsg: (m: string) => `Hi, I tried sending a request in your demo and I want this for my company. My message was: "${m}"`,
    contactoPrueba: "Your test message",
    coma: (s: string) => s,
    r: {
      presupuesto: (x: Respuesta) => `Hi, this is ${x.empresa}. We're preparing your quote for ${x.servicio.toLowerCase()} (from ${x.precio}) and will send it here today. If you like, ${x.nombre} can come ${x.cuando} to take a look.`,
      queja: (x: Respuesta) => `Hi, this is ${x.empresa}. We're very sorry about this. We've logged it under warranty and ${x.nombre} will come ${x.cuando}, free of charge. We'll let you know when they're on the way.`,
      consulta: (x: Respuesta) => `Hi, this is ${x.empresa}. We've received your message and the office already has it. We've kept ${x.nombre} free ${x.cuando} in case a visit is needed.`,
      averia: (x: Respuesta) => `Hi, this is ${x.empresa}. Got it: ${x.servicio.toLowerCase()}${x.municipio ? ` in ${x.municipio}` : ""}. ${x.nombre} will come ${x.cuando}. We'll let you know when they're on the way.`,
    },
  },
  de: {
    dias: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
    hoyCorto: (h: string) => `Heute, ${h}`,
    hoyLargo: (h: string) => `heute gegen ${h} Uhr`,
    mananaCorto: "Morgen",
    diaLargo: (d: string, h: string) => `am ${d} um ${h} Uhr`,
    mananaLargo: (h: string) => `morgen um ${h} Uhr`,
    kicker: "Probieren Sie es aus",
    h2: "Schreiben Sie wie Ihr Kunde. Sehen Sie, was passiert.",
    p: (e: string) => `Senden Sie ${e}, der Beispielfirma, eine Anfrage in Ihren Worten: eine Störung, ein Angebot, eine Reklamation. Nennen Sie gern den Ort.`,
    escribiendo: "schreibt…",
    enLinea: "online",
    otro: "Andere Nachricht probieren",
    ayuda: "Tippen Sie auf ein Beispiel oder schreiben Sie Ihre eigene. Niemand im Büro greift ein.",
    enviado: "Nachricht gesendet",
    placeholder: "Ihre Anfrage…",
    aria: "Ihre Nachricht als Kunde",
    enviar: "Senden",
    mientras: "Währenddessen in Ihrer Firma",
    recibido: "In Central Avisos eingegangen",
    entendido: "Von der KI verstanden",
    urgencia: (u: string) => `Dringlichkeit ${u}`,
    urg: { alta: "hoch", media: "mittel", baja: "niedrig" },
    desde: (p: string) => `ab ${p}`,
    zona: "Gebiet noch offen",
    orden: (n: number) => `Arbeitsauftrag AU-${n} erstellt`,
    ordenSin: "Arbeitsauftrag erstellt",
    tecnicoZona: (m: string) => `Techniker für ${m}`,
    tecnico: "der Techniker",
    carga: "mit der geringsten Auslastung heute",
    movil: "Auf dem Handy des Technikers",
    ahora: "jetzt",
    urgente: "Dringender Auftrag zugewiesen",
    nuevo: "Neuer Auftrag zugewiesen",
    respuesta: "Antwort an den Kunden gesendet",
    miraChat: "Mit Techniker und Uhrzeit. Siehe Chat.",
    todo: (s: string) => `Alles in ${s} Sekunden.`,
    nadie: "Ohne dass im Büro jemand einen Finger rührt.",
    loQuiero: "Das will ich für meine Firma",
    verPanel: "Im Büro-Dashboard ansehen",
    waMsg: (m: string) => `Hallo, ich habe in eurer Demo eine Anfrage geschickt und möchte das für meine Firma. Meine Nachricht war: „${m}“`,
    contactoPrueba: "Ihre Testnachricht",
    coma: (s: string) => s.replace(".", ","),
    r: {
      presupuesto: (x: Respuesta) => `Hallo, hier ist ${x.empresa}. Wir erstellen Ihr Angebot für ${x.servicio} (ab ${x.precio}) und schicken es Ihnen heute hier. Wenn Sie möchten, kann ${x.nombre} ${x.cuando} vorbeikommen und es sich ansehen.`,
      queja: (x: Respuesta) => `Hallo, hier ist ${x.empresa}. Das tut uns sehr leid. Wir haben es als Garantiefall aufgenommen, ${x.nombre} kommt ${x.cuando}, kostenlos. Wir melden uns, sobald er unterwegs ist.`,
      consulta: (x: Respuesta) => `Hallo, hier ist ${x.empresa}. Ihre Nachricht ist angekommen und liegt schon im Büro. Wir halten ${x.nombre} ${x.cuando} frei, falls ein Besuch nötig ist.`,
      averia: (x: Respuesta) => `Hallo, hier ist ${x.empresa}. Erhalten: ${x.servicio}${x.municipio ? ` in ${x.municipio}` : ""}. ${x.nombre} kommt ${x.cuando}. Wir melden uns, sobald er unterwegs ist.`,
    },
  },
};
type Tx = (typeof TX)["es"];

function cuando(tx: Tx, urg: Lectura["urgencia"], tipo: Lectura["tipo"]) {
  const now = new Date();
  if (urg === "alta") {
    const d = new Date(now.getTime() + 90 * 60000);
    d.setMinutes(Math.ceil(d.getMinutes() / 15) * 15, 0, 0);
    if (d.getHours() < 20) return { corto: tx.hoyCorto(hhmm(d)), largo: tx.hoyLargo(hhmm(d)), hora: hhmm(d) };
  }
  const d = new Date(now);
  let add = urg === "media" || tipo === "queja" ? 1 : 2;
  while (add > 0) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) add--;
  }
  const h = urg === "baja" ? "10:00" : "9:00";
  const manana = (d.getTime() - now.getTime()) / 86400000 < 1.5;
  const dia = tx.dias[d.getDay()];
  return { corto: `${manana ? tx.mananaCorto : dia[0].toUpperCase() + dia.slice(1)}, ${h}`, largo: manana ? tx.mananaLargo(h) : tx.diaLargo(dia, h), hora: h };
}

/* ---------- Componente ---------- */

type Msg = { de: "cliente" | "empresa"; texto: string; hora: string };
const PASOS = 5;

export function PruebaAviso() {
  const router = useRouter();
  const lang = useIdioma();
  const tx = TX[lang];
  const fmt = useFmt();
  const sector = useSector();
  const techs = useDemo((s) => s.techs);
  const jobs = useDemo((s) => s.jobs);
  const addWebRequest = useDemo((s) => s.addWebRequest);
  const [texto, setTexto] = useState("");
  const [enviado, setEnviado] = useState<string | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [paso, setPaso] = useState(0);
  const [escribiendo, setEscribiendo] = useState(false);
  const [ms, setMs] = useState(0);
  const [ot, setOt] = useState(0);
  const timers = useRef<number[]>([]);
  const pipe = useRef<HTMLDivElement>(null);
  const chat = useRef<HTMLDivElement>(null);

  const ejemplos = useMemo(() => {
    // cada ejemplo es lo que dice el cliente entero, sin las respuestas de la oficina
    const delCliente = (ls: [string, string][]) => ls.filter((x) => x[0] === "cliente").map((x) => x[1]).join(" ");
    const l = [delCliente(sector.llamada.lineas), ...sector.avisos.map((a) => delCliente(a.lineas))];
    return l.filter((x) => x.length > 20).slice(0, 4);
  }, [sector]);

  const lectura = useMemo(() => (enviado ? leer(enviado, sector) : null), [enviado, sector]);
  const tecnico = useMemo(() => {
    if (!lectura) return null;
    const hoy = isoDay(new Date());
    const carga = (id: string) => jobs.filter((j) => j.techId === id && j.fecha === hoy && j.estado !== "finalizado" && j.estado !== "facturado").length;
    const zona = techs.filter((t) => t.zona.includes(lectura.municipio));
    return [...(zona.length ? zona : techs)].sort((a, b) => carga(a.id) - carga(b.id))[0] ?? null;
  }, [lectura, techs, jobs]);
  const cita = useMemo(() => (lectura ? cuando(tx, lectura.urgencia, lectura.tipo) : null), [lectura, tx]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // si cambia el sector, se empieza de cero
  useEffect(() => {
    reiniciar();
  }, [sector.id]);

  // cronómetro visible mientras la empresa «trabaja»
  useEffect(() => {
    if (!enviado || paso >= PASOS) return;
    const t0 = performance.now() - ms;
    const iv = window.setInterval(() => setMs(performance.now() - t0), 50);
    return () => clearInterval(iv);
  }, [enviado, paso >= PASOS]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    chat.current?.scrollTo({ top: chat.current.scrollHeight, behavior: "smooth" });
  }, [msgs, escribiendo]);

  function reiniciar() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setEnviado(null);
    setMsgs([]);
    setPaso(0);
    setMs(0);
    setEscribiendo(false);
  }

  function enviar(txt: string) {
    const limpio = txt.trim();
    if (limpio.length < 6 || enviado) return;
    const ahora = hhmm(new Date());
    setMsgs([{ de: "cliente", texto: limpio, hora: ahora }]);
    setEnviado(limpio);
    setTexto("");
    setMs(0);
    setOt(3300 + Math.floor(Math.random() * 600));
    const at = (t: number, f: () => void) => timers.current.push(window.setTimeout(f, t));
    at(500, () => setPaso(1));
    at(1300, () => setPaso(2));
    at(2300, () => setPaso(3));
    at(3100, () => setPaso(4));
    at(3300, () => setEscribiendo(true));
    at(4200, () => {
      setEscribiendo(false);
      setPaso(5);
    });
    // en el móvil el resultado queda debajo: lo acercamos
    if (window.innerWidth < 1024) at(350, () => pipe.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  // la respuesta al cliente se escribe cuando todo lo demás está listo
  useEffect(() => {
    if (paso !== 5 || !lectura || !tecnico || !cita) return;
    const nombre = tecnico.nombre.split(" ")[0];
    const x = { empresa: sector.empresa, nombre, servicio: lectura.servicio.nombre, precio: fmt.eur0(lectura.servicio.precio), municipio: lectura.municipioDicho ? lectura.municipio : null, cuando: cita.largo };
    const r = lectura.tipo === "presupuesto" ? tx.r.presupuesto(x) : lectura.tipo === "queja" ? tx.r.queja(x) : lectura.tipo === "consulta" ? tx.r.consulta(x) : tx.r.averia(x);
    setMsgs((m) => (m.some((x) => x.de === "empresa") ? m : [...m, { de: "empresa", texto: r, hora: hhmm(new Date()) }]));
  }, [paso, lectura, tecnico, cita, sector.empresa, tx, fmt]);

  function verEnPanel() {
    if (!enviado) return;
    addWebRequest(tx.contactoPrueba, "", enviado, "whatsapp", lectura ? { tipo: lectura.tipo, urgencia: lectura.urgencia, resumen: lectura.resumen, servicio: Math.max(0, sector.servicios.indexOf(lectura.servicio)) } : undefined);
    router.push(conIdioma(lang, "/panel/central-avisos"));
  }

  const urgColor = lectura?.urgencia === "alta" ? "bg-[#ff6b61]/15 text-[#ff8a82]" : lectura?.urgencia === "media" ? "bg-sun/15 text-sun" : "bg-white/10 text-white/80";
  const segundos = tx.coma((ms / 1000).toFixed(1));
  const fin = paso >= PASOS;

  return (
    <section id="pruebalo" data-hide-dock className="relative scroll-mt-20 overflow-hidden bg-[#061c25] py-16 text-white sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgb(15_90_112/0.55),transparent_60%),radial-gradient(ellipse_at_90%_100%,rgb(245_171_46/0.10),transparent_55%)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-sun px-2.5 py-1 text-[12px] font-semibold text-[#1d1300]">
            <span className="size-1.5 rounded-full bg-[#1d1300]" /> {tx.kicker}
          </div>
          <h2 className="mt-4 font-display text-[32px] leading-[1.05] font-semibold tracking-tight sm:text-[48px]">{tx.h2}</h2>
          <p className="mt-3 text-[16px] text-white/70 sm:text-[18px]">
            {tx.p(sector.empresa)}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-8">
          {/* Chat del cliente */}
          <div className="flex h-[520px] min-w-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0b141a] shadow-e3 sm:h-[560px]">
            <div className="flex items-center gap-3 border-b border-white/10 bg-[#111d24] px-4 py-3">
              <span className="grid size-10 place-items-center rounded-full font-display text-[15px] font-bold" style={{ background: sector.color }}>
                {sector.empresaCorta[0]}
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[15px] font-semibold">{sector.empresa}</div>
                <div className="text-[12px] text-[#5ee39a]">{escribiendo ? tx.escribiendo : tx.enLinea}</div>
              </div>
              {enviado && (
                <button onClick={reiniciar} className="grid size-9 place-items-center rounded-full text-white/60 hover:bg-white/10" aria-label={tx.otro}>
                  <RotateCcw className="size-4" />
                </button>
              )}
            </div>
            <div ref={chat} className="flex-1 space-y-2 overflow-y-auto bg-[radial-gradient(rgb(255_255_255/0.035)_1px,transparent_1px)] [background-size:14px_14px] px-3 py-4">
              {!msgs.length && (
                <div className="mx-auto mt-2 max-w-[260px] rounded-xl bg-white/[0.06] px-3 py-2 text-center text-[12px] text-white/55">
                  {tx.ayuda}
                </div>
              )}
              <AnimatePresence initial={false}>
                {msgs.map((m, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} className={cn("flex", m.de === "cliente" ? "justify-end" : "justify-start")}>
                    <div className={cn("max-w-[85%] rounded-2xl px-3 py-2 text-[14px] leading-snug shadow-sm", m.de === "cliente" ? "rounded-br-md bg-[#0f5a4a] text-white" : "rounded-bl-md bg-[#1c2a32] text-white")}>
                      {m.texto}
                      <span className="mt-0.5 flex items-center justify-end gap-1 text-[10px] text-white/45">
                        {m.hora} {m.de === "cliente" && <CheckCheck className={cn("size-3", paso >= 1 && "text-[#53bdeb]")} />}
                      </span>
                    </div>
                  </motion.div>
                ))}
                {escribiendo && (
                  <motion.div key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex">
                    <div className="flex gap-1 rounded-2xl rounded-bl-md bg-[#1c2a32] px-3 py-3">
                      {[0, 1, 2].map((d) => (
                        <motion.span key={d} className="size-1.5 rounded-full bg-white/60" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {!enviado && (
              <div className="flex gap-2 overflow-x-auto px-3 pb-2 no-scrollbar">
                {ejemplos.map((e) => (
                  <button key={e} onClick={() => enviar(e)} className="max-w-[240px] shrink-0 truncate rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-[12px] text-white/80 hover:bg-white/10">
                    {e}
                  </button>
                ))}
              </div>
            )}
            <form
              className="flex items-center gap-2 border-t border-white/10 bg-[#111d24] p-2.5"
              onSubmit={(e) => {
                e.preventDefault();
                enviar(texto);
              }}
            >
              <input
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                disabled={!!enviado}
                placeholder={enviado ? tx.enviado : tx.placeholder}
                className="h-11 min-w-0 flex-1 rounded-full bg-white/[0.07] px-4 text-[16px] text-white outline-none placeholder:text-white/35 focus:bg-white/10 disabled:opacity-50"
                aria-label={tx.aria}
                enterKeyHint="send"
              />
              <button type="submit" disabled={!!enviado || texto.trim().length < 6} className="grid size-11 shrink-0 place-items-center rounded-full bg-[#1faa59] text-white transition disabled:opacity-40" aria-label={tx.enviar}>
                <Send className="size-5" />
              </button>
            </form>
          </div>

          {/* Lo que hace la empresa sola */}
          <div ref={pipe} className="min-w-0 scroll-mt-4 rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div className="text-[13px] font-medium text-white/60">{tx.mientras}</div>
              <div className={cn("rounded-lg px-2.5 py-1 font-display text-[15px] font-semibold tabular", fin ? "bg-[#37c28a]/15 text-[#7fe3b8]" : "bg-white/10 text-white/80")}>
                {segundos} s
              </div>
            </div>
            <ol className="mt-4 grid gap-2.5">
              <Paso n={1} activo={paso >= 1} icon={<Inbox className="size-4" />} titulo={tx.recibido}>
                {lectura && (
                  <span>
                    WhatsApp, {hhmm(new Date())}. «{lectura.resumen}»
                  </span>
                )}
              </Paso>
              <Paso n={2} activo={paso >= 2} icon={<BrainCircuit className="size-4" />} titulo={tx.entendido} tono="ai">
                {lectura && (
                  <div className="flex flex-wrap gap-1.5">
                    <Chip>{TIPO_AVISO[lang][lectura.tipo]}</Chip>
                    <Chip className={urgColor}>{tx.urgencia(tx.urg[lectura.urgencia])}</Chip>
                    <Chip>
                      {lectura.servicio.nombre} · {tx.desde(fmt.eur0(lectura.servicio.precio))}
                    </Chip>
                    <Chip>{lectura.municipioDicho ? lectura.municipio : tx.zona}</Chip>
                  </div>
                )}
              </Paso>
              <Paso n={3} activo={paso >= 3} icon={<ClipboardList className="size-4" />} titulo={ot && paso >= 3 ? tx.orden(ot) : tx.ordenSin}>
                {tecnico && cita && (
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full text-[12px] font-bold text-white" style={{ background: tecnico.color }}>
                      {tecnico.nombre.split(" ").map((p) => p[0]).join("")}
                    </span>
                    <span>
                      <span className="font-semibold text-white">{tecnico.nombre}</span>, {lectura!.municipioDicho ? tx.tecnicoZona(lectura!.municipio) : tx.tecnico} {tx.carga}. <span className="text-white">{cita.corto}</span>, {fmt.dur(lectura!.servicio.min)}.
                    </span>
                  </div>
                )}
              </Paso>
              <Paso n={4} activo={paso >= 4} icon={<Bell className="size-4" />} titulo={tx.movil}>
                {tecnico && cita && lectura && (
                  <div className="flex items-start gap-2.5 rounded-xl bg-[#1a2830] p-2.5 shadow-e2">
                    <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-[#3db1d3] text-[#041319]">
                      <Bell className="size-3.5" />
                    </span>
                    <div className="min-w-0 text-[12px] leading-snug">
                      <div className="flex justify-between text-white/50">
                        <span>Nexo Campo</span>
                        <span>{tx.ahora}</span>
                      </div>
                      <div className="font-semibold text-white">{lectura.urgencia === "alta" ? tx.urgente : tx.nuevo}</div>
                      <div className="truncate text-white/75">
                        {lectura.servicio.nombre} · {cita.corto}
                      </div>
                    </div>
                  </div>
                )}
              </Paso>
              <Paso n={5} activo={paso >= 5} icon={<MessageCircle className="size-4" />} titulo={tx.respuesta} tono="ok">
                {fin && (
                  <>
                    <span className="lg:hidden">«{msgs.find((m) => m.de === "empresa")?.texto}»</span>
                    <span className="max-lg:hidden">{tx.miraChat}</span>
                  </>
                )}
              </Paso>
            </ol>

            <AnimatePresence>
              {fin && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 border-t border-white/10 pt-5">
                  <div className="font-display text-[20px] leading-tight font-semibold sm:text-[24px]">
                    {tx.todo(segundos)} <span className="text-white/60">{tx.nadie}</span>
                  </div>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <a
                      href={whatsappLink(tx.waMsg(enviado ?? ""))}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-12 items-center justify-center gap-2 rounded-xl bg-sun text-[15px] font-semibold text-[#1d1300] hover:brightness-105"
                    >
                      <MessageCircle className="size-5" /> {tx.loQuiero}
                    </a>
                    <button onClick={verEnPanel} className="flex h-12 items-center justify-center gap-2 rounded-xl border border-white/20 text-[15px] font-medium hover:bg-white/10">
                      {tx.verPanel} <ArrowRight className="size-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function Paso({ n, activo, icon, titulo, tono, children }: { n: number; activo: boolean; icon: React.ReactNode; titulo: string; tono?: "ai" | "ok"; children?: React.ReactNode }) {
  return (
    <li className={cn("relative flex gap-3 rounded-2xl border p-3 transition-colors duration-500", activo ? "border-white/12 bg-white/[0.05]" : "border-white/[0.06] bg-transparent")}>
      <span
        className={cn(
          "grid size-8 shrink-0 place-items-center rounded-full transition-colors duration-500",
          !activo ? "bg-white/[0.06] text-white/30" : tono === "ai" ? "bg-[#9d8fff] text-[#140f33]" : tono === "ok" ? "bg-[#37c28a] text-[#04150e]" : "bg-sun text-[#1d1300]",
        )}
      >
        {activo ? icon : <span className="text-[12px] font-semibold">{n}</span>}
      </span>
      <div className="min-w-0 flex-1 pt-1">
        <div className={cn("text-[14px] font-semibold transition-colors", activo ? "text-white" : "text-white/35")}>{titulo}</div>
        <AnimatePresence>
          {activo && children && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="overflow-hidden">
              <div className="pt-1.5 text-[13px] leading-snug text-white/70">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </li>
  );
}

function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("rounded-md bg-white/10 px-2 py-0.5 text-[12px] font-medium text-white/85", className)}>{children}</span>;
}
