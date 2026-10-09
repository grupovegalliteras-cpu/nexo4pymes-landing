import type { Metadata } from "next";
import { DemoPage } from "@/components/demo/demo-page";
import { alternativas, idiomaOBase, tr } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = idiomaOBase((await params).lang);
  return {
    title: {
      absolute: tr(lang, {
        es: "Demo en vivo: panel de oficina y app del técnico | Nexo4Pymes",
        en: "Live demo: office dashboard and technician app | Nexo4Pymes",
        de: "Live-Demo: Büro-Dashboard und Techniker-App | Nexo4Pymes",
      }),
    },
    description: tr(lang, {
      es: "El panel de oficina y la app del técnico, lado a lado y sincronizados de verdad. Elegid vuestro sector y probadlo: no hay que registrarse ni dejar el correo.",
      en: "The office dashboard and the technician app, side by side and genuinely in sync. Pick your industry and try it: no sign-up, no email required.",
      de: "Büro-Dashboard und Techniker-App, nebeneinander und wirklich synchron. Wählen Sie Ihre Branche und testen Sie: ohne Anmeldung, ohne E-Mail.",
    }),
    alternates: alternativas(lang, "/demo"),
  };
}

export default function Page() {
  return <DemoPage />;
}
