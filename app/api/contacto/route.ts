import { NextResponse } from "next/server";

/* ============================================================
   RECEPCIÓN DEL FORMULARIO DE CONTACTO

   No manda el email por sí misma: reenvía el mensaje a un webhook
   que se configura por variable de entorno. Es la opción que
   encaja con vuestro propio stack — el brief ya menciona Make y
   Zapier — y evita meter un proveedor de email con su SDK, su
   clave y su facturación solo para tres campos de texto.

   CONFIGURACIÓN (una variable, en el panel de Vercel o en
   .env.local para desarrollo):

     WEBHOOK_CONTACTO=https://hook.eu2.make.com/xxxxxxxxxxxx

   En Make/Zapier, el escenario que cuelga de ese webhook decide
   qué pasa con el mensaje: mandarlo al email, crear el contacto en
   el CRM, avisar por WhatsApp, o las tres cosas.

   SIN la variable configurada, la ruta responde 503 y el
   formulario enseña el email directo como alternativa. Nunca
   traga un mensaje en silencio: un formulario que dice "enviado"
   y no envía nada es peor que no tener formulario.
   ============================================================ */

/* Límites de tamaño. No son validación de negocio: son el tope a
   partir del cual alguien está intentando usar el formulario para
   otra cosa. */
const LIMITES = {
  nombre: 120,
  empresa: 160,
  email: 200,
  telefono: 40,
  sector: 120,
  mensaje: 4000,
} as const;

/* Limitación por IP. Un Map en memoria basta para una landing: se
   pierde en cada despliegue y no se comparte entre instancias, pero
   corta el caso real (alguien dándole al botón en bucle) sin montar
   un Redis para un formulario que recibe unos pocos mensajes al día.
   Si algún día el volumen lo justifica, esto se cambia por un
   servicio externo. */
const VENTANA_MS = 10 * 60 * 1000;
const MAX_POR_VENTANA = 5;
const historial = new Map<string, number[]>();

function demasiadasPeticiones(ip: string) {
  const ahora = Date.now();
  const previas = (historial.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);

  if (previas.length >= MAX_POR_VENTANA) {
    historial.set(ip, previas);
    return true;
  }

  previas.push(ahora);
  historial.set(ip, previas);

  /* Purga perezosa: sin esto el Map crece sin techo en un proceso
     de larga vida. */
  if (historial.size > 500) {
    for (const [clave, marcas] of historial) {
      if (marcas.every((t) => ahora - t >= VENTANA_MS)) historial.delete(clave);
    }
  }

  return false;
}

function texto(valor: unknown, maximo: number) {
  return typeof valor === "string" ? valor.trim().slice(0, maximo) : "";
}

/* Suficiente para descartar erratas evidentes. La validación de
   verdad de un email es mandarle un mensaje y ver si llega. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(peticion: Request) {
  const webhook = process.env.WEBHOOK_CONTACTO;

  const ip =
    peticion.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    peticion.headers.get("x-real-ip") ||
    "desconocida";

  if (demasiadasPeticiones(ip)) {
    return NextResponse.json(
      { ok: false, motivo: "limite", error: "Demasiados envíos seguidos. Probad en unos minutos." },
      { status: 429 },
    );
  }

  let cuerpo: Record<string, unknown>;
  try {
    cuerpo = await peticion.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Petición mal formada." }, { status: 400 });
  }

  /* Trampa para bots. El campo va oculto en el formulario y una
     persona no puede rellenarlo; los rellenadores automáticos sí.
     Se responde 200 a propósito: si devolviéramos un error, quien
     lo automatiza sabría que hay que esquivar este campo. */
  if (texto(cuerpo.web, 200)) {
    return NextResponse.json({ ok: true });
  }

  const datos = {
    nombre: texto(cuerpo.nombre, LIMITES.nombre),
    empresa: texto(cuerpo.empresa, LIMITES.empresa),
    email: texto(cuerpo.email, LIMITES.email),
    telefono: texto(cuerpo.telefono, LIMITES.telefono),
    sector: texto(cuerpo.sector, LIMITES.sector),
    mensaje: texto(cuerpo.mensaje, LIMITES.mensaje),
  };

  const faltan: string[] = [];
  if (!datos.nombre) faltan.push("nombre");
  if (!EMAIL.test(datos.email)) faltan.push("email");
  if (!datos.mensaje) faltan.push("mensaje");
  /* El consentimiento se comprueba también aquí, no solo en el
     navegador: es el que da base legal al tratamiento y un `required`
     de HTML se salta con la consola abierta. */
  if (cuerpo.consentimiento !== true) faltan.push("consentimiento");

  if (faltan.length > 0) {
    return NextResponse.json({ ok: false, error: "Faltan campos obligatorios.", faltan }, { status: 422 });
  }

  if (!webhook) {
    /* Sin webhook no hay a dónde mandarlo. Se deja constancia en el
       log del servidor para no perder el mensaje del todo y se avisa
       al navegador, que enseñará el email directo. */
    console.error(
      "[contacto] WEBHOOK_CONTACTO no está configurada: el mensaje NO se ha entregado.",
      JSON.stringify(datos),
    );
    return NextResponse.json(
      { ok: false, motivo: "sin-destino", error: "El formulario no está conectado todavía." },
      { status: 503 },
    );
  }

  try {
    /* Timeout explícito: sin él, un webhook caído deja la petición
       colgada hasta que la corta la plataforma y el visitante se
       queda mirando el botón en "Enviando…". */
    const corte = AbortSignal.timeout(10_000);

    const respuesta = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      signal: corte,
      body: JSON.stringify({
        ...datos,
        origen: "formulario-web",
        recibido: new Date().toISOString(),
      }),
    });

    if (!respuesta.ok) {
      console.error("[contacto] el webhook respondió", respuesta.status);
      return NextResponse.json({ ok: false, error: "No se ha podido entregar el mensaje." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contacto] fallo al llamar al webhook:", error);
    return NextResponse.json({ ok: false, error: "No se ha podido entregar el mensaje." }, { status: 502 });
  }
}
