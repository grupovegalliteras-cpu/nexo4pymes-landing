import type { Metadata } from "next";
import { AppRoutePage } from "@/components/app/app-route";
import { alternativas, idiomaOBase, tr } from "@/lib/i18n";

const SCREENS = ["hoy", "ruta", "fichar", "chat", "mas", "vacaciones", "docs", "qr", "gasto", "turnos", "comunicados", "notificaciones", "incidencia"];

export function generateStaticParams() {
  return [{ slug: [] }, ...SCREENS.map((s) => ({ slug: [s] }))];
}

export async function generateMetadata({ params }: PageProps<"/[lang]/app/[[...slug]]">): Promise<Metadata> {
  const { lang: l, slug } = await params;
  const lang = idiomaOBase(l);
  return {
    title: tr(lang, { es: "App de operarios", en: "Technician app", de: "Techniker-App" }),
    description: tr(lang, {
      es: "La app que usa el técnico en campo: ruta, partes, fotos, firma y fichaje.",
      en: "The app technicians use in the field: route, job reports, photos, signature and time clock.",
      de: "Die App für Techniker im Außendienst: Route, Berichte, Fotos, Unterschrift und Zeiterfassung.",
    }),
    alternates: alternativas(lang, slug?.[0] ? `/app/${slug[0]}` : "/app"),
  };
}

export default async function Page({ params }: PageProps<"/[lang]/app/[[...slug]]">) {
  const { slug } = await params;
  const s = slug?.[0];
  return <AppRoutePage initial={s && SCREENS.includes(s) ? s : "hoy"} />;
}
