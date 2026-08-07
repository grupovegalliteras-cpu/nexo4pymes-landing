import Link from "next/link";
import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { ItemStagger, Reveal, Stagger } from "@/components/motion/Reveal";
import { TarjetaHover } from "@/components/ui/TarjetaHover";
import { blogHome } from "@/content/home";

export function BlogTeaser() {
  return (
    <Seccion id="blog" tono="claro">
      <div className="max-w-[62ch]">
        <Antetitulo>{blogHome.categoria}</Antetitulo>
        <TituloSeccion>{blogHome.titular}</TituloSeccion>
        <Reveal retraso={0.06}>
          <p className="mt-6 text-[16.5px] leading-relaxed text-suave">{blogHome.entradilla}</p>
        </Reveal>
      </div>

      <Stagger className="mt-12 grid gap-4 lg:grid-cols-2" intervalo={0.1}>
        <ItemStagger>
          <TarjetaHover className="h-full">
            <span className="inline-flex rounded-full bg-cream-2 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-suave">
              {blogHome.publicado.etiqueta}
            </span>
            <h3 className="mt-4 text-[21px] leading-snug text-bottle">
              <Link
                href={blogHome.publicado.href}
                className="after:absolute after:inset-0 after:content-['']"
              >
                {blogHome.publicado.titulo}
              </Link>
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-suave">
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
          </TarjetaHover>
        </ItemStagger>

        <ItemStagger>
          <div className="h-full rounded-[20px] border border-teal/20 bg-teal-claro/60 p-6">
            <span className="inline-flex rounded-full bg-white px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-teal">
              En preparación
            </span>
            <h3 className="mt-4 text-[21px] text-bottle">Próximos artículos</h3>
            <ul className="mt-4 space-y-2.5">
              {blogHome.proximos.map((titulo) => (
                <li key={titulo} className="flex gap-2.5 text-[14.5px] leading-snug text-suave">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                  {titulo}
                </li>
              ))}
            </ul>
            <Link
              href="/blog"
              className="group mt-6 inline-flex items-center gap-1.5 text-[14.5px] font-medium text-teal"
            >
              Ver todos los artículos
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </ItemStagger>
      </Stagger>
    </Seccion>
  );
}
