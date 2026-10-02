import type { Metadata } from "next";
import { PadelPage } from "@/components/site/padel-page";
import { alternativas, idiomaOBase } from "@/lib/i18n";

/* /padel — Nexo Pádel. Solo en español (clubes de Mallorca): en /en/padel y
   /de/padel se ve la misma página en español, sin indexar, y la dirección
   buena para Google es siempre /padel. */

const TITULO = "Nexo Pádel: WhatsApp con IA y gestión de escuela para clubes de pádel";
const DESCRIPCION =
  "Programa para clubes y escuelas de pádel: un WhatsApp que contesta por el club, faltas y recuperaciones automáticas, partidos que se completan solos y cierre de mes. Hecho en Mallorca.";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = idiomaOBase((await params).lang);
  return {
    title: { absolute: `${TITULO} | Nexo4Pymes` },
    description: DESCRIPCION,
    alternates: { canonical: alternativas("es", "/padel").canonical },
    robots: lang === "es" ? undefined : { index: false, follow: true },
    openGraph: {
      type: "website",
      locale: "es_ES",
      siteName: "Nexo4Pymes",
      title: "Nexo Pádel: tu club de pádel, sin estar pegado al WhatsApp",
      description: DESCRIPCION,
      url: alternativas("es", "/padel").canonical,
    },
  };
}

export default function Page() {
  return <PadelPage />;
}
