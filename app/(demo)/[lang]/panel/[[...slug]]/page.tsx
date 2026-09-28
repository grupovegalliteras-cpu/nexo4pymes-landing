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
  return { title: m ? `${m.nombre}, ${panel}` : panel, alternates: alternativas(lang, slug?.[0] ? `/panel/${id}` : "/panel") };
}

export default async function PanelPage({ params }: PageProps<"/[lang]/panel/[[...slug]]">) {
  const { slug } = await params;
  const section = slug?.[0] ?? "direccion";
  if (!MODULO_POR_ID[section] || (slug && slug.length > 1)) notFound();
  return <PanelShell mode="route" initialSection={section} />;
}
