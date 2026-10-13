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

   TODO(HUMANO): REVISAR LOS ROLES. Están puestos como "socio
   fundador" porque es cierto para los dos y no inventa una jerarquía
   que no me consta. Si os repartís el trabajo de otra forma
   —producto y desarrollo, por ejemplo— dice más y conviene cambiarlo.
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
};

export const EQUIPO: Persona[] = [
  {
    nombre: "Alex",
    apellidos: "",
    rol: { es: "Socio fundador", en: "Founding partner", de: "Gründer" },
    foto: "/assets/equipo/alex.webp",
  },
  {
    nombre: "Jaume",
    apellidos: "",
    rol: { es: "Socio fundador", en: "Founding partner", de: "Gründer" },
    foto: "/assets/equipo/jaume.webp",
  },
];

/** Nombre completo si lo hay; si no, el de pila. Sin espacios sueltos. */
export function nombreCompleto(p: Persona): string {
  return [p.nombre, p.apellidos].filter(Boolean).join(" ").trim();
}
