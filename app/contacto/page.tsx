import type { Metadata } from "next";
import { Cabecera } from "@/components/layout/Cabecera";
import { PieDePagina } from "@/components/layout/PieDePagina";
import { FondoAmbiente } from "@/components/ui/FondoAmbiente";
import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Reveal } from "@/components/motion/Reveal";
import { FormularioContacto } from "@/components/contacto/FormularioContacto";
import { CalendarioEmbebido } from "@/components/contacto/CalendarioEmbebido";
import { calendario, datosEmpresa, formulario, heroContacto } from "@/content/contacto";
import { marca } from "@/content/marca";

/* /contacto — el brief la pedía con formulario, calendario integrado
   y vías directas. Están las tres.

   No lleva CtaMovil: la barra flotante repetiría "agendar llamada"
   encima de una página que ya es, entera, un formulario de contacto.
   Ahí estorba en vez de ayudar. */

const titulo = "Contacto — hablemos de vuestro negocio";
const descripcion =
  "Agendad una videollamada gratuita de 15 minutos o escribidnos por el formulario. Contestamos en menos de 24 horas laborables.";

export const metadata: Metadata = {
  title: { absolute: `${titulo} | Nexo4Pymes` },
  description: descripcion,
  alternates: { canonical: "/contacto" },
  openGraph: {
    type: "website",
    siteName: marca.nombre,
    locale: "es_ES",
    title: titulo,
    description: descripcion,
    url: "/contacto",
    images: [
      {
        url: "/assets/og-automatizacion-pymes.jpg",
        width: 1200,
        height: 630,
        alt: "Nexo4Pymes — contacto",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: titulo,
    description: descripcion,
    images: ["/assets/og-automatizacion-pymes.jpg"],
  },
};

export default function PaginaContacto() {
  return (
    <>
      <FondoAmbiente />

      <Cabecera
        enlaces={[
          { href: "#agendar", texto: "Agendar llamada" },
          { href: "#formulario", texto: "Formulario" },
          { href: "#datos-empresa", texto: "Datos" },
        ]}
        cta={{ texto: "Llamada gratis", href: marca.calendly, externo: true }}
        enlacePill={{ href: "/servicios", texto: "Servicios ↗", textoMovil: "Ver servicios ↗" }}
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
              <Dato etiqueta="Razón social" valor={marca.razonSocial} />
              <Dato etiqueta="Email" valor={marca.email} href={`mailto:${marca.email}`} />
              <Dato etiqueta="Ubicación" valor={`${marca.localidad}, ${marca.region}`} />
              <Dato etiqueta="Ámbito" valor="Toda España, en remoto" />
            </dl>
          </Reveal>
        </Seccion>
      </main>

      <PieDePagina
        redes
        enlaces={[
          { href: "#agendar", texto: "Agendar llamada" },
          { href: "#formulario", texto: "Formulario" },
          { href: "/servicios", texto: "Servicios" },
          { href: "/nosotros", texto: "Quiénes somos" },
          { href: "/blog", texto: "Blog" },
          { href: "/", texto: "Inicio" },
        ]}
        cruce={{
          pregunta: "¿Todavía no sabéis si os encaja?",
          texto: "Ver qué automatizamos en vuestro sector",
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
