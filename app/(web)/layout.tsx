import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Sora, Space_Grotesk } from "next/font/google";
import { marca } from "@/content/marca";
import { esquemaNegocio } from "@/lib/esquema";
import { BannerCookies } from "@/components/legal/BannerCookies";
import { Analitica } from "@/components/legal/Analitica";
import { Medicion } from "@/components/legal/Medicion";
import "./globals.css";

/* next/font descarga y sirve las tipografías desde nuestro propio
   dominio en el build. No hay ninguna petición a Google en el
   navegador del visitante: la política de privacidad afirma justo
   eso, y así sigue siendo cierto.

   Rediseño: Sora pasa a ser la tipografía de titulares (antes era
   Space Grotesk) y Space Grotesk baja a texto de cuerpo (antes Inter),
   igual que en la maqueta del rediseño. */
/* SUBCONJUNTOS Y PESOS — no es un detalle de gusto, son kilobytes.
   Las tres fuentes cargaban "latin" y "latin-ext", y Sora traía además
   cinco pesos. Ocho archivos y 117 KB, el mayor peso del sitio después
   del JavaScript, y en móvil eso se paga en el LCP.

   · latin-ext fuera. Cubre U+0100–U+02AF y similares: eslavo, báltico,
     turco. Se revisó todo el contenido carácter a carácter y no hay ni
     uno en ese rango — las tildes, la ñ y la ç del catalán están en
     "latin". Las flechas y los símbolos (→ ✓ ⚠) tampoco están en
     latin-ext, así que ya venían de la fuente del sistema antes y
     siguen igual.
     SI ALGÚN DÍA se publica un nombre con caracteres de Europa del
     Este, habrá que devolverlo: se vería con la tipografía del
     sistema en vez de con la de marca.

   · El peso 800 de Sora no lo usaba nadie. Se buscaron las clases de
     grosor en todo el proyecto: solo hay 400, 500, 600 y 700. */
const titular = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--fuente-titular",
  display: "swap",
});

const texto = Space_Grotesk({
  subsets: ["latin"],
  variable: "--fuente-texto",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--fuente-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(marca.dominio),
  title: {
    default: "Soluciones digitales a medida para pymes | Nexo4Pymes",
    template: "%s | Nexo4Pymes",
  },
  authors: [{ name: "Nexo4Pymes" }],
  robots: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  icons: {
    icon: [
      { url: "/assets/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/assets/favicon-180.png", sizes: "180x180" }],
  },
  other: {
    // Meta Business exige esta etiqueta en el <head> renderizado en origen.
    // Si desaparece, Meta revoca la verificación del dominio.
    "facebook-domain-verification": "2uz5rez9zyt7qyb5r42ugk1cnkv0jl",
  },
};

export const viewport: Viewport = {
  /* El fondo real del sitio. Era "#0E3B36", el verde botella de la web
     anterior al rediseño: llevaba meses pintando de verde la barra del
     navegador en Android sobre una web que ya es casi negra. Es el
     valor de --color-bottle en app/globals.css; si cambia allí, aquí
     también. */
  themeColor: "#05060c",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${titular.variable} ${texto.variable} ${mono.variable}`}>
      <body>
        {/* Sin JavaScript, Framer Motion deja escrito opacity:0 en el HTML y
            media página se quedaría en blanco. Esto devuelve la visibilidad a
            lo que iba a animarse; con JS activo el navegador ignora el bloque. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}

        {/* Banner de cookies y píxeles, en el layout raíz para que
            vayan en todas las páginas sin repetirlos.

            El orden importa poco porque Analitica no pinta nada
            hasta que hay consentimiento, pero conceptualmente es
            este: primero se pregunta, después se carga. */}
        <BannerCookies />
        <Analitica />

        {/* Medición. No pinta nada: guarda de dónde viene la visita y
            escucha los clics de WhatsApp, Calendly, teléfono y correo.
            Si el visitante no aceptó, gtag y fbq no existen y los
            eventos se quedan en nada — la puerta está en Analitica. */}
        <Medicion />

        <script
          type="application/ld+json"
          // La misma entidad @id en todas las páginas: si cambian los datos de
          // empresa hay que tocarlos aquí y en ningún sitio más.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(esquemaNegocio) }}
        />
      </body>
    </html>
  );
}
