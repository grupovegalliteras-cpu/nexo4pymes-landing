import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { TarjetaGlow } from "@/components/ui/TarjetaGlow";
import { blogHome } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artículos sobre qué se puede automatizar en un negocio pequeño, en qué orden conviene hacerlo y qué errores salen caros.",
  alternates: { canonical: "/blog" },
};

export default function PaginaBlog() {
  return (
    <>
      <Reveal as="span" className="block">
        <span className="inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-mint">
          <span aria-hidden="true" className="h-px w-6 bg-mint/60" />
          Blog
        </span>
      </Reveal>
      <Reveal>
        <h1 className="mt-4 text-[clamp(1.9rem,5vw,2.8rem)] text-[#F4F6FF]">{blogHome.titular}</h1>
      </Reveal>
      <Reveal retraso={0.06}>
        <p className="mt-5 max-w-[60ch] text-[16.5px] leading-relaxed text-white/65">
          {blogHome.entradilla}
        </p>
      </Reveal>

      <div className="mt-12 space-y-4">
        <Reveal retraso={0.1}>
          <TarjetaGlow className="group relative">
            <span className="inline-flex rounded-full border border-white/12 bg-white/[.04] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">
              {blogHome.publicado.etiqueta}
            </span>
            <h2 className="mt-4 text-[22px] leading-snug text-[#F4F6FF] sm:text-[26px]">
              <Link
                href={blogHome.publicado.href}
                className="after:absolute after:inset-0 after:content-['']"
              >
                {blogHome.publicado.titulo}
              </Link>
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-white/62">
              {blogHome.publicado.resumen}
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-[14.5px] font-medium text-[#9FB6FF]">
              Leer el artículo
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </TarjetaGlow>
        </Reveal>

        <Reveal retraso={0.16}>
          <div className="rounded-tarjeta border border-mint/20 bg-mint/[.05] p-6 sm:p-7">
            <span className="inline-flex rounded-full border border-mint/25 bg-bottle-900/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-mint">
              En preparación
            </span>
            <h2 className="mt-4 text-[20px] text-[#F4F6FF]">Próximos artículos</h2>
            <ul className="mt-4 space-y-2.5">
              {blogHome.proximos.map((titulo) => (
                <li key={titulo} className="flex gap-2.5 text-[15px] leading-snug text-white/65">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-mint" />
                  {titulo}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </>
  );
}
