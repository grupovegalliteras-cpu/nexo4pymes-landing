import Link from "next/link";
import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Reveal } from "@/components/motion/Reveal";
import { CajaIcono } from "@/components/ui/Icono";
import { TarjetaGlow } from "@/components/ui/TarjetaGlow";
import { datosRgpd } from "@/content/nosotros";

/* Datos y RGPD. Vivía al final de /servicios; ahora cierra /nosotros,
   que es donde alguien va a buscar si puede fiarse de nosotros. */
export function DatosRgpd() {
  return (
    <Seccion id="datos" tono="oscuro" ancho="ancho">
      <div className="max-w-[60ch]">
        <Antetitulo tono="oscuro">{datosRgpd.categoria}</Antetitulo>
        <TituloSeccion className="text-[#F4F6FF]">{datosRgpd.titular}</TituloSeccion>
        <Reveal retraso={0.06}>
          <p className="mt-5 text-[17px] leading-relaxed text-white/62">{datosRgpd.intro}</p>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2">
        {datosRgpd.tarjetas.map((tarjeta, i) => (
          <Reveal key={tarjeta.titulo} retraso={i * 0.08}>
            <TarjetaGlow color="76,224,179" className="flex h-full gap-4">
              <CajaIcono nombre={tarjeta.icono} tono="mint" />
              <div>
                <h3 className="text-[17px] font-semibold text-[#F4F6FF]">{tarjeta.titulo}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-white/62">{tarjeta.texto}</p>
              </div>
            </TarjetaGlow>
          </Reveal>
        ))}
      </div>

      <Reveal retraso={0.1}>
        <div
          className="mt-8 flex flex-col items-start gap-3 rounded-panel border border-white/10 bg-white/[.03]
                     px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-5"
        >
          <p className="text-[15px] text-white/70">{datosRgpd.pie.texto}</p>
          <Link
            href={datosRgpd.pie.enlace.href}
            className="group flex min-h-[44px] items-center gap-2 whitespace-nowrap text-[15px] font-medium text-azul"
          >
            {datosRgpd.pie.enlace.texto}
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </Reveal>
    </Seccion>
  );
}
