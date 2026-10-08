import type { Metadata } from "next";
import Link from "@/components/i18n/Enlace";
import { Reveal } from "@/components/motion/Reveal";
import { TarjetaGlow } from "@/components/ui/TarjetaGlow";
import { contenido } from "@/content/i18n";
import { alternativas, idiomaOBase, tr } from "@/lib/i18n";
import { esquemaMigas, grafoPagina, urlAbsoluta } from "@/lib/esquema";
import { marca } from "@/content/marca";
import { fijarIdioma } from "@/lib/idioma-servidor";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = idiomaOBase((await params).lang);
  return { title: "Blog", description: contenido(lang).blog.blogHome.entradilla, alternates: alternativas(lang, "/blog") };
}

export default async function PaginaBlog({ params }: { params: Promise<{ lang: string }> }) {
  const lang = idiomaOBase((await params).lang);
  fijarIdioma(lang);
  const { blogHome } = contenido(lang).blog;
  return (
    <>
      <Reveal as="span" className="block">
        <span className="inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-mint">
          <span aria-hidden="true" className="h-px w-6 bg-mint/60" />
          Blog
        </span>
      </Reveal>
      <Reveal>
        <h1 className="mt-4 text-[clamp(1.9rem,5vw,2.8rem)] text-[#F4F6FF]">{blogHome.titular}</h1>
      </Reveal>
      <Reveal retraso={0.06}>
        <p className="mt-5 max-w-[60ch] text-[16.5px] leading-relaxed text-white/65">
          {blogHome.entradilla}
        </p>
      </Reveal>

      <div className="mt-12 space-y-4">
        <Reveal retraso={0.1}>
          <TarjetaGlow className="group relative">
            <span className="inline-flex rounded-full border border-white/12 bg-white/[.04] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">
              {blogHome.publicado.etiqueta}
            </span>
            <h2 className="mt-4 text-[22px] leading-snug text-[#F4F6FF] sm:text-[26px]">
              <Link
                href={blogHome.publicado.href}
                className="after:absolute after:inset-0 after:content-['']"
              >
                {blogHome.publicado.titulo}
              </Link>
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-white/62">
              {blogHome.publicado.resumen}
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-[14.5px] font-medium text-[#9FB6FF]">
              {tr(lang, { es: "Leer el artículo", en: "Read the article", de: "Artikel lesen" })}
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </TarjetaGlow>
        </Reveal>

        <Reveal retraso={0.16}>
          <div className="rounded-tarjeta border border-mint/20 bg-mint/[.05] p-6 sm:p-7">
            <span className="inline-flex rounded-full border border-mint/25 bg-bottle-900/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-mint">
              {tr(lang, { es: "En preparación", en: "Coming soon", de: "In Vorbereitung" })}
            </span>
            <h2 className="mt-4 text-[20px] text-[#F4F6FF]">{tr(lang, { es: "Próximos artículos", en: "Upcoming articles", de: "Nächste Artikel" })}</h2>
            <ul className="mt-4 space-y-2.5">
              {blogHome.proximos.map((titulo) => (
                <li key={titulo} className="flex gap-2.5 text-[15px] leading-snug text-white/65">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-mint" />
                  {titulo}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* El blog como entidad propia, colgando del sitio. Es lo que
          permite que un buscador entienda que los artículos futuros
          son del mismo sitio y del mismo autor, en vez de páginas
          sueltas que coinciden en dominio. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            grafoPagina([
              esquemaMigas(lang, [{ nombre: "Blog", ruta: "/blog" }]),
              {
                "@type": "Blog",
                "@id": urlAbsoluta(lang, "/blog") + "#blog",
                name: tr(lang, { es: "Blog de Nexo4Pymes", en: "The Nexo4Pymes blog", de: "Der Nexo4Pymes-Blog" }),
                description: blogHome.entradilla,
                url: urlAbsoluta(lang, "/blog"),
                publisher: { "@id": marca.dominio + "/#business" },
                isPartOf: { "@id": marca.dominio + "/#website" },
              },
            ]),
          ),
        }}
      />
    </>
  );
}
