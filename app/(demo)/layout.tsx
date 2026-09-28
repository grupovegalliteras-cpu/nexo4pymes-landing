import type { Metadata, Viewport } from "next";
import { Geist, Bricolage_Grotesque, IBM_Plex_Mono, Sora, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/components/providers";
import { BannerCookies } from "@/components/legal/BannerCookies";
import { Analitica } from "@/components/legal/Analitica";
import { Medicion } from "@/components/legal/Medicion";
import { esquemaNegocio } from "@/lib/esquema";
import { SITE_URL } from "@/data/site";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nexo4Pymes: panel de gestión y app para empresas de servicios",
    template: "%s | Nexo4Pymes",
  },
  description:
    "Panel de oficina y app de operarios conectados en tiempo real. Avisos, trabajos, rutas, facturación con VeriFactu, equipo y nóminas. Hecho en Mallorca.",
  applicationName: "Nexo4Pymes",
  robots: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  // lo que se ve al pegar el enlace en WhatsApp
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Nexo4Pymes",
    title: "Nexo4Pymes: la llamada entra, el trabajo sale solo",
    description: "Mira en vivo cómo un aviso se convierte en orden, parte firmado y factura con VeriFactu. Panel de oficina y app de técnicos.",
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
  appleWebApp: { capable: true, title: "Nexo Campo", statusBarStyle: "black-translucent" },
  other: {
    // Meta Business exige esta etiqueta en todas las páginas; sin ella revoca la verificación del dominio
    "facebook-domain-verification": "2uz5rez9zyt7qyb5r42ugk1cnkv0jl",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f6f7" },
    { media: "(prefers-color-scheme: dark)", color: "#081116" },
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem('nexo-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning className={`${geist.variable} ${bricolage.variable} ${titular.variable} ${texto.variable} ${mono.variable} antialiased`}>
      <body className="min-h-dvh">
        <Script id="nexo-theme" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Providers>{children}</Providers>
        <BannerCookies />
        <Analitica />
        <Medicion />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(esquemaNegocio) }} />
      </body>
    </html>
  );
}
