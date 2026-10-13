import Link from "@/components/i18n/Enlace";
import { AlertTriangle, Info } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Boton } from "@/components/ui/Boton";
import { tr } from "@/lib/i18n";
import { articuloDe, fechaLegible } from "@/content/articulos";
import { idiomaServidor } from "@/lib/idioma-servidor";

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
      <div className="mt-10 overflow-hidden rounded-tarjeta border border-brand/30 bg-surface">
        <div className="border-l-[3px] border-brand p-6 sm:p-7">
          {titulo && (
            <div className="flex items-center gap-2.5">
              <AlertTriangle size={16} className="text-warn" aria-hidden="true" />
              <h3 className="text-[17px] text-fg">{titulo}</h3>
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
      <div className="mt-10 flex gap-3 rounded-2xl border border-brand/40 bg-brand-soft p-5">
        <Info size={18} className="mt-1 shrink-0 text-brand" aria-hidden="true" />
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
          className="flex gap-3 rounded-xl border border-line bg-surface-2 px-4 py-3.5"
        >
          <AlertTriangle
            size={15}
            className="mt-1 shrink-0 text-warn"
            aria-hidden="true"
          />
          <p className="text-[15.5px] leading-relaxed text-fg-2">
            <strong className="font-medium text-fg">{item.fuerte}</strong> {item.texto}
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
      <div className="relative mt-14 overflow-hidden rounded-panel border border-line bg-surface p-7 text-fg shadow-e2 sm:p-9">
        <div className=" absolute inset-0 opacity-60" aria-hidden="true" />
        <h2 className="relative mt-0 text-[24px] text-fg sm:text-[28px]">{titulo}</h2>
        <div className="relative text-fg-2 [&>p]:mt-4 [&>p]:text-[15.5px] [&>p]:leading-relaxed [&_strong]:text-fg">
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
      className="group mt-12 inline-flex items-center gap-2 text-[14.5px] font-medium text-brand transition-colors hover:text-fg"
    >
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1">
        ←
      </span>
      {tr(idiomaServidor(), { es: "Volver al blog", en: "Back to the blog", de: "Zurück zum Blog" })}
    </Link>
  );
}

/* ============================================================
   LA FECHA DEL ARTICULO

   POR QUE EXISTE. Los articulos no mostraban fecha. Para el lector,
   un texto sin fecha sobre normativa fiscal no se sabe si vale; para
   el buscador, sin una fecha declarada se la inventa a partir del
   rastreo, y entonces cada despliegue rejuvenecia todos los
   articulos a la vez. Esta linea y el dateModified del esquema salen
   los dos de content/articulos.ts, asi que no pueden contradecirse.

   Solo dice actualizado si el contenido se reviso de verdad. Un
   cambio de CSS no es una actualizacion y fingir que si lo es se paga
   cuando Google lo comprueba.
   ============================================================ */
export function FechaArticulo({ ruta }: { ruta: string }) {
  const lang = idiomaServidor();
  const a = articuloDe(ruta);
  if (!a) return null;
  const rev = a.actualizado && a.actualizado !== a.publicado;
  return (
    <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-3">
      <time dateTime={a.publicado}>{fechaLegible(a.publicado, lang)}</time>
      {rev ? (
        <>
          {' · '}
          {tr(lang, { es: 'revisado el', en: 'reviewed on', de: 'überprüft am' })}{' '}
          <time dateTime={a.actualizado}>{fechaLegible(a.actualizado!, lang)}</time>
        </>
      ) : null}
    </p>
  );
}
