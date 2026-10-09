/* ============================================================
   INDEXNOW — AVISAR A LOS BUSCADORES SIN ENTRAR EN NINGUNA CONSOLA

   QUÉ ES. Un protocolo abierto (Microsoft, Yandex, Seznam, Naver)
   para decirle a un buscador "esta dirección ha cambiado, vuelve a
   pasar". Se avisa a uno y ese lo reparte a los demás. Es gratis, no
   hay cuenta que crear y no hay dependencias: una petición HTTP.

   POR QUÉ IMPORTA AQUÍ. Bing permite 100 envíos al día frente a los
   once de Google, y el índice de Bing es el que alimenta a Copilot y
   a ChatGPT. Eso es la mitad del AEO. Google NO usa IndexNow: lo
   probó y no lo adoptó, así que para Google sigue haciendo falta
   Search Console.

   LA CLAVE. Es un número que nos inventamos nosotros y que está
   publicado en la web, en public/<clave>.txt. El buscador lo
   descarga para comprobar que quien avisa manda de verdad en el
   dominio. No es un secreto —cualquiera puede leerlo— pero tampoco
   hay que cambiarlo sin motivo: si el archivo deja de existir, los
   avisos se rechazan.

   CUÁNDO SE EJECUTA. Después de desplegar, no antes: lo que se
   anuncia es lo que ya está publicado. Por eso lee el sitemap del
   sitio en vivo en lugar de los archivos del proyecto.

     npm run indexnow                      → todas las URLs del sitemap
     npm run indexnow -- /servicios /blog  → solo esas

   OJO EN GIT BASH (Windows). Convierte cualquier argumento que
   empiece por "/" en una ruta de disco: "/servicios" le llega al
   script como "C:/Program Files/Git/servicios". Pasó de verdad y se
   anunciaron tres direcciones inventadas. Por eso hay una
   comprobación más abajo que lo corta antes de enviar nada. Para
   evitarlo del todo, en Git Bash se pasan las direcciones enteras:

     npm run indexnow -- https://nexo4pymes.com/servicios

   Avisar de una página que no ha cambiado no rompe nada, pero no
   sirve de nada y gasta la paciencia del buscador. Si el cambio es
   de dos páginas, se nombran las dos.
   ============================================================ */

const CLAVE = "01a4007e62c242d19ec81ad3c1ff3972";
const DOMINIO = "https://nexo4pymes.com";
const PUNTO_DE_ENTRADA = "https://api.indexnow.org/indexnow";

const ubicacionClave = `${DOMINIO}/${CLAVE}.txt`;

function salir(mensaje) {
  console.error(`\n  ${mensaje}\n`);
  process.exit(1);
}

/* ---------- 1. La clave tiene que estar publicada ----------
   Si esto falla no hay nada que hacer después: el buscador descarga
   este archivo antes de aceptar el aviso. Mejor enterarse aquí que
   por un 403 silencioso. */
const respuestaClave = await fetch(ubicacionClave).catch(() => null);
if (!respuestaClave?.ok) {
  salir(`No se puede leer ${ubicacionClave}\n  Sin ese archivo publicado, IndexNow rechaza los avisos.`);
}
const contenidoClave = (await respuestaClave.text()).trim();
if (contenidoClave !== CLAVE) {
  salir(`El archivo de clave dice "${contenidoClave}" y aquí pone "${CLAVE}".\n  Tienen que ser idénticos.`);
}

/* ---------- 2. Qué direcciones se anuncian ---------- */
const pedidas = process.argv.slice(2);
let urls;

if (pedidas.length > 0) {
  urls = pedidas.map((p) => (p.startsWith("http") ? p : `${DOMINIO}${p.startsWith("/") ? p : `/${p}`}`));

  /* Que lo que se va a anunciar sea de verdad una dirección de este
     dominio. Sin esto, la conversión de rutas de Git Bash (ver
     arriba) manda direcciones inventadas y el buscador las acepta
     con un 200 tan tranquilo: él solo mira el dominio. */
  const malas = urls.filter((u) => {
    try {
      const x = new URL(u);
      /* La unidad de disco se busca como "/C:/", con la barra delante.
         Sin esa barra, el "s:/" de "https:/" cuenta como unidad y la
         comprobación tumba también las direcciones buenas. */
      return x.origin !== DOMINIO || /\s|%20|\/[A-Za-z]:\//.test(u);
    } catch {
      return true;
    }
  });
  if (malas.length > 0) {
    salir(
      `Estas direcciones no son de ${DOMINIO} o están mal formadas:\n    ` +
        malas.join("\n    ") +
        `\n\n  Si estás en Git Bash, escribe la dirección entera:\n    npm run indexnow -- ${DOMINIO}/servicios`,
    );
  }
} else {
  /* El sitemap del sitio en vivo, no el del proyecto: así no se
     anuncia una página que todavía no está desplegada. */
  const sitemap = await fetch(`${DOMINIO}/sitemap.xml`).catch(() => null);
  if (!sitemap?.ok) salir(`No se puede leer ${DOMINIO}/sitemap.xml`);
  const xml = await sitemap.text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (urls.length === 0) salir("El sitemap no tiene ninguna <loc>.");
}

/* El protocolo admite 10.000 por envío; aquí sobra de largo, pero
   más vale partirlo que recibir un 413 el día que el sitio crezca. */
const LOTE = 10000;
if (urls.length > LOTE) urls = urls.slice(0, LOTE);

console.log(`\n  Clave verificada en ${ubicacionClave}`);
console.log(`  Avisando de ${urls.length} ${urls.length === 1 ? "dirección" : "direcciones"}:\n`);
for (const u of urls) console.log(`    ${u}`);

/* ---------- 3. El aviso ---------- */
const respuesta = await fetch(PUNTO_DE_ENTRADA, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(DOMINIO).host,
    key: CLAVE,
    keyLocation: ubicacionClave,
    urlList: urls,
  }),
});

/* Lo que significa cada respuesta, para no tener que buscarlo. */
const SIGNIFICADO = {
  200: "aceptado",
  202: "aceptado; la clave se está comprobando todavía",
  400: "la petición está mal formada",
  403: "la clave no vale o no se puede leer en el dominio",
  422: "alguna dirección no pertenece a este dominio",
  429: "demasiados avisos seguidos; hay que esperar",
};

const cuerpo = await respuesta.text().catch(() => "");
const explicacion = SIGNIFICADO[respuesta.status] ?? "respuesta no documentada";

console.log(`\n  ${respuesta.status} — ${explicacion}`);
if (cuerpo.trim()) console.log(`  ${cuerpo.trim()}`);

if (respuesta.status !== 200 && respuesta.status !== 202) {
  salir("El aviso no ha entrado.");
}

console.log("\n  Avisado. Google no usa IndexNow: eso sigue siendo Search Console.\n");
