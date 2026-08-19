import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // .mdx cuenta como página: así un artículo nuevo del blog es un solo
  // archivo en app/blog/<slug>/page.mdx, sin tocar nada más.
  pageExtensions: ["ts", "tsx", "mdx"],

  // SOLO AFECTA A `npm run dev`. En producción no hace nada.
  //
  // Desde Next 16, el servidor de desarrollo sirve el HTML a cualquiera
  // pero BLOQUEA los archivos de /_next/static (el JavaScript) si la
  // petición no viene de localhost. Al abrir la web desde el móvil por
  // la IP de la red, se veía la página pero sin código: nada animaba,
  // nada respondía al dedo.
  //
  // Esto autoriza los equipos de la red local. Es una lista de
  // desarrollo, no un permiso público: el servidor de `npm run dev` no
  // está expuesto a internet, solo a la WiFi de casa.
  //
  // Si el router asigna otro rango (192.168.0.x, 10.0.0.x...), hay que
  // añadirlo aquí. El comodín cubre los cambios de IP por DHCP.
  allowedDevOrigins: ["192.168.1.100", "192.168.1.*", "192.168.0.*", "10.0.0.*"],
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
      // /veterinarias era la landing de conversión. Pasó a ser la home
      // en el rediseño anterior y ahora, con el giro de posicionamiento
      // a "cualquier pyme", vive en /sectores/veterinarias. Esa URL se
      // repartió en llamadas en frío, así que el 301 se queda para
      // siempre; no es una migración puntual.
      { source: "/veterinarias", destination: "/sectores/veterinarias", permanent: true },
      { source: "/veterinarias.html", destination: "/sectores/veterinarias", permanent: true },

      // Google indexó la home cuando era la página veterinaria. Quien
      // llegue buscando el sector desde un enlace antiguo a /sectores
      // (sin más) aterriza en el único sector con página propia en vez
      // de en un 404.
      { source: "/sectores", destination: "/#sectores", permanent: false },
    ];
  },
};

export default createMDX()(nextConfig);
