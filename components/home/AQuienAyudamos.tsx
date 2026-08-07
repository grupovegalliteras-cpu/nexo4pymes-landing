import { MapPin, Video } from "lucide-react";
import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { ItemStagger, Reveal, Stagger } from "@/components/motion/Reveal";
import { aQuienAyudamos } from "@/content/home";

/* Los sectores entran en cascada rápida (30 ms): con once son
   demasiadas etiquetas para animarlas de una en una, pero de golpe
   pierden el efecto de "y además, y además". */

export function AQuienAyudamos() {
  return (
    <Seccion id="a-quien-ayudamos" tono="oscuro">
      <div className="malla malla-fade absolute inset-0 opacity-50" aria-hidden="true" />

      <div className="relative grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
        <div>
          <Antetitulo tono="oscuro">{aQuienAyudamos.categoria}</Antetitulo>
          <TituloSeccion className="text-white">{aQuienAyudamos.titular}</TituloSeccion>

          <div className="mt-6 space-y-4">
            {aQuienAyudamos.parrafos.map((parrafo, i) => (
              <Reveal key={i} retraso={0.05 * i}>
                <p className="max-w-[58ch] text-[16px] leading-relaxed text-white/65">
                  {i === 1 ? (
                    <>
                      <strong className="font-medium text-white">
                        Nuestra especialidad son las clínicas veterinarias
                      </strong>
                      {parrafo.replace("Nuestra especialidad son las clínicas veterinarias", "")}
                    </>
                  ) : (
                    parrafo
                  )}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal retraso={0.08}>
            <p className="mt-6 max-w-[58ch] text-[16px] leading-relaxed text-white/65">
              {aQuienAyudamos.cierre}
            </p>
          </Reveal>
        </div>

        <div>
          <Stagger className="flex flex-wrap gap-2" intervalo={0.035}>
            {aQuienAyudamos.sectores.map((sector, i) => (
              <ItemStagger key={sector} as="span" direccion="escala">
                <span
                  className={`inline-flex rounded-full border px-3.5 py-2 text-[13.5px] transition-colors duration-300 ${
                    i === 0
                      ? "border-mint/45 bg-mint/12 text-mint"
                      : "border-white/12 text-white/60 hover:border-mint/35 hover:bg-white/[.05] hover:text-white"
                  }`}
                >
                  {sector}
                </span>
              </ItemStagger>
            ))}
          </Stagger>

          <Reveal retraso={0.12}>
            <div className="mt-8 space-y-3 rounded-2xl border border-white/10 bg-white/[.03] p-5">
              <p className="flex items-start gap-3 text-[14.5px] leading-relaxed text-white/70">
                <MapPin size={17} className="mt-0.5 shrink-0 text-mint" aria-hidden="true" />
                <span>
                  <strong className="font-medium text-white">Mallorca y Baleares</strong>,
                  presencial.
                </span>
              </p>
              <p className="flex items-start gap-3 text-[14.5px] leading-relaxed text-white/70">
                <Video size={17} className="mt-0.5 shrink-0 text-mint" aria-hidden="true" />
                <span>
                  <strong className="font-medium text-white">Resto de España</strong>, en remoto:
                  del diagnóstico a la puesta en marcha, todo por videollamada.
                </span>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Seccion>
  );
}
