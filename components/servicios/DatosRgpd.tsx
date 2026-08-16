import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Reveal } from "@/components/motion/Reveal";
import { CajaIcono } from "@/components/ui/Icono";
import { TarjetaGlow } from "@/components/ui/TarjetaGlow";
import { datosRgpd } from "@/content/servicios";

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

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
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
    </Seccion>
  );
}
