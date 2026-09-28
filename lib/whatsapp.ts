import { marca } from "@/content/marca";
import type { Idioma } from "@/lib/i18n";

/* ============================================================
   WHATSAPP — EL CANAL DE CIERRE

   Toda la web empuja a la misma conversación. El objetivo no es
   que el visitante "se informe": es que escriba. Por eso el enlace
   se genera siempre desde aquí y nunca se escribe un wa.me a mano
   en un componente.

   EL MENSAJE PREFIJADO NO ES DECORACIÓN. Hace tres cosas:

   1. Le quita al visitante el trabajo de redactar. El momento en
      que más gente se cae es el de la pantalla en blanco: se abre
      WhatsApp, no se sabe qué poner y se cierra.

   2. Nos dice de dónde viene sin preguntar nada. La palabra en
      mayúsculas (AVISOS, SOFTWARE, DIAGNÓSTICO...) identifica qué
      estaba mirando cuando decidió escribir, que es justo lo que
      hace falta para contestar bien la primera frase.

   3. Deja la respuesta por escrito en el chat, que es donde se
      cierra la venta.

   AÑADIR UNA CLAVE NUEVA: se añade a `MENSAJES` y ya se puede usar
   con waLink("LA_CLAVE"). TypeScript avisa si se escribe una clave
   que no existe, así que no se puede colar un enlace roto.
   ============================================================ */

export const MENSAJES = {
  /* El genérico: cabecera, pie y barra móvil. Deliberadamente sin
     palabra clave, porque quien lo pulsa todavía no ha elegido nada. */
  GENERAL: "Hola, os escribo desde la web de Nexo4Pymes. Me gustaría que me contéis cómo trabajáis.",

  AVISOS: "Hola, quiero saber más de CentralAvisos (AVISOS).",

  SOFTWARE: "Hola, quiero software a medida para mi empresa (SOFTWARE).",

  DIAGNOSTICO: "Hola, quiero un diagnóstico de procesos (DIAGNÓSTICO).",

  DEMO: "Hola, quiero ver una demo (DEMO).",

  /* Desde /contacto: ya ha visto el formulario y ha preferido escribir. */
  CONTACTO: "Hola, os escribo desde la página de contacto de Nexo4Pymes.",
} as const;

export type ClaveWhatsapp = keyof typeof MENSAJES;

/* Los mismos mensajes en inglés y alemán. La palabra clave en mayúsculas se conserva
   para saber de dónde viene quien escribe. */
const MENSAJES_IDIOMA: Record<"en" | "de", Record<ClaveWhatsapp, string>> = {
  en: {
    GENERAL: "Hi, I'm writing from the Nexo4Pymes website. I'd like to hear how you work.",
    AVISOS: "Hi, I'd like to know more about CentralAvisos (AVISOS).",
    SOFTWARE: "Hi, I'd like custom software for my company (SOFTWARE).",
    DIAGNOSTICO: "Hi, I'd like a process diagnosis (DIAGNÓSTICO).",
    DEMO: "Hi, I'd like to see a demo (DEMO).",
    CONTACTO: "Hi, I'm writing from the Nexo4Pymes contact page.",
  },
  de: {
    GENERAL: "Hallo, ich schreibe über die Website von Nexo4Pymes. Ich würde gern erfahren, wie ihr arbeitet.",
    AVISOS: "Hallo, ich möchte mehr über CentralAvisos erfahren (AVISOS).",
    SOFTWARE: "Hallo, ich möchte individuelle Software für meine Firma (SOFTWARE).",
    DIAGNOSTICO: "Hallo, ich möchte eine Prozessanalyse (DIAGNÓSTICO).",
    DEMO: "Hallo, ich möchte eine Demo sehen (DEMO).",
    CONTACTO: "Hallo, ich schreibe über die Kontaktseite von Nexo4Pymes.",
  },
};

/**
 * Devuelve el enlace de WhatsApp con el mensaje ya escrito.
 *
 * @param clave  Cuál de los mensajes de `MENSAJES` se precarga.
 * @param extra  Texto que se añade al final. Se usa cuando la página
 *               puede aportar algo concreto (por ejemplo el resultado
 *               de una calculadora o el sector elegido). El visitante
 *               lo ve antes de enviar y puede borrarlo: nunca se manda
 *               nada a sus espaldas.
 */
export function waLink(clave: ClaveWhatsapp = "GENERAL", extra?: string, lang: Idioma = "es"): string {
  const base = lang === "es" ? MENSAJES[clave] : MENSAJES_IDIOMA[lang][clave];
  const texto = extra ? `${base}\n\n${extra}` : base;

  /* api.whatsapp.com y no wa.me: wa.me hace un salto intermedio que en
     algunos Android abre el navegador antes que la aplicación y pierde
     el mensaje por el camino. Esta dirección abre la app directamente
     y, en escritorio, WhatsApp Web. */
  return `https://api.whatsapp.com/send?phone=${marca.whatsapp}&text=${encodeURIComponent(texto)}`;
}
