"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Boton } from "@/components/ui/Boton";
import { formulario } from "@/content/contacto";
import { marca } from "@/content/marca";

/* ============================================================
   FORMULARIO DE CONTACTO

   Manda un JSON a /api/contacto, que lo reenvía al webhook de
   Make/Zapier configurado en WEBHOOK_CONTACTO. Ver los comentarios
   de app/api/contacto/route.ts.

   Decisiones que no son evidentes leyendo el JSX:

   · No usa `action` de servidor. El formulario necesita enseñar
     tres estados distintos (enviando, enviado, fallo con email de
     rescate) sin recargar, y con fetch eso son diez líneas.

   · La validación de verdad está en el servidor. Lo de aquí es
     comodidad para quien rellena, no una barrera: se puede saltar
     con la consola abierta y el servidor lo vuelve a comprobar.

   · Si el envío falla, NO se pierde lo escrito. El estado se
     conserva y aparece el email directo, para poder copiar y pegar
     el mensaje. Un formulario que se vacía al fallar hace que la
     gente se vaya.

   · El campo `web` es una trampa para bots: oculto para personas,
     visible para rellenadores automáticos. Si llega con contenido,
     el servidor responde 200 y descarta.
   ============================================================ */

type Estado = "inicial" | "enviando" | "enviado" | "error";

const CAMPO =
  "w-full rounded-tarjeta border border-white/12 bg-white/[.04] px-4 py-3 text-[15px] text-white " +
  "placeholder:text-white/30 transition-colors duration-200 " +
  "focus:border-azul/60 focus:bg-white/[.06] focus:outline-none";

const ETIQUETA = "block text-[14px] font-medium text-white/80";
const AYUDA = "mt-1.5 text-[12.5px] leading-snug text-white/45";

export function FormularioContacto() {
  const [estado, setEstado] = useState<Estado>("inicial");
  const [faltan, setFaltan] = useState<string[]>([]);
  const id = useId();

  async function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (estado === "enviando") return;

    const datos = new FormData(evento.currentTarget);
    const cuerpo = {
      nombre: datos.get("nombre"),
      empresa: datos.get("empresa"),
      email: datos.get("email"),
      telefono: datos.get("telefono"),
      sector: datos.get("sector"),
      mensaje: datos.get("mensaje"),
      consentimiento: datos.get("consentimiento") === "si",
      web: datos.get("web"),
    };

    setEstado("enviando");
    setFaltan([]);

    try {
      const respuesta = await fetch("/api/contacto", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(cuerpo),
      });

      const resultado = await respuesta.json().catch(() => ({ ok: false }));

      if (respuesta.ok && resultado.ok) {
        setEstado("enviado");
        return;
      }

      setFaltan(Array.isArray(resultado.faltan) ? resultado.faltan : []);
      setEstado("error");
    } catch {
      setEstado("error");
    }
  }

  /* ---------- ESTADO: ENVIADO ---------- */
  if (estado === "enviado") {
    return (
      <div className="rounded-panel border border-mint/25 bg-mint/[.07] p-6 text-center sm:p-10">
        <span
          aria-hidden="true"
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-mint/15 text-[26px] text-mint"
        >
          ✓
        </span>
        <h3 className="mt-5 text-[22px] text-white sm:text-[26px]">{formulario.exito.titulo}</h3>
        <p className="mx-auto mt-3 max-w-[46ch] text-[15px] leading-relaxed text-white/65">
          {formulario.exito.texto}
        </p>
        <div className="mt-7 flex justify-center">
          <Boton href={marca.calendly} externo tamano="md" flecha>
            Agendar la llamada
          </Boton>
        </div>
      </div>
    );
  }

  /* ---------- ESTADO: FORMULARIO ---------- */
  const enviando = estado === "enviando";

  return (
    <form
      onSubmit={enviar}
      noValidate
      className="rounded-panel border border-white/10 bg-gradient-to-br from-white/[.055] to-white/[.015] p-5 sm:p-8"
    >
      {estado === "error" && (
        <div
          role="alert"
          className="mb-6 rounded-tarjeta border border-coral/35 bg-coral/10 px-4 py-3.5 text-[14px] leading-relaxed text-white/85"
        >
          <strong className="block font-semibold text-coral">{formulario.error.titulo}</strong>
          {faltan.length > 0 ? (
            <span className="mt-1 block">
              Revisad estos campos: {faltan.join(", ")}.
            </span>
          ) : (
            <span className="mt-1 block">
              {formulario.error.texto}{" "}
              <a href={`mailto:${marca.email}`} className="text-coral underline underline-offset-4">
                {marca.email}
              </a>
              . No hemos borrado lo que habíais escrito.
            </span>
          )}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-nombre`} className={ETIQUETA}>
            {formulario.campos.nombre.etiqueta} <span className="text-coral">*</span>
          </label>
          <input
            id={`${id}-nombre`}
            name="nombre"
            type="text"
            required
            autoComplete="name"
            maxLength={120}
            className={`mt-2 ${CAMPO}`}
            placeholder="Marta García"
          />
        </div>

        <div>
          <label htmlFor={`${id}-empresa`} className={ETIQUETA}>
            {formulario.campos.empresa.etiqueta}
          </label>
          <input
            id={`${id}-empresa`}
            name="empresa"
            type="text"
            autoComplete="organization"
            maxLength={160}
            className={`mt-2 ${CAMPO}`}
            placeholder="Nombre del negocio"
          />
        </div>

        <div>
          <label htmlFor={`${id}-email`} className={ETIQUETA}>
            {formulario.campos.email.etiqueta} <span className="text-coral">*</span>
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={200}
            aria-describedby={`${id}-email-ayuda`}
            className={`mt-2 ${CAMPO}`}
            placeholder="marta@sunegocio.com"
          />
          <p id={`${id}-email-ayuda`} className={AYUDA}>
            {formulario.campos.email.ayuda}
          </p>
        </div>

        <div>
          <label htmlFor={`${id}-telefono`} className={ETIQUETA}>
            {formulario.campos.telefono.etiqueta}
          </label>
          <input
            id={`${id}-telefono`}
            name="telefono"
            type="tel"
            autoComplete="tel"
            maxLength={40}
            aria-describedby={`${id}-telefono-ayuda`}
            className={`mt-2 ${CAMPO}`}
            placeholder="600 000 000"
          />
          <p id={`${id}-telefono-ayuda`} className={AYUDA}>
            {formulario.campos.telefono.ayuda}
          </p>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${id}-sector`} className={ETIQUETA}>
            {formulario.campos.sector.etiqueta}
          </label>
          <select
            id={`${id}-sector`}
            name="sector"
            defaultValue=""
            /* El desplegable nativo pinta su lista con el fondo del
               sistema: sin colorear las <option> a mano, en Windows y
               Android salen en texto blanco sobre blanco. */
            className={`mt-2 ${CAMPO} [&>option]:bg-bottle-800 [&>option]:text-white`}
          >
            <option value="">Elegid uno (opcional)</option>
            {formulario.sectores.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${id}-mensaje`} className={ETIQUETA}>
            {formulario.campos.mensaje.etiqueta} <span className="text-coral">*</span>
          </label>
          <textarea
            id={`${id}-mensaje`}
            name="mensaje"
            required
            rows={5}
            maxLength={4000}
            aria-describedby={`${id}-mensaje-ayuda`}
            className={`mt-2 resize-y ${CAMPO}`}
            placeholder="Se nos van las mañanas contestando los mismos mensajes de siempre…"
          />
          <p id={`${id}-mensaje-ayuda`} className={AYUDA}>
            {formulario.campos.mensaje.ayuda}
          </p>
        </div>
      </div>

      {/* Trampa para bots. aria-hidden + tabIndex -1 para que ni los
          lectores de pantalla ni el teclado lleguen aquí. No se oculta
          con display:none porque algunos rellenadores lo detectan. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${id}-web`}>No rellenar</label>
        <input id={`${id}-web`} name="web" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Consentimiento RGPD. Es lo que da base legal al tratamiento,
          así que va sin marcar por defecto y es obligatorio. */}
      <div className="mt-6 flex items-start gap-3">
        <input
          id={`${id}-consentimiento`}
          name="consentimiento"
          type="checkbox"
          value="si"
          required
          className="mt-1 h-5 w-5 shrink-0 rounded border-white/25 bg-white/10 accent-azul"
        />
        <label htmlFor={`${id}-consentimiento`} className="text-[13.5px] leading-relaxed text-white/60">
          {formulario.consentimiento}{" "}
          <Link href="/legal#privacidad" className="text-azul underline underline-offset-4">
            Ver la política de privacidad
          </Link>
          .
        </label>
      </div>

      <div className="mt-7">
        <Boton type="submit" tamano="lg" flecha={!enviando} disabled={enviando} className="w-full sm:w-auto">
          {enviando ? formulario.enviando : formulario.enviar}
        </Boton>
      </div>

      <p aria-live="polite" className="sr-only">
        {enviando ? "Enviando el mensaje" : ""}
      </p>
    </form>
  );
}
