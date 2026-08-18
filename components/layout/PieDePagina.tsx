import Image from "next/image";
import Link from "next/link";
import { IconoFacebook, IconoInstagram } from "@/components/ui/IconosRedes";
import { marca } from "@/content/marca";

/* Pie común a las páginas del sitio. `cruce` es el enlace entre la
   home veterinaria y /servicios (ayuda a posicionar cada una en lo
   suyo). Fondo casi negro con desenfoque, igual que la maqueta del
   rediseño — ya no hay una versión "clara" del pie.

   FASE 4 — objetivos táctiles. Aquí vivían trece enlaces de 18 px de
   alto: por debajo de los 44 × 44 px que piden la WCAG 2.5.8 y las
   guías de iOS, o sea que con el pulgar en marcha se fallan. Ahora
   cada enlace es una fila de 44 px con su área pulsable completa.

   Contra lo que parece, eso NO alarga el pie: las dos listas pasan a
   dos columnas en móvil (antes se apilaban) y el ritmo vertical baja,
   así que el bloque entero encoge aunque cada enlace sea más grande. */

/* Una sola clase para todo enlace del pie: el área pulsable es la fila
   completa, no solo el texto. */
const FILA =
  "flex min-h-[44px] items-center text-[14px] text-white/60 transition-colors hover:text-white";

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
    <footer className="relative overflow-hidden border-t border-white/7 bg-bottle-900/60 px-5 pb-8 pt-12 text-white backdrop-blur-xl sm:px-8 sm:pb-10 sm:pt-16">
      <div className="malla malla-fade absolute inset-0 opacity-70" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1180px]">
        {/* Enlace cruzado entre home y /servicios. Ocupaba 24 px de alto
            en móvil; ahora es una fila pulsable de 44. */}
        <div className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/[.03] px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:py-4">
          <span className="text-[14px] text-white/60 sm:text-[14.5px]">{cruce.pregunta}</span>
          <Link
            href={cruce.href}
            className="group flex min-h-[44px] items-center gap-2 text-[14.5px] font-medium text-azul sm:min-h-0"
          >
            {cruce.texto}
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <div className="mt-8 grid gap-8 sm:mt-12 sm:grid-cols-[1.4fr_1fr_1fr] sm:gap-10">
          <div>
            <Image
              src="/assets/logo-lockup-dark.png"
              alt="Nexo4Pymes — Automatizamos tu negocio, potenciamos tu futuro"
              width={480}
              height={306}
              sizes="(max-width: 639px) 150px, 190px"
              className="h-auto w-[150px] brightness-125 sm:w-[190px]"
            />
            <p className="mt-3 max-w-[42ch] text-[14px] leading-relaxed text-white/55 sm:mt-4">
              Automatización de procesos con inteligencia artificial para pymes y autónomos.
              Mallorca, Illes Balears.
            </p>

            {redes && (
              <div className="mt-4 flex gap-3 sm:mt-5">
                <a
                  href={marca.instagram}
                  target="_blank"
                  rel="noopener"
                  aria-label="Instagram de Nexo4Pymes"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-azul/50 hover:text-azul"
                >
                  <IconoInstagram size={17} />
                </a>
                <a
                  href={marca.facebook}
                  target="_blank"
                  rel="noopener"
                  aria-label="Facebook de Nexo4Pymes"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-azul/50 hover:text-azul"
                >
                  <IconoFacebook size={17} />
                </a>
              </div>
            )}
          </div>

          {/* Las dos listas van en paralelo desde móvil: con filas de 44 px,
              apiladas sumaban 440 px de pie ellas solas. */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:contents">
            <div>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-mint">Página</h2>
              <ul className="mt-1">
                {enlaces.map((enlace) => (
                  <li key={enlace.href}>
                    <Link href={enlace.href} className={FILA}>
                      {enlace.texto}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-mint">Contacto</h2>
              <ul className="mt-1">
                <li>
                  <a href={`mailto:${marca.email}`} className={`${FILA} break-all`}>
                    {marca.email}
                  </a>
                </li>
                <li>
                  <Link href="/legal#aviso" className={FILA}>
                    Aviso legal
                  </Link>
                </li>
                <li>
                  <Link href="/legal#privacidad" className={FILA}>
                    Política de privacidad
                  </Link>
                </li>
                <li>
                  <Link href="/legal#cookies" className={FILA}>
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-8 border-t border-white/8 pt-5 text-[12.5px] text-white/40 sm:mt-12 sm:pt-6">
          © {new Date().getFullYear()} Nexo4Pymes. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
