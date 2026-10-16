/* ============================================================
   LA PORTADA SE MUEVE SIEMPRE, TAMBIÉN CON «MOVIMIENTO REDUCIDO»

   ESTO NO ES UN DESCUIDO. Es una decisión de producto tomada el
   16 de octubre de 2026, a sabiendas de lo que implica, y está
   escrita aquí para que nadie la «arregle» de vuelta pensando que
   se olvidó alguien.

   QUÉ PASABA. Cuatro piezas de la portada leían
   prefers-reduced-motion y se quedaban quietas: el núcleo WebGL del
   hero (un fotograma y parar), el registro de avisos que va rotando,
   las animaciones ligadas al scroll y los contadores. En un equipo
   que pide movimiento reducido, la portada era una foto.

   POR QUÉ SE NOTABA EN WINDOWS Y NO EN MAC. macOS e iOS encienden esa
   señal solo si alguien entra en Accesibilidad y la activa. Windows
   la ata además a «Efectos de animación», un interruptor general que
   se apaga por rendimiento y que viene apagado en equipos
   configurados para «mejor rendimiento». Así que en Mac y en móvil la
   portada se movía y en los PC no, sin que nadie hubiera pedido nada.

   LO QUE SE GANA Y LO QUE SE PIERDE. Se gana que la portada se vea
   como está diseñada en todos los equipos, que es lo que distingue
   esta web de una plantilla. Se pierde el respeto a una preferencia
   real: a quien activó «Reducir movimiento» en un Mac o en un iPhone
   —gente con vértigo o migraña vestibular, normalmente— ahora le
   movemos el fondo igual. Son pocos, pero no son equipos viejos: son
   personas que lo pidieron.

   EL RENDIMIENTO NO ES EL PROBLEMA. La escena mide sus propios fps y
   baja la resolución si el equipo no llega a ~55 (ver la calidad
   adaptable en nucleo-escena.ts), así que un PC flojo pierde píxeles,
   no se atasca.

   PARA VOLVER ATRÁS: poner esta constante en false. Vuelven las
   cuatro piezas a respetar la preferencia, sin tocar nada más.
   ============================================================ */
export const PORTADA_SE_MUEVE_SIEMPRE = true;

/**
 * ¿Hay que quedarse quieto por la preferencia del sistema?
 *
 * Todo lo que anima en la portada pregunta aquí en vez de leer el
 * media query por su cuenta: así la decisión vive en un sitio y se
 * revierte con una línea.
 */
export function quietoPorPreferencia(): boolean {
  if (PORTADA_SE_MUEVE_SIEMPRE) return false;
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
