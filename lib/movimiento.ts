/* ============================================================
   LA WEB SE MUEVE SIEMPRE, TAMBIÉN CON «MOVIMIENTO REDUCIDO»

   ESTO NO ES UN DESCUIDO, y no es nuevo: la misma decisión se tomó
   el 16/10/2026 para la portada de /deeptech y está escrita en
   components/deeptech/decision-movimiento.ts, que ahora reexporta de
   aquí. El 10/11/2026 se extiende al resto de la web, por el mismo
   motivo y con la misma letra pequeña.

   QUÉ PASABA. En un PC con Windows la web era una foto: la
   conversación del hero no se escribía (chat-demo se rendía nada más
   leer la preferencia), la cinta de sectores estaba parada, el
   temblor del botón no ocurría y cualquier transición duraba 0,001 ms
   por el interruptor general de globals.css. En un Mac y en un móvil,
   la misma web se movía.

   POR QUÉ LA DIFERENCIA. macOS e iOS encienden prefers-reduced-motion
   solo si alguien entra en Accesibilidad y activa «Reducir
   movimiento». Windows la ata además a «Efectos de animación», un
   interruptor de la pestaña de efectos visuales que se apaga por
   rendimiento o batería y que viene apagado en equipos configurados
   para «mejor rendimiento». Así que la señal llegaba de dos sitios
   distintos: en Mac la pedía una persona, en Windows la mayoría de
   las veces no la ha pedido nadie.

   LO QUE SE GANA Y LO QUE SE PIERDE. Se gana que la web se vea como
   está diseñada en todos los equipos. Se pierde el respeto a una
   preferencia real: a quien activó «Reducir movimiento» a propósito
   —gente con vértigo o migraña vestibular— le movemos las cosas
   igual. Son pocos, pero lo pidieron.

   LO QUE NO SE TOCA, PRECISAMENTE POR ESO:
   · «Reducir transparencia» y «más contraste» se siguen respetando
     enteros: van de leer, no de adorno. Ver app/(demo)/portada.css.
   · El movimiento que queda es corto y de poco recorrido (entradas de
     18 px, burbujas de chat, la cinta de sectores a 42 s la vuelta).
     No hay parallax, ni zooms, ni nada que se mueva con la rueda.
   · scroll-behavior se deja en auto cuando se pide movimiento
     reducido: el salto largo de un scroll suave es de lo que peor
     sienta y no aporta nada.

   PARA VOLVER ATRÁS: poner esta constante en false. Todo vuelve a
   respetar la preferencia, y en CSS hay que quitar además la
   excepción de .mueve-siempre del bloque prefers-reduced-motion de
   app/(demo)/globals.css.
   ============================================================ */
export const LA_WEB_SE_MUEVE_SIEMPRE = true;

/**
 * ¿Hay que quedarse quieto por la preferencia del sistema?
 *
 * Todo lo que anima pregunta aquí en vez de leer el media query por
 * su cuenta: así la decisión vive en un sitio y se revierte con una
 * línea.
 */
export function quietoPorPreferencia(): boolean {
  if (LA_WEB_SE_MUEVE_SIEMPRE) return false;
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
