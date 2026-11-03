// Service worker de la demo de Nexo4Pymes: la app funciona sin red con los datos de la demo.
//
// POR QUÉ v3. Con la v2, todo lo que no era una página salía de la caché primero y
// para siempre: favicon, iconos del manifest, /assets… Quien visitó la web con la
// marca verde seguía viendo el logo verde aunque el servidor ya sirviera el
// carmesí. Al activarse, esta versión borra la caché v2 entera.
//
// LA REGLA AHORA:
//   · /_next/static/ → caché primero. Llevan un hash en el nombre: si cambia el
//     contenido, cambia la dirección, así que nunca se quedan viejos.
//   · Todo lo demás (páginas, iconos, imágenes, manifest) → red primero, y la
//     caché solo si no hay conexión. La demo sigue funcionando sin cobertura,
//     pero con red siempre se ve lo último.
// Si algún día vuelve a hacer falta tirar lo guardado, se sube el número de CACHE.
const CACHE = "nexo4pymes-v3";
const PRECACHE = ["/", "/app", "/demo", "/panel", "/manifest.webmanifest", "/brand/icono-192.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))));
  self.clients.claim();
});

function guardar(req, res) {
  if (res.ok) {
    const copy = res.clone();
    caches.open(CACHE).then((c) => c.put(req, copy));
  }
  return res;
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== self.location.origin) return;

  if (url.pathname.startsWith("/_next/static/")) {
    e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => guardar(req, res))));
    return;
  }

  e.respondWith(
    fetch(req)
      .then((res) => guardar(req, res))
      .catch(() =>
        caches.match(req).then((r) => r || (req.mode === "navigate" ? caches.match("/app") : Response.error())),
      ),
  );
});
