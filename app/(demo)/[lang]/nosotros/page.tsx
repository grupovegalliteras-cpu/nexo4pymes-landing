import type { Metadata } from "next";
import { ContactDock, SiteFooter, SiteNav } from "@/components/site/chrome";
import {
  CierreNosotros,
  EnfoquePyme,
  HeroNosotros,
  Historia,
  Valores,
} from "@/components/nosotros/SeccionesNosotros";
import { Equipo } from "@/components/nosotros/Equipo";
import { DatosRgpd } from "@/components/nosotros/DatosRgpd";
import { EQUIPO, nombreCompleto } from "@/content/equipo";
import { OG_LOCALE, alternativas, idiomaOBase, tr } from "@/lib/i18n";
import { fijarIdioma } from "@/lib/idioma-servidor";
import { marca } from "@/content/marca";
import { esquemaMigas, grafoPagina, urlAbsoluta } from "@/lib/esquema";

/* /nosotros — el brief la pedía como página propia y tenía razón:
   "quiénes somos" y "datos y RGPD" eran dos secciones enterradas al
   final de /servicios, donde solo llegaba quien ya se había leído el
   catálogo entero. Son justo el material que consulta alguien que
   está decidiendo si fiarse.

   AQUÍ ESTÁN LAS CARAS, y son la mejor carta que tiene un estudio de
   dos personas frente a una agencia anónima. Van con retrato, con
   nombre y declaradas como Person en los datos estructurados: para
   Google, una empresa con personas identificables detrás no es lo
   mismo que una marca sin rostro. Ver components/nosotros/Equipo.tsx. */

const TITULO = {
  es: "Quiénes somos — un equipo pequeño de Mallorca",
  en: "About us — a small team from Mallorca",
  de: "Über uns — ein kleines Team von Mallorca",
};
const DESCRIPCION = {
  es: "Quiénes están detrás de Nexo4Pymes, cómo trabajamos con pymes, por qué el diagnóstico va siempre primero y qué pasa con los datos de vuestros clientes.",
  en: "Who is behind Nexo4Pymes, how we work with small businesses, why diagnosis always comes first and what happens to your customers' data.",
  de: "Wer hinter Nexo4Pymes steht, wie wir mit kleinen Unternehmen arbeiten, warum die Analyse immer zuerst kommt und was mit den Daten Ihrer Kunden passiert.",
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = idiomaOBase((await params).lang);
  const titulo = TITULO[lang];
  const descripcion = DESCRIPCION[lang];
  return {
    title: { absolute: `${titulo} | Nexo4Pymes` },
    description: descripcion,
    alternates: alternativas(lang, "/nosotros"),
    openGraph: {
      type: "website",
      siteName: marca.nombre,
      locale: OG_LOCALE[lang],
      title: titulo,
      description: descripcion,
      url: alternativas(lang, "/nosotros").canonical,
      images: [
        {
          url: "/assets/og-nexo4pymes.jpg",
          width: 1200,
          height: 630,
          alt: `Nexo4Pymes — ${titulo}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titulo,
      description: descripcion,
      images: ["/assets/og-nexo4pymes.jpg"],
    },
  };
}

export default async function PaginaNosotros({ params }: { params: Promise<{ lang: string }> }) {
  const lang = idiomaOBase((await params).lang);
  fijarIdioma(lang);
  const t = (x: { es: string; en: string; de: string }) => tr(lang, x);
  return (
    <div className="bg-bg text-fg">
      <SiteNav dark />

      <main id="contenido">
        <HeroNosotros />
        <Historia />
        <Valores />
        <Equipo />
        <EnfoquePyme />
        <DatosRgpd />
        <CierreNosotros />
      </main>

      <SiteFooter />
      <ContactDock
        mensaje={t({
          es: "Hola, he visto quiénes sois en la web y me gustaría comentaros lo que necesitamos.",
          en: "Hi, I've read about you on your website and I'd like to talk about what we need.",
          de: "Hallo, ich habe auf Ihrer Website über Sie gelesen und möchte über unseren Bedarf sprechen.",
        })}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            grafoPagina([
              esquemaMigas(lang, [{ nombre: t({ es: "Quiénes somos", en: "About us", de: "Über uns" }), ruta: "/nosotros" }]),
              /* LAS DOS PERSONAS, COMO DATO Y NO SOLO COMO FOTO.
                 Una página "quiénes somos" con dos retratos le dice al
                 lector quién está detrás; esto se lo dice al buscador,
                 que si no ve más que dos imágenes con un pie de foto.

                 Cada una cuelga del negocio por `worksFor`, y la
                 página se declara `about` ellas: así el nombre queda
                 atado a esta empresa y a esta dirección, y no suelto.
                 El día que haya LinkedIn se añade en content/equipo.ts
                 y entra aquí por `sameAs` sin tocar nada más. */
              ...EQUIPO.map((p) => ({
                "@type": "Person",
                "@id": urlAbsoluta(lang, "/nosotros") + `#${p.nombre.toLowerCase()}`,
                name: nombreCompleto(p),
                jobTitle: tr(lang, p.rol),
                image: marca.dominio + p.foto,
                worksFor: { "@id": marca.dominio + "/#business" },
                ...(p.linkedin ? { sameAs: [p.linkedin] } : {}),
              })),
              {
                "@type": "AboutPage",
                "@id": urlAbsoluta(lang, "/nosotros") + "#pagina",
                url: urlAbsoluta(lang, "/nosotros"),
                name: TITULO[lang],
                description: DESCRIPCION[lang],
                isPartOf: { "@id": marca.dominio + "/#website" },
                about: [
                  { "@id": marca.dominio + "/#business" },
                  ...EQUIPO.map((p) => ({ "@id": urlAbsoluta(lang, "/nosotros") + `#${p.nombre.toLowerCase()}` })),
                ],
              },
            ]),
          ),
        }}
      />
    </div>
  );
}
