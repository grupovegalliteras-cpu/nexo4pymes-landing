import { marca } from "@/content/marca";

/* Datos estructurados. Una sola entidad de negocio (`@id`) compartida
   por las dos páginas: si se duplicara con datos distintos, Google
   vería dos empresas diferentes. */

export const esquemaNegocio = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${marca.dominio}/#business`,
  name: marca.nombre,
  description:
    "Agencia de automatización de procesos con inteligencia artificial para pymes y autónomos. Diagnóstico primero, implementación por fases después.",
  url: marca.dominio,
  email: marca.email,
  image: `${marca.dominio}/assets/og-image.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: marca.localidad,
    addressRegion: marca.region,
    addressCountry: "ES",
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Illes Balears" },
    { "@type": "Country", name: "España" },
  ],
  sameAs: [marca.instagram, marca.facebook],
  knowsAbout: [
    "Automatización de procesos",
    "Inteligencia artificial aplicada a pymes",
    "Atención automática de WhatsApp",
    "Gestión y recordatorios de citas",
  ],
};

export function esquemaFaq(preguntas: { p: string; r: string }[], id: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": id,
    mainEntity: preguntas.map((item) => ({
      "@type": "Question",
      name: item.p,
      acceptedAnswer: { "@type": "Answer", text: item.r },
    })),
  };
}

export function esquemaArticulo({
  titulo,
  descripcion,
  url,
  fecha,
}: {
  titulo: string;
  descripcion: string;
  url: string;
  fecha: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: titulo,
    description: descripcion,
    url,
    datePublished: fecha,
    dateModified: fecha,
    author: { "@type": "Organization", name: marca.nombre, url: marca.dominio },
    publisher: { "@id": `${marca.dominio}/#business` },
    mainEntityOfPage: url,
  };
}
