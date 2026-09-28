import type { Metadata } from "next";
import { Servicios } from "@/components/site/servicios";
import { alternativas, idiomaOBase, tr } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = idiomaOBase((await params).lang);
  return {
    title: tr(lang, { es: "Todos los módulos", en: "All modules", de: "Alle Module" }),
    description: tr(lang, {
      es: "Todos los módulos de Nexo4Pymes agrupados: captación, clientes, operaciones, facturación, equipo y datos.",
      en: "Every Nexo4Pymes module by area: enquiries, customers, operations, invoicing, team and data.",
      de: "Alle Module von Nexo4Pymes nach Bereichen: Anfragen, Kunden, Einsätze, Rechnungen, Team und Daten.",
    }),
    alternates: alternativas(lang, "/modulos"),
  };
}

export default function Page() {
  return <Servicios />;
}
