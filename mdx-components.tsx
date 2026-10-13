import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/* Tipografía de los artículos. Vive aquí y no en el .mdx para que
   escribir un post nuevo sea escribir markdown, sin clases sueltas.

   LAS CLASES DE TIPOGRAFÍA SON OBLIGATORIAS, NO DECORACIÓN. El blog
   se escribe en markdown: un `##` llega aquí como un <h2> pelado. La
   regla base que les daba la tipografía de titulares vivía en el CSS
   de la plantilla de la web, y al unificar las dos plantillas se fue.
   Sin `font-display` en cada uno, los titulares del artículo salen
   con la tipografía del texto y el artículo se lee como un correo.

   Los colores ya no son fijos: `text-fg` y `text-fg-2` tienen un
   valor en modo claro y otro en oscuro. Antes eran blancos a mano
   («text-[#F4F6FF]», «text-white/68»), que sobre el fondo claro de
   ahora sería texto blanco sobre blanco. */

export function useMDXComponents(componentes: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <h1 className="font-display mt-2 text-[clamp(2rem,5.4vw,3rem)] leading-[1.06] font-semibold tracking-tight text-balance text-fg" {...props} />
    ),
    h2: (props) => (
      <h2 className="font-display mt-14 text-[clamp(1.5rem,3.6vw,2rem)] leading-[1.15] font-semibold tracking-tight text-fg" {...props} />
    ),
    h3: (props) => <h3 className="font-display mt-10 text-[19px] font-semibold tracking-tight text-fg sm:text-[21px]" {...props} />,
    p: (props) => (
      <p className="mt-5 text-[16.5px] leading-[1.75] text-fg-2 text-pretty" {...props} />
    ),
    ul: (props) => (
      <ul className="mt-5 list-disc space-y-2.5 pl-5 text-[16.5px] leading-[1.7] text-fg-2" {...props} />
    ),
    ol: (props) => (
      <ol className="mt-5 list-decimal space-y-2.5 pl-5 text-[16.5px] leading-[1.7] text-fg-2" {...props} />
    ),
    strong: (props) => <strong className="font-semibold text-fg" {...props} />,
    a: ({ href = "", ...props }) => (
      <Link
        href={href}
        className="font-medium text-brand underline decoration-brand/35 underline-offset-4 transition-colors hover:decoration-brand"
        {...props}
      />
    ),
    hr: () => <hr className="border-line my-12" />,
    ...componentes,
  };
}
