import Link from "next/link";
import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Reveal, Stagger, ItemStagger } from "@/components/motion/Reveal";
import { TarjetaGlow } from "@/components/ui/TarjetaGlow";
import { CajaIcono } from "@/components/ui/Icono";
import { serviciosInicio } from "@/content/inicio";

/* ============================================================
   SERVICIOS DESTACADOS (home)

   Seis módulos, uno por área. El detalle largo de cada uno vive
   en /servicios: aquí solo hay lo justo para que alguien
   reconozca su problema y siga bajando.

   El tinte del resplandor de cada tarjeta se toma del `tono` del
   contenido, para que las columnas no queden todas del mismo
   color.
   ============================================================ */

const TINTES = {
  azul: "76,125,255",
  violeta: "176,107,245",
  mint: "76,224,179",
} as const;

export function ServiciosInicio() {
  return (
    <Seccion id="servicios" tono="oscuro-hondo" ancho="ancho">
      <div className="max-w-[720px]">
        <Antetitulo tono="oscuro">{serviciosInicio.categoria}</Antetitulo>
        <TituloSeccion className="text-[#F4F6FF]">{serviciosInicio.titular}</TituloSeccion>
        <Reveal retraso={0.08}>
          <p className="mt-5 text-[16px] leading-relaxed text-white/65 sm:text-[17.5px]">
            {serviciosInicio.intro}
          </p>
        </Reveal>
      </div>

      <Stagger className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {serviciosInicio.tarjetas.map((tarjeta) => (
          <ItemStagger key={tarjeta.titulo} as="article">
            <TarjetaGlow className="h-full" color={TINTES[tarjeta.tono]}>
              <CajaIcono nombre={tarjeta.icono} tono={tarjeta.tono} />

              <h3 className="mt-4 text-[19px] text-white sm:text-[20px]">{tarjeta.titulo}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-white/60">{tarjeta.texto}</p>

              {/* La línea de beneficio va separada por un filete: es la
                  parte que se lee cuando alguien escanea la rejilla sin
                  detenerse en los párrafos. */}
              <p className="mt-4 flex items-start gap-2 border-t border-white/8 pt-3.5 text-[13px] leading-snug text-mint">
                <span aria-hidden="true" className="mt-px">
                  →
                </span>
                {tarjeta.metrica}
              </p>
            </TarjetaGlow>
          </ItemStagger>
        ))}
      </Stagger>

      <Reveal retraso={0.1}>
        <div
          className="mt-8 flex flex-col items-start gap-3 rounded-panel border border-white/10 bg-white/[.03]
                     px-5 py-4 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-5"
        >
          <p className="text-[15px] text-white/70">{serviciosInicio.pie.texto}</p>
          <Link
            href={serviciosInicio.pie.enlace.href}
            className="group flex min-h-[44px] items-center gap-2 whitespace-nowrap text-[15px] font-medium text-azul"
          >
            {serviciosInicio.pie.enlace.texto}
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </Reveal>
    </Seccion>
  );
}
