import type { Metadata } from "next";
import { DemoPage } from "@/components/demo/demo-page";
import { alternativas, idiomaOBase, tr } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = idiomaOBase((await params).lang);
  return {
    title: tr(lang, { es: "Demo en vivo", en: "Live demo", de: "Live-Demo" }),
    description: tr(lang, {
      es: "Panel de oficina y app del técnico, lado a lado y sincronizados. Con recorrido guiado.",
      en: "Office dashboard and technician app, side by side and in sync. With a guided tour.",
      de: "Büro-Dashboard und Techniker-App, nebeneinander und synchron. Mit geführter Tour.",
    }),
    alternates: alternativas(lang, "/demo"),
  };
}

export default function Page() {
  return <DemoPage />;
}
