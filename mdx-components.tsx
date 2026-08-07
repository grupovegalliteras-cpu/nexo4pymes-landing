import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/* Tipografía de los artículos. Vive aquí y no en el .mdx para que
   escribir un post nuevo sea escribir markdown, sin clases sueltas. */

export function useMDXComponents(componentes: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <h1 className="mt-2 text-[clamp(2rem,5.4vw,3rem)] leading-[1.06]" {...props} />
    ),
    h2: (props) => (
      <h2 className="mt-14 text-[clamp(1.5rem,3.6vw,2rem)] text-bottle" {...props} />
    ),
    h3: (props) => <h3 className="mt-10 text-[19px] text-bottle sm:text-[21px]" {...props} />,
    p: (props) => (
      <p className="mt-5 text-[16.5px] leading-[1.75] text-suave" {...props} />
    ),
    ul: (props) => (
      <ul className="mt-5 list-disc space-y-2.5 pl-5 text-[16.5px] leading-[1.7] text-suave" {...props} />
    ),
    ol: (props) => (
      <ol className="mt-5 list-decimal space-y-2.5 pl-5 text-[16.5px] leading-[1.7] text-suave" {...props} />
    ),
    strong: (props) => <strong className="font-medium text-bottle" {...props} />,
    a: ({ href = "", ...props }) => (
      <Link
        href={href}
        className="font-medium text-teal underline decoration-teal/35 underline-offset-4 transition-colors hover:decoration-teal"
        {...props}
      />
    ),
    hr: () => <hr className="my-12 border-linea" />,
    ...componentes,
  };
}
