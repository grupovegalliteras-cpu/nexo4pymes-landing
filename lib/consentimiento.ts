"use client";

import { useCallback, useEffect, useState } from "react";

/* ============================================================
   CONSENTIMIENTO DE COOKIES

   Fuente única de verdad de qué ha autorizado el visitante. La leen
   el banner, los cargadores de analítica y la barra flotante de
   móvil.

   REGLAS QUE VIENEN DE LA GUÍA DE COOKIES DE LA AEPD Y DE LA
   LSSICE. No son estilo, son requisitos; si se tocan, se toca el
   cumplimiento:

   · Nada no esencial se carga ANTES del consentimiento. Por eso el
     estado inicial es "sin decidir" y no "todo aceptado".
   · Rechazar tiene que ser tan fácil como aceptar: un solo clic,
     desde la misma pantalla y con el mismo peso visual. Nada de
     esconder el rechazo dentro de "configurar".
   · Ninguna casilla viene marcada de serie.
   · Retirar el consentimiento debe ser tan fácil como darlo — de
     ahí el enlace permanente del pie y el borrado de cookies al
     revocar.
   · El consentimiento caduca: se vuelve a preguntar a los 24 meses.

   POR QUÉ localStorage Y NO UNA COOKIE:
   guardar la decisión es un fin estrictamente necesario (sin ella
   habría que preguntar en cada página), así que no requiere
   consentimiento por sí mismo. Se usa localStorage porque no viaja
   en cada petición HTTP y así el sitio sigue sin instalar ninguna
   cookie hasta que alguien acepta de verdad.
   ============================================================ */

export type Categorias = {
  /* Siempre true. Existe para que la interfaz pueda enseñarla
     bloqueada y explicar qué es, que es lo que pide la guía. */
  necesarias: true;
  analitica: boolean;
  marketing: boolean;
};

export type Consentimiento = Categorias & {
  version: number;
  fecha: string;
};

export const CLAVE_ALMACEN = "n4p-consentimiento";

/* Subir esta versión invalida las decisiones guardadas y vuelve a
   preguntar. Hay que subirla SIEMPRE que se añada una categoría o
   una herramienta nueva: el consentimiento anterior no cubre algo
   que el visitante no pudo ver cuando decidió. */
export const VERSION_CONSENTIMIENTO = 1;

/* 24 meses, el máximo que admite la AEPD antes de volver a pedirlo. */
const CADUCIDAD_MS = 24 * 30 * 24 * 60 * 60 * 1000;

/* Eventos internos: permiten que banner, analítica y barra móvil
   reaccionen a la vez sin montar un contexto de React para tres
   componentes que ni siquiera comparten árbol. */
export const EVENTO_CAMBIO = "n4p:consentimiento-cambiado";
export const EVENTO_ABRIR = "n4p:abrir-preferencias";

export const TODO_ACEPTADO: Categorias = { necesarias: true, analitica: true, marketing: true };
export const TODO_RECHAZADO: Categorias = { necesarias: true, analitica: false, marketing: false };

/* ------------------------------------------------------------
   LECTURA Y ESCRITURA
   ------------------------------------------------------------ */

export function leerConsentimiento(): Consentimiento | null {
  if (typeof window === "undefined") return null;

  try {
    const crudo = window.localStorage.getItem(CLAVE_ALMACEN);
    if (!crudo) return null;

    const guardado = JSON.parse(crudo) as Consentimiento;

    /* Una decisión tomada sobre una versión anterior del banner no
       vale para las herramientas que se hayan añadido después. */
    if (guardado.version !== VERSION_CONSENTIMIENTO) return null;

    if (Date.now() - new Date(guardado.fecha).getTime() > CADUCIDAD_MS) return null;

    return {
      necesarias: true,
      analitica: guardado.analitica === true,
      marketing: guardado.marketing === true,
      version: guardado.version,
      fecha: guardado.fecha,
    };
  } catch {
    /* localStorage puede fallar en navegación privada o con el
       almacenamiento bloqueado. Si falla, se trata como "sin
       decidir": se pregunta y no se carga nada. Es el lado seguro. */
    return null;
  }
}

export function guardarConsentimiento(categorias: Categorias) {
  const registro: Consentimiento = {
    ...categorias,
    necesarias: true,
    version: VERSION_CONSENTIMIENTO,
    fecha: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(CLAVE_ALMACEN, JSON.stringify(registro));
  } catch {
    /* Sin poder guardar, la decisión vale para esta sesión y se
       volverá a preguntar en la siguiente. Preferible a romper. */
  }

  /* Al retirar una categoría hay que borrar lo que dejó puesto: si
     no, el consentimiento revocado sigue teniendo efecto y la
     retirada no sería real. */
  if (!categorias.analitica) borrarCookies(["_ga", "_gid", "_gat"]);
  if (!categorias.marketing) borrarCookies(["_fbp", "_fbc"]);

  window.dispatchEvent(new CustomEvent(EVENTO_CAMBIO, { detail: registro }));
}

/* Borra por prefijo: Google crea `_ga_XXXXXXXX` además de `_ga`, y
   el nombre concreto depende del identificador de medición. */
function borrarCookies(prefijos: string[]) {
  if (typeof document === "undefined") return;

  const dominio = window.location.hostname;
  /* El punto delante cubre las que se pusieron a nivel de dominio
     padre (.nexo4pymes.com), que es como las escribe Google. */
  const ambitos = [dominio, `.${dominio}`, ""];

  for (const trozo of document.cookie.split(";")) {
    const nombre = trozo.split("=")[0]?.trim();
    if (!nombre || !prefijos.some((p) => nombre.startsWith(p))) continue;

    for (const ambito of ambitos) {
      document.cookie =
        `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/` +
        (ambito ? `; domain=${ambito}` : "");
    }
  }
}

/* ------------------------------------------------------------
   HOOK
   ------------------------------------------------------------ */

export function usarConsentimiento() {
  /* Arranca en null en TODOS los renders, también en el servidor: si
     leyéramos localStorage durante el primer render, el HTML del
     servidor y el del cliente no coincidirían e hidratar fallaría. */
  const [consentimiento, setConsentimiento] = useState<Consentimiento | null>(null);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    setConsentimiento(leerConsentimiento());
    setCargado(true);

    const alCambiar = (e: Event) => {
      setConsentimiento((e as CustomEvent<Consentimiento>).detail ?? leerConsentimiento());
    };

    /* `storage` cubre el caso de dos pestañas abiertas: si se decide
       en una, la otra deja de cargar (o empieza a cargar) sin
       recargar la página. */
    const alCambiarAlmacen = (e: StorageEvent) => {
      if (e.key === CLAVE_ALMACEN) setConsentimiento(leerConsentimiento());
    };

    window.addEventListener(EVENTO_CAMBIO, alCambiar);
    window.addEventListener("storage", alCambiarAlmacen);
    return () => {
      window.removeEventListener(EVENTO_CAMBIO, alCambiar);
      window.removeEventListener("storage", alCambiarAlmacen);
    };
  }, []);

  const guardar = useCallback((categorias: Categorias) => {
    guardarConsentimiento(categorias);
  }, []);

  return {
    consentimiento,
    /* `cargado` distingue "todavía no lo he leído" de "no ha
       decidido". Sin esta bandera el banner parpadearía en cada
       carga para quien ya decidió hace meses. */
    cargado,
    decidido: cargado && consentimiento !== null,
    guardar,
  };
}

/* Lo llaman el pie de página y la política de cookies para reabrir
   el panel de preferencias. */
export function abrirPreferencias() {
  window.dispatchEvent(new Event(EVENTO_ABRIR));
}
