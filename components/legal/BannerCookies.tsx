"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "@/components/i18n/Enlace";
import { useIdioma } from "@/components/i18n/idioma";
import { AnimatePresence, motion } from "framer-motion";
import { usarMovimientoReducido } from "@/components/motion/usarMovimiento";
import {
  EVENTO_ABRIR,
  TODO_ACEPTADO,
  TODO_RECHAZADO,
  usarConsentimiento,
  type Categorias,
} from "@/lib/consentimiento";

/* ============================================================
   BANNER DE COOKIES + PANEL DE PREFERENCIAS

   Cumple la Guía sobre el uso de cookies de la AEPD. Los puntos que
   NO son decisión de diseño sino requisito legal:

   · "Aceptar todas" y "Rechazar todas" son el mismo componente, con
     el mismo tamaño, en la misma fila y a un solo clic. Poner el
     rechazo como un enlace pequeño, o dentro de "Configurar", es la
     infracción que más se sanciona.
   · No es un muro: se puede seguir leyendo la web sin decidir. Por
     eso el banner no bloquea el fondo ni atrapa el foco.
   · Las casillas del panel vienen DESMARCADAS. Ninguna preselección.
   · Cerrar con la X o con Escape NO equivale a aceptar: no guarda
     nada y el banner vuelve en la siguiente visita.
   · Hasta que no se decide, no se carga ninguna cookie no esencial
     (eso lo garantiza Analitica.tsx, que lee el mismo estado).

   El panel de preferencias SÍ es modal (atrapa el foco y se cierra
   con Escape) porque es una tarea concreta con principio y final.
   ============================================================ */

const SALIDA = [0.22, 1, 0.36, 1] as const;

type Vista = "oculto" | "banner" | "preferencias";

const TXC = {
  es: {
    titulo: "Cookies en esta web",
    texto: "Usamos cookies propias necesarias para que la web funcione y, solo si nos dais permiso, cookies de terceros para medir cómo se usa el sitio y para publicidad. Podéis rechazarlas todas sin perder ninguna función.",
    politica: "Política de cookies", rechazar: "Rechazar todas", aceptar: "Aceptar todas", configurar: "Configurar",
    cerrarSin: "Cerrar las preferencias de cookies sin guardar", cerrar: "Cerrar sin guardar", preferencias: "Preferencias de cookies",
    elegid: "Elegid qué queréis permitir. Podéis cambiarlo cuando queráis desde el enlace «Preferencias de cookies» del pie de página.",
    necesarias: "Necesarias",
    necesariasD: "Hacen que la web funcione: recordar esta misma decisión y proteger el formulario de contacto frente a envíos automatizados. No se pueden desactivar porque sin ellas el sitio no puede prestar el servicio.",
    necesariasX: "No se instala ninguna cookie de terceros. La decisión se guarda en el almacenamiento local de vuestro navegador.",
    analitica: "Analítica",
    analiticaD: "Google Analytics. Nos dice cuánta gente entra, desde dónde llega y qué páginas lee, para saber qué mejorar. Los informes son agregados: no identificamos a nadie.",
    analiticaX: "Cookies _ga y _ga_*, de Google Ireland Ltd. Caducan a los 24 meses.",
    marketing: "Marketing",
    marketingD: "Meta Pixel. Permite medir si nuestros anuncios en Instagram y Facebook traen visitas reales y mostrar anuncios a quien ya ha visitado la web.",
    marketingX: "Cookies _fbp y _fbc, de Meta Platforms Ireland Ltd. Caducan a los 3 meses. Implica transferencia internacional de datos.",
    guardar: "Guardar mi elección", siempre: "Siempre activas",
  },
  en: {
    titulo: "Cookies on this website",
    texto: "We use our own essential cookies to make the website work and, only if you give us permission, third-party cookies to measure how the site is used and for advertising. You can reject them all without losing any feature.",
    politica: "Cookie policy", rechazar: "Reject all", aceptar: "Accept all", configurar: "Settings",
    cerrarSin: "Close cookie preferences without saving", cerrar: "Close without saving", preferencias: "Cookie preferences",
    elegid: "Choose what you want to allow. You can change it at any time from the \"Cookie preferences\" link in the footer.",
    necesarias: "Essential",
    necesariasD: "They make the website work: remembering this very choice and protecting the contact form against automated submissions. They can't be switched off because without them the site can't provide its service.",
    necesariasX: "No third-party cookies are set. Your choice is stored in your browser's local storage.",
    analitica: "Analytics",
    analiticaD: "Google Analytics. It tells us how many people visit, where they come from and which pages they read, so we know what to improve. Reports are aggregated: we don't identify anyone.",
    analiticaX: "_ga and _ga_* cookies, from Google Ireland Ltd. They expire after 24 months.",
    marketing: "Marketing",
    marketingD: "Meta Pixel. It lets us measure whether our Instagram and Facebook ads bring real visits and show ads to people who have already visited the website.",
    marketingX: "_fbp and _fbc cookies, from Meta Platforms Ireland Ltd. They expire after 3 months. Involves an international data transfer.",
    guardar: "Save my choice", siempre: "Always on",
  },
  de: {
    titulo: "Cookies auf dieser Website",
    texto: "Wir verwenden eigene, notwendige Cookies, damit die Website funktioniert, und nur mit Ihrer Erlaubnis Cookies von Drittanbietern, um die Nutzung zu messen und für Werbung. Sie können alle ablehnen, ohne eine Funktion zu verlieren.",
    politica: "Cookie-Richtlinie", rechazar: "Alle ablehnen", aceptar: "Alle akzeptieren", configurar: "Einstellungen",
    cerrarSin: "Cookie-Einstellungen ohne Speichern schließen", cerrar: "Ohne Speichern schließen", preferencias: "Cookie-Einstellungen",
    elegid: "Wählen Sie, was Sie erlauben möchten. Sie können es jederzeit über den Link „Cookie-Einstellungen“ in der Fußzeile ändern.",
    necesarias: "Notwendig",
    necesariasD: "Sie sorgen dafür, dass die Website funktioniert: diese Entscheidung speichern und das Kontaktformular vor automatisierten Einsendungen schützen. Sie lassen sich nicht abschalten, weil die Website ohne sie ihren Dienst nicht erbringen kann.",
    necesariasX: "Es werden keine Cookies von Drittanbietern gesetzt. Die Entscheidung wird im lokalen Speicher Ihres Browsers abgelegt.",
    analitica: "Statistik",
    analiticaD: "Google Analytics. Zeigt uns, wie viele Menschen kommen, woher sie kommen und welche Seiten sie lesen, damit wir wissen, was wir verbessern können. Die Berichte sind zusammengefasst: Wir identifizieren niemanden.",
    analiticaX: "Cookies _ga und _ga_* von Google Ireland Ltd. Laufzeit 24 Monate.",
    marketing: "Marketing",
    marketingD: "Meta Pixel. Damit messen wir, ob unsere Anzeigen auf Instagram und Facebook echte Besuche bringen, und zeigen Anzeigen Menschen, die die Website schon besucht haben.",
    marketingX: "Cookies _fbp und _fbc von Meta Platforms Ireland Ltd. Laufzeit 3 Monate. Beinhaltet eine internationale Datenübermittlung.",
    guardar: "Auswahl speichern", siempre: "Immer aktiv",
  },
};

export function BannerCookies() {
  const tx = TXC[useIdioma()];
  const { cargado, decidido, guardar } = usarConsentimiento();
  const [vista, setVista] = useState<Vista>("oculto");
  const reducido = usarMovimientoReducido();

  /* Estado del panel. Arranca todo en false: sin preselección. */
  const [analitica, setAnalitica] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const panel = useRef<HTMLDivElement>(null);
  const devolverFocoA = useRef<Element | null>(null);

  /* Aparece solo cuando ya sabemos que no hay decisión previa. */
  useEffect(() => {
    if (cargado && !decidido) setVista("banner");
  }, [cargado, decidido]);

  /* Reapertura desde el pie o desde la política de cookies. */
  useEffect(() => {
    const abrir = () => {
      devolverFocoA.current = document.activeElement;
      setVista("preferencias");
    };
    window.addEventListener(EVENTO_ABRIR, abrir);
    return () => window.removeEventListener(EVENTO_ABRIR, abrir);
  }, []);

  const cerrar = useCallback(() => {
    setVista("oculto");
    /* Devolver el foco a quien abrió el panel: si no, con teclado se
       vuelve al principio del documento y hay que recorrerlo entero. */
    if (devolverFocoA.current instanceof HTMLElement) {
      devolverFocoA.current.focus();
      devolverFocoA.current = null;
    }
  }, []);

  const decidir = useCallback(
    (categorias: Categorias) => {
      guardar(categorias);
      cerrar();
    },
    [guardar, cerrar],
  );

  /* Escape cierra el panel sin guardar, y el foco se queda dentro
     mientras está abierto (patrón de diálogo modal). */
  useEffect(() => {
    if (vista !== "preferencias") return;

    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        cerrar();
        return;
      }

      if (e.key !== "Tab" || !panel.current) return;

      const focables = panel.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focables.length === 0) return;

      const primero = focables[0];
      const ultimo = focables[focables.length - 1];

      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    };

    document.addEventListener("keydown", alTeclear);
    panel.current?.querySelector<HTMLElement>("button")?.focus();

    return () => document.removeEventListener("keydown", alTeclear);
  }, [vista, cerrar]);

  return (
    <AnimatePresence>
      {vista === "banner" && (
        <motion.div
          key="banner"
          /* aria-modal false y role dialog: es un diálogo, pero no
             bloquea el resto de la página. */
          role="dialog"
          aria-modal="false"
          aria-labelledby="titulo-cookies"
          initial={reducido ? { opacity: 0 } : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducido ? { opacity: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: reducido ? 0.001 : 0.4, ease: SALIDA }}
          className="blur-si fixed inset-x-0 bottom-0 z-80 border-t border-white/12 bg-bottle-900/95
                     px-4 pb-[calc(env(safe-area-inset-bottom)+14px)] pt-4 backdrop-blur-2xl
                     shadow-[0_-20px_60px_rgba(0,0,0,.6)] sm:px-6 sm:pb-5 sm:pt-5"
        >
          <div className="mx-auto flex max-w-[1180px] flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
            <div className="lg:flex-1">
              <h2 id="titulo-cookies" className="font-titular text-[16px] font-semibold text-white sm:text-[17px]">
                {tx.titulo}
              </h2>
              <p className="mt-1.5 max-w-[70ch] text-[13.5px] leading-relaxed text-white/60 sm:text-[14px]">
                {tx.texto}{" "}
                <Link href="/legal#cookies" className="text-azul underline underline-offset-4">
                  {tx.politica}
                </Link>
                .
              </p>
            </div>

            {/* Los dos botones de decisión, mismo tamaño y misma fila.
                El de configurar va aparte, en secundario. */}
            <div className="flex flex-col gap-2 sm:flex-row lg:shrink-0">
              <button
                type="button"
                onClick={() => decidir(TODO_RECHAZADO)}
                className="min-h-[44px] rounded-full border border-white/20 bg-white/[.06] px-5 py-2.5
                           text-[14px] font-medium text-white transition-colors duration-200
                           hover:border-white/35 hover:bg-white/[.12]"
              >
                {tx.rechazar}
              </button>

              <button
                type="button"
                onClick={() => decidir(TODO_ACEPTADO)}
                className="min-h-[44px] rounded-full bg-gradient-to-br from-azul to-violeta px-5 py-2.5
                           text-[14px] font-medium text-white shadow-[0_10px_30px_-12px_rgba(76,125,255,.75)]
                           transition-transform duration-200 hover:-translate-y-0.5"
              >
                {tx.aceptar}
              </button>

              <button
                type="button"
                onClick={() => {
                  devolverFocoA.current = document.activeElement;
                  setVista("preferencias");
                }}
                className="min-h-[44px] rounded-full px-5 py-2.5 text-[14px] text-white/65
                           underline-offset-4 transition-colors duration-200 hover:text-white hover:underline"
              >
                {tx.configurar}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {vista === "preferencias" && (
        <motion.div
          key="preferencias"
          className="fixed inset-0 z-80 flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducido ? 0.001 : 0.25 }}
        >
          {/* Fondo. Cerrar aquí NO guarda nada: equivale a no decidir. */}
          <button
            type="button"
            aria-label={tx.cerrarSin}
            onClick={cerrar}
            className="absolute inset-0 bg-bottle-900/80 backdrop-blur-sm"
          />

          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-preferencias"
            initial={reducido ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducido ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: reducido ? 0.001 : 0.32, ease: SALIDA }}
            className="relative max-h-[88vh] w-full max-w-[640px] overflow-y-auto rounded-t-panel
                       border border-white/12 bg-bottle-800 p-5 shadow-[0_40px_120px_rgba(0,0,0,.7)]
                       sm:rounded-panel sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 id="titulo-preferencias" className="font-titular text-[21px] font-semibold text-white sm:text-[24px]">
                {tx.preferencias}
              </h2>
              <button
                type="button"
                onClick={cerrar}
                aria-label={tx.cerrar}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/12
                           text-white/60 transition-colors hover:border-white/30 hover:text-white"
              >
                <span aria-hidden="true" className="text-[18px]">
                  ✕
                </span>
              </button>
            </div>

            <p className="mt-3 text-[14px] leading-relaxed text-white/60">
              {tx.elegid}
            </p>

            <div className="mt-6 space-y-3">
              <Categoria
                titulo={tx.necesarias}
                descripcion={tx.necesariasD}
                detalle={tx.necesariasX}
                siempre={tx.siempre}
                activa
                bloqueada
              />

              <Categoria
                titulo={tx.analitica}
                descripcion={tx.analiticaD}
                detalle={tx.analiticaX}
                activa={analitica}
                alCambiar={setAnalitica}
              />

              <Categoria
                titulo={tx.marketing}
                descripcion={tx.marketingD}
                detalle={tx.marketingX}
                activa={marketing}
                alCambiar={setMarketing}
              />
            </div>

            <div className="mt-7 flex flex-col gap-2 sm:flex-row-reverse">
              <button
                type="button"
                onClick={() => decidir({ necesarias: true, analitica, marketing })}
                className="min-h-[44px] flex-1 rounded-full bg-gradient-to-br from-azul to-violeta px-5 py-3
                           text-[14.5px] font-medium text-white shadow-[0_10px_30px_-12px_rgba(76,125,255,.75)]
                           transition-transform duration-200 hover:-translate-y-0.5"
              >
                {tx.guardar}
              </button>

              <button
                type="button"
                onClick={() => decidir(TODO_RECHAZADO)}
                className="min-h-[44px] flex-1 rounded-full border border-white/20 bg-white/[.06] px-5 py-3
                           text-[14.5px] font-medium text-white transition-colors duration-200
                           hover:border-white/35 hover:bg-white/[.12]"
              >
                {tx.rechazar}
              </button>

              <button
                type="button"
                onClick={() => decidir(TODO_ACEPTADO)}
                className="min-h-[44px] flex-1 rounded-full border border-white/20 bg-white/[.06] px-5 py-3
                           text-[14.5px] font-medium text-white transition-colors duration-200
                           hover:border-white/35 hover:bg-white/[.12]"
              >
                {tx.aceptar}
              </button>
            </div>

            <p className="mt-4 text-center text-[12.5px] text-white/40">
              Más detalle en la{" "}
              <Link href="/legal#cookies" className="text-azul underline underline-offset-4" onClick={cerrar}>
                política de cookies
              </Link>
              .
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------
   Una categoría del panel. El interruptor es un checkbox real
   maquillado, no un div con onClick: así funciona con teclado y lo
   anuncian los lectores de pantalla sin trabajo extra.
   ------------------------------------------------------------ */
function Categoria({
  titulo,
  descripcion,
  detalle,
  activa,
  bloqueada = false,
  alCambiar,
  siempre = "",
}: {
  siempre?: string;
  titulo: string;
  descripcion: string;
  detalle: string;
  activa: boolean;
  bloqueada?: boolean;
  alCambiar?: (valor: boolean) => void;
}) {
  return (
    <div className="rounded-tarjeta border border-white/10 bg-white/[.03] p-4">
      <label className={`flex items-start gap-3 ${bloqueada ? "" : "cursor-pointer"}`}>
        <span className="relative mt-0.5 inline-flex shrink-0">
          <input
            type="checkbox"
            checked={activa}
            disabled={bloqueada}
            onChange={(e) => alCambiar?.(e.target.checked)}
            className="peer sr-only"
          />
          {/* Raíl */}
          <span
            aria-hidden="true"
            className={`block h-6 w-11 rounded-full transition-colors duration-300 ${
              activa ? "bg-gradient-to-r from-azul to-violeta" : "bg-white/15"
            } ${bloqueada ? "opacity-55" : ""} peer-focus-visible:outline peer-focus-visible:outline-2
              peer-focus-visible:outline-offset-2 peer-focus-visible:outline-azul`}
          />
          {/* Bolita */}
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform
                        duration-300 ease-[cubic-bezier(.22,1,.36,1)] ${activa ? "translate-x-[22px]" : "translate-x-0.5"}`}
          />
        </span>

        <span className="min-w-0">
          <span className="flex flex-wrap items-center gap-2">
            <span className="text-[15px] font-medium text-white">{titulo}</span>
            {bloqueada && (
              <span className="rounded-full border border-white/15 bg-white/[.05] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-white/50">
                {siempre}
              </span>
            )}
          </span>
          <span className="mt-1.5 block text-[13.5px] leading-relaxed text-white/60">{descripcion}</span>
          <span className="mt-2 block font-mono text-[11.5px] leading-relaxed text-white/35">{detalle}</span>
        </span>
      </label>
    </div>
  );
}
