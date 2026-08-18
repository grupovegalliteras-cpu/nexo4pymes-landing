import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // .mdx cuenta como página: así un artículo nuevo del blog es un solo
  // archivo en app/blog/<slug>/page.mdx, sin tocar nada más.
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    // Por defecto Next solo genera WebP. AVIF pesa entre un 20 y un 30 %
    // menos con la misma calidad y lo entienden Chrome, Firefox y Safari
    // desde 2023; el navegador que no pueda con él recibe el WebP, que
    // sigue en la lista. Importa sobre todo en la captura del hero, que
    // es el LCP de la página.
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        // Los archivos de public/ no llevan hash en el nombre, así que Next
        // los sirve sin caché. Esta cabecera la traía el vercel.json anterior
        // y sin ella el logo y las imágenes se vuelven a descargar en cada
        // visita. Una semana: si se cambia un archivo hay que renombrarlo.
        source: "/assets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800" }],
      },
    ];
  },
  async redirects() {
    // Las URLs .html de la web anterior ya están indexadas en Google.
    // Sin estos 301 se perdería el posicionamiento acumulado.
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/legal.html", destination: "/legal", permanent: true },
      {
        source: "/blog/por-que-diagnosticar-antes-de-automatizar.html",
        destination: "/blog/por-que-diagnosticar-antes-de-automatizar",
        permanent: true,
      },
      // /veterinarias era la landing de conversión; con el rediseño esa
      // misma página pasó a ser la home. Se repone en enlaces de
      // llamadas en frío ya repartidos, así que el 301 se queda para
      // siempre, no es una migración puntual.
      { source: "/veterinarias", destination: "/", permanent: true },
      { source: "/veterinarias.html", destination: "/", permanent: true },
    ];
  },
};

export default createMDX()(nextConfig);
