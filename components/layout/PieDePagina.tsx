import Image from "next/image";
import Link from "next/link";
import { IconoFacebook, IconoInstagram } from "@/components/ui/IconosRedes";
import { marca } from "@/content/marca";

/* Pie común a las páginas del sitio. `cruce` es el enlace entre la
   home veterinaria y /servicios (ayuda a posicionar cada una en lo
   suyo). Fondo casi negro con desenfoque, igual que la maqueta del
   rediseño — ya no hay una versión "clara" del pie. */

export function PieDePagina({
  enlaces,
  cruce,
  redes = false,
}: {
  enlaces: { href: string; texto: string }[];
  cruce: { pregunta: string; texto: string; href: string };
  redes?: boolean;
}) {
  return (
    <footer className="relative overflow-hidden border-t border-white/7 bg-bottle-900/60 px-5 pb-10 pt-16 text-white backdrop-blur-xl sm:px-8">
      <div className="malla malla-fade absolute inset-0 opacity-70" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1180px]">
        {/* Enlace cruzado entre home y /servicios */}
        <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[.03] p-5 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-[14.5px] text-white/60">{cruce.pregunta}</span>
          <Link
            href={cruce.href}
            className="group inline-flex items-center gap-2 text-[14.5px] font-medium text-azul"
          >
            {cruce.texto}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Image
              src="/assets/logo-lockup-dark.png"
              alt="Nexo4Pymes — Automatizamos tu negocio, potenciamos tu futuro"
              width={480}
              height={306}
              className="h-auto w-[190px] brightness-125"
            />
            <p className="mt-4 max-w-[42ch] text-[14px] leading-relaxed text-white/55">
              Automatización de procesos con inteligencia artificial para pymes y autónomos.
              Mallorca, Illes Balears.
            </p>

            {redes && (
              <div className="mt-5 flex gap-3">
                <a
                  href={marca.instagram}
                  target="_blank"
                  rel="noopener"
                  aria-label="Instagram de Nexo4Pymes"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-azul/50 hover:text-azul"
                >
                  <IconoInstagram size={17} />
                </a>
                <a
                  href={marca.facebook}
                  target="_blank"
                  rel="noopener"
                  aria-label="Facebook de Nexo4Pymes"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-azul/50 hover:text-azul"
                >
                  <IconoFacebook size={17} />
                </a>
              </div>
            )}
          </div>

          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-mint">Página</h2>
            <ul className="mt-4 space-y-2.5">
              {enlaces.map((enlace) => (
                <li key={enlace.href}>
                  <Link
                    href={enlace.href}
                    className="text-[14px] text-white/60 transition-colors hover:text-white"
                  >
                    {enlace.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-mint">
              Contacto
            </h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${marca.email}`}
                  className="text-[14px] text-white/60 transition-colors hover:text-white"
                >
                  {marca.email}
                </a>
              </li>
              <li>
                <Link
                  href="/legal#aviso"
                  className="text-[14px] text-white/60 transition-colors hover:text-white"
                >
                  Aviso legal
                </Link>
              </li>
              <li>
                <Link
                  href="/legal#privacidad"
                  className="text-[14px] text-white/60 transition-colors hover:text-white"
                >
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/legal#cookies"
                  className="text-[14px] text-white/60 transition-colors hover:text-white"
                >
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-white/8 pt-6 text-[12.5px] text-white/40">
          © {new Date().getFullYear()} Nexo4Pymes. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
