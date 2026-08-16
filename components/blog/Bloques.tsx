import Link from "next/link";
import { AlertTriangle, Info } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Boton } from "@/components/ui/Boton";

/* Bloques destacados de los artículos. Se importan desde el .mdx. */

export function Destacado({
  titulo,
  children,
}: {
  titulo?: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal direccion="escala">
      <div className="mt-10 overflow-hidden rounded-[22px] border border-coral/25 bg-gradient-to-br from-white/[.06] to-white/[.015] backdrop-blur-xl">
        <div className="border-l-[3px] border-coral p-6 sm:p-7">
          {titulo && (
            <div className="flex items-center gap-2.5">
              <AlertTriangle size={16} className="text-aviso" aria-hidden="true" />
              <h3 className="text-[17px] text-[#F4F6FF]">{titulo}</h3>
            </div>
          )}
          <div className="[&>p:first-child]:mt-3">{children}</div>
        </div>
      </div>
    </Reveal>
  );
}

export function Nota({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <div className="mt-10 flex gap-3 rounded-2xl border border-azul/25 bg-azul/[.07] p-5">
        <Info size={18} className="mt-1 shrink-0 text-[#9FB6FF]" aria-hidden="true" />
        <div className="[&>p:first-child]:mt-0">{children}</div>
      </div>
    </Reveal>
  );
}

export function Senales({ items }: { items: { fuerte: string; texto: string }[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((item) => (
        <li
          key={item.fuerte}
          className="flex gap-3 rounded-xl border border-white/10 bg-white/[.03] px-4 py-3.5"
        >
          <AlertTriangle
            size={15}
            className="mt-1 shrink-0 text-aviso"
            aria-hidden="true"
          />
          <p className="text-[15.5px] leading-relaxed text-white/68">
            <strong className="font-medium text-[#F4F6FF]">{item.fuerte}</strong> {item.texto}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function CtaPost({
  titulo,
  children,
  boton,
  href,
  externo = false,
}: {
  titulo: string;
  children: React.ReactNode;
  boton: string;
  href: string;
  externo?: boolean;
}) {
  return (
    <Reveal direccion="escala">
      <div className="relative mt-14 overflow-hidden rounded-[26px] border border-white/9 bg-gradient-to-br from-white/[.06] to-white/[.015] p-7 text-white shadow-[0_28px_70px_rgba(0,0,0,.42)] backdrop-blur-xl sm:p-9">
        <div className="malla malla-fade absolute inset-0 opacity-60" aria-hidden="true" />
        <h2 className="relative mt-0 text-[24px] text-[#F4F6FF] sm:text-[28px]">{titulo}</h2>
        <div className="relative text-white/65 [&>p]:mt-4 [&>p]:text-[15.5px] [&>p]:leading-relaxed [&_strong]:text-[#F4F6FF]">
          {children}
        </div>
        <div className="relative mt-7">
          <Boton href={href} externo={externo} flecha magnetico>
            {boton}
          </Boton>
        </div>
      </div>
    </Reveal>
  );
}

export function VolverAlBlog() {
  return (
    <Link
      href="/blog"
      className="group mt-12 inline-flex items-center gap-2 text-[14.5px] font-medium text-[#9FB6FF] transition-colors hover:text-white"
    >
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1">
        ←
      </span>
      Volver al blog
    </Link>
  );
}
