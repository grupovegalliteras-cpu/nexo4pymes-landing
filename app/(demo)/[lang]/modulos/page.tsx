import type { Metadata } from "next";
import { Servicios } from "@/components/site/servicios";
import { alternativas, idiomaOBase, tr } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = idiomaOBase((await params).lang);
  return {
    /* El título nombra los módulos que la gente busca por su nombre
       —fichaje, facturación, rutas—, no la etiqueta interna. */
    title: {
      absolute: tr(lang, {
        es: "Módulos: CRM, fichaje, rutas y facturación | Nexo4Pymes",
        en: "Modules: CRM, time clock, routes and invoicing | Nexo4Pymes",
        de: "Module: CRM, Zeiterfassung, Routen, Rechnungen | Nexo4Pymes",
      }),
    },
    description: tr(lang, {
      es: "Los 40 módulos de Nexo4Pymes: CRM y presupuestos, partes de trabajo y rutas, fichaje y nóminas, facturación con VeriFactu y cobros. Se empieza por uno.",
      en: "The 40 Nexo4Pymes modules: CRM and quotes, job reports and routes, time clock and payslips, VeriFactu invoicing and payments. You start with one.",
      de: "Die 40 Module von Nexo4Pymes: CRM und Angebote, Arbeitsberichte und Routen, Zeiterfassung und Lohn, Rechnungen mit VeriFactu. Sie starten mit einem.",
    }),
    alternates: alternativas(lang, "/modulos"),
  };
}

export default function Page() {
  return <Servicios />;
}
