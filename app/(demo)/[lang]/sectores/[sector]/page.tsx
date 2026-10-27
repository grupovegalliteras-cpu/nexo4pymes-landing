import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SECTORES, isSectorId } from "@/data/sectors";
import { sectorDe } from "@/data/sectors-i18n";
import { SectorPage } from "@/components/site/sector-page";
import { OG_LOCALE, alternativas, idiomaOBase, tr } from "@/lib/i18n";
import { esquemaFaq, esquemaMigas, esquemaServicio, grafoPagina, urlAbsoluta } from "@/lib/esquema";
import { textoSector } from "@/content/sectores-seo-i18n";

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
  /* ============================================================
     EL TÍTULO CABE EN 60 CARACTERES, SEA EL SECTOR QUE SEA

     «Software para empresas de mantenimiento multiservicio en Mallorca»
     son 65 caracteres y Google corta por los 60: el lector perdía justo
     «en Mallorca», que es la mitad de por qué entraría. Pasaba solo con
     ese sector, así que estaba invisible revisando los demás.

     Se prueba la forma natural y, si no cabe, se cae a la corta sin
     «empresas de». No se recorta con puntos suspensivos: un título
     cortado a mitad de palabra se lee peor que uno más seco. */
  const nombre = s.nombre.toLowerCase();
  const cabe = (s: string) => s.length <= 60;
  const largo = tr(lang, {
    es: `Software para empresas de ${nombre} en Mallorca`,
    en: `Software for ${nombre} companies in Mallorca`,
    de: `${s.nombre}: Branchensoftware auf Mallorca`,
  });
  const corto = tr(lang, {
    es: `Software para ${nombre} en Mallorca`,
    en: `Software for ${nombre} in Mallorca`,
    de: `${s.nombre}: Software auf Mallorca`,
  });
  const title = cabe(largo) ? largo : corto;
  /* La descripción también se queda por debajo de 160 caracteres, que es
     donde Google corta. El lema de cada sector tiene un largo distinto, así
     que la cola se recorta cuando hace falta en vez de fijar una plantilla
     corta para todos: el sector de lema breve se lleva la frase completa.
     En alemán pasaba con jardinería (161) y en inglés con climatización. */
  const cola = tr(lang, {
    es: [`Panel y app para empresas de ${s.nombre.toLowerCase()} en Mallorca: avisos, partes con firma, rutas y facturación.`, `Panel y app para empresas de ${s.nombre.toLowerCase()} en Mallorca: avisos, partes con firma y facturación.`],
    en: [`Dashboard and app for ${s.nombre.toLowerCase()} firms in Mallorca: jobs, signed reports, invoicing.`, `Dashboard and app for ${s.nombre.toLowerCase()} firms in Mallorca.`],
    de: [`Dashboard und Techniker-App für Ihren Betrieb auf Mallorca: Aufträge, unterschriebene Berichte, Routen und Rechnungen.`, `Dashboard und Techniker-App für Ihren Betrieb auf Mallorca: Aufträge, Berichte und Rechnungen.`],
  });
  const descLarga = `${s.lema}. ${cola[0]}`;
  const description = descLarga.length <= 160 ? descLarga : `${s.lema}. ${cola[1]}`;
  return {
    /* absolute: sin "| Nexo4Pymes" detrás. Con la plantilla, el título
       más largo ("mantenimiento multiservicio") se iba a 78 caracteres. */
    title: { absolute: title },
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
              /* Las tres preguntas que se ven en la página, también como
                 dato. Son distintas en cada sector: es lo que puede hacer
                 que a una AI Overview le valga esta página y no la de un
                 competidor que habla de software en general. */
              esquemaFaq(
                textoSector(lang, sector).faq.map(([p, r]) => ({ p, r })),
                urlAbsoluta(lang, ruta) + "#faq",
                lang,
              ),
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
