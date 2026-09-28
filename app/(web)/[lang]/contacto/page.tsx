import type { Metadata } from "next";
import { Cabecera } from "@/components/layout/Cabecera";
import { PieDePagina } from "@/components/layout/PieDePagina";
import { FondoAmbiente } from "@/components/ui/FondoAmbiente";
import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Reveal } from "@/components/motion/Reveal";
import { Boton } from "@/components/ui/Boton";
import { FormularioContacto } from "@/components/contacto/FormularioContacto";
import { CalendarioEmbebido } from "@/components/contacto/CalendarioEmbebido";
import { contenido } from "@/content/i18n";
import { OG_LOCALE, alternativas, idiomaOBase, tr } from "@/lib/i18n";
import { fijarIdioma } from "@/lib/idioma-servidor";
import { marca } from "@/content/marca";
import { waLink } from "@/lib/whatsapp";

/* /contacto — el brief la pedía con formulario, calendario integrado
   y vías directas. Están las tres.

   No lleva CtaMovil: la barra flotante repetiría "agendar llamada"
   encima de una página que ya es, entera, un formulario de contacto.
   Ahí estorba en vez de ayudar. */

const TITULO = {
  es: "Contacto — hablemos de vuestro negocio",
  en: "Contact — let's talk about your business",
  de: "Kontakt — sprechen wir über Ihr Geschäft",
};
const DESCRIPCION = {
  es: "Agendad una videollamada gratuita de 15 minutos o escribidnos por el formulario. Contestamos en menos de 24 horas laborables.",
  en: "Book a free 15-minute video call or write to us using the form. We reply within 24 working hours.",
  de: "Buchen Sie einen kostenlosen 15-minütigen Videocall oder schreiben Sie uns über das Formular. Wir antworten innerhalb von 24 Arbeitsstunden.",
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = idiomaOBase((await params).lang);
  const titulo = TITULO[lang];
  const descripcion = DESCRIPCION[lang];
  return {
  title: { absolute: `${titulo} | Nexo4Pymes` },
  description: descripcion,
  alternates: alternativas(lang, "/contacto"),
  openGraph: {
    type: "website",
    siteName: marca.nombre,
    locale: OG_LOCALE[lang],
    title: titulo,
    description: descripcion,
    url: alternativas(lang, "/contacto").canonical,
    images: [
      {
        url: "/assets/og-nexo4pymes.jpg",
        width: 1200,
        height: 630,
        alt: `Nexo4Pymes — ${titulo}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: titulo,
    description: descripcion,
    images: ["/assets/og-nexo4pymes.jpg"],
  },
  };
}

export default async function PaginaContacto({ params }: { params: Promise<{ lang: string }> }) {
  const lang = idiomaOBase((await params).lang);
  fijarIdioma(lang);
  const { calendario, datosEmpresa, formulario, heroContacto } = contenido(lang).contacto;
  const t = (x: { es: string; en: string; de: string }) => tr(lang, x);
  return (
    <>
      <FondoAmbiente />

      <Cabecera
        enlaces={[
          { href: "#agendar", texto: t({ es: "Agendar llamada", en: "Book a call", de: "Termin buchen" }) },
          { href: "#formulario", texto: t({ es: "Formulario", en: "Form", de: "Formular" }) },
          { href: "#datos-empresa", texto: t({ es: "Datos", en: "Details", de: "Daten" }) },
        ]}
        cta={{ texto: "WhatsApp", href: waLink("GENERAL", undefined, lang), externo: true }}
        enlacePill={{ href: "/servicios", texto: t({ es: "Servicios ↗", en: "Services ↗", de: "Leistungen ↗" }), textoMovil: t({ es: "Ver servicios ↗", en: "See services ↗", de: "Leistungen ansehen ↗" }) }}
      />

      <main id="contenido" className="relative z-10">
        {/* ---------- HERO ---------- */}
        <section id="top" className="relative overflow-hidden px-5 pb-8 pt-28 sm:px-8 sm:pb-12 sm:pt-36">
          <div className="relative mx-auto max-w-[820px] text-center">
            <Reveal>
              <span
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[.04]
                           px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/75"
              >
                <span aria-hidden="true" className="anim-respirar h-1.5 w-1.5 rounded-full bg-mint" />
                {heroContacto.categoria}
              </span>
            </Reveal>

            <Reveal retraso={0.06}>
              <h1 className="mt-5 text-[clamp(2.1rem,6.4vw,3.6rem)] text-white">
                {heroContacto.titularA} <span className="texto-degradado">{heroContacto.titularB}</span>
              </h1>
            </Reveal>

            <Reveal retraso={0.12}>
              <p className="mx-auto mt-5 max-w-[56ch] text-[16.5px] leading-relaxed text-white/70 sm:text-[18px]">
                {heroContacto.parrafo}
              </p>
            </Reveal>

            {/* WHATSAPP ANTES QUE NADA.
                Esta página ofrecía tres caminos —calendario, formulario y
                correo— y los tres pedían más esfuerzo que escribir un
                mensaje. Quien llega aquí ya ha decidido contactar: lo que
                falta es que no se arrepienta por el camino.

                El número va escrito y a la vista, no solo dentro del
                botón: en escritorio mucha gente prefiere copiarlo y
                escribir desde su propio móvil. */}
            <Reveal retraso={0.18}>
              <div className="mt-8 flex flex-col items-center gap-3">
                <Boton
                  href={waLink("CONTACTO", undefined, lang)}
                  externo
                  tamano="lg"
                  flecha
                  magnetico
                  className="w-full font-titular font-semibold sm:w-auto"
                >
                  {t({ es: "Escribidnos por WhatsApp", en: "Message us on WhatsApp", de: "Schreiben Sie uns auf WhatsApp" })}
                </Boton>
                <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-white/45">
                  {marca.whatsappVisible} · {t({ es: "os contestamos nosotros", en: "we reply ourselves", de: "wir antworten selbst" })}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- AGENDAR ---------- */}
        <Seccion id="agendar" tono="oscuro" ancho="normal">
          <div className="max-w-[62ch]">
            <Antetitulo tono="oscuro">{calendario.categoria}</Antetitulo>
            <TituloSeccion className="text-[#F4F6FF]">{calendario.titular}</TituloSeccion>
            <Reveal retraso={0.08}>
              <p className="mt-5 text-[16px] leading-relaxed text-white/65 sm:text-[17.5px]">
                {calendario.intro}
              </p>
            </Reveal>
          </div>

          <Reveal retraso={0.1}>
            <div className="mt-8 sm:mt-10">
              <CalendarioEmbebido />
            </div>
          </Reveal>
        </Seccion>

        {/* ---------- FORMULARIO ---------- */}
        <Seccion id="formulario" tono="oscuro-hondo" ancho="normal">
          <div className="max-w-[62ch]">
            <Antetitulo tono="oscuro">{formulario.categoria}</Antetitulo>
            <TituloSeccion className="text-[#F4F6FF]">{formulario.titular}</TituloSeccion>
            <Reveal retraso={0.08}>
              <p className="mt-5 text-[16px] leading-relaxed text-white/65 sm:text-[17.5px]">
                {formulario.intro}
              </p>
            </Reveal>
          </div>

          <Reveal retraso={0.1}>
            <div className="mt-8 sm:mt-10">
              <FormularioContacto />
            </div>
          </Reveal>
        </Seccion>

        {/* ---------- DATOS DE LA EMPRESA ----------
            Identificación del responsable del tratamiento. El RGPD y
            la LSSI obligan a que sea localizable; tenerlo aquí, y no
            solo enterrado en /legal, también ayuda a que un cliente
            B2B se fíe. */}
        <Seccion id="datos-empresa" tono="oscuro" ancho="normal">
          <div className="max-w-[62ch]">
            <Antetitulo tono="oscuro">{datosEmpresa.categoria}</Antetitulo>
            <TituloSeccion className="text-[#F4F6FF]">{datosEmpresa.titular}</TituloSeccion>
            <Reveal retraso={0.08}>
              <p className="mt-5 text-[16px] leading-relaxed text-white/65">{datosEmpresa.intro}</p>
            </Reveal>
          </div>

          <Reveal retraso={0.1}>
            <dl className="mt-8 grid gap-4 rounded-panel border border-white/10 bg-white/[.03] p-5 sm:grid-cols-2 sm:p-7">
              <Dato etiqueta={t({ es: "Razón social", en: "Registered name", de: "Firmenname" })} valor={marca.razonSocial} />
              <Dato
                etiqueta="WhatsApp"
                valor={marca.whatsappVisible}
                href={waLink("CONTACTO", undefined, lang)}
              />
              <Dato etiqueta="Email" valor={marca.email} href={`mailto:${marca.email}`} />
              <Dato etiqueta={t({ es: "Ubicación", en: "Location", de: "Standort" })} valor={`${marca.localidad}, ${marca.region}`} />
              <Dato etiqueta={t({ es: "Ámbito", en: "Coverage", de: "Tätigkeitsgebiet" })} valor={t({ es: "Toda España, en remoto", en: "All of Spain, remotely", de: "Ganz Spanien, aus der Ferne" })} />
            </dl>
          </Reveal>
        </Seccion>
      </main>

      <PieDePagina
        redes
        enlaces={[
          { href: "#agendar", texto: t({ es: "Agendar llamada", en: "Book a call", de: "Termin buchen" }) },
          { href: "#formulario", texto: t({ es: "Formulario", en: "Form", de: "Formular" }) },
          { href: "/servicios", texto: t({ es: "Servicios", en: "Services", de: "Leistungen" }) },
          { href: "/nosotros", texto: t({ es: "Quiénes somos", en: "About us", de: "Über uns" }) },
          { href: "/blog", texto: "Blog" },
          { href: "/", texto: t({ es: "Inicio", en: "Home", de: "Startseite" }) },
        ]}
        cruce={{
          pregunta: t({ es: "¿Todavía no sabéis si os encaja?", en: "Not sure yet whether it's for you?", de: "Noch unsicher, ob es passt?" }),
          texto: t({ es: "Ver qué construimos en vuestro sector", en: "See what we build for your industry", de: "Sehen, was wir für Ihre Branche bauen" }),
          href: "/#sectores",
        }}
      />
    </>
  );
}

function Dato({ etiqueta, valor, href }: { etiqueta: string; valor: string; href?: string }) {
  return (
    <div>
      <dt className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-mint">{etiqueta}</dt>
      <dd className="mt-1.5 text-[15px] text-white/80">
        {href ? (
          <a href={href} className="break-all text-azul underline-offset-4 hover:underline">
            {valor}
          </a>
        ) : (
          valor
        )}
      </dd>
    </div>
  );
}
