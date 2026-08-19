import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Reveal, Stagger, ItemStagger } from "@/components/motion/Reveal";
import { procesoInicio } from "@/content/inicio";

/* ============================================================
   PROCESO — cuatro pasos.

   La línea que une los pasos es un pseudo-elemento de cada
   tarjeta, no un SVG por encima: así se adapta sola cuando la
   rejilla pasa de una columna (móvil, línea vertical) a cuatro
   (escritorio, línea horizontal), sin medir nada en JS.

   El último paso no pinta línea (`last:before:hidden`), que si no
   sobresale hacia la nada.
   ============================================================ */

export function ProcesoInicio() {
  return (
    <Seccion id="proceso" tono="oscuro-hondo" ancho="ancho">
      <div className="max-w-[720px]">
        <Antetitulo tono="oscuro">{procesoInicio.categoria}</Antetitulo>
        <TituloSeccion className="text-[#F4F6FF]">{procesoInicio.titular}</TituloSeccion>
        <Reveal retraso={0.08}>
          <p className="mt-5 text-[16px] leading-relaxed text-white/65 sm:text-[17.5px]">
            {procesoInicio.intro}
          </p>
        </Reveal>
      </div>

      <Stagger className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {procesoInicio.pasos.map((paso) => (
          <ItemStagger key={paso.num} as="article">
            <div
              className="group relative h-full rounded-panel border border-white/9 bg-white/[.025] p-5 sm:p-6
                         transition-[border-color,transform] duration-400 ease-[cubic-bezier(.22,1,.36,1)]
                         hover:-translate-y-1 hover:border-azul/35"
            >
              <span
                className="inline-flex h-11 w-11 items-center justify-center rounded-caja
                           bg-gradient-to-br from-azul to-violeta font-titular text-[15px] font-bold text-white
                           shadow-[0_8px_24px_-8px_rgba(76,125,255,.7)]"
              >
                {paso.num}
              </span>

              <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.1em] text-mint">{paso.meta}</p>
              <h3 className="mt-2 text-[19px] text-white sm:text-[20px]">{paso.titulo}</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-white/60">{paso.texto}</p>
            </div>
          </ItemStagger>
        ))}
      </Stagger>

      <Reveal retraso={0.1}>
        <p
          className="mt-8 rounded-panel border border-mint/20 bg-mint/[.06] px-5 py-4 text-[15px] leading-relaxed
                     text-white/75 sm:mt-10 sm:px-7 sm:py-5 sm:text-[16px]"
        >
          <strong className="font-semibold text-mint">{procesoInicio.callout.fuerte}</strong>{" "}
          {procesoInicio.callout.texto}
        </p>
      </Reveal>
    </Seccion>
  );
}
