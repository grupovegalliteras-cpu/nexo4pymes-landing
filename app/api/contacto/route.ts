import { NextResponse } from "next/server";

/* ============================================================
   RECEPCIÓN DEL FORMULARIO DE CONTACTO

   No manda el email por sí misma: valida y reenvía a un webhook
   configurado por variable de entorno.

     WEBHOOK_CONTACTO=https://hook.eu2.make.com/xxxxxxxxxxxx

   Sirve para Make, Zapier, n8n o cualquier cosa que acepte un POST
   con JSON. El escenario que cuelgue de ahí decide qué pasa con el
   mensaje: mandarlo al correo, crear el contacto en el CRM, avisar
   por WhatsApp, o las tres cosas.

   SIN la variable configurada responde 503 y el formulario enseña
   el email directo. Nunca traga un mensaje en silencio: un
   formulario que dice "enviado" y no envía nada es peor que no
   tener formulario.

   ------------------------------------------------------------
   POR QUÉ WEB3FORMS NO PASA POR AQUÍ

   Se intentó. Web3Forms rechaza las peticiones que llegan desde un
   servidor si no tienes plan de pago:

     403 — "This method is not allowed. Use our API in client side
     or contact support with server IP address (Pro plan is
     required)"

   Su plan gratuito espera que el formulario envíe desde el
   navegador. Así que ese camino vive en el componente del
   formulario, no aquí. Ver components/contacto/FormularioContacto.tsx.

   Si algún día se monta Make, esta ruta pasa a ser la que se usa y
   el formulario cambia de camino solo, sin tocar código: basta con
   quitar la clave de Web3Forms y poner WEBHOOK_CONTACTO.
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
    /* Sin destino no hay a dónde mandarlo. Se deja constancia en el
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
    /* Timeout explícito: sin él, un destino caído deja la petición
       colgada hasta que la corta la plataforma y el visitante se
       queda mirando el botón en "Enviando…". */
    const corte = AbortSignal.timeout(10_000);

    const respuesta = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
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
    console.error("[contacto] fallo al entregar el mensaje:", error);
    return NextResponse.json({ ok: false, error: "No se ha podido entregar el mensaje." }, { status: 502 });
  }
}
