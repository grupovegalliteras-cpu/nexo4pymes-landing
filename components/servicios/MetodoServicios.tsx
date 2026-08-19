import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Reveal } from "@/components/motion/Reveal";
import { TarjetaGlow } from "@/components/ui/TarjetaGlow";
import { metodoServicios } from "@/content/servicios";
import { oferta } from "@/content/marca";

export function MetodoServicios() {
  return (
    <Seccion id="metodo" tono="oscuro-hondo" ancho="ancho">
      <div className="max-w-[54ch]">
        <Antetitulo tono="oscuro">{metodoServicios.categoria}</Antetitulo>
        <TituloSeccion className="text-[#F4F6FF]">{metodoServicios.titular}</TituloSeccion>
        <Reveal retraso={0.06}>
          <p className="mt-5 text-[17px] leading-relaxed text-white/62">{metodoServicios.intro}</p>
        </Reveal>
      </div>

      <div className="mt-12 flex flex-col gap-4">
        {metodoServicios.pasos.map((paso, i) => (
          <Reveal key={paso.num} retraso={i * 0.07}>
            <TarjetaGlow>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-azul to-violeta font-titular text-[16px] font-bold text-white shadow-[0_10px_26px_-8px_rgba(76,125,255,.55)]">
                  {paso.num}
                </span>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#9FB6FF]">
                    {/* Antes ponía "3-4 días · 150€ (lanzamiento)". Se quitó el
                        importe con el resto de precios de la página; el plazo
                        de entrega se queda, que sí es información útil. */}
                    {paso.num === "2" ? oferta.duracion : paso.meta}
                  </span>
                  <h3 className="mt-2 text-[19px] font-semibold text-[#F4F6FF]">{paso.titulo}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-white/64">{paso.texto}</p>
                </div>
              </div>
            </TarjetaGlow>
          </Reveal>
        ))}
      </div>
    </Seccion>
  );
}
