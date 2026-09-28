import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SECTORES, isSectorId } from "@/data/sectors";
import { sectorDe } from "@/data/sectors-i18n";
import { SectorPage } from "@/components/site/sector-page";
import { OG_LOCALE, alternativas, idiomaOBase, tr } from "@/lib/i18n";

export function generateStaticParams() {
  return SECTORES.map((s) => ({ sector: s.id }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/sectores/[sector]">): Promise<Metadata> {
  const { sector, lang: l } = await params;
  if (!isSectorId(sector)) return {};
  const lang = idiomaOBase(l);
  const s = sectorDe(lang, sector);
  const title = tr(lang, { es: `${s.nombre}: panel y app para tu empresa`, en: `${s.nombre}: dashboard and app for your business`, de: `${s.nombre}: Dashboard und App für Ihren Betrieb` });
  const description = `${s.lema}. ${s.dolor}`;
  return {
    title,
    description,
    alternates: alternativas(lang, `/sectores/${sector}`),
    openGraph: { type: "website", locale: OG_LOCALE[lang], siteName: "Nexo4Pymes", title: `Nexo4Pymes · ${s.nombre}`, description },
  };
}

export default async function Page({ params }: PageProps<"/[lang]/sectores/[sector]">) {
  const { sector } = await params;
  if (!isSectorId(sector)) notFound();
  return <SectorPage id={sector} />;
}
