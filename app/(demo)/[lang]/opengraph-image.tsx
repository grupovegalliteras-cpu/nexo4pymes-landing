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
       mismo que la portada: lo que hacemos nosotros. Decía «La llamada
       entra. El trabajo sale solo.», que es el programa de servicios —uno
       de los ejemplos— y no el estudio. Ver el aviso del principio de
       components/site/landing.tsx. */
    kicker: tr(lang, { es: "Software a medida · Mallorca", en: "Custom software · Mallorca", de: "Individuelle Software · Mallorca" }),
    title: tr(lang, { es: "Vuestro negocio no cabe en una plantilla.", en: "Your business does not fit a template.", de: "Ihr Betrieb passt in keine Vorlage." }),
    sub: tr(lang, {
      es: "Sistemas de gestión, configuradores para la web, fichaje y automatizaciones con IA. Dos socios en Palma, y el diagnóstico antes de construir nada.",
      en: "Management systems, web configurators, time clocking and AI automations. Two partners in Palma, and a diagnosis before anything gets built.",
      de: "Verwaltungssysteme, Web-Konfiguratoren, Zeiterfassung und KI-Automatisierungen. Zwei Partner in Palma, und erst die Analyse, dann der Bau.",
    }),
    chips: [tr(lang, { es: "Diagnóstico primero", en: "Diagnosis first", de: "Erst die Analyse" }), "Made in Mallorca"],
  });
}
