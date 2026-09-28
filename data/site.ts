import { marca } from "@/content/marca";

/** Datos de contacto de la demo: salen de content/marca.ts, igual que en el resto de la web. */
export const CONTACTO = {
  whatsapp: marca.whatsapp,
  whatsappVisible: marca.whatsappVisible.replace(/^\+34\s*/, ""),
  email: marca.email,
  ciudad: "Palma de Mallorca",
  web: `${marca.dominio}/`,
};

export function whatsappLink(texto: string) {
  // api.whatsapp.com y no wa.me, como en lib/whatsapp.ts: abre la app directamente también en Android
  return `https://api.whatsapp.com/send?phone=${CONTACTO.whatsapp}&text=${encodeURIComponent(texto)}`;
}

/** Dirección pública de la web, para las vistas previas de WhatsApp. En local, el servidor de desarrollo. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL ? marca.dominio : "http://localhost:3000")).replace(/\/$/, "");
