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

/* LA PLANTILLA RAÍZ DE TODO EL SITIO.

   Antes había dos: esta (portada, demo, panel, app) y otra en
   app/(web) para servicios, nosotros, blog y legal. Dos plantillas
   raíz son dos tipografías, dos paletas y dos cabeceras, y eso es
   exactamente lo que se notaba al pulsar «Servicios» desde la
   portada: se cambiaba de web. Ahora hay una.

   Lo que vino de la plantilla vieja al unificar, y hay que conservar:
   la imagen de vista previa por defecto (los artículos del blog se
   comparten por WhatsApp y salían como enlace pelado), `authors`, y
   el <noscript> que devuelve la visibilidad a lo que iba a animarse.

   Lo que es de toda la marca se queda aquí y en ningún otro sitio:
   cookies, analítica, medición, verificación de Meta y los datos de
   empresa para Google. */

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
    authors: [{ name: "Nexo4Pymes" }],
    /* EL ICONO SE DECLARA AQUÍ Y NO POR CONVENCIÓN DE ARCHIVO.
       Había un icon.png dentro de [lang]/ y Next le ponía de dirección
       "/-/icon-8t26lv.png", que es un 404: la portada llevaba meses sin
       icono y Google enseña el icono junto a cada resultado en el móvil.
       Apuntando a archivos de public/ no hay nada que adivinar.

       POR QUÉ ESTAS TRES Y EN ESTE ORDEN:

         · /favicon.ico primero. Es la dirección por convención, la que
           prueba cualquiera que no encuentre la etiqueta, y la que
           tampoco existía: 404 hasta el 9 de octubre. Lleva dentro los
           tres tamaños pequeños (16, 32 y 48).

         · 48 px. Google documenta que el favicon debería ser cuadrado y
           de un múltiplo de 48. Había 32 y 512, y ninguno lo es.

         · 512 px para pantallas de mucha densidad y para quien quiera
           el icono grande.

       OJO SI SE CAMBIA EL ICONO: conviene mantener las mismas
       direcciones. Google rastrea el favicon por su cuenta y cachea el
       resultado; cambiar la ruta reinicia esa espera. */
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "48x48 32x32 16x16" },
        { url: "/assets/favicon-48.png", sizes: "48x48", type: "image/png" },
        { url: "/assets/favicon-512.png", sizes: "512x512", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: [{ url: "/assets/favicon-180.png", sizes: "180x180" }],
    },
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
        es: "Mirad en vivo cómo un aviso se convierte en orden, parte firmado y factura con VeriFactu. Panel de oficina y app de técnicos.",
        en: "Watch a customer request become a work order, a signed job report and a VeriFactu invoice, live. Office dashboard and technician app.",
        de: "Sehen Sie live, wie aus einer Kundenanfrage ein Auftrag, ein unterschriebener Arbeitsbericht und eine VeriFactu-Rechnung wird.",
      }),
      /* VISTA PREVIA POR DEFECTO AL PEGAR UN ENLACE. Venía de la
         plantilla de la web y la portada no la tenía: cada página de
         este grupo (portada, demo, módulos, sectores) se compartía en
         WhatsApp sin imagen. Lo que una página defina por su cuenta
         sigue mandando sobre esto. */
      images: [{ url: "/assets/og-nexo4pymes.jpg", width: 1200, height: 630, alt: "Nexo4Pymes" }],
    },
    twitter: { card: "summary_large_image", images: ["/assets/og-nexo4pymes.jpg"] },
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
        {/* Sin JavaScript, Framer Motion deja escrito opacity:0 en el HTML y
            media página se quedaría en blanco. Esto devuelve la visibilidad a
            lo que iba a animarse; con JS activo el navegador ignora el bloque. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
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
