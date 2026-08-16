import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Reveal } from "@/components/motion/Reveal";
import { TarjetaGlow } from "@/components/ui/TarjetaGlow";
import { preciosServicios } from "@/content/servicios";
import { oferta } from "@/content/marca";

export function PreciosServicios() {
  return (
    <Seccion id="precios" tono="oscuro" ancho="ancho">
      <div className="max-w-[60ch]">
        <Antetitulo tono="oscuro">{preciosServicios.categoria}</Antetitulo>
        <TituloSeccion className="text-[#F4F6FF]">{preciosServicios.titular}</TituloSeccion>
        <Reveal retraso={0.06}>
          <p className="mt-5 text-[17px] leading-relaxed text-white/62">{preciosServicios.intro}</p>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        <Reveal>
          <TarjetaGlow className="h-full">
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/50">
              {preciosServicios.paso1.meta}
            </span>
            <div className="mt-4 text-[38px] font-titular font-bold text-[#F4F6FF]">{preciosServicios.paso1.precio}</div>
            <p className="mt-4 text-[14.5px] leading-relaxed text-white/62">{preciosServicios.paso1.texto}</p>
          </TarjetaGlow>
        </Reveal>

        <Reveal retraso={0.08}>
          <TarjetaGlow
            color="76,125,255"
            className="h-full border-azul/35 bg-gradient-to-br from-azul/[.1] to-violeta/[.05] shadow-[0_30px_80px_-16px_rgba(76,125,255,.35)]"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#9FB6FF]">
              {preciosServicios.paso2.meta}
            </span>
            <div className="mt-4 bg-gradient-to-r from-white via-[#9FB6FF] to-[#D3B0FF] bg-clip-text font-titular text-[42px] font-bold text-transparent">
              {oferta.precio}€
            </div>
            <p className="mt-4 text-[14.5px] leading-relaxed text-white/68">
              Diagnóstico completo, entregado en {oferta.duracion}. Precio normal {oferta.precioAntiguo}; ahora{" "}
              {oferta.precio}€ para las primeras clínicas. Nunca hay una versión gratuita: por eso es un análisis
              real y no una llamada de venta.
            </p>
          </TarjetaGlow>
        </Reveal>

        <Reveal retraso={0.16}>
          <TarjetaGlow className="h-full">
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/50">
              {preciosServicios.paso3.meta}
            </span>
            <div className="mt-4 flex items-end gap-2">
              <span className="text-[32px] font-titular font-bold text-[#F4F6FF]">{preciosServicios.paso3.precio}</span>
              <span className="pb-1 text-[13px] text-white/45">{preciosServicios.paso3.precioNota}</span>
            </div>
            <p className="mt-4 text-[14.5px] leading-relaxed text-white/62">{preciosServicios.paso3.texto}</p>
          </TarjetaGlow>
        </Reveal>
      </div>

      <Reveal retraso={0.2}>
        <div className="mt-6 rounded-2xl border-l-2 border-mint/50 bg-mint/[.05] py-5 pl-6 pr-5">
          <p className="text-[15.5px] leading-relaxed text-white/72">
            <span aria-hidden="true" className="mr-2 text-mint">
              ◆
            </span>
            <strong className="font-semibold text-[#F4F6FF]">{preciosServicios.callout.fuerte}</strong>{" "}
            {preciosServicios.callout.texto}
          </p>
        </div>
      </Reveal>
    </Seccion>
  );
}
