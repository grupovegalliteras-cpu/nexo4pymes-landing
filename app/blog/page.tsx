import type { Metadata } from "next";
import Link from "next/link";
import { blogHome } from "@/content/home";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artículos sobre qué se puede automatizar en un negocio pequeño, en qué orden conviene hacerlo y qué errores salen caros.",
  alternates: { canonical: "/blog" },
};

export default function PaginaBlog() {
  return (
    <>
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-teal">Blog</span>
      <h1 className="mt-4 text-[clamp(1.9rem,5vw,2.8rem)]">{blogHome.titular}</h1>
      <p className="mt-5 max-w-[60ch] text-[16.5px] leading-relaxed text-suave">
        {blogHome.entradilla}
      </p>

      <div className="mt-12 space-y-4">
        <article className="group relative rounded-[22px] border border-linea bg-white p-6 transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:border-teal/30 hover:shadow-[0_24px_50px_-30px_rgba(14,59,54,.45)] sm:p-7">
          <span className="inline-flex rounded-full bg-cream-2 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-suave">
            {blogHome.publicado.etiqueta}
          </span>
          <h2 className="mt-4 text-[22px] leading-snug text-bottle sm:text-[26px]">
            <Link
              href={blogHome.publicado.href}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {blogHome.publicado.titulo}
            </Link>
          </h2>
          <p className="mt-3 text-[15.5px] leading-relaxed text-suave">
            {blogHome.publicado.resumen}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-[14.5px] font-medium text-teal">
            Leer el artículo
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </article>

        <div className="rounded-[22px] border border-teal/20 bg-teal-claro/60 p-6 sm:p-7">
          <span className="inline-flex rounded-full bg-white px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-teal">
            En preparación
          </span>
          <h2 className="mt-4 text-[20px] text-bottle">Próximos artículos</h2>
          <ul className="mt-4 space-y-2.5">
            {blogHome.proximos.map((titulo) => (
              <li key={titulo} className="flex gap-2.5 text-[15px] leading-snug text-suave">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                {titulo}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
