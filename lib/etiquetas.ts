import type { AvisoTipo, Canal, Urgencia } from "@/data/sectors";
import type { Idioma } from "@/lib/i18n";

/* Etiquetas de los valores internos (que se guardan en español) en cada idioma. */

export const TIPO_AVISO: Record<Idioma, Record<AvisoTipo, string>> = {
  es: { avería: "Avería", presupuesto: "Presupuesto", consulta: "Consulta", queja: "Queja" },
  en: { avería: "Fault", presupuesto: "Quote", consulta: "Enquiry", queja: "Complaint" },
  de: { avería: "Störung", presupuesto: "Angebot", consulta: "Anfrage", queja: "Reklamation" },
};

export const URGENCIA: Record<Idioma, Record<Urgencia, string>> = {
  es: { alta: "Urgente", media: "Media", baja: "Baja" },
  en: { alta: "Urgent", media: "Medium", baja: "Low" },
  de: { alta: "Dringend", media: "Mittel", baja: "Niedrig" },
};

export const CANAL: Record<Idioma, Record<Canal, string>> = {
  es: { llamada: "Llamada", whatsapp: "WhatsApp", email: "Email", web: "Web" },
  en: { llamada: "Call", whatsapp: "WhatsApp", email: "Email", web: "Web" },
  de: { llamada: "Anruf", whatsapp: "WhatsApp", email: "E-Mail", web: "Web" },
};
