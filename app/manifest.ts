import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nexo Campo, app de operarios",
    short_name: "Nexo Campo",
    description: "Ruta del día, partes con fotos y firma, fichaje y documentos. Funciona sin cobertura.",
    start_url: "/app",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#fff7ed",
    theme_color: "#be123c",
    lang: "es",
    icons: [
      { src: "/brand/icono-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icono-512.png", sizes: "512x512", type: "image/png" },
      { src: "/brand/icono-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
