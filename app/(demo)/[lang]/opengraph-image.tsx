import { ogImage, OG_SIZE } from "@/lib/og";
import { IDIOMAS, idiomaOBase, tr } from "@/lib/i18n";

export const alt = "Nexo4Pymes";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return IDIOMAS.map((lang) => ({ lang }));
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const lang = idiomaOBase((await params).lang);
  return await ogImage({
    /* ESTA IMAGEN ES LA PORTADA PEGADA EN UN WHATSAPP, así que dice lo
       mismo que la portada (noviembre de 2026): el empleado de IA que
       atiende el WhatsApp, desde 39 € al mes. */
    kicker: tr(lang, { es: "Empleado de IA · Mallorca", en: "AI employee · Mallorca", de: "KI-Mitarbeiter · Mallorca" }),
    title: tr(lang, { es: "Tu primer empleado que no duerme.", en: "Your first employee who never sleeps.", de: "Dein erster Mitarbeiter, der nie schläft." }),
    sub: tr(lang, {
      es: "Contesta el WhatsApp de tu negocio a cualquier hora, sabe qué hacer cuando la avería es urgente y te apunta la visita en la agenda.",
      en: "It answers your business WhatsApp at any hour, knows what to do when a breakdown is urgent and books the visit in your calendar.",
      de: "Es beantwortet das WhatsApp deines Betriebs rund um die Uhr, weiß, was bei einem dringenden Schaden zu tun ist, und trägt den Termin in deinen Kalender ein.",
    }),
    chips: [
      tr(lang, { es: "Desde 39 € al mes", en: "From €39 a month", de: "Ab 39 € im Monat" }),
      tr(lang, { es: "Sin permanencia", en: "No lock-in", de: "Ohne Mindestlaufzeit" }),
      tr(lang, { es: "14 días gratis", en: "14 days free", de: "14 Tage gratis" }),
    ],
  });
}
