import { ogImage, OG_SIZE } from "@/lib/og";
import { LANDINGS_PUBLICADAS, estaPublicada, textoLanding, tituloLanding } from "@/content/landings-seo-i18n";
import { idiomaOBase, tr } from "@/lib/i18n";

/* LA TARJETA DE CADA LANDING DE MÓDULO.

   Estas páginas ponían su propio openGraph en generateMetadata, y en
   Next el openGraph de una página SUSTITUYE al de la plantilla entero,
   no se mezcla campo a campo: al escribir título y descripción se
   perdía la imagen. Quince direcciones —cinco módulos en tres
   idiomas— se pegaban en un WhatsApp sin nada que enseñar.

   Se arregla como en /sectores, con una imagen por ruta en vez de con
   la genérica: cuando Next encuentra este archivo, rellena la imagen
   que le falta al openGraph de la página. Y de paso cada landing lleva
   su propio titular, que para esto es lo que importa. */

export const alt = "Nexo4Pymes";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return LANDINGS_PUBLICADAS.map((modulo) => ({ modulo }));
}

export default async function Image({ params }: { params: Promise<{ lang: string; modulo: string }> }) {
  const { lang: l, modulo } = await params;
  const lang = idiomaOBase(l);
  const slug = estaPublicada(modulo) ? modulo : LANDINGS_PUBLICADAS[0];
  return await ogImage({
    kicker: tr(lang, {
      es: "Programa de servicios · Mallorca",
      en: "Service software · Mallorca",
      de: "Service-Software · Mallorca",
    }),
    title: tituloLanding(lang, slug),
    sub: textoLanding(lang, slug).entradilla,
    chips: [
      tr(lang, { es: "Pedid una demo", en: "Ask for a demo", de: "Demo anfragen" }),
      "Made in Mallorca",
    ],
  });
}
