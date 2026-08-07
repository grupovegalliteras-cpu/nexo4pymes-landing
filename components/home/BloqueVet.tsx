import { Boton } from "@/components/ui/Boton";
import { BandejaWhatsApp } from "@/components/mockups/BandejaWhatsApp";
import { Reveal } from "@/components/motion/Reveal";
import { bloqueVet } from "@/content/home";
import { oferta } from "@/content/marca";

/* Puente a la landing de veterinarias.
   Va como H3, no como H2: la keyword "automatización para clínicas
   veterinarias" tiene que ganarla /veterinarias. Si aquí le diéramos
   el mismo peso, las dos páginas competirían en Google. */

export function BloqueVet() {
  return (
    <section className="oscuro relative overflow-hidden bg-bottle-900 px-5 py-20 text-white sm:px-8 sm:py-28">
      <div className="malla malla-fade absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-15%] top-1/2 h-[560px] w-[560px] -translate-y-1/2 rounded-full bg-coral/16 blur-[130px]"
      />

      <div className="relative mx-auto grid max-w-[1120px] items-center gap-12 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-coral/30 bg-coral/10 px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-coral">
              Nuestra especialidad
            </span>
          </Reveal>

          <Reveal retraso={0.05}>
            <h3 className="mt-5 text-[clamp(1.8rem,4.6vw,2.7rem)]">{bloqueVet.titulo}</h3>
          </Reveal>

          {bloqueVet.parrafos.map((parrafo, i) => (
            <Reveal key={i} retraso={0.08 + i * 0.05}>
              <p className="mt-4 max-w-[54ch] text-[16px] leading-relaxed text-white/68">
                {i === 1 ? (
                  <>
                    Ahora mismo tenemos abierta una{" "}
                    <strong className="font-medium text-white">
                      oferta de lanzamiento del diagnóstico
                    </strong>{" "}
                    para las primeras clínicas que entren.
                  </>
                ) : (
                  parrafo
                )}
              </p>
            </Reveal>
          ))}

          <Reveal retraso={0.16}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Boton href="/veterinarias" tamano="lg" flecha>
                {bloqueVet.cta}
              </Boton>
              {oferta.ofertaActiva && (
                <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-coral">
                  <span className="h-1.5 w-1.5 rounded-full bg-coral anim-respirar" />
                  {bloqueVet.nota}
                </span>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal direccion="escala" retraso={0.1}>
          <BandejaWhatsApp />
        </Reveal>
      </div>
    </section>
  );
}
