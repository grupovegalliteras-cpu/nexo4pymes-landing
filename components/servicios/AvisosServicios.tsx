import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Reveal } from "@/components/motion/Reveal";
import { Boton } from "@/components/ui/Boton";
import { marca } from "@/content/marca";
import { waLink } from "@/lib/whatsapp";
import { contenido } from "@/content/i18n";
import { idiomaServidor } from "@/lib/idioma-servidor";

/* ============================================================
   CENTRALAVISOS EN /SERVICIOS

   Va justo después del catálogo de piezas a medida y antes del
   método, porque su razón de ser es contrastar con lo anterior:
 "todo esto se construye para vosotros… y además hay una cosa
   que ya está hecha".

   UN SOLO PANEL, no la rejilla de tres tarjetas de la home. Quien
   llega aquí desde la home ya ha visto aquel bloque; repetirlo
   entero haría parecer que la web se copia a sí misma. Aquí solo
   hace falta que exista y que se pueda seguir por WhatsApp.

   Las condiciones se importan de content/inicio.ts a propósito:
   el precio vive en un único sitio. Ver el comentario en
   content/servicios.ts → avisosServicios.
   ============================================================ */

export function AvisosServicios() {
  const lang = idiomaServidor();
  const { avisosServicios } = contenido(lang).servicios;
  const centralAvisos = contenido(lang).centralAvisos;
  return (
    <Seccion id="central-avisos" tono="oscuro" ancho="ancho">
      <Reveal>
        <div
          className="rounded-panel border border-line bg-surface p-6 sm:p-9"
        >
          <div className="max-w-[720px]">
            <Antetitulo tono="oscuro">{avisosServicios.categoria}</Antetitulo>
            <TituloSeccion className="text-fg">{avisosServicios.titular}</TituloSeccion>
            <p className="mt-5 text-[16px] leading-relaxed text-fg-2 sm:text-[17.5px]">
              {avisosServicios.parrafo}
            </p>

            {/* La nota va destacada con el filete a la izquierda: es
                la línea que le dice a quien solo necesita esto que
                puede saltarse el diagnóstico. */}
            <p className="mt-5 border-l-2 border-brand/30 pl-4 text-[15px] leading-relaxed text-brand">
              {avisosServicios.nota}
            </p>
          </div>

          <ul className="mt-7 flex flex-wrap gap-2">
            {centralAvisos.condiciones.map((condicion) => (
              <li
                key={condicion}
                className="rounded-full border border-line bg-surface-2 px-3.5 py-1.5
                           font-mono text-[11.5px] uppercase tracking-[0.1em] text-fg-2"
              >
                {condicion}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Boton
              href={waLink("AVISOS", undefined, lang)}
              externo
              tamano="lg"
              flecha
              magnetico
              className="w-full font-display font-semibold sm:w-auto"
            >
              {avisosServicios.ctaPrincipal}
            </Boton>
            <Boton
              href={marca.centralAvisos}
              externo
              variante="secundario"
              tamano="lg"
              className="w-full sm:w-auto"
            >
              {avisosServicios.ctaSecundario}
            </Boton>
          </div>
        </div>
      </Reveal>
    </Seccion>
  );
}
