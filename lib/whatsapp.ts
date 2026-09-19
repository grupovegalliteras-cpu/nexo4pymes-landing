import { marca } from "@/content/marca";

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
export function waLink(clave: ClaveWhatsapp = "GENERAL", extra?: string): string {
  const texto = extra ? `${MENSAJES[clave]}\n\n${extra}` : MENSAJES[clave];

  /* api.whatsapp.com y no wa.me: wa.me hace un salto intermedio que en
     algunos Android abre el navegador antes que la aplicación y pierde
     el mensaje por el camino. Esta dirección abre la app directamente
     y, en escritorio, WhatsApp Web. */
  return `https://api.whatsapp.com/send?phone=${marca.whatsapp}&text=${encodeURIComponent(texto)}`;
}
