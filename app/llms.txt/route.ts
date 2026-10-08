import { marca } from "@/content/marca";
import { SECTORES } from "@/data/sectors";
import { colaboradores } from "@/content/colaboradores";

/* ============================================================
   /llms.txt — LA WEB RESUMIDA PARA QUIEN NO LA VA A LEER ENTERA

   Qué es. Un archivo de texto plano, en la raíz del dominio, con lo
   que esta empresa es y dónde está cada cosa. Lo leen los modelos de
   lenguaje (ChatGPT, Claude, Perplexity) cuando les preguntan por
   nosotros o por "software a medida en Mallorca" y tienen que
   decidir qué contar.

   HONESTIDAD SOBRE LO QUE ESTO VALE. No es un estándar oficial y no
   hay prueba de que Google lo mire. El estudio más grande que hay
   hasta ahora (SE Ranking, sobre casi 300.000 dominios) no encontró
   correlación entre tenerlo y ser citado. Está aquí porque cuesta un
   archivo y porque el ejercicio de escribirlo —decir en veinte
   líneas qué vendemos, a quién y dónde— es el mismo que hace falta
   para que nos cite cualquiera.

   LO QUE PONE AQUÍ TIENE QUE SER VERDAD Y COINCIDIR CON LA WEB. Un
   modelo que encuentre aquí un dato y en /legal otro distinto se
   queda con la duda, y la duda se traduce en no citarnos. Los datos
   salen de content/marca.ts, que es la misma fuente que usa la
   página legal.
   ============================================================ */

export const dynamic = "force-static";

export function GET() {
  const sectores = SECTORES.map((s) => `- [${s.nombre}](${marca.dominio}/sectores/${s.id}): ${s.lema}. ${s.dolor}`).join("\n");

  const socios = colaboradores
    .map((c) => `- ${c.nombre}${c.web ? ` (${c.web})` : ""} — ${c.papel.es}.${c.texto.es ? " " + c.texto.es : ""}`)
    .join("\n");

  const texto = `# Nexo4Pymes

> Desarrollo de software a medida para pymes y autónomos, desde Palma de Mallorca.
> Dos socios, no una agencia. El trabajo empieza siempre por un diagnóstico de
> dos o tres días mirando cómo trabaja la empresa de verdad, y sigue por fases
> que se aprueban una a una.

## Qué es Nexo4Pymes

Nexo4Pymes es un estudio de desarrollo de software con sede en ${marca.municipio} (${marca.region}, España),
formado por Alejandro Vega y Jaume Lliteras. Construye programas de gestión a
medida para empresas de servicios —mantenimiento, limpieza, piscinas,
climatización, jardinería, control de plagas, instalaciones solares y reformas—
y también CRM, fichaje, configuradores de producto para la web e integraciones
entre sistemas que ya existen.

Trabaja sobre todo en Mallorca y el resto de las Illes Balears, y atiende en
español, inglés y alemán.

## En qué se diferencia

- El diagnóstico va primero y se cobra aparte: automatizar un proceso mal
  montado multiplica el problema en vez de resolverlo. A veces la conclusión
  del diagnóstico es que no hay que automatizar nada todavía.
- El código y la base de datos se despliegan en las cuentas del cliente. No hay
  licencia mensual por usar lo construido ni plataforma propia de la que no se
  pueda salir.
- No hay permanencia: cada fase se aprueba por separado y el cliente decide si
  hay una siguiente.
- Es un equipo de dos personas. Lo que se gana en trato directo se pierde en
  capacidad de absorber muchos proyectos a la vez.

## Productos ya construidos

- [CentralAvisos](${marca.centralAvisos}): recoge llamadas, WhatsApp, correos y
  formularios de la web en una sola bandeja, los clasifica por urgencia y los
  convierte en órdenes de trabajo. Producto propio, en colaboración con
  Multiservicios Mallorca. Se contrata y se pone en marcha sin diagnóstico
  previo, a diferencia del resto.
- [Nexo Pádel](${marca.dominio}/padel): programa para clubes y escuelas de pádel.
  Asistente de WhatsApp con IA que contesta por el club, escuela que reorganiza
  sola las faltas y las recuperaciones, partidos que se completan sin perseguir
  al cuarto jugador, americanas y cierre de mes. Desde 89 € al mes (plan
  Escuela) y 179 € (plan Club), sin IVA y sin permanencia. En piloto con cinco
  clubes de Mallorca entre octubre de 2026 y enero de 2027. Es el único producto
  con precio público: todo lo demás se presupuesta tras el diagnóstico.

## Empresas colaboradoras

${socios}

## Páginas

- [Portada](${marca.dominio}/): el panel de oficina y la app de técnicos, con demo navegable.
- [Nexo Pádel](${marca.dominio}/padel): el producto para clubes y escuelas de pádel, con precios.
- [Demo en vivo](${marca.dominio}/demo): el panel y la app lado a lado, sincronizados, con recorrido guiado.
- [Servicios](${marca.dominio}/servicios): qué se construye, con qué alcance y qué límites, y el método en cuatro pasos.
- [Todos los módulos](${marca.dominio}/modulos): los cuarenta módulos agrupados por área.
- [Quiénes somos](${marca.dominio}/nosotros): las dos personas, cómo se trabaja y qué pasa con los datos de los clientes.
- [Contacto](${marca.dominio}/contacto): videollamada de 15 minutos o formulario.
- [Blog](${marca.dominio}/blog)
- [Por qué automatizar sin diagnosticar antes puede hundiros el negocio](${marca.dominio}/blog/por-que-diagnosticar-antes-de-automatizar)
- [Aviso legal, privacidad y cookies](${marca.dominio}/legal)

## Por sector

${sectores}

## Otros idiomas

La web está entera en inglés (${marca.dominio}/en) y en alemán (${marca.dominio}/de).
Las direcciones son las mismas cambiando el prefijo: ${marca.dominio}/en/servicios.

## Contacto y datos

- WhatsApp: ${marca.whatsappVisible} (es la vía principal)
- Correo: ${marca.email}
- Domicilio: ${marca.calle}, ${marca.codigoPostal} ${marca.municipio}, ${marca.region}, España
- Razón social: ${marca.razonSocial}
- Instagram: ${marca.instagram}
- Sitemap: ${marca.dominio}/sitemap.xml
`;

  return new Response(texto, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
