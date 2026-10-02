# Nexo4Pymes — web

Sitio en Next.js (App Router) + Tailwind 4 + Framer Motion.

## Levantarlo en local

```bash
npm install
```

```bash
npm run dev
```

Se abre en http://localhost:3000. Para ver la versión real (la que se
despliega, con todo optimizado):

```bash
npm run build && npm start
```

## Qué vendemos ahora (leer antes de tocar el copy)

La web ha dado **dos giros de posicionamiento**, y el segundo es el que
manda hoy:

1. Dejó de ser una landing de un solo sector y pasó a hablar a cualquier pyme.
2. Dejó de vender «automatización de procesos con IA» y pasa a vender
   **soluciones digitales a medida**: CRMs propios, configuradores de
   producto para la web e integraciones. La IA sigue dentro, pero como
   tecnología de apoyo — no como el producto.

**El enemigo del argumento cambió**: ya no es «hacerlo a mano», es *el
software genérico y rígido al que la pyme se tiene que adaptar*.

**Y una promesa antigua dejó de poder usarse.** Antes se decía «no
cambiáis de programa, montamos encima de lo que ya usáis». Eso ahora
sería falso: el programa lo construimos nosotros. Lo que tranquiliza en
su lugar es **la propiedad** — el código y los datos son del cliente, sin
licencia mensual y sin quedar atado a nosotros. Si alguien vuelve a
escribir «montamos encima de lo que ya usáis» como argumento principal,
está reintroduciendo el posicionamiento antiguo sin darse cuenta.

Las tres piezas que se venden, y en las que está estructurado todo el
copy de `/` y `/servicios`:

| Pieza | Qué es |
|---|---|
| CRMs y sistemas de gestión a medida | El programa que lleva el negocio por dentro, hecho a su operativa |
| Configuradores y diseñadores web | El cliente final personaliza, diseña o cotiza en la web del cliente |
| Automatización e integraciones con IA | El pegamento entre las piezas. Aquí vive lo que antes se vendía suelto |

**Voz:** toda la web habla de «vosotros». El hero de la home es la única
excepción — está en «tú» — porque su texto vino dado palabra por palabra.
Es el único bloque que habría que tocar para unificarlo.

## Estructura del sitio

| URL | Qué es |
|---|---|
| `/` | Home general. Hero, antes/después, **las tres piezas**, **selector de sectores**, proceso, compromisos, FAQ |
| `/servicios` | El catálogo largo: las tres piezas con su alcance, método de 5 pasos, cómo se empieza (sin precios) |
| `/nosotros` | Quiénes somos, valores, enfoque pyme, datos y RGPD |
| `/contacto` | Formulario, calendario y datos de la empresa |
| `/blog` | Artículos |
| `/legal` | Aviso legal, privacidad y cookies |
| `/padel` | **Nexo Pádel**, producto para clubes y escuelas de pádel (solo en español, con precios) |

## Nexo Pádel (`/padel`)

Producto propio para clubes y escuelas de pádel de Mallorca (octubre de 2026).
**Es la excepción a dos reglas de esta web**, y a propósito:

- **Tiene precios** (89 € y 179 € al mes): no es un desarrollo a medida sino un
  programa con cuota mensual. La regla de «nada de precios» sigue valiendo para
  la home y `/servicios`.
- **Solo está en español**: en `/en/padel` y `/de/padel` se ve la página en
  español, sin indexar.

| Qué | Dónde |
|---|---|
| Textos de la página (incluidas las fases del piloto y los precios) | `content/padel.ts` |
| La página | `components/site/padel-page.tsx` y `app/(demo)/[lang]/padel/page.tsx` |
| La demo interactiva, en `/padel/demo` | `public/padel/demo.html` (HTML propio; la reescritura está en `next.config.mjs`, `beforeFiles`) |
| El aviso de la home | `AvisoPadel` en `components/site/landing.tsx` |
| El enlace del pie | columna «Sectores» en `components/site/chrome.tsx` |

El producto se construye por fases con 5 clubes piloto. La sección de fases de
`content/padel.ts` dice qué funciona y cuándo: si una fase se retrasa, se
cambia ahí. El proyecto del producto (documentos, emails, código) está en la
carpeta `nexo4padel`.

## El sector veterinario se abandonó

No es solo que la landing se retirase: **ya no trabajamos con clínicas
veterinarias**. El sector tiene mucho software hecho y bueno, y competir
ahí no tiene sentido para un equipo pequeño.

Por eso, en septiembre de 2026, se borraron `content/vet.ts` y toda la
carpeta `components/vet/` (`Marquesina`, que sí usa la home, se movió a
`components/ui/`), y el sector salió del selector de la portada y del
formulario de contacto. Su hueco en el selector lo ocupa
**Administradores de fincas**. Si alguna vez hiciera falta recuperar
algo, está en el historial de git hasta el commit anterior a ese.

**Lo único que se queda son los tres redirects** de `/veterinarias`,
`/veterinarias.html` y `/sectores/veterinarias` a la home, en
`next.config.mjs`. No se pueden borrar: las dos primeras se repartieron
en llamadas en frío y hay gente con esa dirección apuntada en papel, y la
tercera estuvo indexada en Google. El 301 traslada a la home lo que esas
URLs tuvieran ganado en buscadores en vez de tirarlo.

## Dónde se toca cada cosa

| Quiero cambiar… | Archivo |
|---|---|
| **El número de WhatsApp**, las plazas, el Calendly, el email | `content/marca.ts` |
| **Los mensajes que se precargan en WhatsApp** | `lib/whatsapp.ts` (`MENSAJES`) |
| Las cifras de la oferta (ya no se muestran en ninguna página) | `content/marca.ts` (`oferta`) |
| Textos de la home | `content/inicio.ts` |
| **Los sectores del selector de la home** | `content/inicio.ts` (`sectoresInicio`) |
| Textos de servicios y de «cómo se empieza» | `content/servicios.ts` |
| **Las tres piezas** (home y /servicios) | `content/inicio.ts` (`serviciosInicio`) y `content/servicios.ts` (`servicios`) |
| Los ejemplos animados del hero | `components/inicio/PanelFlujo.tsx` (`ESCENARIOS`) |
| Textos de quiénes somos y RGPD | `content/nosotros.ts` |
| Textos de contacto y del formulario | `content/contacto.ts` |
| Aviso legal / privacidad / cookies | `app/legal/page.tsx` |
| Colores, tipografías y radios | `app/globals.css` (bloque `@theme`) |

**Añadir un sector nuevo:** un objeto más en `sectoresInicio.sectores`
(`content/inicio.ts`). Nada más — el selector, el panel y la navegación
por teclado se adaptan solos. Ningún sector tiene ya página propia; si
alguno vuelve a tenerla, hay un comentario en `SelectorSectores.tsx` con
lo que hay que reponer.

**Publicar un artículo nuevo:** crea `app/blog/<slug>/page.mdx` copiando
el que ya hay, y añade el slug a `app/sitemap.ts` y la tarjeta a
`content/blog.ts` (`blogHome`).

## Nada de precios ni de pagos

**Ni `/servicios` ni la home hablan de dinero**: ni cifras, ni «se paga»,
ni presupuestos. Las tres tarjetas de «Cómo se empieza» describen qué es
cada paso — **15 minutos · Por escrito · Fase a fase** — y las cifras se
dan en la llamada.

La regla empezó solo en `/servicios`; con el giro de posicionamiento se
aplicó también a la home, que todavía decía «de pago» en el paso del
diagnóstico y tenía una pregunta entera sobre por qué se cobra.

Fue una decisión explícita, no un olvido. Si alguien vuelve a meter ahí
importes o la palabra «pago», está deshaciendo algo deliberado. Hay un
comentario largo en `content/servicios.ts` que lo explica.

Se quedan a propósito las palabras que parecen dinero pero no lo son:
«precio», «presupuesto» y «márgenes» describen lo que el software hace
para **el cliente** (el configurador calcula *sus* precios con *sus*
márgenes, el sistema sigue *sus* presupuestos). Eso es producto, no
tarifa.

También se queda «llamada gratis» donde aparece: dice que **no** hay que
pagar. El CTA principal de todo el sitio es ahora WhatsApp; la llamada
quedó como segunda opción.

Las cifras siguen en `content/marca.ts` (`oferta`) pero ya no las muestra
ninguna página. El historial de git tiene la versión con precios.

**Cuando se agoten las 3 plazas:** cambia `plazasLibres` en
`content/marca.ts`. Si se acaba la oferta entera, pon `ofertaActiva: false`
y revisa la barra flotante de `/servicios`, que es el único sitio que
sigue mencionando las plazas.

## Testimonios

`content/inicio.ts` tiene un array `pruebaInicio.testimonios` **vacío a
propósito**. Mientras esté vacío, la home muestra los compromisos de la
empresa en su lugar.

Cuando haya opiniones reales de clientes, con su permiso, se rellenan con
`{ cita, nombre, cargo, empresa }` y la sección cambia sola de formato. No
hay que tocar ningún componente.

No se ponen testimonios inventados: además de ser publicidad engañosa,
contradice el argumento de venta de la propia empresa.

## El formulario de contacto

El formulario de `/contacto` tiene **dos caminos de envío** y elige solo
según qué variable de entorno esté puesta. **Sin ninguna de las dos no
funciona**: muestra un error con el email directo. Nunca acepta un mensaje
en silencio, porque un formulario que dice «enviado» sin enviar nada es
peor que no tener formulario.

### Camino 1 — Web3Forms (el que está en uso)

El mensaje llega al correo. Es el más rápido de montar:

1. Entrad en [web3forms.com](https://web3forms.com), escribid el email
   donde queréis recibir los mensajes y confirmad el correo que os llega.
2. En Vercel: *Settings → Environment Variables* → añadid
   `NEXT_PUBLIC_WEB3FORMS_KEY` con la Access Key.
3. Volved a desplegar.

**Por qué el envío sale del navegador y no del servidor**: no es una
preferencia, lo exige Web3Forms. En su plan gratuito rechaza con un 403
todo lo que venga de una IP de servidor (*"Use our API in client side…
Pro plan is required"*). Se intentó por servidor primero y no pasa.

Que la clave sea pública no es un descuido: Web3Forms las diseña así y van
en el HTML de miles de webs. Quien la tenga solo puede mandar mensajes al
correo del dueño, no leer los ajenos.

### Camino 2 — webhook propio (Make, Zapier, n8n)

Para cuando el mensaje tenga que hacer más cosas además de llegar al
correo: crear el contacto en el CRM, avisar por WhatsApp, etiquetar por
sector.

1. En Make: escenario nuevo → módulo **Webhooks** → *Custom webhook* →
   *Add* → copiar la URL.
2. En Vercel: añadid `WEBHOOK_CONTACTO` con esa URL.

En cuanto exista esa variable, el formulario deja de usar Web3Forms y pasa
por `/api/contacto`, que además valida en servidor y limita a 5 envíos por
IP cada 10 minutos. **No hay que tocar código para cambiar de camino.**

Al webhook le llegan estos campos: `nombre`, `empresa`, `email`,
`telefono`, `sector`, `mensaje`, `origen`, `recibido`.

### Lo que trae de serie en los dos caminos

Consentimiento RGPD obligatorio comprobado en el código (no solo con el
`required` del HTML), trampa anti-bots, y el texto escrito no se pierde si
el envío falla.

En local, las variables van en un archivo `.env.local` (ver
`.env.example`).

## Cookies, analítica y píxeles

El sitio lleva Google Analytics 4 y Meta Pixel **detrás de un banner de
consentimiento** hecho a medida, conforme a la Guía sobre el uso de
cookies de la AEPD.

Cómo funciona:

- Hasta que el visitante decide, **no se carga nada**: ni un script, ni
  una cookie, ni una petición a Google o a Meta.
- «Rechazar todas» y «Aceptar todas» están en la misma fila, con el mismo
  tamaño y a un solo clic. Esto no es estética: esconder el rechazo es la
  infracción que más se sanciona.
- El panel de configuración permite aceptar solo analítica, o solo
  marketing. Ninguna casilla viene marcada.
- Al retirar una categoría, **sus cookies se borran** en el acto.
- El enlace «Preferencias de cookies» está en el pie de todas las páginas
  y en la política de cookies, porque retirar el consentimiento tiene que
  ser tan fácil como darlo.
- El consentimiento caduca a los 24 meses y se vuelve a preguntar.

**Sin las variables de entorno configuradas no se carga nada aunque el
visitante acepte todo.** Eso permite tener el banner en producción antes
de crear las cuentas de GA y Meta.

Si se añade una herramienta nueva (Google Ads, Hotjar, LinkedIn Insight…),
hay que hacer tres cosas: añadir su categoría o su carga en
`components/legal/Analitica.tsx`, describirla en la política de cookies de
`app/legal/page.tsx`, y **subir `VERSION_CONSENTIMIENTO`** en
`lib/consentimiento.ts` — el consentimiento anterior no cubre algo que el
visitante no pudo ver cuando decidió.

### El calendario de Calendly va aparte

El calendario de `/contacto` **no se carga solo**, ni siquiera con todas
las cookies aceptadas: hay un botón que lo activa después de explicar qué
datos recibe Calendly. Es un consentimiento contextual y específico —
quien entra a leer los datos de la empresa no ha pedido abrir una conexión
con un servidor estadounidense.

## Variables de entorno

| Variable | Obligatoria | Para qué |
|---|---|---|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Una de las dos, para que funcione el formulario | Access Key de Web3Forms. Los mensajes llegan al correo |
| `WEBHOOK_CONTACTO` | Una de las dos | URL de webhook (Make/Zapier). Tiene prioridad sobre la anterior |
| `NEXT_PUBLIC_GA_ID` | No | Identificador de medición de Google Analytics 4 (`G-XXXXXXXXXX`) |
| `NEXT_PUBLIC_META_PIXEL_ID` | No | ID del píxel de Meta |

Ver `.env.example`.

## Desplegar

Vercel despliega al hacer push a `main`. El proyecto debe estar como
**Framework: Next.js**, con build `npm run build` y sin directorio de
salida personalizado.

Los `redirects` de `next.config.mjs` mandan las URLs `.html` antiguas y
las URLs antiguas a la home con un 301, así que el posicionamiento
acumulado no se pierde.

Los dos archivos `google*.html` de Search Console y la etiqueta de
verificación de Meta viajan dentro (`public/` y `app/layout.tsx`). Si
desaparecen, se pierde la verificación del dominio.

El dominio `nexo4pymes.com` está en Porkbun y ya apunta a Vercel.
