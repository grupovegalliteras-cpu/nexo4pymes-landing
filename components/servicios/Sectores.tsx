import Link from "next/link";
import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Reveal } from "@/components/motion/Reveal";
import { TarjetaGlow } from "@/components/ui/TarjetaGlow";
import { sectores } from "@/content/servicios";

export function Sectores() {
  return (
    <Seccion id="sectores" tono="oscuro-hondo" ancho="ancho">
      <div className="max-w-[60ch]">
        <Antetitulo tono="oscuro">{sectores.categoria}</Antetitulo>
        <TituloSeccion className="text-[#F4F6FF]">{sectores.titular}</TituloSeccion>
        <Reveal retraso={0.06}>
          <p className="mt-5 text-[17px] leading-relaxed text-white/62">{sectores.intro}</p>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        <Reveal className="sm:col-span-3">
          <TarjetaGlow
            color="255,255,255"
            className="border-azul/28 bg-gradient-to-br from-azul/16 via-violeta/12 to-white/[.02] sm:flex sm:items-center sm:justify-between sm:gap-8"
          >
            <div>
              <span className="inline-flex items-center rounded-full bg-gradient-to-br from-azul to-violeta px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-white">
                {sectores.destacado.badge}
              </span>
              <h3 className="mt-4 text-[24px] font-semibold text-[#F4F6FF]">{sectores.destacado.titulo}</h3>
              <p className="mt-2.5 max-w-[60ch] text-[15px] leading-relaxed text-white/65">
                {sectores.destacado.texto}
              </p>
            </div>
            <Link
              href={sectores.destacado.enlace.href}
              className="mt-6 inline-flex shrink-0 items-center gap-1 text-[14.5px] font-medium text-[#9FB6FF] transition-colors hover:text-white sm:mt-0"
            >
              {sectores.destacado.enlace.texto}
            </Link>
          </TarjetaGlow>
        </Reveal>

        {sectores.otros.map((sector, i) => (
          <Reveal key={sector.titulo} retraso={i * 0.08}>
            <TarjetaGlow className="h-full">
              <h3 className="text-[18px] font-semibold text-[#F4F6FF]">{sector.titulo}</h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-white/62">{sector.texto}</p>
            </TarjetaGlow>
          </Reveal>
        ))}
      </div>
    </Seccion>
  );
}
