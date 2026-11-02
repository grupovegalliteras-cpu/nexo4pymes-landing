/* LAS ETIQUETAS QUE LE FALTAN A /concesia.
   ========================================
   La landing de Concesia no es una página de Next: es una web estática
   que se genera en su propio repositorio y se copia entera en
   public/concesia. Por eso no pasa por el `generateMetadata` del resto
   del sitio, y salía con lo mínimo: título, descripción y canónica.

   Lo que le faltaba y pone este script:

   · OPEN GRAPH. Sin og:image, un enlace pegado en WhatsApp sale pelado
     —la dirección y nada más—, y WhatsApp es por donde se reparte esta
     landing. La tarjeta la genera scripts/og-concesia.mjs.
   · ROBOTS. Las mismas directivas que el resto del sitio, para que
     Google pueda usar la imagen grande y el fragmento entero.
   · /concesia/demo FUERA DEL ÍNDICE. Es un formulario, y se enlaza con
     nueve ?origen= distintos: nueve direcciones para la misma página.
     Con noindex, follow, Google no indexa ninguna y sigue los enlaces.

   SE EJECUTA A MANO, DESPUÉS DE CADA COPIA NUEVA DE LA LANDING:

       node scripts/concesia-cabecera.mjs

   Es idempotente: si las etiquetas ya están, no hace nada. Lo correcto
   sería que las pusiera el repositorio de Concesia al generar el HTML;
   mientras no lo haga, este script evita que se pierdan. */
import { readFileSync, writeFileSync } from "node:fs";

const MARCA = "<!-- nexo4pymes:cabecera -->";
const DOMINIO = "https://nexo4pymes.com";
const OG = `${DOMINIO}/concesia/og.jpg`;

const TITULO = "Concesia · Que ningún cliente se te vaya por contestar tarde";
const DESCRIPCION =
  "Concesia responde por WhatsApp en menos de un minuto, de día y de noche, y te llena la agenda de visitas sin contratar a nadie.";

const social = (titulo, descripcion, url) => `${MARCA}
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1"/>
<meta property="og:type" content="website"/>
<meta property="og:site_name" content="Concesia"/>
<meta property="og:locale" content="es_ES"/>
<meta property="og:title" content="${titulo}"/>
<meta property="og:description" content="${descripcion}"/>
<meta property="og:url" content="${url}"/>
<meta property="og:image" content="${OG}"/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>
<meta property="og:image:alt" content="Concesia: que ningún cliente se te vaya por contestar tarde"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="${titulo}"/>
<meta name="twitter:description" content="${descripcion}"/>
<meta name="twitter:image" content="${OG}"/>`;

const paginas = [
  {
    archivo: "public/concesia/index.html",
    cabecera: social(TITULO, DESCRIPCION, `${DOMINIO}/concesia`),
  },
  {
    archivo: "public/concesia/demo.html",
    /* noindex gana a lo que diga la canónica, así que la canónica
       apunta aquí mismo: dos señales que dicen lo mismo en vez de dos
       que se contradicen. */
    cabecera: social("Reserva tu demo · Concesia", DESCRIPCION, `${DOMINIO}/concesia/demo`)
      .replace(
        '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1"/>',
        '<meta name="robots" content="noindex, follow"/>',
      ),
    canonica: `${DOMINIO}/concesia/demo`,
    /* El botón de volver apuntaba a /concesia/ con barra: un salto de
       más, porque Next contesta con un 308 hacia /concesia. */
    reemplazos: [['href="/concesia/"', 'href="/concesia"']],
  },
];

let tocados = 0;
for (const { archivo, cabecera, canonica, reemplazos = [] } of paginas) {
  let html = readFileSync(archivo, "utf8");
  const antes = html;

  if (html.includes(MARCA)) {
    html = html.replace(new RegExp(`${MARCA}[\\s\\S]*?(?=</head>)`), cabecera);
  } else if (html.includes("</head>")) {
    html = html.replace("</head>", `${cabecera}</head>`);
  } else {
    throw new Error(`${archivo}: no encuentro </head>`);
  }

  if (canonica) {
    const nueva = `<link rel="canonical" href="${canonica}"/>`;
    if (!/<link rel="canonical"[^>]*>/.test(html)) throw new Error(`${archivo}: no encuentro la canónica`);
    html = html.replace(/<link rel="canonical"[^>]*>/, nueva);
  }

  for (const [de, a] of reemplazos) html = html.split(de).join(a);

  if (html !== antes) {
    writeFileSync(archivo, html);
    tocados += 1;
    console.log(`${archivo}: etiquetas puestas`);
  } else {
    console.log(`${archivo}: ya estaban`);
  }
}
console.log(tocados ? `${tocados} archivo(s) tocado(s).` : "Nada que hacer.");
