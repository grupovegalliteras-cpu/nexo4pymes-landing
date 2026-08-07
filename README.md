# Nexo4Pymes — web

Sitio en Next.js (App Router) + Tailwind 4 + Framer Motion. Sustituye a los
HTML sueltos de la carpeta de arriba (`index.html`, `veterinarias.html`,
`legal.html`, `blog/`), que siguen ahí intactos hasta que decidas cambiar.

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

## Dónde se toca cada cosa

| Quiero cambiar… | Archivo |
|---|---|
| El precio, las plazas, el enlace de Calendly, el email | `content/marca.ts` |
| Textos de la portada | `content/home.ts` |
| Textos de la landing de veterinarias | `content/vet.ts` |
| La conversación de Luna | `content/vet.ts` (`guionLuna`) |
| Aviso legal / privacidad / cookies | `app/legal/page.tsx` |
| Colores y tipografías | `app/globals.css` (bloque `@theme`) |

**Publicar un artículo nuevo:** crea
`app/blog/<slug>/page.mdx` copiando el que ya hay, y añade el slug a
`app/sitemap.ts` y la tarjeta a `content/home.ts` (`blogHome`).

**Cuando se agoten las 3 plazas:** cambia `plazasLibres` en
`content/marca.ts`. Si se acaba la oferta entera, pon `ofertaActiva: false`
y revisa que el hero de `/veterinarias` y el bloque veterinario de la
portada dejen de mencionarla.

## Desplegar

El repositorio que publica en Vercel **no es esta carpeta**, es
`Nexo4Pymes veterinarias/nexo4pymes-landing` (rama `main`). Vercel solo
despliega al hacer push.

1. Copia el contenido de `nexo4pymes-next/` al repo (sin `node_modules/`
   ni `.next/`).
2. En Vercel, el proyecto debe estar como **Framework: Next.js** — no como
   sitio estático, que es como está ahora. Build `npm run build`, sin
   directorio de salida personalizado.
3. Borra del repo `index.html`, `veterinarias.html`, `legal.html`,
   `blog/*.html`, `vercel.json`, `robots.txt` y `sitemap.xml`: los
   sustituyen las rutas de Next. Los `redirects` de `next.config.mjs`
   mandan las URLs `.html` antiguas a las nuevas con un 301, así que el
   posicionamiento no se pierde.
4. Los dos archivos `google*.html` de Search Console y la etiqueta de
   verificación de Meta ya viajan dentro (`public/` y `app/layout.tsx`).

El dominio `nexo4pymes.com` está en Porkbun y ya apunta a Vercel: no hay
que tocar DNS, el despliegue reemplaza el contenido del mismo proyecto.

## Variables de entorno

Ninguna es obligatoria. Solo existe una, opcional:

- `NEXT_PUBLIC_ENDPOINT_FORMULARIO` — si se define, el formulario de
  contacto hace POST ahí. **Antes de definirla**, hay que actualizar el
  punto 2 de la política de privacidad, que hoy dice que el sitio no
  recoge datos por formulario: sin endpoint es cierto (el formulario abre
  el correo del visitante), con endpoint deja de serlo.
