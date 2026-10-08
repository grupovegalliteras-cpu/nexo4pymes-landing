"use client";

import Link from "@/components/i18n/Enlace";
import { AnimatePresence, motion } from "motion/react";
import {
  BadgeCheck, Bell, Check, ChevronDown, ClipboardCheck, FileSignature, Mail, MessageCircle, Monitor, Navigation, PhoneIncoming, PlayCircle, Receipt, Sparkles, Wallet, Wrench,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { ModuleGroup } from "@/data/modules";
import { gruposDe, modulosDe } from "@/data/modules-i18n";
import { sectoresDe } from "@/data/sectors-i18n";
import type { SectorId } from "@/data/sectors";
import { CONTACTO, whatsappLink } from "@/data/site";
import { useDemo, useSector } from "@/store/demo";
import { useUi } from "@/store/ui";
import { cn } from "@/lib/utils";
import { useFmt, useIdioma } from "@/components/i18n/idioma";
import { Icon } from "@/components/icon";
import { PanelShell } from "@/components/panel/shell";
import { AppShell, PhoneFrame } from "@/components/app/shell";
import { FAQ_PORTADA } from "@/content/faq-portada";
import { Caustics } from "./caustics";
import { HeroAnim } from "./hero-anim";
import { PruebaAviso } from "./prueba-aviso";
import { ContactDock, SiteFooter, SiteNav, waHola } from "./chrome";

/* Textos de la portada en los tres idiomas. En alemán, trato de usted (Sie). */
const T = {
  es: {
    heroKicker: "Panel de oficina y app de técnicos, conectados",
    heroA: "La llamada entra.",
    heroB: "El trabajo sale solo.",
    heroP: "Recogemos cada llamada y cada WhatsApp de tus clientes, los convertimos en órdenes de trabajo y los mandamos al móvil de tus técnicos. Parte, fotos, firma, factura con VeriFactu y cobro, sin pasar nada a mano.",
    verDemo: "Ver la demo en vivo",
    escribenos: "Escríbenos por WhatsApp",
    sellos: ["Sin cambiar de número", "Funciona sin cobertura", "Datos en la UE", "Hecho en Mallorca"],
    sectH: "Elige tu sector y mira la demo con tu día a día",
    sectP: "La demo cambia la empresa, los servicios, los checklists, las mediciones y los avisos.",
    ejemplo: "Empresa de ejemplo",
    problema: "El problema de siempre: ",
    verDemoCorta: "Ver la demo",
    verDemoDe: (s: string) => ` de ${s.toLowerCase()}`,
    masSector: "Más sobre el sector",
    checklist: "Checklist del parte",
    mediciones: "Mediciones en campo",
    servicios: "Servicios",
    recH: "Un día cualquiera, de la llamada a la factura cobrada",
    recP: "Cada paso es una pantalla real de la demo. Pulsa en cualquiera para verla.",
    ver: (x: string) => `Ver ${x}`,
    pasos: [
      ["Llama un cliente", "Central Avisos graba, transcribe y clasifica la llamada. También los WhatsApp, emails y formularios.", "Central Avisos"],
      ["La oficina crea la orden", "Con el técnico recomendado por zona y carga de trabajo. Un clic.", "Órdenes de trabajo"],
      ["Le llega al técnico", "Notificación en el móvil con dirección, notas de la oficina e historial del cliente.", "App de operarios"],
      ["Va de camino", "El cliente recibe un aviso. En la oficina ves en el mapa dónde está cada uno.", "Rutas"],
      ["Parte con fotos y firma", "Checklist, mediciones del sector, material de la furgoneta, fotos y firma con el dedo. Aunque no haya cobertura.", "Parte de trabajo"],
      ["Informe al cliente", "Un PDF con tu marca, las fotos y la firma, enviado solo.", "Informes"],
      ["Factura con VeriFactu", "Sale del parte, con su QR y el enlace de pago. Tú solo la revisas.", "Facturación"],
      ["Cobrada por Bizum", "El cliente paga desde el móvil y el panel de dirección lo refleja al instante.", "Cobros"],
    ],
    realH: "No es una maqueta. Tócalo.",
    realMovil: "Esta es la app que llevarían tus técnicos, funcionando con datos de ejemplo. Toca un trabajo, ficha o abre el menú Más.",
    realPc: "Esto que ves abajo es el panel de oficina funcionando, con datos de ejemplo. Navega, abre fichas, emite una factura. Y el móvil del técnico está conectado.",
    pantallaCompleta: "Abrir a pantalla completa",
    oficinaYMovil: "Ver oficina y móvil conectados",
    abrirPanel: "Abrir el panel de oficina",
    modH: "Empieza por lo que más te duele. Añade el resto cuando quieras.",
    modP: (n: number) => `${n} módulos que encajan entre sí. Cada uno tiene su pantalla en la demo.`,
    caH: "Ningún aviso vuelve a quedarse en un pósit.",
    caP: "Llamadas grabadas y transcritas, WhatsApp, email y web en una bandeja. La IA clasifica por tipo, urgencia y cliente, y crea la orden de trabajo en un clic. Mantienes tu número de siempre.",
    caBoton: "Verlo funcionando",
    disponible: "disponible",
    aMedida: "a medida",
    catalogo: "Ver el catálogo completo con descripciones",
    comoH: "Cómo trabajamos",
    como: [
      ["Diagnóstico", "Vemos cómo trabajáis hoy: quién coge las llamadas, cómo se reparten los trabajos, cómo se factura. Detectamos dónde se pierde más tiempo."],
      ["Primera versión funcionando", "Empezamos por el módulo que más te duele, con tus clientes, tus servicios y tu marca. Tu equipo lo usa desde el primer día."],
      ["Ampliación por módulos", "Cuando lo primero ya funciona, sumamos lo siguiente: facturación, fichaje, almacén… Sin cambiar de sistema cada vez."],
    ],
    faqH: "Preguntas que nos hacen siempre",
    faqP: "Respuestas claras. Si falta la tuya, escríbenos.",
    /* Las preguntas viven en content/faq-portada.ts porque el
       servidor también las necesita, para publicarlas como datos
       estructurados. Ver el comentario de ese archivo. */
    faq: FAQ_PORTADA.es,
    ctH: "Pide tu demo con los datos de tu empresa",
    ctP: "Te enseñamos esta misma demo con tus servicios, tus clientes y tu marca, para que tu equipo se vea usándola. Sin compromiso.",
    ctPuntos: ["Una llamada de 20 minutos para entender cómo trabajáis", "Una demo personalizada con tus datos", "Un precio cerrado por escrito"],
    gracias: (n: string) => `¡Gracias, ${n || "hablamos pronto"}!`,
    abierto: (e: string) => `Se ha abierto WhatsApp con tu mensaje. Si prefieres email, escríbenos a ${e}.`,
    volver: "Volver al formulario",
    fNombre: "Tu nombre",
    fEmpresa: "Empresa",
    fTel: "Teléfono",
    fTecnicos: "Técnicos en campo",
    tecnicos: ["1", "2 a 5", "6 a 15", "Más de 15"],
    fSector: "Sector",
    cambialo: "(cámbialo arriba)",
    enviar: "Enviar por WhatsApp",
    email: "Prefiero email",
    asunto: "Quiero una demo con mis datos",
    msg: (f: { nombre: string; empresa: string; tel: string; tecnicos: string }, sector: string) =>
      `Hola, soy ${f.nombre || "…"} de ${f.empresa || "…"} (${sector.toLowerCase()}, ${f.tecnicos} técnicos). He visto la demo de Nexo4Pymes y quiero verla con los datos de mi empresa.${f.tel ? ` Mi teléfono: ${f.tel}.` : ""}`,
  },
  en: {
    heroKicker: "Office dashboard and technician app, connected",
    heroA: "The call comes in.",
    heroB: "The job gets done.",
    heroP: "We pick up every call and every WhatsApp from your customers, turn them into work orders and send them to your technicians' phones. Job report, photos, signature, VeriFactu invoice and payment, with nothing typed up by hand.",
    verDemo: "See the live demo",
    escribenos: "Message us on WhatsApp",
    sellos: ["Keep your phone number", "Works without signal", "Data stored in the EU", "Made in Mallorca"],
    sectH: "Pick your industry and see the demo with your day-to-day",
    sectP: "The demo changes the company, services, checklists, readings and requests.",
    ejemplo: "Sample company",
    problema: "The usual headache: ",
    verDemoCorta: "See the demo",
    verDemoDe: (s: string) => ` for ${s.toLowerCase()}`,
    masSector: "More about this industry",
    checklist: "Job report checklist",
    mediciones: "On-site readings",
    servicios: "Services",
    recH: "An ordinary day, from the call to the paid invoice",
    recP: "Every step is a real screen from the demo. Tap any of them to see it.",
    ver: (x: string) => `See ${x}`,
    pasos: [
      ["A customer calls", "Central Avisos records, transcribes and sorts the call. WhatsApp messages, emails and web forms too.", "Central Avisos"],
      ["The office creates the order", "With the technician suggested by area and workload. One click.", "Work orders"],
      ["The technician gets it", "A notification on their phone with the address, office notes and the customer's history.", "Technician app"],
      ["On the way", "The customer gets a message. In the office you see on the map where everyone is.", "Routes"],
      ["Job report with photos and signature", "Checklist, industry readings, van stock, photos and a finger signature. Even with no signal.", "Job report"],
      ["Report to the customer", "A branded PDF with the photos and signature, sent automatically.", "Reports"],
      ["VeriFactu invoice", "Created from the job report, with its QR code and payment link. You just check it.", "Invoicing"],
      ["Paid by Bizum", "The customer pays from their phone and the management dashboard shows it instantly.", "Payments"],
    ],
    realH: "It's not a mock-up. Try it.",
    realMovil: "This is the app your technicians would carry, running with sample data. Tap a job, clock in or open the More menu.",
    realPc: "What you see below is the office dashboard, running with sample data. Browse, open records, issue an invoice. And the technician's phone is connected.",
    pantallaCompleta: "Open full screen",
    oficinaYMovil: "See office and phone connected",
    abrirPanel: "Open the office dashboard",
    modH: "Start with what hurts most. Add the rest whenever you like.",
    modP: (n: number) => `${n} modules that fit together. Each one has its own screen in the demo.`,
    caH: "No request ever ends up on a sticky note again.",
    caP: "Recorded and transcribed calls, WhatsApp, email and web in one inbox. AI sorts them by type, urgency and customer, and creates the work order in one click. You keep your usual number.",
    caBoton: "See it working",
    disponible: "available",
    aMedida: "custom",
    catalogo: "See the full catalogue with descriptions",
    comoH: "How we work",
    como: [
      ["Diagnosis", "We look at how you work today: who takes the calls, how jobs are assigned, how invoicing happens. We find where most time is lost."],
      ["A first version up and running", "We start with the module that hurts most, with your customers, services and branding. Your team uses it from day one."],
      ["Add modules as you go", "Once the first part works, we add the next: invoicing, time clock, stock… Without changing systems every time."],
    ],
    faqH: "Questions we always get asked",
    faqP: "Straight answers. If yours is missing, message us.",
    /* Las preguntas viven en content/faq-portada.ts porque el
       servidor también las necesita, para publicarlas como datos
       estructurados. Ver el comentario de ese archivo. */
    faq: FAQ_PORTADA.en,
    ctH: "Get this demo with your company's data",
    ctP: "We'll show you this same demo with your services, your customers and your branding, so your team can picture themselves using it. No commitment.",
    ctPuntos: ["A 20-minute call to understand how you work", "A personalised demo with your data", "A fixed price in writing"],
    gracias: (n: string) => (n ? `Thanks, ${n}!` : "Thanks, talk soon!"),
    abierto: (e: string) => `WhatsApp has opened with your message. If you prefer email, write to us at ${e}.`,
    volver: "Back to the form",
    fNombre: "Your name",
    fEmpresa: "Company",
    fTel: "Phone",
    fTecnicos: "Field technicians",
    tecnicos: ["1", "2 to 5", "6 to 15", "More than 15"],
    fSector: "Industry",
    cambialo: "(change it above)",
    enviar: "Send via WhatsApp",
    email: "I prefer email",
    asunto: "I'd like a demo with my data",
    msg: (f: { nombre: string; empresa: string; tel: string; tecnicos: string }, sector: string) =>
      `Hi, I'm ${f.nombre || "…"} from ${f.empresa || "…"} (${sector.toLowerCase()}, ${f.tecnicos} technicians). I've seen the Nexo4Pymes demo and I'd like to see it with my company's data.${f.tel ? ` My phone: ${f.tel}.` : ""}`,
  },
  de: {
    heroKicker: "Büro-Dashboard und Techniker-App, verbunden",
    heroA: "Der Anruf kommt rein.",
    heroB: "Der Auftrag läuft von selbst.",
    heroP: "Wir nehmen jeden Anruf und jede WhatsApp Ihrer Kunden auf, machen daraus Arbeitsaufträge und schicken sie aufs Handy Ihrer Techniker. Arbeitsbericht, Fotos, Unterschrift, Rechnung mit VeriFactu und Zahlung, ohne etwas abzutippen.",
    verDemo: "Live-Demo ansehen",
    escribenos: "Schreiben Sie uns auf WhatsApp",
    sellos: ["Ihre Nummer bleibt", "Funktioniert ohne Netz", "Daten in der EU", "Made in Mallorca"],
    sectH: "Wählen Sie Ihre Branche und sehen Sie die Demo mit Ihrem Alltag",
    sectP: "Die Demo passt Firma, Leistungen, Checklisten, Messwerte und Anfragen an.",
    ejemplo: "Beispielfirma",
    problema: "Das übliche Problem: ",
    verDemoCorta: "Demo ansehen",
    verDemoDe: (s: string) => `: ${s}`,
    masSector: "Mehr zur Branche",
    checklist: "Checkliste im Arbeitsbericht",
    mediciones: "Messwerte vor Ort",
    servicios: "Leistungen",
    recH: "Ein ganz normaler Tag, vom Anruf bis zur bezahlten Rechnung",
    recP: "Jeder Schritt ist ein echter Bildschirm der Demo. Tippen Sie darauf, um ihn zu sehen.",
    ver: (x: string) => `${x} ansehen`,
    pasos: [
      ["Ein Kunde ruft an", "Central Avisos zeichnet den Anruf auf, transkribiert und ordnet ihn ein. Auch WhatsApp, E-Mails und Formulare.", "Central Avisos"],
      ["Das Büro erstellt den Auftrag", "Mit dem Techniker, der nach Gebiet und Auslastung vorgeschlagen wird. Ein Klick.", "Arbeitsaufträge"],
      ["Der Techniker bekommt ihn", "Benachrichtigung aufs Handy mit Adresse, Hinweisen vom Büro und Kundenhistorie.", "Techniker-App"],
      ["Unterwegs", "Der Kunde bekommt eine Nachricht. Im Büro sehen Sie auf der Karte, wo jeder ist.", "Routen"],
      ["Bericht mit Fotos und Unterschrift", "Checkliste, Branchenmesswerte, Material aus dem Fahrzeug, Fotos und Unterschrift mit dem Finger. Auch ohne Netz.", "Arbeitsbericht"],
      ["Bericht an den Kunden", "Ein PDF mit Ihrem Logo, den Fotos und der Unterschrift, automatisch verschickt.", "Berichte"],
      ["Rechnung mit VeriFactu", "Entsteht aus dem Arbeitsbericht, mit QR-Code und Zahlungslink. Sie prüfen sie nur noch.", "Rechnungen"],
      ["Per Bizum bezahlt", "Der Kunde zahlt per Handy und das Dashboard der Geschäftsführung zeigt es sofort.", "Zahlungen"],
    ],
    realH: "Kein Mock-up. Probieren Sie es aus.",
    realMovil: "Das ist die App, die Ihre Techniker nutzen würden, mit Beispieldaten. Tippen Sie auf einen Auftrag, stempeln Sie ein oder öffnen Sie das Menü Mehr.",
    realPc: "Unten sehen Sie das Büro-Dashboard in Aktion, mit Beispieldaten. Klicken Sie sich durch, öffnen Sie Akten, stellen Sie eine Rechnung aus. Und das Handy des Technikers ist verbunden.",
    pantallaCompleta: "Im Vollbild öffnen",
    oficinaYMovil: "Büro und Handy verbunden ansehen",
    abrirPanel: "Büro-Dashboard öffnen",
    modH: "Beginnen Sie dort, wo es am meisten drückt. Der Rest kommt, wann Sie wollen.",
    modP: (n: number) => `${n} Module, die zusammenpassen. Jedes hat seinen eigenen Bildschirm in der Demo.`,
    caH: "Keine Anfrage landet mehr auf einem Zettel.",
    caP: "Aufgezeichnete und transkribierte Anrufe, WhatsApp, E-Mail und Web in einem Posteingang. Die KI ordnet nach Art, Dringlichkeit und Kunde und erstellt den Auftrag mit einem Klick. Ihre Telefonnummer bleibt.",
    caBoton: "In Aktion ansehen",
    disponible: "verfügbar",
    aMedida: "individuell",
    catalogo: "Vollständigen Katalog mit Beschreibungen ansehen",
    comoH: "So arbeiten wir",
    como: [
      ["Analyse", "Wir schauen uns an, wie Sie heute arbeiten: wer die Anrufe annimmt, wie Aufträge verteilt und wie abgerechnet wird. Wir finden heraus, wo die meiste Zeit verloren geht."],
      ["Eine erste Version im Einsatz", "Wir beginnen mit dem Modul, das am meisten drückt, mit Ihren Kunden, Leistungen und Ihrem Logo. Ihr Team nutzt es ab dem ersten Tag."],
      ["Ausbau Modul für Modul", "Wenn der erste Teil läuft, kommt der nächste dazu: Rechnungen, Zeiterfassung, Lager… Ohne jedes Mal das System zu wechseln."],
    ],
    faqH: "Fragen, die uns immer gestellt werden",
    faqP: "Klare Antworten. Wenn Ihre fehlt, schreiben Sie uns.",
    /* Las preguntas viven en content/faq-portada.ts porque el
       servidor también las necesita, para publicarlas como datos
       estructurados. Ver el comentario de ese archivo. */
    faq: FAQ_PORTADA.de,
    ctH: "Die Demo mit den Daten Ihrer Firma",
    ctP: "Wir zeigen Ihnen genau diese Demo mit Ihren Leistungen, Ihren Kunden und Ihrem Logo, damit Ihr Team sich damit arbeiten sieht. Unverbindlich.",
    ctPuntos: ["Ein 20-minütiges Gespräch, um Ihre Abläufe zu verstehen", "Eine persönliche Demo mit Ihren Daten", "Ein Festpreis, schriftlich"],
    gracias: (n: string) => (n ? `Danke, ${n}!` : "Danke, bis bald!"),
    abierto: (e: string) => `WhatsApp wurde mit Ihrer Nachricht geöffnet. Wenn Sie lieber mailen, schreiben Sie an ${e}.`,
    volver: "Zurück zum Formular",
    fNombre: "Ihr Name",
    fEmpresa: "Firma",
    fTel: "Telefon",
    fTecnicos: "Techniker im Außendienst",
    tecnicos: ["1", "2 bis 5", "6 bis 15", "Mehr als 15"],
    fSector: "Branche",
    cambialo: "(oben ändern)",
    enviar: "Per WhatsApp senden",
    email: "Lieber per E-Mail",
    asunto: "Ich möchte eine Demo mit meinen Daten",
    msg: (f: { nombre: string; empresa: string; tel: string; tecnicos: string }, sector: string) =>
      `Hallo, ich bin ${f.nombre || "…"} von ${f.empresa || "…"} (${sector}, ${f.tecnicos} Techniker). Ich habe die Demo von Nexo4Pymes gesehen und würde sie gern mit den Daten meiner Firma sehen.${f.tel ? ` Meine Telefonnummer: ${f.tel}.` : ""}`,
  },
};

function useT() {
  return T[useIdioma()];
}

export function Landing() {
  return (
    <div className="bg-bg text-fg">
      <SiteNav dark />
      <Hero />
      <SectorPicker />
      <AvisoPadel />
      <Recorrido />
      <PruebaAviso />
      <SoftwareReal />
      <Modulos />
      <Como />
      <Faq />
      <Contacto />
      <SiteFooter />
      <ContactDock />
    </div>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  const t = useT();
  const lang = useIdioma();
  return (
    <section className="relative overflow-hidden bg-[#041820] text-white">
      <div className="absolute inset-0">
        <Caustics />
        {/* en móvil el texto ocupa todo el ancho: velo vertical; en escritorio, de izquierda a derecha */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(4_24_32/0.5)_0%,rgb(4_24_32/0.78)_45%,rgb(4_24_32/0.92)_100%)] lg:bg-[linear-gradient(90deg,rgb(4_24_32/0.92)_0%,rgb(4_24_32/0.55)_45%,rgb(4_24_32/0.15)_100%)]" />
        <div className="grain absolute inset-0 opacity-[0.07] mix-blend-overlay" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#041820]" />
      </div>
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pt-24 pb-14 sm:px-6 sm:pt-28 lg:grid-cols-[1fr_1.05fr] lg:gap-10 lg:pt-32 lg:pb-24">
        <div>
          <div className="fade-up inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[12px] text-white/80 backdrop-blur sm:text-[13px]">
            <span className="size-1.5 rounded-full bg-sun" /> {t.heroKicker}
          </div>
          <h1 className="fade-up mt-5 font-display text-[42px] leading-[1.02] font-semibold tracking-[-0.03em] min-[400px]:text-[46px] sm:text-[60px] lg:text-[64px]" style={{ animationDelay: "80ms" }}>
            {t.heroA}
            <br />
            <span className="text-[#8fd9ea]">{t.heroB}</span>
          </h1>
          <p className="fade-up mt-4 max-w-xl text-[16px] leading-relaxed text-white/75 sm:mt-5 sm:text-[18px]" style={{ animationDelay: "160ms" }}>
            {t.heroP}
          </p>
          <div className="fade-up mt-7 grid gap-3 sm:mt-8 sm:flex sm:flex-wrap" style={{ animationDelay: "240ms" }}>
            <Link href="/demo?tour=1" className="group flex h-13 items-center justify-center gap-2 rounded-xl bg-sun px-5 text-[16px] font-semibold text-[#1d1300] shadow-[0_10px_30px_-10px_rgb(245_171_46/0.7)] transition hover:brightness-105 sm:h-12 sm:text-[15px]">
              <PlayCircle className="size-5" /> {t.verDemo}
            </Link>
            <a href={whatsappLink(waHola(lang))} target="_blank" rel="noreferrer" className="vibrar flex h-13 items-center justify-center gap-2 rounded-xl bg-[#1faa59] px-5 text-[16px] font-semibold text-white shadow-[0_10px_30px_-10px_rgb(31_170_89/0.7)] transition hover:brightness-110 sm:h-12 sm:text-[15px]">
              <MessageCircle className="size-5" /> {t.escribenos}
            </a>
          </div>
          <div className="fade-up mt-8 grid grid-cols-2 gap-x-4 gap-y-2 text-[13px] text-white/65 sm:mt-10 sm:flex sm:flex-wrap sm:gap-x-6" style={{ animationDelay: "400ms" }}>
            {t.sellos.map((x) => (
              <span key={x} className="flex items-center gap-1.5">
                <Check className="size-3.5 text-[#7fe3b8]" /> {x}
              </span>
            ))}
          </div>
        </div>
        <HeroAnim />
      </div>
    </section>
  );
}

/* ---------------- Nexo Pádel ----------------
   Producto propio para clubes y escuelas de pádel, con página en /padel.
   Solo en español: los clientes son clubes de Mallorca. */
function AvisoPadel() {
  const lang = useIdioma();
  if (lang !== "es") return null;
  return (
    <section className="bg-[#041820] pb-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Link href="/padel" className="group flex flex-col gap-3 rounded-2xl border border-sun/40 bg-sun/10 p-5 transition hover:bg-sun/15 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <span>
            <span className="block text-[13px] font-semibold text-sun">🎾 Nuevo: Nexo Pádel</span>
            <span className="mt-1 block font-display text-[20px] font-semibold sm:text-[22px]">¿Tenéis un club o una escuela de pádel?</span>
            <span className="mt-1 block text-[15px] text-white/70">Un WhatsApp que contesta por vosotros, faltas y recuperaciones automáticas y partidos que se completan solos.</span>
          </span>
          <span className="flex h-11 shrink-0 items-center justify-center rounded-xl bg-sun px-4 text-[15px] font-semibold text-[#1d1300]">Ver Nexo Pádel →</span>
        </Link>
      </div>
    </section>
  );
}

/* ---------------- Selector de sector ---------------- */
function SectorPicker() {
  const t = useT();
  const lang = useIdioma();
  const f = useFmt();
  const sector = useSector();
  const setSector = useDemo((s) => s.setSector);
  return (
    <section id="sectores" className="relative scroll-mt-20 bg-[#041820] pb-20 text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-[26px] leading-tight font-semibold tracking-tight sm:text-[34px]">{t.sectH}</h2>
              <p className="mt-1 text-white/60">{t.sectP}</p>
            </div>
          </div>
          <div className="-mx-5 mt-6 flex gap-2 overflow-x-auto px-5 pb-1 no-scrollbar [mask-image:linear-gradient(90deg,transparent,#000_20px,#000_calc(100%-40px),transparent)] sm:mx-0 sm:px-0 sm:[mask-image:none]">
            {sectoresDe(lang).map((s) => (
              <button
                key={s.id}
                onClick={() => setSector(s.id as SectorId)}
                className={cn("flex h-11 shrink-0 items-center gap-2 rounded-xl border px-3.5 text-[14px] font-medium transition", sector.id === s.id ? "border-sun bg-sun text-[#1d1300]" : "border-white/15 text-white/80 hover:bg-white/10")}
                aria-pressed={sector.id === s.id}
              >
                <Icon name={s.icono} className="size-4" />
                {s.nombre}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={sector.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr_1fr]">
              <div>
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-xl font-display text-lg font-bold text-white" style={{ background: sector.color }}>
                    {sector.empresaCorta[0]}
                  </span>
                  <div>
                    <div className="text-[13px] text-white/50">{t.ejemplo}</div>
                    <div className="font-display text-xl font-semibold">{sector.empresa}</div>
                  </div>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-white/75">
                  <span className="text-white/45">{t.problema}</span>
                  {sector.dolor}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Link href={`/demo?sector=${sector.id}&tour=1`} className="flex h-10 items-center gap-2 rounded-lg bg-white px-4 text-[14px] font-semibold text-[#041820]">
                    <PlayCircle className="size-4" /> {t.verDemoCorta}
                    <span className="-ml-2 max-sm:hidden">{t.verDemoDe(sector.nombre)}</span>
                  </Link>
                  <Link href={`/sectores/${sector.id}`} className="flex h-10 items-center rounded-lg border border-white/20 px-4 text-[14px] font-medium hover:bg-white/10">
                    {t.masSector}
                  </Link>
                </div>
              </div>
              <div className="rounded-2xl bg-white/[0.05] p-4">
                <div className="text-[13px] font-medium text-white/50">{t.checklist}</div>
                <ul className="mt-2 grid gap-1.5 text-[14px]">
                  {sector.checklist.map((c, i) => (
                    <motion.li key={c} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center gap-2">
                      <span className="grid size-4 shrink-0 place-items-center rounded-full bg-[#37c28a] text-[#04150e]">
                        <Check className="size-2.5" />
                      </span>
                      {c}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-white/[0.05] p-4">
                <div className="text-[13px] font-medium text-white/50">{t.mediciones}</div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {sector.mediciones.slice(0, 4).map((m) => (
                    <div key={m.nombre} className="rounded-xl bg-white/[0.06] p-2.5">
                      <div className="text-[11px] text-white/50">{m.nombre}</div>
                      <div className="font-display text-lg font-semibold tabular">
                        {f.num((m.ok[0] + m.ok[1]) / 2, m.dec)} <span className="text-xs font-normal text-white/50">{m.unidad}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-[13px] font-medium text-white/50">{t.servicios}</div>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {sector.servicios.map((s) => (
                    <span key={s.nombre} className="rounded-md bg-white/[0.07] px-2 py-1 text-[12px]">
                      {s.nombre}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Recorrido del día ---------------- */
const PASOS: { h: string; icon: ReactNode; href: string; tone: string }[] = [
  { h: "8:02", icon: <PhoneIncoming className="size-4" />, href: "/panel/central-avisos", tone: "bg-sun text-[#1d1300]" },
  { h: "8:03", icon: <Wrench className="size-4" />, href: "/panel/trabajos", tone: "bg-brand text-brand-ink" },
  { h: "8:03", icon: <Bell className="size-4" />, href: "/app", tone: "bg-info text-white" },
  { h: "9:10", icon: <Navigation className="size-4" />, href: "/panel/rutas", tone: "bg-brand text-brand-ink" },
  { h: "10:25", icon: <ClipboardCheck className="size-4" />, href: "/app", tone: "bg-ok text-white" },
  { h: "10:26", icon: <FileSignature className="size-4" />, href: "/panel/informes", tone: "bg-ai text-white" },
  { h: "10:40", icon: <Receipt className="size-4" />, href: "/panel/facturacion", tone: "bg-fg text-bg" },
  { h: "12:15", icon: <Wallet className="size-4" />, href: "/panel/cobros", tone: "bg-ok text-white" },
];

function Recorrido() {
  const t = useT();
  return (
    <section id="recorrido" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-[30px] leading-tight font-semibold tracking-tight sm:text-[44px]">{t.recH}</h2>
          <p className="mt-3 text-[17px] text-fg-2">{t.recP}</p>
        </div>
        <div className="relative mt-14">
          <div className="absolute top-0 bottom-0 left-[27px] w-px bg-line md:left-1/2" />
          <motion.div className="absolute top-0 left-[27px] w-px origin-top bg-gradient-to-b from-sun to-brand md:left-1/2" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 2.2, ease: "easeOut" }} style={{ height: "100%" }} />
          <ol className="grid gap-8">
            {PASOS.map((p, i) => {
              const [titulo, desc, etiqueta] = t.pasos[i];
              return (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5 }}
                  className={cn("relative grid items-center gap-4 pl-16 md:grid-cols-2 md:gap-16 md:pl-0", i % 2 && "md:[&>*:first-child]:order-2")}
                >
                  <span className={cn("absolute top-1 left-[14px] grid size-[27px] place-items-center rounded-full ring-4 ring-bg md:left-[calc(50%-13px)]", p.tone)}>{p.icon}</span>
                  <div className={cn(i % 2 ? "md:pl-4" : "md:pr-4 md:text-right")}>
                    <div className="text-[13px] font-semibold text-fg-3 tabular">{p.h}</div>
                    <div className="font-display text-[24px] font-semibold tracking-tight">{titulo}</div>
                    <p className="mt-1 text-[15px] text-fg-2">{desc}</p>
                  </div>
                  <div className={cn(i % 2 ? "md:pr-4 md:text-right" : "md:pl-4")}>
                    <Link href={p.href} className="group inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-[14px] font-medium shadow-e1 transition hover:-translate-y-0.5 hover:shadow-e2">
                      <span className={cn("grid size-6 place-items-center rounded-md", p.tone)}>{p.icon}</span>
                      {t.ver(etiqueta)}
                    </Link>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Software real ---------------- */
function ScaledPanel() {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.7);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(el.clientWidth / 1280));
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShow(true), { rootMargin: "300px" });
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);
  return (
    <div ref={box} className="relative w-full overflow-hidden" style={{ height: 780 * scale }}>
      <div className="absolute top-0 left-0 origin-top-left" style={{ width: 1280, height: 780, transform: `scale(${scale})` }}>
        {show ? <PanelShell mode="embedded" /> : <div className="size-full bg-bg" />}
      </div>
    </div>
  );
}

function useWide() {
  const [wide, setWide] = useState<boolean | null>(null);
  const [vw, setVw] = useState(375);
  useEffect(() => {
    const f = () => {
      setWide(window.innerWidth >= 1024);
      setVw(window.innerWidth);
    };
    f();
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);
  return { wide, vw };
}

function SoftwareReal() {
  const t = useT();
  const { wide, vw } = useWide();
  useEffect(() => {
    useUi.getState().setPanelSection("direccion");
  }, []);
  return (
    <section className="relative overflow-hidden bg-surface-2/60 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="font-display text-[30px] leading-tight font-semibold tracking-tight sm:text-[44px]">{t.realH}</h2>
            <p className="mt-3 text-[16px] text-fg-2 sm:text-[17px]">
              <span className="lg:hidden">{t.realMovil}</span>
              <span className="max-lg:hidden">{t.realPc}</span>
            </p>
          </div>
          <Link href="/demo" className="hidden h-11 items-center gap-2 rounded-xl bg-fg px-4 text-[14px] font-semibold text-bg lg:flex">
            {t.pantallaCompleta}
          </Link>
        </div>
        {wide === true && (
          <div className="mt-10 grid items-end gap-6 lg:grid-cols-[1fr_auto]">
            <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-e3">
              <div className="flex h-9 items-center gap-2 border-b border-line bg-surface px-3">
                <span className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="size-2.5 rounded-full bg-[#febc2e]" />
                  <span className="size-2.5 rounded-full bg-[#28c840]" />
                </span>
                <span className="mx-auto rounded-md bg-surface-2 px-3 py-0.5 text-[11px] text-fg-3">panel.nexo4pymes.com</span>
              </div>
              <ScaledPanel />
            </div>
            <div className="flex justify-center">
              <PhoneFrame scale={0.72}>
                <AppShell />
              </PhoneFrame>
            </div>
          </div>
        )}
        {wide === false && (
          <>
            {/* en el móvil el panel de 1280 px no se lee: se enseña la app, que es nativa de esta pantalla */}
            <div className="mt-8 flex justify-center">
              <PhoneFrame scale={Math.min(0.86, (vw - 40) / 390)}>
                <AppShell />
              </PhoneFrame>
            </div>
            <div className="mx-auto mt-6 grid max-w-md gap-2">
              <Link href="/demo?tour=1" className="flex h-12 items-center justify-center gap-2 rounded-xl bg-fg text-[15px] font-semibold text-bg">
                <PlayCircle className="size-5" /> {t.oficinaYMovil}
              </Link>
              <Link href="/panel" className="flex h-12 items-center justify-center gap-2 rounded-xl border border-line bg-surface text-[15px] font-medium">
                <Monitor className="size-5 text-brand" /> {t.abrirPanel}
              </Link>
            </div>
          </>
        )}
        {wide === null && <div className="mt-8 h-[640px]" />}
      </div>
    </section>
  );
}

/* ---------------- Módulos ---------------- */
function Modulos() {
  const t = useT();
  const lang = useIdioma();
  const grupos = gruposDe(lang);
  const modulos = modulosDe(lang);
  const groups = Object.keys(grupos) as ModuleGroup[];
  const showEstado = useUi((s) => s.showEstado);
  return (
    <section id="modulos" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-[30px] leading-tight font-semibold tracking-tight sm:text-[44px]">{t.modH}</h2>
          <p className="mt-3 text-[17px] text-fg-2">{t.modP(modulos.length)}</p>
        </div>

        <Link href="/panel/central-avisos" className="group relative mt-10 block overflow-hidden rounded-3xl bg-[#041820] p-6 text-white sm:p-8">
          <div className="absolute inset-0 opacity-60">
            <Caustics deep="#041820" mid="#0b3a48" light="#f5ab2e" />
          </div>
          <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-sun px-2.5 py-1 text-[12px] font-semibold text-[#1d1300]">
                <PhoneIncoming className="size-3.5" /> Central Avisos
              </div>
              <div className="mt-3 max-w-2xl font-display text-[28px] leading-tight font-semibold tracking-tight">{t.caH}</div>
              <p className="mt-2 max-w-2xl text-white/70">{t.caP}</p>
            </div>
            <span className="flex h-11 items-center gap-2 rounded-xl bg-white px-4 text-[14px] font-semibold text-[#041820] transition group-hover:bg-sun">
              <Sparkles className="size-4" /> {t.caBoton}
            </span>
          </div>
        </Link>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, gi) => (
            <motion.div key={g} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ delay: (gi % 3) * 0.06 }} className="rounded-2xl border border-line bg-surface p-5">
              <div className="font-display text-lg font-semibold">{grupos[g].nombre}</div>
              <div className="text-[13px] text-fg-3">{grupos[g].lema}</div>
              <ul className="mt-4 grid gap-0.5">
                {modulos
                  .filter((m) => m.grupo === g)
                  .map((m) => (
                    <li key={m.id}>
                      <Link href={`/panel/${m.id}`} className="group flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[14px] hover:bg-surface-2">
                        <Icon name={m.icono} className="size-4 shrink-0 text-brand" />
                        <span className="flex-1">{m.nombre}</span>
                        {showEstado && <span className={cn("rounded px-1.5 text-[10px]", m.estado === "disponible" ? "bg-ok-soft text-ok" : "bg-ai-soft text-ai")}>{m.estado === "disponible" ? t.disponible : t.aMedida}</span>}
                      </Link>
                    </li>
                  ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/modulos" className="inline-flex h-11 items-center rounded-xl border border-line bg-surface px-4 text-[14px] font-semibold shadow-e1 hover:bg-surface-2">
            {t.catalogo}
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Cómo trabajamos ---------------- */
function Como() {
  const t = useT();
  return (
    <section id="como" className="scroll-mt-20 bg-[#041820] py-16 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <h2 className="max-w-2xl font-display text-[30px] leading-tight font-semibold tracking-tight sm:text-[44px]">{t.comoH}</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {t.como.map(([titulo, desc], i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative">
              <div className="font-display text-[80px] leading-none font-semibold text-white/[0.08]">{i + 1}</div>
              <div className="-mt-6 font-display text-[22px] font-semibold">{titulo}</div>
              <p className="mt-2 text-[15px] leading-relaxed text-white/65">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Preguntas ---------------- */
function Faq() {
  const t = useT();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="preguntas" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="font-display text-[30px] leading-tight font-semibold tracking-tight sm:text-[44px]">{t.faqH}</h2>
          <p className="mt-3 text-[17px] text-fg-2">{t.faqP}</p>
        </div>
        <div className="divide-y divide-line rounded-2xl border border-line bg-surface">
          {t.faq.map(([q, a], i) => (
            <div key={i}>
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[16px] font-semibold" aria-expanded={open === i}>
                {q}
                <ChevronDown className={cn("size-5 shrink-0 text-fg-3 transition-transform", open === i && "rotate-180")} />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="px-5 pb-5 text-[15px] leading-relaxed text-fg-2">{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contacto ---------------- */
function Contacto() {
  const t = useT();
  const sector = useSector();
  const [f, setF] = useState({ nombre: "", empresa: "", tel: "", tecnicos: t.tecnicos[1] as string });
  const [sent, setSent] = useState(false);
  const msg = t.msg(f, sector.nombre);
  const input = "h-12 w-full rounded-xl border border-white/15 bg-white/[0.06] px-3.5 text-[16px] text-white outline-none placeholder:text-white/35 focus:border-sun";
  return (
    <section id="contacto" className="relative scroll-mt-20 overflow-hidden bg-[#041820] py-16 text-white sm:py-24">
      <div className="absolute inset-0 opacity-70">
        <Caustics />
      </div>
      <div className="absolute inset-0 bg-[#041820]/60" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-[34px] leading-[1.05] font-semibold tracking-tight sm:text-[52px]">{t.ctH}</h2>
          <p className="mt-4 max-w-lg text-[17px] text-white/70">{t.ctP}</p>
          <div className="mt-8 grid gap-3 text-[15px]">
            {t.ctPuntos.map((x) => (
              <div key={x} className="flex items-center gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-sun text-[#1d1300]">
                  <Check className="size-3.5" />
                </span>
                {x}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-white/12 bg-white/[0.06] p-5 backdrop-blur-xl sm:p-6">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div key="ok" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="grid place-items-center gap-3 py-12 text-center">
                <span className="grid size-14 place-items-center rounded-full bg-[#37c28a] text-[#04150e]">
                  <BadgeCheck className="size-7" />
                </span>
                <div className="font-display text-2xl font-semibold">{t.gracias(f.nombre.split(" ")[0])}</div>
                <p className="max-w-sm text-white/70">{t.abierto(CONTACTO.email)}</p>
                <button onClick={() => setSent(false)} className="mt-2 text-[14px] text-white/70 underline">
                  {t.volver}
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="f"
                className="grid gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  window.open(whatsappLink(msg), "_blank", "noopener");
                  setSent(true);
                }}
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="grid gap-1.5 text-[13px] text-white/60">
                    {t.fNombre}
                    <input required className={input} value={f.nombre} onChange={(e) => setF({ ...f, nombre: e.target.value })} autoComplete="name" />
                  </label>
                  <label className="grid gap-1.5 text-[13px] text-white/60">
                    {t.fEmpresa}
                    <input required className={input} value={f.empresa} onChange={(e) => setF({ ...f, empresa: e.target.value })} autoComplete="organization" />
                  </label>
                  <label className="grid gap-1.5 text-[13px] text-white/60">
                    {t.fTel}
                    <input type="tel" className={input} value={f.tel} onChange={(e) => setF({ ...f, tel: e.target.value })} autoComplete="tel" />
                  </label>
                  <label className="grid gap-1.5 text-[13px] text-white/60">
                    {t.fTecnicos}
                    <select className={input} value={f.tecnicos} onChange={(e) => setF({ ...f, tecnicos: e.target.value })}>
                      {t.tecnicos.map((x) => (
                        <option key={x} className="text-black">
                          {x}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="text-[13px] text-white/60">
                  {t.fSector}: <span className="text-white">{sector.nombre}</span> <span className="text-white/40">{t.cambialo}</span>
                </div>
                <button type="submit" className="mt-2 flex h-12 items-center justify-center gap-2 rounded-xl bg-sun text-[15px] font-semibold text-[#1d1300] hover:brightness-105">
                  <MessageCircle className="size-5" /> {t.enviar}
                </button>
                <a href={`mailto:${CONTACTO.email}?subject=${encodeURIComponent(t.asunto)}&body=${encodeURIComponent(msg)}`} className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/15 text-[14px] font-medium hover:bg-white/10">
                  <Mail className="size-4" /> {t.email}
                </a>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
