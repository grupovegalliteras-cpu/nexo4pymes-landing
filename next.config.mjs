import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // .mdx cuenta como página: así un artículo nuevo del blog es un solo
  // archivo en app/blog/<slug>/page.mdx, sin tocar nada más.
  pageExtensions: ["ts", "tsx", "mdx"],

  // Hay dos plantillas raíz (la demo en app/(demo) y los apartados de la web en
  // app/(web)); la página 404 común vive en app/global-not-found.tsx.
  experimental: { globalNotFound: true },

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
      {
        // Los 192 fotogramas del coche de la landing de Concesia.
        source: "/concesia/hero/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800" }],
      },
    ];
  },
  async rewrites() {
    // IDIOMAS (lib/i18n.ts): las páginas viven en app/(…)/[lang]/. El español se
    // sirve sin prefijo, así que /servicios se contesta desde /es/servicios sin que
    // cambie la dirección. afterFiles: antes se atienden public/, la API, el sitemap…
    return {
      // Concesia: la landing es una web estática en public/concesia, generada en su propio
      // repositorio. Se sirve antes de que la reescritura de idiomas la mande a /es/….
      beforeFiles: [
        { source: "/concesia", destination: "/concesia/index.html" },
        { source: "/concesia/demo", destination: "/concesia/demo.html" },
      ],
      afterFiles: [
        { source: "/", destination: "/es" },
        { source: "/:path((?!(?:es|en|de)(?:/|$)).+)", destination: "/es/:path" },
      ],
    };
  },

  async redirects() {
    // Las URLs .html de la web anterior ya están indexadas en Google.
    // Sin estos 301 se perdería el posicionamiento acumulado.
    return [
      /* UNA PÁGINA, UNA DIRECCIÓN.
         El español se sirve sin prefijo (/servicios) por la reescritura
         de abajo, pero /es/servicios también contestaba 200 porque la
         página existe de verdad en esa ruta. Resultado: el sitio entero
         duplicado en catorce direcciones de más. La etiqueta canónica
         las apuntaba bien, que es por lo que esto no fue un incendio,
         pero una canónica es una sugerencia y un 301 es un hecho: así
         le decimos a Google cuál es la buena y además le ahorramos
         rastrear dos veces lo mismo.

         El orden importa y está bien: los redirects se miran antes que
         las reescrituras, así que /servicios entra limpio, no coincide
         con /es/… y sigue su camino. */
      { source: "/es", destination: "/", permanent: true },
      { source: "/es/:path*", destination: "/:path*", permanent: true },

      { source: "/index.html", destination: "/", permanent: true },
      { source: "/legal.html", destination: "/legal", permanent: true },
      {
        source: "/blog/por-que-diagnosticar-antes-de-automatizar.html",
        destination: "/blog/por-que-diagnosticar-antes-de-automatizar",
        permanent: true,
      },
      // La landing veterinaria se retiró de internet. Estas tres URLs
      // llevan a la home con un 301, y NO se pueden borrar:
      //
      //   · /veterinarias y /veterinarias.html se repartieron en
      //     llamadas en frío. Hay gente con esa dirección apuntada en
      //     papel; sin el 301 se encuentran un 404.
      //   · /sectores/veterinarias estuvo indexada en Google y es la
      //     que llevaba el posicionamiento del sector.
      //
      // El 301 traslada a la home lo que esas URLs tuvieran ganado en
      // buscadores, en vez de tirarlo. Si algún día se recupera la
      // landing, se vuelven a apuntar a ella.
      { source: "/veterinarias", destination: "/", permanent: true },
      { source: "/veterinarias.html", destination: "/", permanent: true },
      { source: "/sectores/veterinarias", destination: "/", permanent: true },
      // Nexo Pádel se retiró de la web en noviembre de 2026. Su página y su
      // demo estuvieron indexadas y se mandaron a clubes: mismo motivo que
      // las de arriba para llevarlas a la home y no a un 404.
      { source: "/padel", destination: "/", permanent: true },
      { source: "/padel/:path*", destination: "/", permanent: true },
      { source: "/:lang(en|de)/padel", destination: "/:lang", permanent: true },

      // La demo de pantalla completa se retiró de la web en noviembre de 2026:
      // quien la quiera la pide por WhatsApp o por el formulario, que es donde
      // se consigue el contacto. Estuvo indexada (sitemap, prioridad 0.9) y la
      // enlazaban el blog y los módulos, así que va a la home con un 301.
      { source: "/demo", destination: "/", permanent: true },
      { source: "/:lang(en|de)/demo", destination: "/:lang", permanent: true },

      /* Enlaces antiguos a /sectores. Iban a /#para-quien, que era el
         selector de sectores de la portada anterior; la portada del
         6/11/2026 ya no tiene esa sección, así que el ancla no existe y
         el 301 acababa en lo alto de la home. Un 301 a la portada es
         justo lo que Google trata como un 404 blando. Van a /servicios,
         que es donde se explica hoy qué hace el agente en una empresa
         de servicios, con sus preguntas. */
      { source: "/sectores", destination: "/servicios", permanent: true },

      /* ===== LA PODA DE NOVIEMBRE DE 2026 =====
         Search Console midió el catálogo: 104 páginas indexadas y 0
         clics comerciales en 90 días. Se retiraron los 5 módulos, los
         8 sectores, la demo del panel y la landing estática de
         /recepcionia, cuyo contenido es ahora la portada.

         VAN CON 301 Y NO SE BORRAN NUNCA. Google tardará semanas en
         dejar de pedirlas, y /sectores/plagas era la página con más
         impresiones de todo el sitio (269 en 90 días): lo poco que
         tuviera ganado se traslada, no se tira.

         CADA UNA AL SITIO QUE HACE SU TRABAJO HOY, que es lo que Google
         premia: un 301 masivo a la portada se trata como un 404 blando. */
      { source: "/recepcionia", destination: "/", permanent: true },

      /* Los dos artículos del blog que hablaban del producto anterior.
         Al artículo nuevo que mejor sustituye a cada uno, no a /blog:
         un 301 al listado es casi lo mismo que un 404. */
      { source: "/blog/holded-odoo-o-software-a-medida", destination: "/blog/cuanto-cuesta-un-agente-de-ia", permanent: true },
      { source: "/blog/partes-de-trabajo-movil-mallorca", destination: "/blog/que-es-un-agente-de-ia", permanent: true },
      { source: "/blog/por-que-diagnosticar-antes-de-automatizar.html", destination: "/blog/por-que-diagnosticar-antes-de-automatizar", permanent: true },
      { source: "/modulos", destination: "/#funciones", permanent: true },
      { source: "/modulos/control-horario", destination: "/obligaciones", permanent: true },
      { source: "/modulos/facturacion-verifactu", destination: "/verifactu", permanent: true },
      { source: "/modulos/:slug*", destination: "/#funciones", permanent: true },
      { source: "/sectores/:slug*", destination: "/servicios", permanent: true },
      { source: "/:lang(en|de)/modulos/:slug*", destination: "/:lang", permanent: true },
      { source: "/:lang(en|de)/modulos", destination: "/:lang", permanent: true },
      { source: "/:lang(en|de)/sectores/:slug*", destination: "/:lang", permanent: true },

      /* EL PANEL Y LA APP ERAN LA DEMO DEL PRODUCTO ANTERIOR. Se
         colaron en el índice de Google: unas cuarenta URLs de
         pantallas vacías (/panel/nominas, /panel/contabilidad…), con
         /panel/direccion sacando 41 impresiones en la posición 61.
         Eso es presupuesto de rastreo gastado en nada. */
      { source: "/panel", destination: "/", permanent: true },
      { source: "/panel/:slug*", destination: "/", permanent: true },
      { source: "/app", destination: "/", permanent: true },
      { source: "/app/:slug*", destination: "/", permanent: true },
      { source: "/:lang(en|de)/panel/:slug*", destination: "/:lang", permanent: true },
      { source: "/:lang(en|de)/panel", destination: "/:lang", permanent: true },
      { source: "/:lang(en|de)/app/:slug*", destination: "/:lang", permanent: true },
      { source: "/:lang(en|de)/app", destination: "/:lang", permanent: true },

      // La demo tenía su propia página de privacidad; en la web conjunta manda /legal.
      { source: "/privacidad", destination: "/legal", permanent: true },
    ];
  },
};

export default createMDX()(nextConfig);
