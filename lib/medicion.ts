/* ============================================================
   MEDICIÓN DE CAMPAÑA

   Sin esto, los anuncios de Meta son dinero a ciegas: llegan
   mensajes de WhatsApp y no hay forma de saber qué anuncio los
   trajo, así que no se puede apagar lo que no funciona ni subir
   presupuesto a lo que sí.

   DOS PIEZAS, y son independientes:

   1. ATRIBUCIÓN. Guardar de dónde vino la visita (utm_* y fbclid)
      para poder mandarlo con el formulario. Vive en sessionStorage
      porque la respuesta que interesa es "de dónde vino ESTA
      visita": si se guardara para siempre, una visita directa de
      dentro de un mes seguiría atribuyéndose al anuncio de hoy.

   2. EVENTOS. Avisar a GA4 y al píxel de Meta de las acciones que
      valen dinero. El evento `Lead` del píxel es lo que hace que
      Meta aprenda a quién enseñar el anuncio; sin él la campaña
      optimiza a ciegas.

   CONSENTIMIENTO: aquí no se comprueba, y es a propósito. `gtag` y
   `fbq` solo existen en la página si el visitante los aceptó (ver
   components/legal/Analitica.tsx). Si no aceptó, estas funciones no
   encuentran nada a lo que llamar y no hacen nada. Una sola puerta,
   y está en Analitica: si se comprobara también aquí, cualquiera
   podría cambiar una de las dos creyendo que la otra la cubre.

   La atribución sí se guarda siempre, con o sin consentimiento: son
   datos de la propia navegación, guardados en el navegador del
   visitante, que no salen de ahí salvo que él mismo envíe el
   formulario. No hay seguimiento de terceros ni perfilado.
   ============================================================ */

const CLAVE = "n4p-atribucion";

const PARAMETROS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "gclid",
] as const;

export type Atribucion = Partial<Record<(typeof PARAMETROS)[number], string>> & {
  aterrizaje?: string;
  referente?: string;
};

/**
 * Guarda de dónde viene la visita. Se llama una vez, al cargar.
 *
 * LA PRIMERA GANA: si ya hay algo guardado en esta sesión no se
 * sobreescribe. Alguien que llega por un anuncio, navega a Google a
 * mirar quiénes somos y vuelve, sigue siendo del anuncio — que es
 * quien pagó por traerlo.
 */
export function guardarAtribucion(): void {
  if (typeof window === "undefined") return;

  try {
    if (window.sessionStorage.getItem(CLAVE)) return;

    const params = new URLSearchParams(window.location.search);
    const datos: Atribucion = {};

    for (const nombre of PARAMETROS) {
      const valor = params.get(nombre);
      /* Un tope de longitud por si alguien enreda con la URL: esto
         acaba viajando en el correo del formulario. */
      if (valor) datos[nombre] = valor.slice(0, 200);
    }

    /* Sin ningún parámetro de campaña no se guarda nada: así una
       visita directa no ocupa sitio ni ensucia el formulario. La
       excepción es que venga de fuera, que ya dice algo. */
    const deFuera =
      document.referrer && !document.referrer.includes(window.location.host)
        ? document.referrer.slice(0, 200)
        : "";

    if (Object.keys(datos).length === 0 && !deFuera) return;

    if (deFuera) datos.referente = deFuera;
    datos.aterrizaje = window.location.pathname;

    window.sessionStorage.setItem(CLAVE, JSON.stringify(datos));
  } catch {
    /* Navegación privada, almacenamiento bloqueado o cuota llena.
       Perder la atribución no puede romper la página. */
  }
}

/** Lo guardado al llegar. Objeto vacío si no hay nada o no se puede leer. */
export function leerAtribucion(): Atribucion {
  if (typeof window === "undefined") return {};
  try {
    const crudo = window.sessionStorage.getItem(CLAVE);
    return crudo ? (JSON.parse(crudo) as Atribucion) : {};
  } catch {
    return {};
  }
}

type Gtag = (...args: unknown[]) => void;
type Fbq = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    fbq?: Fbq;
  }
}

/**
 * Manda un evento a GA4 y, si procede, a Meta.
 *
 * @param nombre  Nombre del evento en GA4 (whatsapp_click, form_submit...).
 * @param datos   Parámetros sueltos: de qué página salió, qué palabra clave.
 * @param lead    true cuando la acción es un contacto real. Dispara `Lead`
 *                en el píxel, que es la señal con la que Meta aprende.
 */
export function evento(
  nombre: string,
  datos: Record<string, string | number | undefined> = {},
  lead = false,
): void {
  if (typeof window === "undefined") return;

  const limpios = Object.fromEntries(
    Object.entries(datos).filter(([, v]) => v !== undefined && v !== ""),
  );

  try {
    window.gtag?.("event", nombre, limpios);
  } catch {
    /* Que falle la medición nunca puede impedir la acción del visitante. */
  }

  try {
    if (lead) {
      window.fbq?.("track", "Lead", limpios);
    } else {
      /* trackCustom y no track: los eventos con nombre propio hay que
         mandarlos así o Meta los descarta por no ser estándar. */
      window.fbq?.("trackCustom", nombre, limpios);
    }
  } catch {
    /* Igual que arriba. */
  }
}
