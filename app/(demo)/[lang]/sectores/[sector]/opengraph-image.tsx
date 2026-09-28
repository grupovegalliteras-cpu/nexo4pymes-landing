import { ogImage, OG_SIZE } from "@/lib/og";
import { SECTORES, isSectorId } from "@/data/sectors";
import { sectorDe } from "@/data/sectors-i18n";
import { idiomaOBase, tr } from "@/lib/i18n";

export const alt = "Nexo4Pymes";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return SECTORES.map((s) => ({ sector: s.id }));
}

export default async function Image({ params }: { params: Promise<{ lang: string; sector: string }> }) {
  const { lang: l, sector } = await params;
  const lang = idiomaOBase(l);
  const s = sectorDe(lang, isSectorId(sector) ? sector : SECTORES[0].id);
  return await ogImage({
    kicker: s.nombre,
    title: tr(lang, { es: `Tu empresa de ${s.nombre.toLowerCase()}, sin papeles`, en: `Your ${s.nombre.toLowerCase()} business, paperless`, de: `${s.nombre} ohne Papierkram` }),
    sub: s.dolor,
    chips: [tr(lang, { es: "Mira la demo de tu sector", en: "See the demo for your industry", de: "Demo für Ihre Branche ansehen" }), "Made in Mallorca"],
  });
}
