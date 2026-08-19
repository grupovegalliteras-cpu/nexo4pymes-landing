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

## Estructura del sitio

Tras el rediseño de posicionamiento, la web ya no se dirige a un solo
sector. La home habla a cualquier pyme y los sectores son la prueba de
que el método se adapta.

| URL | Qué es |
|---|---|
| `/` | Home general. Hero, antes/después, servicios, **selector de sectores**, proceso, compromisos, FAQ |
| `/servicios` | El catálogo largo: qué automatizamos, método de 5 pasos, cómo se empieza (sin precios) |
| `/nosotros` | Quiénes somos, valores, enfoque pyme, datos y RGPD |
| `/contacto` | Formulario, calendario y datos de la empresa |
| `/blog` | Artículos |
| `/legal` | Aviso legal, privacidad y cookies |

## La landing veterinaria se retiró

Ya no está online. `/veterinarias`, `/veterinarias.html` y
`/sectores/veterinarias` **redirigen a la home con un 301**, y esos tres
redirects no se pueden borrar: las dos primeras se repartieron en llamadas
en frío y hay gente con esa dirección apuntada, y la tercera estuvo
indexada en Google.

**El código no se ha borrado, solo está dormido:** `content/vet.ts` y
`components/vet/` siguen en el repo sin que nada los importe (salvo
`Marquesina`, que la usa la home). Para volver a publicarla:

1. Recuperar `app/sectores/veterinarias/page.tsx` del historial de git.
2. Quitar el redirect de `/sectores/veterinarias` en `next.config.mjs` y
   devolver los otros dos a esa URL.
3. Volver a añadirla a `app/sitemap.ts`.
4. Devolver `href` y `enlaceTexto` al sector `veterinarias` de
   `content/inicio.ts`, y volver a pintar el enlace en
   `components/inicio/SelectorSectores.tsx` (hay un comentario donde iba).

El sector veterinario **sigue en el selector de la portada** como los
otros cinco, solo que ya sin página propia detrás.

## Dónde se toca cada cosa

| Quiero cambiar… | Archivo |
|---|---|
| Las plazas, el enlace de Calendly, el email | `content/marca.ts` |
| Las cifras de la oferta (ya no se muestran en ninguna página) | `content/marca.ts` (`oferta`) |
| Textos de la home | `content/inicio.ts` |
| **Los sectores del selector de la home** | `content/inicio.ts` (`sectoresInicio`) |
| Textos de servicios y de «cómo se empieza» | `content/servicios.ts` |
| Textos de quiénes somos y RGPD | `content/nosotros.ts` |
| Textos de contacto y del formulario | `content/contacto.ts` |
| Textos de la landing veterinaria (retirada, dormida) | `content/vet.ts` |
| La conversación de Luna | `content/vet.ts` (`comoVaVet.burbujas`) |
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

`/servicios` **no habla de dinero en ningún sitio**: ni cifras, ni
«gratis», ni «se paga», ni presupuestos. Las tres tarjetas de «Cómo se
empieza» describen qué es cada paso — **15 minutos · Por escrito · Fase a
fase** — y las cifras se dan en la llamada.

Fue una decisión explícita, no un olvido. Si alguien vuelve a meter ahí
importes o la palabra «pago», está deshaciendo algo deliberado. Hay un
comentario largo en `content/servicios.ts` que lo explica.

Se quedan a propósito dos palabras que parecen dinero pero no lo son:
«precios» y «Presupuestos» en la lista de servicios describen lo que la
automatización hace para **el cliente** (responder por los precios de *su*
negocio, seguir *sus* presupuestos).

También se queda «llamada gratis» en los botones: dice que **no** hay que
pagar, y es el CTA de todo el sitio, no solo de esa página.

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
`/veterinarias` a la home con un 301, así que el posicionamiento
acumulado no se pierde.

Los dos archivos `google*.html` de Search Console y la etiqueta de
verificación de Meta viajan dentro (`public/` y `app/layout.tsx`). Si
desaparecen, se pierde la verificación del dominio.

El dominio `nexo4pymes.com` está en Porkbun y ya apunta a Vercel.
