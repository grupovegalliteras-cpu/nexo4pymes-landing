"use client";

import { useEffect } from "react";
import { evento, guardarAtribucion } from "@/lib/medicion";

/* ============================================================
   MEDICIÓN — el enganche

   Dos trabajos, los dos al cargar la página:

   1. Guardar de dónde viene la visita (utm_*, fbclid).

   2. Escuchar los clics que valen dinero.

   UN SOLO ESCUCHADOR DELEGADO, y no un onClick en cada botón.
   Los enlaces de WhatsApp están repartidos por cabecera, hero,
   cierre, barra flotante, pie, /contacto, /servicios, /nosotros y
   el bloque de CentralAvisos. Poner un manejador en cada uno
   significaría tocar diez componentes y, lo que es peor, que el
   próximo enlace que alguien añada no se mida y nadie se entere.

   Así se mide solo: cualquier enlace a WhatsApp, a Calendly, a un
   teléfono o a un correo cuenta desde el momento en que existe.

   Se escucha en fase de captura para que cuente aunque algo
   detenga el evento por el camino, y nunca se hace preventDefault:
   la navegación del visitante manda; medirla es lo secundario.
   ============================================================ */

/* Los id de sección se usan tal cual como nombre del sitio del clic,
   salvo los que no se entienden leyendo un informe seis meses después.
   "top" es el hero de todas las páginas. */
const NOMBRES: Record<string, string> = {
  top: "hero",
  cierre: "cierre",
  funcionando: "capturas",
};

/** De qué parte del sitio salió el clic, para leerlo en GA4. */
function ubicacion(el: HTMLElement): string {
  if (el.closest("header")) return "cabecera";
  if (el.closest("footer")) return "pie";
  const seccion = el.closest("section[id]");
  if (seccion?.id) return NOMBRES[seccion.id] ?? seccion.id;
  /* La barra flotante de móvil no está dentro de ninguna sección. */
  if (el.closest(".fixed")) return "barra-movil";
  return "otro";
}

/** La palabra clave del mensaje prefijado: AVISOS, SOFTWARE, DIAGNÓSTICO... */
function palabraClave(href: string): string | undefined {
  const coincidencia = decodeURIComponent(href).match(/\(([A-ZÁÉÍÓÚÑ]{3,})\)/);
  return coincidencia?.[1];
}

export function Medicion() {
  useEffect(() => {
    guardarAtribucion();

    function alPulsar(e: MouseEvent) {
      const destino = e.target;
      if (!(destino instanceof Element)) return;

      const enlace = destino.closest("a");
      if (!enlace) return;

      const href = enlace.getAttribute("href") ?? "";
      const donde = ubicacion(enlace);

      if (href.includes("whatsapp.com") || href.includes("wa.me")) {
        /* lead: true. Escribir por WhatsApp ES el contacto que
           buscamos, no un paso intermedio: es con lo que Meta tiene
           que aprender a quién enseñar el anuncio. */
        evento("whatsapp_click", { page: donde, keyword: palabraClave(href) }, true);
        return;
      }

      if (href.includes("calendly.com")) {
        evento("calendly_open", { page: donde });
        return;
      }

      if (href.startsWith("tel:")) {
        evento("llamada_click", { page: donde }, true);
        return;
      }

      if (href.startsWith("mailto:")) {
        evento("email_click", { page: donde });
      }
    }

    document.addEventListener("click", alPulsar, { capture: true });
    return () => document.removeEventListener("click", alPulsar, { capture: true });
  }, []);

  return null;
}
