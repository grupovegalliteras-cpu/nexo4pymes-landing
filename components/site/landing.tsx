"use client";

import Link from "@/components/i18n/Enlace";
import { AnimatePresence, motion } from "motion/react";
import {
  BadgeCheck, Bell, Check, ChevronDown, ClipboardCheck, FileSignature, Mail, MessageCircle, Monitor, Navigation, PhoneIncoming, PlayCircle, Receipt, Sparkles, Wallet, Wrench,
} from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
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
import dynamic from "next/dynamic";
import { FAQ_PORTADA } from "@/content/faq-portada";
import { colaboradores, textosColaboradores } from "@/content/colaboradores";
import { HeroAnim } from "./hero-anim";
import { PruebaAviso } from "./prueba-aviso";
import { ContactDock, SiteFooter, SiteNav, waHola } from "./chrome";
import type { Idioma } from "@/lib/i18n";
import { HeroNucleo } from "@/components/deeptech/hero";
import { Metricas } from "@/components/deeptech/metricas";
import { Magnetico, moverFoco } from "@/components/deeptech/interaccion";
import { Etiqueta, Titulo } from "@/components/deeptech/piezas";
import { useMovimientoPortada } from "@/components/deeptech/movimiento";

/* El panel y la app incrustados solo se pintan en el navegador (al llegar a
   «Software real»), así que se descargan aparte: sacarlos del paquete
   inicial es lo que más aligera la primera carga de la portada. */
const PanelShell = dynamic(() => import("@/components/panel/shell").then((m) => m.PanelShell), { ssr: false });
const AppShell = dynamic(() => import("@/components/app/shell").then((m) => m.AppShell), { ssr: false });
const PhoneFrame = dynamic(() => import("@/components/app/shell").then((m) => m.PhoneFrame), { ssr: false });

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

/* Textos nuevos de la portada Deep Tech: el rótulo de cada sección y el
   bloque «En directo». Van aparte para no tocar los de arriba, que se
   comparten con versiones anteriores de la portada. */
const TD = {
  es: {
    kSectores: "Tu sector",
    kRecorrido: "Un día de trabajo",
    kReal: "El programa por dentro",
    kModulos: "Qué incluye",
    kComo: "Cómo empezamos",
    kFaq: "Preguntas frecuentes",
    kContacto: "Hablemos",
    escK: "Así funciona",
    escH: "Así entra una llamada y así sale el trabajo.",
    escP: "La animación usa la empresa de ejemplo del sector que tengas elegido. Cámbialo un poco más abajo y verás otra llamada, otro cliente y otro técnico.",
    escPuntos: [
      ["Grabada y transcrita", "Central Avisos coge la llamada en tu número de siempre."],
      ["Clasificada por IA", "Tipo de aviso, urgencia y cliente, sin que nadie lo teclee."],
      ["Asignada y avisada", "La orden llega al móvil del técnico más cercano y el cliente recibe su aviso."],
    ],
  },
  en: {
    kSectores: "Your industry",
    kRecorrido: "A working day",
    kReal: "Inside the software",
    kModulos: "What's included",
    kComo: "How we start",
    kFaq: "Frequently asked questions",
    kContacto: "Let's talk",
    escK: "How it works",
    escH: "This is how a call comes in and the job goes out.",
    escP: "The animation uses the sample company for the industry you have selected. Change it a little further down and you'll see another call, another customer and another technician.",
    escPuntos: [
      ["Recorded and transcribed", "Central Avisos picks up the call on your usual number."],
      ["Sorted by AI", "Request type, urgency and customer, without anyone typing it."],
      ["Assigned and notified", "The order reaches the nearest technician's phone and the customer gets a message."],
    ],
  },
  de: {
    kSectores: "Ihre Branche",
    kRecorrido: "Ein Arbeitstag",
    kReal: "Die Software von innen",
    kModulos: "Was dazugehört",
    kComo: "So starten wir",
    kFaq: "Häufige Fragen",
    kContacto: "Sprechen wir",
    escK: "So funktioniert es",
    escH: "So kommt ein Anruf rein und so geht der Auftrag raus.",
    escP: "Die Animation nutzt die Beispielfirma der Branche, die Sie gewählt haben. Ändern Sie sie etwas weiter unten, und Sie sehen einen anderen Anruf, einen anderen Kunden und einen anderen Techniker.",
    escPuntos: [
      ["Aufgezeichnet und transkribiert", "Central Avisos nimmt den Anruf unter Ihrer gewohnten Nummer an."],
      ["Von der KI eingeordnet", "Art der Anfrage, Dringlichkeit und Kunde, ohne dass jemand etwas abtippt."],
      ["Zugewiesen und benachrichtigt", "Der Auftrag landet auf dem Handy des nächstgelegenen Technikers, und der Kunde bekommt eine Nachricht."],
    ],
  },
} satisfies Record<Idioma, unknown>;

function useT() {
  const lang = useIdioma();
  return { ...T[lang], ...TD[lang] };
}

/* La portada es siempre oscura («Deep Tech»): .deeptech redefine los
   tokens del sistema de diseño (app/(demo)/deeptech.css) y data-theme
   activa las variantes dark: de los componentes de dentro, aunque el
   visitante tenga el tema claro en el resto de la web.

   Arquitectura, de arriba abajo:
     01 Núcleo        el gancho: WebGL que cuenta el producto en una imagen
     02 Telemetría    cifras reales del producto, con barras 3D y anillos
     03 En directo    la animación de la llamada, ahora con espacio propio
     04 Sectores      el visitante elige su sector y todo lo demás cambia
        Pádel y colaboradores
     05 Pipeline      el día de ejemplo, con un haz que se dibuja al bajar
     06 Pruébalo      escribe un aviso y mira lo que pasa
     07 Software real el panel y la app de verdad, incrustados
     08 Módulos · 09 Método · 10 Preguntas · 11 Contacto */
export function Landing() {
  useMovimientoPortada();
  return (
    <div data-theme="dark" className="deeptech text-fg">
      <SiteNav dark />
      <Hero />
      <Metricas />
      <Escaparate />
      <SectorPicker />
      <AvisoPadel />
      <Colaboradores />
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
  const eventos = t.pasos.map(([titulo], i) => ({ hora: PASOS[i].h, texto: titulo }));
  return (
    <HeroNucleo
      kicker={t.heroKicker}
      a={t.heroA}
      b={t.heroB}
      p={t.heroP}
      verDemo={t.verDemo}
      escribenos={t.escribenos}
      waHref={whatsappLink(waHola(lang))}
      sellos={t.sellos}
      eventos={eventos}
    />
  );
}

/* ---------------- En directo ----------------
   La animación de la llamada que antes iba a la derecha del hero. Llega
   inclinada en 3D y se endereza con el scroll. */
function Escaparate() {
  const t = useT();
  return (
    <section id="en-directo" className="relative scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div>
          <Etiqueta>{t.escK}</Etiqueta>
          <Titulo className="mt-5 text-[32px] sm:text-[46px]">{t.escH}</Titulo>
          <p data-revelar className="mt-4 text-[17px] leading-relaxed text-fg-2">
            {t.escP}
          </p>
          <ol className="mt-8 grid gap-4">
            {t.escPuntos.map(([titulo, desc], i) => (
              <li key={titulo} data-revelar className="flex gap-4" style={{ "--d": `${120 + i * 100}ms` } as CSSProperties}>
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-[14px] font-semibold text-[var(--dt-cian)]">{i + 1}</span>
                <span>
                  <span className="block font-semibold text-fg">{titulo}</span>
                  <span className="mt-0.5 block text-[15px] leading-relaxed text-fg-2">{desc}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div data-scrub="inclinar" className="dt-cristal relative rounded-[30px] p-3 sm:p-6">
          <div className="pointer-events-none absolute -inset-px rounded-[30px] bg-[radial-gradient(ellipse_at_70%_0%,rgb(56_225_255/0.14),transparent_55%),radial-gradient(ellipse_at_10%_100%,rgb(157_123_255/0.12),transparent_55%)]" />
          <HeroAnim />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Empresas colaboradoras ----------------
   Va detrás del aviso de Nexo Pádel y antes del recorrido del día: el
   visitante acaba de ver los sectores y el producto, y es justo ahí
   donde se pregunta quién está detrás de todo esto.

   Los datos están en content/colaboradores.ts. Una empresa sin web
   sale como texto y no como enlace, y una sin descripción sale solo
   con su papel: ver el comentario de ese archivo. */
function Colaboradores() {
  const lang = useIdioma();
  const t = textosColaboradores[lang];
  return (
    <section id="colaboradores" className="scroll-mt-20 pb-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="dt-cristal rounded-[28px] p-6 sm:p-8">
          <span className="text-[14px] font-semibold text-fg-3">{t.categoria}</span>
          <h2 className="mt-3 font-display text-[24px] leading-tight font-semibold tracking-[-0.03em] sm:text-[30px]">{t.titulo}</h2>
          <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-fg-2">{t.entradilla}</p>
          <ul className="dt-foco-grupo mt-7 grid gap-4 sm:grid-cols-2" onPointerMove={moverFoco}>
            {colaboradores.map((c) => {
              const texto = c.texto[lang];
              const cuerpo = (
                <>
                  <span className="block font-display text-[18px] font-semibold">{c.nombre}</span>
                  <span className="mt-1 block text-[13px] font-medium text-sun">{c.papel[lang]}</span>
                  {texto ? <span className="mt-2.5 block text-[14.5px] leading-relaxed text-fg-2">{texto}</span> : null}
                  {c.web ? (
                    <span className="mt-3 block text-[13.5px] font-medium text-[var(--dt-cian)]">
                      {c.web.replace(/^https?:\/\//, "")} <span aria-hidden="true">↗</span>
                    </span>
                  ) : null}
                </>
              );
              return (
                <li key={c.nombre} className="min-w-0">
                  {c.web ? (
                    <a href={c.web} target="_blank" rel="noreferrer" className="dt-foco block h-full rounded-[18px] border border-white/10 bg-white/[0.02] p-5 transition-colors hover:bg-white/[0.04]">
                      {cuerpo}
                    </a>
                  ) : (
                    <div className="dt-foco h-full rounded-[18px] border border-white/10 bg-white/[0.02] p-5">{cuerpo}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
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
    <section className="pb-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Link href="/padel" onPointerMove={moverFoco} className="dt-foco group flex flex-col gap-3 rounded-[22px] border border-sun/35 bg-sun/[0.06] p-5 transition-colors hover:bg-sun/10 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <span>
            <span className="block text-[13px] font-semibold text-sun">🎾 Nuevo: Nexo Pádel</span>
            <span className="mt-1 block font-display text-[20px] font-semibold tracking-[-0.02em] sm:text-[22px]">¿Tenéis un club o una escuela de pádel?</span>
            <span className="mt-1 block text-[15px] text-fg-2">Un WhatsApp que contesta por vosotros, faltas y recuperaciones automáticas y partidos que se completan solos.</span>
          </span>
          <span className="dt-boton dt-boton-primario h-11 shrink-0 px-5 text-[15px]">Ver Nexo Pádel →</span>
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
    <section id="sectores" className="relative scroll-mt-20 py-16 text-white sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div onPointerMove={moverFoco} className="dt-foco dt-cristal rounded-[30px] p-5 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Etiqueta>{t.kSectores}</Etiqueta>
              <Titulo className="mt-4 text-[28px] sm:text-[38px]">{t.sectH}</Titulo>
              <p className="mt-2 text-fg-2">{t.sectP}</p>
            </div>
          </div>
          <div className="-mx-5 mt-6 flex gap-2 overflow-x-auto px-5 pb-1 no-scrollbar [mask-image:linear-gradient(90deg,transparent,#000_20px,#000_calc(100%-40px),transparent)] sm:mx-0 sm:px-0 sm:[mask-image:none]">
            {sectoresDe(lang).map((s) => (
              <button
                key={s.id}
                onClick={() => setSector(s.id as SectorId)}
                className={cn(
                  "flex h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-[14px] font-medium transition",
                  sector.id === s.id ? "border-sun bg-sun text-[#00170f] shadow-[0_0_28px_-6px_var(--dt-menta)]" : "border-white/12 bg-white/[0.02] text-fg-2 hover:border-white/25 hover:text-fg",
                )}
                aria-pressed={sector.id === s.id}
              >
                <Icon name={s.icono} className="size-4" />
                {s.nombre}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={sector.id} initial={{ opacity: 0, y: 8, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -8, filter: "blur(6px)" }} transition={{ duration: 0.3 }} className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr_1fr]">
              <div>
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-xl font-display text-lg font-bold text-white" style={{ background: sector.color, boxShadow: `0 0 30px -6px ${sector.color}` }}>
                    {sector.empresaCorta[0]}
                  </span>
                  <div>
                    <div className="text-[13px] text-fg-3">{t.ejemplo}</div>
                    <div className="font-display text-xl font-semibold">{sector.empresa}</div>
                  </div>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-fg-2">
                  <span className="text-fg-3">{t.problema}</span>
                  {sector.dolor}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Link href={`/demo?sector=${sector.id}&tour=1`} className="dt-boton dt-boton-primario h-10 px-4 text-[14px]">
                    <PlayCircle className="size-4" /> {t.verDemoCorta}
                    <span className="-ml-[0.25rem] max-sm:hidden">{t.verDemoDe(sector.nombre)}</span>
                  </Link>
                  <Link href={`/sectores/${sector.id}`} className="dt-boton dt-boton-cristal h-10 px-4 text-[14px] font-medium">
                    {t.masSector}
                  </Link>
                </div>
              </div>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
                <div className="text-[13px] font-semibold text-fg-3">{t.checklist}</div>
                <ul className="mt-3 grid gap-1.5 text-[14px]">
                  {sector.checklist.map((c, i) => (
                    <motion.li key={c} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center gap-2">
                      <span className="grid size-4 shrink-0 place-items-center rounded-full bg-sun text-[#00170f]">
                        <Check className="size-2.5" />
                      </span>
                      {c}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
                <div className="text-[13px] font-semibold text-fg-3">{t.mediciones}</div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {sector.mediciones.slice(0, 4).map((m) => (
                    <div key={m.nombre} className="rounded-xl border border-white/[0.05] bg-white/[0.03] p-2.5">
                      <div className="text-[11px] text-fg-3">{m.nombre}</div>
                      <div className="font-display text-lg font-semibold tabular">
                        {f.num((m.ok[0] + m.ok[1]) / 2, m.dec)} <span className="text-xs font-normal text-fg-3">{m.unidad}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-[13px] font-semibold text-fg-3">{t.servicios}</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {sector.servicios.map((s) => (
                    <span key={s.nombre} className="rounded-md border border-white/[0.06] bg-white/[0.04] px-2 py-1 text-[12px]">
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
  { h: "8:02", icon: <PhoneIncoming className="size-4" />, href: "/panel/central-avisos", tone: "bg-sun text-[#00170f]" },
  { h: "8:03", icon: <Wrench className="size-4" />, href: "/panel/trabajos", tone: "bg-brand text-brand-ink" },
  { h: "8:03", icon: <Bell className="size-4" />, href: "/app", tone: "bg-info text-white" },
  { h: "9:10", icon: <Navigation className="size-4" />, href: "/panel/rutas", tone: "bg-brand text-brand-ink" },
  { h: "10:25", icon: <ClipboardCheck className="size-4" />, href: "/app", tone: "bg-ok text-[#00170f]" },
  { h: "10:26", icon: <FileSignature className="size-4" />, href: "/panel/informes", tone: "bg-ai text-white" },
  { h: "10:40", icon: <Receipt className="size-4" />, href: "/panel/facturacion", tone: "bg-fg text-bg" },
  { h: "12:15", icon: <Wallet className="size-4" />, href: "/panel/cobros", tone: "bg-ok text-[#00170f]" },
];

function Recorrido() {
  const t = useT();
  return (
    <section id="recorrido" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="max-w-2xl">
          <Etiqueta>{t.kRecorrido}</Etiqueta>
          <Titulo className="mt-5 text-[30px] sm:text-[46px]">{t.recH}</Titulo>
          <p data-revelar className="mt-3 text-[17px] text-fg-2">
            {t.recP}
          </p>
        </div>
        <div className="relative mt-14">
          <div className="absolute top-0 bottom-0 left-[27px] w-px bg-white/[0.07] md:left-1/2" />
          {/* sin JavaScript o con «reducir movimiento», el haz se queda entero */}
          <div data-scrub="haz" className="dt-haz absolute top-0 bottom-0 left-[27px] w-px md:left-1/2" />
          <ol className="dt-foco-grupo grid gap-8" onPointerMove={moverFoco}>
            {PASOS.map((p, i) => {
              const [titulo, desc, etiqueta] = t.pasos[i];
              return (
                <li key={i} data-revelar className={cn("relative grid items-center gap-4 pl-16 md:grid-cols-2 md:gap-16 md:pl-0", i % 2 && "md:[&>*:first-child]:order-2")}>
                  <span className={cn("absolute top-1 left-[14px] grid size-[27px] place-items-center rounded-full shadow-[0_0_22px_-4px_rgb(56_225_255/0.8)] ring-4 ring-bg md:left-[calc(50%-13px)]", p.tone)}>{p.icon}</span>
                  <div className={cn(i % 2 ? "md:pl-4" : "md:pr-4 md:text-right")}>
                    <div className="text-[14px] font-semibold text-[var(--dt-cian)] tabular">{p.h}</div>
                    <div className="font-display text-[24px] font-semibold tracking-[-0.025em]">{titulo}</div>
                    <p className="mt-1 text-[15px] text-fg-2">{desc}</p>
                  </div>
                  <div className={cn(i % 2 ? "md:pr-4 md:text-right" : "md:pl-4")}>
                    <Link href={p.href} className="dt-foco group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] py-2 pr-4 pl-2 text-[14px] font-medium transition-colors hover:border-white/20 hover:bg-white/[0.05]">
                      <span className={cn("grid size-7 place-items-center rounded-full", p.tone)}>{p.icon}</span>
                      {t.ver(etiqueta)}
                    </Link>
                  </div>
                </li>
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
    // el panel y la app se descargan en un rato libre tras cargar, no al
    // llegar a la sección: así montarlos no da un tirón en mitad del scroll
    const precargar = () => {
      import("@/components/panel/shell");
      import("@/components/app/shell");
    };
    // Safari tardó en tener requestIdleCallback: si no está, un temporizador
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(precargar, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(precargar, 2500);
    return () => clearTimeout(id);
  }, []);
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-[70%] bg-[radial-gradient(ellipse_55%_50%_at_50%_50%,rgb(56_225_255/0.1),transparent_70%)]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <Etiqueta>{t.kReal}</Etiqueta>
            <Titulo className="mt-5 text-[30px] sm:text-[46px]">{t.realH}</Titulo>
            <p className="mt-3 text-[16px] text-fg-2 sm:text-[17px]">
              <span className="lg:hidden">{t.realMovil}</span>
              <span className="max-lg:hidden">{t.realPc}</span>
            </p>
          </div>
          <Magnetico className="hidden lg:inline-flex">
            <Link href="/demo" className="dt-boton dt-boton-cristal h-11 px-5 text-[14px]">
              <span>{t.pantallaCompleta}</span>
            </Link>
          </Magnetico>
        </div>
        {/* el envoltorio está siempre: GSAP lo encuentra aunque el contenido se decida después */}
        <div data-scrub="inclinar">
          {wide === true && (
            <div className="mt-10 grid items-end gap-6 lg:grid-cols-[1fr_auto]">
              <div className="dt-monitor overflow-hidden">
                <div className="flex h-9 items-center gap-2 border-b border-white/[0.07] bg-[#080b11] px-3">
                  <span className="flex gap-1.5">
                    <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="size-2.5 rounded-full bg-[#febc2e]" />
                    <span className="size-2.5 rounded-full bg-[#28c840]" />
                  </span>
                  <span className="mx-auto rounded-md border border-white/[0.06] bg-white/[0.03] px-3 py-0.5 text-[11px] text-fg-3">panel.nexo4pymes.com</span>
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
                <Link href="/demo?tour=1" className="dt-boton dt-boton-primario h-12 text-[15px]">
                  <PlayCircle className="size-5" /> {t.oficinaYMovil}
                </Link>
                <Link href="/panel" className="dt-boton dt-boton-cristal h-12 text-[15px] font-medium">
                  <Monitor className="size-5 text-brand" /> {t.abrirPanel}
                </Link>
              </div>
            </>
          )}
          {wide === null && <div className="mt-8 h-[640px]" />}
        </div>
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
          <Etiqueta>{t.kModulos}</Etiqueta>
          <Titulo className="mt-5 text-[30px] sm:text-[46px]">{t.modH}</Titulo>
          <p data-revelar className="mt-3 text-[17px] text-fg-2">
            {t.modP(modulos.length)}
          </p>
        </div>

        <Link href="/panel/central-avisos" onPointerMove={moverFoco} className="dt-foco group relative mt-10 block overflow-hidden rounded-[30px] border border-white/10 bg-[#04070c] p-6 sm:p-8">
          <div className="dt-rejilla pointer-events-none absolute inset-0 opacity-70" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_90%_at_100%_50%,rgb(44_245_176/0.16),transparent_70%),radial-gradient(ellipse_40%_80%_at_0%_100%,rgb(157_123_255/0.14),transparent_70%)]" />
          <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-sun px-2.5 py-1 text-[12px] font-semibold text-[#00170f] shadow-[0_0_24px_-6px_var(--dt-menta)]">
                <PhoneIncoming className="size-3.5" /> Central Avisos
              </div>
              <div className="mt-3 max-w-2xl font-display text-[28px] leading-tight font-semibold tracking-[-0.03em]">{t.caH}</div>
              <p className="mt-2 max-w-2xl text-fg-2">{t.caP}</p>
            </div>
            <span className="dt-boton dt-boton-primario h-11 px-5 text-[14px]">
              <Sparkles className="size-4" /> {t.caBoton}
            </span>
          </div>
        </Link>

        <div className="dt-foco-grupo mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" onPointerMove={moverFoco}>
          {groups.map((g, gi) => (
            <div key={g} data-revelar className="dt-foco dt-cristal rounded-[24px] p-5" style={{ "--d": `${(gi % 3) * 80}ms` } as CSSProperties}>
              <div className="font-display text-lg font-semibold tracking-[-0.02em]">{grupos[g].nombre}</div>
              <div className="text-[13px] text-fg-3">{grupos[g].lema}</div>
              <ul className="mt-4 grid gap-0.5">
                {modulos
                  .filter((m) => m.grupo === g)
                  .map((m) => (
                    <li key={m.id}>
                      <Link href={`/panel/${m.id}`} className="group flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[14px] transition-colors hover:bg-white/[0.05]">
                        <Icon name={m.icono} className="size-4 shrink-0 text-brand" />
                        <span className="flex-1">{m.nombre}</span>
                        {showEstado && <span className={cn("rounded px-1.5 text-[10px]", m.estado === "disponible" ? "bg-ok-soft text-ok" : "bg-ai-soft text-ai")}>{m.estado === "disponible" ? t.disponible : t.aMedida}</span>}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/modulos" className="dt-boton dt-boton-cristal h-11 px-5 text-[14px]">
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
    <section id="como" className="scroll-mt-20 py-16 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Etiqueta>{t.kComo}</Etiqueta>
        <Titulo className="mt-5 max-w-2xl text-[30px] sm:text-[46px]">{t.comoH}</Titulo>
        <div className="dt-foco-grupo relative mt-12 grid gap-5 md:grid-cols-3" onPointerMove={moverFoco}>
          {t.como.map(([titulo, desc], i) => (
            <div key={i} data-revelar className="dt-foco dt-cristal relative rounded-[24px] p-6" style={{ "--d": `${i * 110}ms` } as CSSProperties}>
              <div className="dt-numero-paso font-display text-[84px] leading-none font-semibold tracking-[-0.06em]">{i + 1}</div>
              <div className="mt-2 font-display text-[22px] font-semibold tracking-[-0.025em]">{titulo}</div>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-2">{desc}</p>
            </div>
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
          <Etiqueta>{t.kFaq}</Etiqueta>
          <Titulo className="mt-5 text-[30px] sm:text-[46px]">{t.faqH}</Titulo>
          <p className="mt-3 text-[17px] text-fg-2">{t.faqP}</p>
        </div>
        <div data-revelar className="dt-cristal divide-y divide-white/[0.07] overflow-hidden rounded-[24px]">
          {t.faq.map(([q, a], i) => (
            <div key={i} className={cn("transition-colors", open === i && "bg-white/[0.02]")}>
              <button onClick={() => setOpen(open === i ? null : i)} className={cn("flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[16px] font-semibold transition-colors", open === i && "text-[var(--dt-cian)]")} aria-expanded={open === i}>
                {q}
                <ChevronDown className={cn("size-5 shrink-0 text-fg-3 transition-transform", open === i && "rotate-180 text-[var(--dt-cian)]")} />
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
  const input = "h-12 w-full rounded-xl border border-white/12 bg-white/[0.04] px-3.5 text-[16px] text-white outline-none transition placeholder:text-white/35 focus:border-sun focus:shadow-[0_0_0_4px_rgb(44_245_176/0.12)]";
  return (
    <section id="contacto" className="relative scroll-mt-20 overflow-hidden py-20 text-white sm:py-28">
      <div className="dt-rejilla pointer-events-none absolute inset-0 opacity-60" />
      <div className="dt-luz-cierre pointer-events-none" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <Etiqueta>{t.kContacto}</Etiqueta>
          <Titulo className="mt-5 text-[34px] leading-[1.02] sm:text-[56px]">{t.ctH}</Titulo>
          <p className="mt-4 max-w-lg text-[17px] text-fg-2">{t.ctP}</p>
          <div className="mt-8 grid gap-3 text-[15px]">
            {t.ctPuntos.map((x, i) => (
              <div key={x} data-revelar className="flex items-center gap-3" style={{ "--d": `${i * 90}ms` } as CSSProperties}>
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-sun text-[#00170f] shadow-[0_0_18px_-4px_var(--dt-menta)]">
                  <Check className="size-3.5" />
                </span>
                {x}
              </div>
            ))}
          </div>
        </div>
        <div onPointerMove={moverFoco} className="dt-foco dt-cristal dt-cristal-blur rounded-[30px] p-5 sm:p-7">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div key="ok" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="grid place-items-center gap-3 py-12 text-center">
                <span className="grid size-14 place-items-center rounded-full bg-sun text-[#00170f] shadow-[0_0_40px_-6px_var(--dt-menta)]">
                  <BadgeCheck className="size-7" />
                </span>
                <div className="font-display text-2xl font-semibold">{t.gracias(f.nombre.split(" ")[0])}</div>
                <p className="max-w-sm text-fg-2">{t.abierto(CONTACTO.email)}</p>
                <button onClick={() => setSent(false)} className="mt-2 text-[14px] text-fg-2 underline">
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
                  <label className="grid gap-1.5 text-[13px] text-fg-2">
                    {t.fNombre}
                    <input required className={input} value={f.nombre} onChange={(e) => setF({ ...f, nombre: e.target.value })} autoComplete="name" />
                  </label>
                  <label className="grid gap-1.5 text-[13px] text-fg-2">
                    {t.fEmpresa}
                    <input required className={input} value={f.empresa} onChange={(e) => setF({ ...f, empresa: e.target.value })} autoComplete="organization" />
                  </label>
                  <label className="grid gap-1.5 text-[13px] text-fg-2">
                    {t.fTel}
                    <input type="tel" className={input} value={f.tel} onChange={(e) => setF({ ...f, tel: e.target.value })} autoComplete="tel" />
                  </label>
                  <label className="grid gap-1.5 text-[13px] text-fg-2">
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
                <div className="text-[13px] text-fg-2">
                  {t.fSector}: <span className="text-white">{sector.nombre}</span> <span className="text-fg-3">{t.cambialo}</span>
                </div>
                <Magnetico className="mt-2 w-full" fuerza={0.12}>
                  <button type="submit" className="dt-boton dt-boton-primario h-12 w-full text-[15px]">
                    <MessageCircle className="size-5" /> <span>{t.enviar}</span>
                  </button>
                </Magnetico>
                <a href={`mailto:${CONTACTO.email}?subject=${encodeURIComponent(t.asunto)}&body=${encodeURIComponent(msg)}`} className="dt-boton dt-boton-cristal h-11 text-[14px] font-medium">
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
