"use client";

import { useState } from "react";
import { usarMovimientoReducido } from "@/components/motion/usarMovimiento";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Mail } from "lucide-react";
import { Antetitulo, TituloSeccion } from "@/components/ui/Seccion";
import { Reveal } from "@/components/motion/Reveal";
import { contacto } from "@/content/home";
import { marca } from "@/content/marca";

/* ============================================================
   FORMULARIO DE CONTACTO

   !! OJO ANTES DE CONECTAR UN ENDPOINT !!
   Tal como está, el formulario NO envía nada a ningún servidor:
   compone un correo y lo abre en el cliente del visitante. Por eso
   la política de privacidad puede seguir diciendo que este sitio
   "no incorpora formularios propios de recogida de datos".

   Si algún día se define NEXT_PUBLIC_ENDPOINT_FORMULARIO (Formspree,
   Brevo, un backend propio...), esa frase deja de ser cierta y hay
   que actualizar el punto 2 de la política: qué datos se recogen,
   con qué base legal y qué encargado los trata.

   Las tres alternativas de envío existen porque un mailto: a secas
   no hace nada en un ordenador sin programa de correo asociado —el
   caso de casi todo el que lee el correo en el navegador— y el
   visitante se queda creyendo que ha enviado el mensaje.
   ============================================================ */

const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT_FORMULARIO ?? "";

export function Contacto() {
  const [datos, setDatos] = useState({ nombre: "", contacto: "", mensaje: "" });
  const [estado, setEstado] = useState<"inicio" | "enviando" | "alternativas" | "enviado" | "error">(
    "inicio",
  );
  const [aviso, setAviso] = useState("");
  const reducido = usarMovimientoReducido();

  const asunto = `Consulta desde la web — ${datos.nombre || "sin nombre"}`;
  const cuerpo = `Nombre y negocio: ${datos.nombre}\nContacto: ${datos.contacto}\n\nTarea que más tiempo quita:\n${datos.mensaje}`;
  const enlaceGmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    marca.email,
  )}&su=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
  const enlaceMailto = `mailto:${marca.email}?subject=${encodeURIComponent(
    asunto,
  )}&body=${encodeURIComponent(cuerpo)}`;

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!datos.nombre.trim() || !datos.contacto.trim()) {
      setAviso("Necesitamos al menos tu nombre y una forma de contactarte.");
      return;
    }
    setAviso("");

    if (!ENDPOINT) {
      setEstado("alternativas");
      return;
    }

    setEstado("enviando");
    try {
      const respuesta = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(datos),
      });
      setEstado(respuesta.ok ? "enviado" : "error");
    } catch {
      setEstado("error");
    }
  }

  async function copiar() {
    try {
      await navigator.clipboard.writeText(`${asunto}\n\n${cuerpo}`);
      setAviso("Mensaje copiado. Pégalo en un correo a " + marca.email);
    } catch {
      setAviso("No se ha podido copiar. Escríbenos directamente a " + marca.email);
    }
  }

  const campo =
    "w-full rounded-xl border border-white/12 bg-white/[.04] px-4 py-3.5 text-[15px] text-white " +
    "placeholder:text-white/25 transition-colors duration-300 focus:border-mint/50 focus:bg-white/[.07] focus:outline-none";

  return (
    <section
      id="contacto"
      className="oscuro relative overflow-hidden bg-bottle px-5 py-20 text-white sm:px-8 sm:py-28"
    >
      <div className="malla malla-fade absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-[760px]">
        <Antetitulo tono="oscuro">{contacto.categoria}</Antetitulo>
        <TituloSeccion className="text-white">{contacto.titular}</TituloSeccion>
        <Reveal retraso={0.06}>
          <p className="mt-6 max-w-[58ch] text-[16.5px] leading-relaxed text-white/68">
            {contacto.entradilla}
          </p>
        </Reveal>

        <Reveal retraso={0.1}>
          <form onSubmit={enviar} noValidate className="mt-10 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="nombre"
                  className="mb-2 block font-mono text-[10.5px] uppercase tracking-[0.14em] text-mint"
                >
                  {contacto.campos.nombre.etiqueta}
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  autoComplete="name"
                  className={campo}
                  placeholder={contacto.campos.nombre.placeholder}
                  value={datos.nombre}
                  onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
                />
              </div>
              <div>
                <label
                  htmlFor="contacto"
                  className="mb-2 block font-mono text-[10.5px] uppercase tracking-[0.14em] text-mint"
                >
                  {contacto.campos.contacto.etiqueta}
                </label>
                <input
                  id="contacto"
                  name="contacto"
                  autoComplete="email"
                  className={campo}
                  placeholder={contacto.campos.contacto.placeholder}
                  value={datos.contacto}
                  onChange={(e) => setDatos({ ...datos, contacto: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="mensaje"
                className="mb-2 block font-mono text-[10.5px] uppercase tracking-[0.14em] text-mint"
              >
                {contacto.campos.mensaje.etiqueta}
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={4}
                className={`${campo} resize-y`}
                placeholder={contacto.campos.mensaje.placeholder}
                value={datos.mensaje}
                onChange={(e) => setDatos({ ...datos, mensaje: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={estado === "enviando"}
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full
                         bg-coral px-7 py-4 text-[16px] font-medium text-white transition-transform duration-300
                         ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-0.5 disabled:opacity-70 sm:w-auto"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-2 -z-10 rounded-full bg-coral/40 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              {estado === "enviando" ? "Enviando…" : contacto.boton}
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </button>

            <p className="text-[13px] leading-relaxed text-white/45">
              Al enviar aceptas nuestra{" "}
              <Link href="/legal#privacidad" className="text-mint/80 underline underline-offset-4">
                política de privacidad
              </Link>
              . No compartimos tus datos con terceros ni te apuntamos a ninguna lista de correo.
            </p>

            {aviso && (
              <p role="status" aria-live="polite" className="text-[13.5px] text-mint">
                {aviso}
              </p>
            )}

            {/* Alternativas de envío cuando no hay endpoint configurado. */}
            <AnimatePresence>
              {estado === "alternativas" && (
                <motion.div
                  initial={reducido ? { opacity: 0 } : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: reducido ? 0.001 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="rounded-2xl border border-mint/25 bg-mint/6 p-5">
                    <p className="text-[14.5px] font-medium text-white">
                      Tu mensaje está listo. Elige cómo enviarlo:
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2.5">
                      <a
                        href={enlaceGmail}
                        target="_blank"
                        rel="noopener"
                        className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[14px] font-medium text-bottle transition-transform duration-300 hover:-translate-y-0.5"
                      >
                        <Mail size={15} aria-hidden="true" /> Enviar con Gmail
                      </a>
                      <a
                        href={enlaceMailto}
                        className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2.5 text-[14px] text-white transition-colors hover:border-mint/60"
                      >
                        Mi programa de correo
                      </a>
                      <button
                        type="button"
                        onClick={copiar}
                        className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/25 px-4 py-2.5 text-[14px] text-white transition-colors hover:border-mint/60"
                      >
                        <Copy size={15} aria-hidden="true" /> Copiar el mensaje
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {estado === "enviado" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 rounded-2xl border border-exito/40 bg-exito/10 p-4"
                  role="status"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-exito/20 text-mint">
                    <Check size={16} strokeWidth={3} aria-hidden="true" />
                  </span>
                  <p className="text-[14.5px] text-white/80">
                    Mensaje enviado. Te respondemos en cuanto lo veamos.
                  </p>
                </motion.div>
              )}

              {estado === "error" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  role="alert"
                  className="rounded-2xl border border-coral/40 bg-coral/10 p-4 text-[14.5px] text-white/80"
                >
                  No se ha podido enviar. Escríbenos directamente a{" "}
                  <a href={`mailto:${marca.email}`} className="text-coral underline">
                    {marca.email}
                  </a>
                  .
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </Reveal>

        <Reveal retraso={0.14}>
          <p className="mt-8 text-[14.5px] text-white/50">
            También puedes escribirnos directamente a{" "}
            <a
              href={`mailto:${marca.email}`}
              className="text-mint underline decoration-mint/40 underline-offset-4 transition-colors hover:decoration-mint"
            >
              {marca.email}
            </a>
            .
          </p>
        </Reveal>

        {/* ============================================================
            PRUEBA SOCIAL — RELLENAR CUANDO HAYA CLIENTES REALES
            No publicar nada de esto sin permiso por escrito:
            [testimonio pendiente] con nombre, negocio y ciudad
            [FOTO PENDIENTE: logos de clientes]
            [caso pendiente] con cifras medidas antes/después
            Sitio sugerido: justo encima de este bloque de contacto,
            con marcado Schema.org Review en el JSON-LD.
            ============================================================ */}
      </div>
    </section>
  );
}
