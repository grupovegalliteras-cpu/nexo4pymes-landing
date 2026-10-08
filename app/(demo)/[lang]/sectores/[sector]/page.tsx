import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SECTORES, isSectorId } from "@/data/sectors";
import { sectorDe } from "@/data/sectors-i18n";
import { SectorPage } from "@/components/site/sector-page";
import { OG_LOCALE, alternativas, idiomaOBase, tr } from "@/lib/i18n";
import { esquemaMigas, esquemaServicio, grafoPagina } from "@/lib/esquema";

export function generateStaticParams() {
  return SECTORES.map((s) => ({ sector: s.id }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/sectores/[sector]">): Promise<Metadata> {
  const { sector, lang: l } = await params;
  if (!isSectorId(sector)) return {};
  const lang = idiomaOBase(l);
  const s = sectorDe(lang, sector);
  /* OCHO PÁGINAS DE COLA LARGA, UNA POR SECTOR. Son las que pueden
     ganar "software para empresas de limpieza en Mallorca", que casi
     nadie disputa, en vez de pelear por "software a medida" contra
     diez agencias. El título lo decía todo menos dónde: "Limpieza:
     panel y app para tu empresa" no contiene ninguna de las dos
     palabras que el cliente escribe en el buscador. */
  const title = tr(lang, {
    es: `Software para empresas de ${s.nombre.toLowerCase()} en Mallorca`,
    en: `Software for ${s.nombre.toLowerCase()} companies in Mallorca`,
    de: `${s.nombre}: Branchensoftware auf Mallorca`,
  });
  const description = tr(lang, {
    es: `${s.lema}. Panel y app para empresas de ${s.nombre.toLowerCase()} en Mallorca: avisos, partes con firma, rutas y facturación.`,
    en: `${s.lema}. Dashboard and technician app for ${s.nombre.toLowerCase()} companies in Mallorca: jobs, signed reports, routes and invoicing.`,
    de: `${s.lema}. Dashboard und Techniker-App für Ihren Betrieb auf Mallorca: Aufträge, unterschriebene Berichte, Routen und Rechnungen.`,
  });
  return {
    title,
    description,
    alternates: alternativas(lang, `/sectores/${sector}`),
    openGraph: { type: "website", locale: OG_LOCALE[lang], siteName: "Nexo4Pymes", title: `Nexo4Pymes · ${s.nombre}`, description },
  };
}

export default async function Page({ params }: PageProps<"/[lang]/sectores/[sector]">) {
  const { sector, lang: l } = await params;
  if (!isSectorId(sector)) notFound();
  const lang = idiomaOBase(l);
  const s = sectorDe(lang, sector);
  const ruta = `/sectores/${sector}`;
  return (
    <>
      <SectorPage id={sector} />
      {/* Esta página es un servicio con un ámbito geográfico, y así hay
          que contarlo: quién lo presta, dónde y por qué canal. Las migas
          le dicen al buscador que cuelga de la portada y no es una web
          suelta. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            grafoPagina([
              esquemaMigas(lang, [{ nombre: s.nombre, ruta }]),
              esquemaServicio({
                lang,
                nombre: tr(lang, {
                  es: `Software de gestión para empresas de ${s.nombre.toLowerCase()}`,
                  en: `Management software for ${s.nombre.toLowerCase()} companies`,
                  de: `Branchensoftware für ${s.nombre}`,
                }),
                descripcion: `${s.lema}. ${s.dolor}`,
                ruta,
              }),
            ]),
          ),
        }}
      />
    </>
  );
}
