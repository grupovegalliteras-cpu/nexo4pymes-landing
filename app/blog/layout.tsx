import Link from "next/link";
import { marca } from "@/content/marca";

/* Marco común del blog: cabecera sobria y pie corto. El artículo no
   compite con la web comercial, tiene que leerse. */

export default function LayoutBlog({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="oscuro sticky top-0 z-50 border-b border-white/8 bg-bottle-900/92 backdrop-blur-lg">
        <div className="mx-auto flex max-w-[760px] items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          <Link href="/" className="font-titular text-[16px] font-semibold text-white">
            Nexo<span className="text-coral">4</span>Pymes
          </Link>
          <nav className="flex items-center gap-5 text-[13.5px]">
            <Link href="/blog" className="text-white/60 transition-colors hover:text-white">
              Blog
            </Link>
            <Link href="/" className="text-white/60 transition-colors hover:text-white">
              Volver a la web
            </Link>
          </nav>
        </div>
      </header>

      <main className="bg-cream px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-[720px]">{children}</div>
      </main>

      <footer className="oscuro relative overflow-hidden bg-bottle-900 px-5 py-12 text-white sm:px-8">
        <div className="malla malla-fade absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="relative mx-auto max-w-[760px]">
          <p className="max-w-[52ch] text-[14.5px] leading-relaxed text-white/55">
            Automatización de procesos con IA para pymes y autónomos. Diagnóstico primero,
            implementación por fases después.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[13.5px]">
            <Link href="/" className="text-mint/80 transition-colors hover:text-mint">
              Inicio
            </Link>
            <Link href="/veterinarias" className="text-mint/80 transition-colors hover:text-mint">
              Clínicas veterinarias
            </Link>
            <Link href="/legal#aviso" className="text-white/50 transition-colors hover:text-white">
              Aviso legal
            </Link>
            <Link
              href="/legal#privacidad"
              className="text-white/50 transition-colors hover:text-white"
            >
              Privacidad
            </Link>
            <a
              href={`mailto:${marca.email}`}
              className="text-white/50 transition-colors hover:text-white"
            >
              {marca.email}
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
