"use client";

import Link from "@/components/i18n/Enlace";
import { AnimatePresence, motion } from "motion/react";
import { Menu, MessageCircle, PlayCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CONTACTO, whatsappLink } from "@/data/site";
import { Logo } from "./logo";
import { usarConsentimiento } from "@/lib/consentimiento";
import { useIdioma } from "@/components/i18n/idioma";
import { SelectorIdioma } from "@/components/i18n/SelectorIdioma";
import type { Idioma } from "@/lib/i18n";

const T = {
  es: {
    links: [["Producto", "/#recorrido"], ["Sectores", "/#sectores"], ["Servicios", "/servicios"], ["Nosotros", "/nosotros"], ["Blog", "/blog"], ["Contacto", "/contacto"]],
    inicio: "Nexo4Pymes, inicio",
    principal: "Principal",
    abrirDemo: "Abrir la demo",
    pideDemo: "Pide tu demo",
    abrirMenu: "Abrir menú",
    cerrarMenu: "Cerrar menú",
    escribenos: "Escríbenos por WhatsApp",
    verDemo: "Ver la demo",
    hablamos: "¿Hablamos?",
    pie: "Paneles de gestión y apps para empresas de servicios, con automatización e inteligencia artificial. Desde",
    columnas: [
      ["Demo", [["Modo presentación", "/demo"], ["Panel de oficina", "/panel"], ["App de operarios", "/app"], ["Ver recorrido guiado", "/demo?tour=1"]]],
      ["Producto", [["Central Avisos", "/panel/central-avisos"], ["Todos los módulos", "/modulos"], ["Facturación con VeriFactu", "/panel/facturacion"], ["Fichaje", "/panel/fichaje"]]],
      ["Sectores", [["Mantenimiento", "/sectores/mantenimiento"], ["Piscinas", "/sectores/piscinas"], ["Climatización", "/sectores/climatizacion"], ["Limpieza", "/sectores/limpieza"]]],
      ["Empresa", [["Servicios", "/servicios"], ["Nosotros", "/nosotros"], ["Blog", "/blog"], ["Contacto", "/contacto"]]],
    ],
    ficticias: "Todas las empresas, personas y cifras de esta demo son ficticias.",
    legal: "Aviso legal, privacidad y cookies",
  },
  en: {
    links: [["Product", "/#recorrido"], ["Industries", "/#sectores"], ["Services", "/servicios"], ["About us", "/nosotros"], ["Blog", "/blog"], ["Contact", "/contacto"]],
    inicio: "Nexo4Pymes, home",
    principal: "Main",
    abrirDemo: "Open the demo",
    pideDemo: "Get your demo",
    abrirMenu: "Open menu",
    cerrarMenu: "Close menu",
    escribenos: "Message us on WhatsApp",
    verDemo: "See the demo",
    hablamos: "Let's talk",
    pie: "Management dashboards and apps for service companies, with automation and artificial intelligence. From",
    columnas: [
      ["Demo", [["Presentation mode", "/demo"], ["Office dashboard", "/panel"], ["Technician app", "/app"], ["Guided tour", "/demo?tour=1"]]],
      ["Product", [["Central Avisos", "/panel/central-avisos"], ["All modules", "/modulos"], ["Invoicing with VeriFactu", "/panel/facturacion"], ["Time clock", "/panel/fichaje"]]],
      ["Industries", [["Building maintenance", "/sectores/mantenimiento"], ["Pools", "/sectores/piscinas"], ["HVAC", "/sectores/climatizacion"], ["Cleaning", "/sectores/limpieza"]]],
      ["Company", [["Services", "/servicios"], ["About us", "/nosotros"], ["Blog", "/blog"], ["Contact", "/contacto"]]],
    ],
    ficticias: "All companies, people and figures in this demo are fictitious.",
    legal: "Legal notice, privacy and cookies",
  },
  de: {
    links: [["Produkt", "/#recorrido"], ["Branchen", "/#sectores"], ["Leistungen", "/servicios"], ["Über uns", "/nosotros"], ["Blog", "/blog"], ["Kontakt", "/contacto"]],
    inicio: "Nexo4Pymes, Startseite",
    principal: "Hauptmenü",
    abrirDemo: "Demo öffnen",
    pideDemo: "Demo anfragen",
    abrirMenu: "Menü öffnen",
    cerrarMenu: "Menü schließen",
    escribenos: "Schreiben Sie uns auf WhatsApp",
    verDemo: "Demo ansehen",
    hablamos: "Sprechen wir?",
    pie: "Management-Dashboards und Apps für Dienstleistungsunternehmen, mit Automatisierung und künstlicher Intelligenz. Aus",
    columnas: [
      ["Demo", [["Präsentationsmodus", "/demo"], ["Büro-Dashboard", "/panel"], ["Techniker-App", "/app"], ["Geführte Tour", "/demo?tour=1"]]],
      ["Produkt", [["Central Avisos", "/panel/central-avisos"], ["Alle Module", "/modulos"], ["Rechnungen mit VeriFactu", "/panel/facturacion"], ["Zeiterfassung", "/panel/fichaje"]]],
      ["Branchen", [["Gebäudetechnik", "/sectores/mantenimiento"], ["Pools", "/sectores/piscinas"], ["Klimatechnik", "/sectores/climatizacion"], ["Reinigung", "/sectores/limpieza"]]],
      ["Unternehmen", [["Leistungen", "/servicios"], ["Über uns", "/nosotros"], ["Blog", "/blog"], ["Kontakt", "/contacto"]]],
    ],
    ficticias: "Alle Firmen, Personen und Zahlen in dieser Demo sind frei erfunden.",
    legal: "Impressum, Datenschutz und Cookies",
  },
} as const;

/** Mensaje de WhatsApp por defecto, en el idioma del visitante. */
export function waHola(lang: Idioma) {
  return {
    es: "Hola, he visto la demo de Nexo4Pymes y me gustaría verla con los datos de mi empresa.",
    en: "Hi, I've seen the Nexo4Pymes demo and I'd like to see it with my company's data.",
    de: "Hallo, ich habe die Demo von Nexo4Pymes gesehen und würde sie gern mit den Daten meiner Firma sehen.",
  }[lang];
}

export function SiteNav({ dark = false }: { dark?: boolean }) {
  const lang = useIdioma();
  const t = T[lang];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  const onDark = dark && !scrolled;
  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,border-color] duration-300", scrolled ? "border-b border-line bg-bg/85 backdrop-blur-xl" : "border-b border-transparent")}>
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-5 px-4 sm:px-6">
        <Link href="/" aria-label={t.inicio} className="h-7 shrink-0 text-[17px]">
          <Logo light={onDark} className="h-7" />
        </Link>
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label={t.principal}>
          {t.links.map(([l, h]) => (
            <Link key={h} href={h} className={cn("rounded-lg px-2.5 py-2 text-[14px] font-medium whitespace-nowrap transition-colors xl:px-3", onDark ? "text-white/75 hover:text-white" : "text-fg-2 hover:text-fg")}>
              {l}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <SelectorIdioma tono={onDark ? "oscuro" : "tema"} className="hidden md:flex" />
          <Link href="/demo" className={cn("hidden h-9 items-center rounded-lg px-3.5 text-[14px] font-medium whitespace-nowrap xl:flex", onDark ? "text-white hover:bg-white/10" : "text-fg hover:bg-surface-2")}>
            {t.abrirDemo}
          </Link>
          <Link href="/#contacto" className="flex h-9 items-center rounded-lg bg-sun px-3.5 text-[14px] font-semibold whitespace-nowrap text-[#1d1300] shadow-[inset_0_1px_0_rgb(255_255_255/0.3)] hover:brightness-105">
            {t.pideDemo}
          </Link>
          <button onClick={() => setOpen(true)} className={cn("grid size-9 place-items-center rounded-lg lg:hidden", onDark ? "text-white" : "text-fg")} aria-label={t.abrirMenu}>
            <Menu className="size-5" />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex flex-col bg-bg p-4 pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden">
            <div className="flex items-center justify-between">
              <Logo className="h-7" />
              <button onClick={() => setOpen(false)} className="grid size-9 place-items-center" aria-label={t.cerrarMenu}>
                <X className="size-5" />
              </button>
            </div>
            <nav className="mt-6 grid min-h-0 flex-1 content-start gap-0.5 overflow-y-auto">
              {[...t.links, [t.abrirDemo, "/demo"] as const].map(([l, h]) => (
                <Link key={h} href={h} onClick={() => setOpen(false)} className="rounded-xl px-3 py-2.5 font-display text-[22px] font-semibold">
                  {l}
                </Link>
              ))}
            </nav>
            <div className="grid shrink-0 gap-3 pt-3">
              <SelectorIdioma tono="tema" largo className="mx-auto" />
              <a href={whatsappLink(waHola(lang))} target="_blank" rel="noreferrer" className="vibrar flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#1faa59] text-[16px] font-semibold text-white">
                <MessageCircle className="size-5" /> {t.escribenos}
              </a>
              <div className="text-center text-[13px] text-fg-3">
                {CONTACTO.whatsappVisible} · {CONTACTO.ciudad}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/**
 * Acceso fijo a la demo y a WhatsApp. En móvil es una barra abajo, al alcance del pulgar;
 * en escritorio, un botón flotante. Aparece al bajar y se aparta al llegar al formulario.
 */
export function ContactDock({ demoHref = "/demo?tour=1", mensaje }: { demoHref?: string; mensaje?: string }) {
  const lang = useIdioma();
  const t = T[lang];
  const msg = mensaje ?? waHola(lang);
  const [show, setShow] = useState(false);
  // mientras el banner de cookies espera respuesta, la barra no sale: taparía el botón de rechazar
  const { cargado, decidido } = usarConsentimiento();
  useEffect(() => {
    // se aparta en el formulario y en las secciones donde se escribe
    const zonas = [document.getElementById("contacto"), ...document.querySelectorAll("[data-hide-dock]")].filter((x): x is HTMLElement => !!x);
    const dentro = new Set<Element>();
    const upd = () => setShow(window.scrollY > 520 && dentro.size === 0);
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => (e.isIntersecting ? dentro.add(e.target) : dentro.delete(e.target)));
        upd();
      },
      { rootMargin: "-25% 0px -25% 0px" },
    );
    zonas.forEach((z) => io.observe(z));
    upd();
    window.addEventListener("scroll", upd, { passive: true });
    return () => {
      window.removeEventListener("scroll", upd);
      io.disconnect();
    };
  }, []);
  return (
    <AnimatePresence>
      {show && cargado && decidido && (
        <>
          <motion.div
            key="bar"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            exit={{ y: "110%" }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/90 px-3 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto flex max-w-md gap-2">
              <Link href={demoHref} className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-fg text-[15px] font-semibold text-bg">
                <PlayCircle className="size-5" /> {t.verDemo}
              </Link>
              <a href={whatsappLink(msg)} target="_blank" rel="noreferrer" className="vibrar flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#1faa59] text-[15px] font-semibold text-white">
                <MessageCircle className="size-5" /> WhatsApp
              </a>
            </div>
          </motion.div>
          <motion.a
            key="fab"
            href={whatsappLink(msg)}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="vibrar fixed right-6 bottom-6 z-40 hidden h-12 items-center gap-2 rounded-full bg-[#1faa59] pr-5 pl-4 text-[15px] font-semibold text-white shadow-e3 transition hover:brightness-110 lg:flex"
          >
            <MessageCircle className="size-5" /> {t.hablamos}
          </motion.a>
        </>
      )}
    </AnimatePresence>
  );
}

export function SiteFooter() {
  const lang = useIdioma();
  const t = T[lang];
  return (
    <footer className="border-t border-line bg-surface pb-20 lg:pb-0">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
        <div>
          <Logo className="h-7 text-[17px]" />
          <p className="mt-3 max-w-xs text-[14px] text-fg-2">
            {t.pie} {CONTACTO.ciudad}.
          </p>
          <a href={whatsappLink(waHola(lang))} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-[14px] font-medium hover:bg-surface-2">
            <MessageCircle className="size-4 text-ok" /> WhatsApp {CONTACTO.whatsappVisible}
          </a>
          <SelectorIdioma tono="tema" className="mt-4 w-fit" />
        </div>
        {t.columnas.map(([titulo, ls]) => (
          <div key={titulo}>
            <div className="text-[13px] font-semibold">{titulo}</div>
            <ul className="mt-3 grid gap-2">
              {ls.map(([l, h]) => (
                <li key={h}>
                  <Link href={h} className="text-[14px] text-fg-2 hover:text-fg">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-2 px-4 py-4 text-[12px] text-fg-3 sm:px-6">
          <span>Nexo4Pymes, {CONTACTO.ciudad}</span>
          <span>{t.ficticias}</span>
          <Link href="/legal" className="hover:text-fg">
            {t.legal}
          </Link>
        </div>
      </div>
    </footer>
  );
}
