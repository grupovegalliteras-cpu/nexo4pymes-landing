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
    "Desarrollo de soluciones digitales a medida para pymes y autónomos: CRM propios, configuradores de producto para la web e integraciones automatizadas. Diagnóstico primero, desarrollo por fases después.",
  url: marca.dominio,
  email: marca.email,
  image: `${marca.dominio}/assets/og-nexo4pymes.jpg`,
  /* La dirección era solo "Mallorca, Illes Balears": para Google eso
     es una isla, no un domicilio. Con calle y municipio reales la
     ficha puede aspirar a resultados locales de Palma, que es donde
     está el cliente que nos puede contratar.
     `addressLocality` pasa a ser el municipio (Palma) porque es lo
     que schema.org entiende por localidad; la isla no cabe en el
     vocabulario. */
  address: {
    "@type": "PostalAddress",
    streetAddress: marca.calle,
    postalCode: marca.codigoPostal,
    addressLocality: marca.municipio,
    addressRegion: marca.region,
    addressCountry: "ES",
  },
  /* El mismo número que el botón de WhatsApp de toda la web, en
     formato internacional, que es el que pide schema.org. */
  telephone: `+${marca.whatsapp}`,
  areaServed: [
    { "@type": "AdministrativeArea", name: "Illes Balears" },
    { "@type": "Country", name: "España" },
  ],
  /* `sameAs` le dice a Google qué perfiles son de esta misma empresa.
     Solo Instagram: el perfil de Facebook ya no se enlaza, y listar
     aquí una página que no reconocemos en la web sería incoherente. */
  sameAs: [marca.instagram],
  knowsAbout: [
    "Desarrollo de software a medida",
    "CRM a medida para pymes",
    "Configuradores de producto para la web",
    "Integración de sistemas y automatización de procesos",
    "Inteligencia artificial aplicada a pymes",
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
