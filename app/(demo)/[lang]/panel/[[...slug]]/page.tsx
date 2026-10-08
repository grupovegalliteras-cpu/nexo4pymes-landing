import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MODULOS, MODULO_POR_ID } from "@/data/modules";
import { moduloDe } from "@/data/modules-i18n";
import { PanelShell } from "@/components/panel/shell";
import { alternativas, idiomaOBase, tr } from "@/lib/i18n";

export function generateStaticParams() {
  return [{ slug: [] }, ...MODULOS.map((m) => ({ slug: [m.id] }))];
}

export async function generateMetadata({ params }: PageProps<"/[lang]/panel/[[...slug]]">): Promise<Metadata> {
  const { slug, lang: l } = await params;
  const lang = idiomaOBase(l);
  const id = slug?.[0] ?? "direccion";
  const m = moduloDe(lang, id);
  const panel = tr(lang, { es: "panel de oficina", en: "office dashboard", de: "Büro-Dashboard" });
  return {
    title: m ? `${m.nombre}, ${panel}` : panel,
    alternates: alternativas(lang, slug?.[0] ? `/panel/${id}` : "/panel"),
    /* FUERA DEL ÍNDICE, DENTRO DE LA WEB. Esto es la demo navegable:
       trece pantallas de la app y cuarenta módulos del panel, por tres
       idiomas. Son más de cien direcciones que no contestan a ninguna
       búsqueda —la pantalla "Fichar" de una demo no es la respuesta a
       nada— y que no están en el sitemap, o sea que ya se dijo que no
       se querían indexar. Dejarlas indexables gasta en ellas el
       rastreo que necesitan las páginas que sí venden.
       follow: true a propósito: que siga los enlaces de vuelta. */
    robots: { index: false, follow: true },
  };
}

export default async function PanelPage({ params }: PageProps<"/[lang]/panel/[[...slug]]">) {
  const { slug } = await params;
  const section = slug?.[0] ?? "direccion";
  if (!MODULO_POR_ID[section] || (slug && slug.length > 1)) notFound();
  return <PanelShell mode="route" initialSection={section} />;
}
