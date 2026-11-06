import type { Idioma } from "@/lib/i18n";

/* ============================================================
   LAS DOS PERSONAS DE NEXO4PYMES

   POR QUÉ ESTO ES UN ARCHIVO Y NO TEXTO DENTRO DE LA PÁGINA. Los
   nombres y los retratos son datos: salen en la página de /nosotros,
   salen en los datos estructurados como Person, y mañana pueden salir
   en el pie o en un artículo firmado. Escritos en un sitio solo.

   POR QUÉ IMPORTA PARA EL BUSCADOR. Google distingue cada vez más
   entre una empresa con personas detrás y una marca anónima. Un
   estudio de dos personas tiene aquí una ventaja real sobre una
   agencia sin caras: solo hay que usarla. Por eso van con retrato,
   con nombre y enlazadas a la entidad del negocio.

   TODO(HUMANO): FALTAN LOS APELLIDOS. Se han dejado vacíos a
   propósito en vez de inventarlos. Con apellido, el nombre es una
   entidad que Google puede reconocer y cruzar con LinkedIn; sin él,
   es un nombre de pila. Es una línea cada uno.

   LOS ROLES SON REALES Y ESTÁN REPARTIDOS. Los dos son cofundadores
   y co-CEO; lo que cambia es de qué responde cada uno. Decirlo vale
   más que un "socio fundador" repetido dos veces: a un cliente le
   dice con quién va a hablar de qué, y a Google le da dos entidades
   distinguibles en vez de dos nombres intercambiables.
   ============================================================ */

export type Persona = {
  /** Nombre de pila. Es lo único que me consta con certeza. */
  nombre: string;
  /** Apellidos. Vacío = la página enseña solo el nombre y no pasa nada. */
  apellidos: string;
  /** El cargo, en los tres idiomas. */
  rol: Record<Idioma, string>;
  /** Ruta del retrato en /public. 512x512, recortado en círculo por CSS. */
  foto: string;
  /** Perfil público para el sameAs de Person. Vacío hasta que exista. */
  linkedin?: string;
  /** De qué responde, en una frase. Sale bajo el cargo en /nosotros. */
  perfil: Record<Idioma, string>;
};

export const EQUIPO: Persona[] = [
  {
    nombre: "Alex",
    apellidos: "",
    rol: { es: "Cofundador y co-CEO", en: "Co-founder and co-CEO", de: "Mitgründer und Co-CEO" },
    perfil: {
      es: "Lleva el desarrollo: diseña y construye los sistemas, las integraciones y los agentes de IA.",
      en: "Leads development: designs and builds the systems, the integrations and the AI agents.",
      de: "Verantwortet die Entwicklung: Systeme, Integrationen und KI-Agenten.",
    },
    foto: "/assets/equipo/alex.webp",
  },
  {
    nombre: "Jaume",
    apellidos: "",
    rol: { es: "Cofundador y co-CEO", en: "Co-founder and co-CEO", de: "Mitgründer und Co-CEO" },
    perfil: {
      es: "Lleva el mantenimiento, el marketing y la parte comercial: es con quien hablas antes y después de contratar.",
      en: "Leads maintenance, marketing and sales: the person you speak to before and after signing.",
      de: "Verantwortet Wartung, Marketing und Vertrieb: der Ansprechpartner vor und nach dem Vertrag.",
    },
    foto: "/assets/equipo/jaume.webp",
  },
];

/** Nombre completo si lo hay; si no, el de pila. Sin espacios sueltos. */
export function nombreCompleto(p: Persona): string {
  return [p.nombre, p.apellidos].filter(Boolean).join(" ").trim();
}
