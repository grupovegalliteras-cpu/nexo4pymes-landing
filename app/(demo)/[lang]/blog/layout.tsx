import { ContactDock, SiteFooter, SiteNav } from "@/components/site/chrome";
import { idiomaOBase } from "@/lib/i18n";
import { fijarIdioma } from "@/lib/idioma-servidor";

/* ============================================================
   MARCO DEL BLOG

   El blog tenía cabecera y pie propios: un logo, dos enlaces y un
   texto corto. La idea era que el artículo no compitiera con la web
   comercial, y para leer está bien, pero tenía dos costes que no
   compensan.

   Uno: quien acaba un artículo se encuentra una salida de dos
   enlaces en vez del pie entero, que es el que lleva a la demo, a
   los sectores y a los módulos. Un artículo que posiciona y no
   ofrece a dónde ir después es una visita que se va.

   Dos: era otra estética más. La web se veía de tres formas según
   dónde estuvieras.

   Lo que sí se conserva es lo único que de verdad hacía falta: la
   columna estrecha. 720 px son unos 70 caracteres por línea, que es
   el ancho en el que se lee sin perder el renglón. El resto es la
   misma cabecera y el mismo pie que toda la web.
   ============================================================ */

export default async function LayoutBlog({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const lang = idiomaOBase((await params).lang);
  fijarIdioma(lang);
  return (
    <div className="bg-bg text-fg">
      <SiteNav />
      <main id="contenido" className="px-5 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-20">
        <div className="mx-auto max-w-[720px]">{children}</div>
      </main>
      <SiteFooter />
      <ContactDock />
    </div>
  );
}
