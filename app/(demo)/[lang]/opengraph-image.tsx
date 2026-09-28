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
    kicker: tr(lang, { es: "Demo en vivo", en: "Live demo", de: "Live-Demo" }),
    title: tr(lang, { es: "La llamada entra. El trabajo sale solo.", en: "The call comes in. The job gets done.", de: "Der Anruf kommt rein. Der Auftrag läuft von selbst." }),
    sub: tr(lang, {
      es: "Avisos, órdenes de trabajo, parte con fotos y firma, y factura con VeriFactu. Panel de oficina y app de técnicos, conectados.",
      en: "Requests, work orders, job reports with photos and signature, and VeriFactu invoices. Office dashboard and technician app, connected.",
      de: "Anfragen, Arbeitsaufträge, Berichte mit Fotos und Unterschrift und Rechnungen mit VeriFactu. Büro-Dashboard und Techniker-App, verbunden.",
    }),
    chips: [tr(lang, { es: "Pruébala desde el móvil", en: "Try it on your phone", de: "Am Handy ausprobieren" }), "Made in Mallorca"],
  });
}
