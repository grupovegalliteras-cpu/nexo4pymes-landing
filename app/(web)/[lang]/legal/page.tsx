import type { Metadata } from "next";
import Link from "@/components/i18n/Enlace";
import { FondoAmbiente } from "@/components/ui/FondoAmbiente";
import { Reveal } from "@/components/motion/Reveal";
import { datosLegales, marca } from "@/content/marca";
import { revisarDatosLegales } from "@/lib/legal";
import { LegalEs } from "@/components/legal/LegalEs";
import { LegalEn } from "@/components/legal/LegalEn";
import { LegalDe } from "@/components/legal/LegalDe";
import { SelectorIdioma } from "@/components/i18n/SelectorIdioma";
import { LOCALE, alternativas, idiomaOBase, tr } from "@/lib/i18n";
import { fijarIdioma } from "@/lib/idioma-servidor";

/* Aviso legal, privacidad y cookies.
   Tres secciones apiladas con id propio, no pestañas: así los enlaces
   /legal#privacidad del pie funcionan sin JS y el buscador indexa el
   texto entero.

   El texto es el mismo, palabra por palabra: es contenido legal, no
   copy de marketing.

   LOS DATOS DE LA EMPRESA YA NO SE ESCRIBEN AQUÍ. Vienen de
   content/marca.ts → datosLegales, que es el único sitio donde se
   tocan. Antes estaban a mano en esta página y llevaban meses
   publicando cinco "[PENDIENTE]" en internet sin que nadie se
   enterara: un hueco en el aviso legal no rompe nada y no sale en
   ningún error, solo lo ve el cliente que entra a comprobar si la
   empresa existe.

   Ahora el build lo avisa (ver lib/legal.ts) y lo que falta se dice
   con una frase honesta en vez de un corchete de programador. */

/* Se ejecuta al construir la página, no en el navegador: el aviso
   sale en el registro del despliegue. */
revisarDatosLegales();


export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = idiomaOBase((await params).lang);
  return {
    title: tr(lang, { es: "Aviso legal, privacidad y cookies", en: "Legal notice, privacy and cookies", de: "Impressum, Datenschutz und Cookies" }),
    description: tr(lang, {
      es: "Aviso legal, política de privacidad y política de cookies de Nexo4Pymes, desarrollo de software a medida para pymes y autónomos.",
      en: "Legal notice, privacy policy and cookie policy of Nexo4Pymes, custom software development for small businesses and the self-employed.",
      de: "Impressum, Datenschutzerklärung und Cookie-Richtlinie von Nexo4Pymes, individuelle Softwareentwicklung für kleine Unternehmen und Selbstständige.",
    }),
    alternates: alternativas(lang, "/legal"),
    /* ESTA PÁGINA PASA A INDEXARSE Y NO ES UN DESCUIDO. Estaba con
       noindex y a la vez en el sitemap, que es una contradicción que
       Search Console reporta como error ("enviada en el sitemap,
       excluida por noindex").

       De las dos salidas posibles se eligió la de indexar, porque el
       aviso legal es donde está el nombre, el NIF, el domicilio y el
       teléfono: es la página que le confirma a Google que detrás de
       la web hay una empresa real en Palma, y eso es exactamente lo
       que hace falta para competir en búsquedas locales. */
    robots: { index: true, follow: true },
  };
}

export default async function PaginaLegal({ params }: { params: Promise<{ lang: string }> }) {
  const lang = idiomaOBase((await params).lang);
  fijarIdioma(lang);
  const t = (x: { es: string; en: string; de: string }) => tr(lang, x);
  const Cuerpo = { es: LegalEs, en: LegalEn, de: LegalDe }[lang];
  const secciones = [
    { id: "aviso", texto: t({ es: "Aviso legal", en: "Legal notice", de: "Impressum" }) },
    { id: "privacidad", texto: t({ es: "Privacidad", en: "Privacy", de: "Datenschutz" }) },
    { id: "cookies", texto: "Cookies" },
  ];
  return (
    <>
      <FondoAmbiente />

      <header className="relative z-10 sticky top-0 border-b border-white/7 bg-bottle/72 backdrop-blur-2xl backdrop-saturate-150">
        <div className="mx-auto flex max-w-[900px] items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5" aria-label={t({ es: "Nexo4Pymes, inicio", en: "Nexo4Pymes, home", de: "Nexo4Pymes, Startseite" })}>
            <span className="flex h-9 w-9 items-center justify-center rounded-caja bg-gradient-to-br from-azul to-violeta shadow-[0_6px_22px_rgba(76,125,255,.4),inset_0_1px_0_rgba(255,255,255,.35)]">
              <span className="font-titular text-[15px] font-bold text-white">4</span>
            </span>
            <span className="font-titular text-[16px] font-semibold text-white">
              Nexo<span className="texto-degradado">4</span>Pymes
            </span>
          </Link>
          <Link
            href="/"
            className="rounded-full border border-white/12 bg-white/[.03] px-4 py-2 text-[13.5px] text-white/75 backdrop-blur-md transition-colors hover:border-azul/45 hover:bg-azul/10 hover:text-white"
          >
            {t({ es: "← Volver al inicio", en: "← Back to home", de: "← Zur Startseite" })}
          </Link>
          <SelectorIdioma tono="oscuro" className="max-sm:hidden" />
        </div>
      </header>

      <main className="relative z-10 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-[900px]">
          <Reveal as="span" className="block">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-mint">
              <span aria-hidden="true" className="h-px w-6 bg-mint/60" />
              {t({ es: "Información legal", en: "Legal information", de: "Rechtliche Hinweise" })}
            </span>
          </Reveal>
          <Reveal>
            <h1 className="mt-4 text-[clamp(1.9rem,5vw,2.8rem)] text-[#F4F6FF]">
              {t({ es: "Aviso legal, privacidad y cookies", en: "Legal notice, privacy and cookies", de: "Impressum, Datenschutz und Cookies" })}
            </h1>
          </Reveal>
          <Reveal retraso={0.06}>
            {/* La fecha sale de content/marca.ts: escrita a mano aquí se
                quedaba vieja cada vez que se tocaba el texto legal, y una
                política de privacidad con fecha antigua resta credibilidad
                justo donde se está pidiendo confianza. */}
            <p className="mt-3 text-[14px] text-white/58">
              {t({ es: "Última actualización", en: "Last updated", de: "Letzte Aktualisierung" })}: {lang === "es" ? datosLegales.ultimaRevision : new Intl.DateTimeFormat(LOCALE[lang], { day: "numeric", month: "long", year: "numeric" }).format(new Date(datosLegales.ultimaRevisionISO))}
            </p>
            {lang !== "es" && (
              <p className="mt-3 max-w-[70ch] rounded-tarjeta border border-white/10 bg-white/[.03] p-4 text-[13.5px] leading-relaxed text-white/60">
                {t({ es: "", en: "This is a courtesy translation. In case of any discrepancy, the Spanish version prevails.", de: "Dies ist eine Übersetzung zur Information. Bei Abweichungen ist die spanische Fassung maßgeblich." })}
              </p>
            )}
          </Reveal>

          <Reveal retraso={0.12}>
            <nav aria-label={t({ es: "Secciones legales", en: "Legal sections", de: "Rechtliche Abschnitte" })} className="mt-8 flex flex-wrap gap-2">
              {secciones.map((seccion) => (
                <a
                  key={seccion.id}
                  href={`#${seccion.id}`}
                  className="rounded-full border border-white/10 bg-white/[.03] px-4 py-2 text-[14px] text-white/65 backdrop-blur-md transition-colors hover:border-azul/40 hover:bg-azul/10 hover:text-white"
                >
                  {seccion.texto}
                </a>
              ))}
            </nav>
          </Reveal>

          <Cuerpo />
        </div>
      </main>

      <footer className="relative z-10 bg-bottle-900/60 px-5 py-8 text-center text-[13.5px] text-white/50 backdrop-blur-xl sm:px-8">
        {marca.razonSocial} ·{" "}
        <a href={`mailto:${marca.email}`} className="text-mint/80 underline underline-offset-4 hover:text-mint">
          {marca.email}
        </a>
      </footer>
    </>
  );
}
