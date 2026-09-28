import type { Metadata } from "next";
import Link from "@/components/i18n/Enlace";
import { Geist, Bricolage_Grotesque } from "next/font/google";
import "./(demo)/globals.css";

/* 404 de todo el sitio: la web tiene dos plantillas raíz (la demo y los apartados),
   así que Next necesita esta página propia para las direcciones que no existen. */

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] });

export const metadata: Metadata = { title: "Página no encontrada | Nexo4Pymes", robots: { index: false } };

export default function GlobalNotFound() {
  return (
    <html lang="es" data-theme="dark" className={`${geist.variable} ${bricolage.variable} antialiased`}>
      <body>
        <main className="grid min-h-dvh place-items-center bg-bg p-6 text-center text-fg">
          <div>
            <div className="font-display text-6xl font-semibold text-fg-3">404</div>
            <h1 className="mt-2 font-display text-2xl font-semibold">Esta página no existe</h1>
            <p className="mt-2 text-fg-2">Puede que el enlace esté mal escrito.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <Link href="/" className="rounded-lg border border-line px-4 py-2 text-sm font-medium">
                Inicio
              </Link>
              <Link href="/demo?tour=1" className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-brand-ink">
                Ver la demo en vivo
              </Link>
              <Link href="/contacto" className="rounded-lg border border-line px-4 py-2 text-sm font-medium">
                Contacto
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
