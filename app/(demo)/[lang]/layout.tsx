import type { Metadata, Viewport } from "next";
import { Geist, Bricolage_Grotesque, IBM_Plex_Mono, Sora, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import { Providers } from "@/components/providers";
import { BannerCookies } from "@/components/legal/BannerCookies";
import { Analitica } from "@/components/legal/Analitica";
import { Medicion } from "@/components/legal/Medicion";
import { grafoBase } from "@/lib/esquema";
import { SITE_URL } from "@/data/site";
import { SugerenciaIdioma } from "@/components/i18n/SugerenciaIdioma";
import { IDIOMAS, OG_LOCALE, idiomaOBase, tr } from "@/lib/i18n";
import { fijarIdioma } from "@/lib/idioma-servidor";

/* Plantilla de la portada (la demo), el panel y la app.
   La web de siempre (servicios, contacto, nosotros, blog, legal) tiene la suya en app/(web).
   Lo que es de toda la marca se repite aquí igual: cookies, analítica, medición,
   verificación de Meta y datos de empresa para Google. */

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] });
// tipografías de la web, solo para el banner de cookies: sin precarga
const titular = Sora({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--fuente-titular", display: "swap", preload: false });
const texto = Space_Grotesk({ subsets: ["latin"], variable: "--fuente-texto", display: "swap", preload: false });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--fuente-mono", display: "swap", preload: false });

export function generateStaticParams() {
  return IDIOMAS.map((lang) => ({ lang }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = idiomaOBase((await params).lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      /* EL TÍTULO DE LA PORTADA NO LLEVA LA MARCA Y ES A PROPÓSITO.
         Google enseña el nombre del sitio encima del título en la
         página de inicio (lo saca del WebSite de lib/esquema.ts), así
         que repetir "Nexo4Pymes" aquí gastaba trece caracteres de los
         sesenta que caben en contarle a quién buscamos y dónde.

         Y DÓNDE IMPORTA MÁS QUE NADA. Los diez primeros resultados de
         "software a medida mallorca" llevan todos "Mallorca" en el
         título; esta web no lo llevaba en ninguno. El resto de
         páginas sí conservan la marca por el template de abajo. */
      default: tr(lang, {
        es: "Programa de gestión para empresas de servicios en Mallorca",
        en: "Field service management software in Mallorca",
        de: "Branchensoftware für Dienstleister auf Mallorca",
      }),
      template: "%s | Nexo4Pymes",
    },
    description: tr(lang, {
      es: "Panel de oficina y app de operarios conectados en tiempo real. Avisos, trabajos, rutas, facturación con VeriFactu, equipo y nóminas. Hecho en Mallorca.",
      en: "Office dashboard and technician app, connected in real time. Service requests, jobs, routes, VeriFactu invoicing, team and payslips. Made in Mallorca.",
      de: "Büro-Dashboard und Techniker-App, in Echtzeit verbunden. Aufträge, Einsätze, Routen, Rechnungen mit VeriFactu, Team und Lohnzettel. Made in Mallorca.",
    }),
    applicationName: "Nexo4Pymes",
    robots: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
    // lo que se ve al pegar el enlace en WhatsApp
    openGraph: {
      type: "website",
      locale: OG_LOCALE[lang],
      siteName: "Nexo4Pymes",
      title: tr(lang, {
        es: "Nexo4Pymes: la llamada entra, el trabajo sale solo",
        en: "Nexo4Pymes: the call comes in, the job gets done",
        de: "Nexo4Pymes: Der Anruf kommt rein, der Auftrag läuft von selbst",
      }),
      description: tr(lang, {
        es: "Mira en vivo cómo un aviso se convierte en orden, parte firmado y factura con VeriFactu. Panel de oficina y app de técnicos.",
        en: "Watch a customer request become a work order, a signed job report and a VeriFactu invoice, live. Office dashboard and technician app.",
        de: "Sehen Sie live, wie aus einer Kundenanfrage ein Auftrag, ein unterschriebener Arbeitsbericht und eine VeriFactu-Rechnung wird.",
      }),
    },
    twitter: { card: "summary_large_image" },
    formatDetection: { telephone: false },
    appleWebApp: { capable: true, title: "Nexo Campo", statusBarStyle: "black-translucent" },
    other: {
      // Meta Business exige esta etiqueta en todas las páginas; sin ella revoca la verificación del dominio
      // Etiqueta del portfolio de Nexo4Pymes (dominio verificado el 2 de octubre de 2026).
      "facebook-domain-verification": "5v8341w9cj32alna06bh90gfkontjd",
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f6f7" },
    { media: "(prefers-color-scheme: dark)", color: "#081116" },
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem('nexo-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`;

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const lang = idiomaOBase((await params).lang);
  fijarIdioma(lang);
  return (
    <html lang={lang} suppressHydrationWarning className={`${geist.variable} ${bricolage.variable} ${titular.variable} ${texto.variable} ${mono.variable} antialiased`}>
      <body className="min-h-dvh">
        <Script id="nexo-theme" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Providers>{children}</Providers>
        <SugerenciaIdioma />
        <BannerCookies />
        <Analitica />
        <Medicion />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(grafoBase(lang)) }} />
      </body>
    </html>
  );
}
