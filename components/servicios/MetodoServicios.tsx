import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Reveal } from "@/components/motion/Reveal";
import { TarjetaGlow } from "@/components/ui/TarjetaGlow";
import { oferta } from "@/content/marca";
import { contenido } from "@/content/i18n";
import { idiomaServidor } from "@/lib/idioma-servidor";

export function MetodoServicios() {
  const lang = idiomaServidor();
  const { metodoServicios } = contenido(lang).servicios;
  return (
    <Seccion id="metodo" tono="oscuro-hondo" ancho="ancho">
      <div className="max-w-[54ch]">
        <Antetitulo tono="oscuro">{metodoServicios.categoria}</Antetitulo>
        <TituloSeccion className="text-fg">{metodoServicios.titular}</TituloSeccion>
        <Reveal retraso={0.06}>
          <p className="mt-5 text-[17px] leading-relaxed text-fg-2">{metodoServicios.intro}</p>
        </Reveal>
      </div>

      <div className="mt-12 flex flex-col gap-4">
        {metodoServicios.pasos.map((paso, i) => (
          <Reveal key={paso.num} retraso={i * 0.07}>
            <TarjetaGlow>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand font-display text-[16px] font-bold text-fg shadow-e2">
                  {paso.num}
                </span>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-brand">
                    {/* Antes ponía "3-4 días · 150€ (lanzamiento)". Se quitó el
                        importe con el resto de precios de la página; el plazo
                        de entrega se queda, que sí es información útil. */}
                    {paso.num === "2" ? oferta.duracion : paso.meta}
                  </span>
                  <h3 className="mt-2 text-[19px] font-semibold text-fg">{paso.titulo}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-fg-2">{paso.texto}</p>
                </div>
              </div>
            </TarjetaGlow>
          </Reveal>
        ))}
      </div>
    </Seccion>
  );
}
