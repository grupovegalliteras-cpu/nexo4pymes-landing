import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Reveal } from "@/components/motion/Reveal";
import { CajaIcono } from "@/components/ui/Icono";
import { TarjetaGlow } from "@/components/ui/TarjetaGlow";
import { problemaVet } from "@/content/vet";

/* ============================================================
   EL PROBLEMA
   FASE 2: eran tres tarjetas de ~340 px apiladas en móvil, cada una
   con su párrafo. 1.610 px para tres ideas que caben en tres líneas.

   Ahora hay una sola estructura que cambia de forma con CSS, sin
   duplicar el texto en el DOM:
   · móvil  → un dato grande + tres filas de icono + título + coste
   · sm y ↑ → las tres tarjetas de siempre, con su párrafo

   El párrafo descriptivo solo aparece a partir de sm: en móvil lo que
   remata cada fila es el chip de coste, no la explicación.
   ============================================================ */

const TONOS = ["azul", "violeta", "mint"] as const;
const GLOW = ["76,125,255", "176,107,245", "76,224,179"];

export function ProblemaVet() {
  return (
    <Seccion id="problema" tono="oscuro" ancho="ancho">
      <div className="max-w-[22ch]">
        <Antetitulo tono="oscuro">{problemaVet.categoria}</Antetitulo>
        <TituloSeccion className="text-[#F4F6FF]">{problemaVet.titular}</TituloSeccion>
      </div>

      <Reveal retraso={0.06}>
        {/* Móvil: la cifra ocupa el sitio del subtítulo. Escritorio: al revés.
            Una cifra se lee de un vistazo; un párrafo de 18 palabras, no. */}
        <div className="mt-5 sm:hidden">
          <div className="bg-gradient-to-r from-coral to-violeta bg-clip-text font-titular text-[44px] font-extrabold leading-none tracking-[-0.04em] text-transparent">
            {problemaVet.dato.valor}
          </div>
          <p className="mt-2.5 max-w-[34ch] text-[14px] leading-[1.45] text-white/60">
            {problemaVet.dato.texto}
          </p>
        </div>
        <p className="mt-5 hidden max-w-[56ch] text-[17px] leading-relaxed text-white/60 sm:block">
          {problemaVet.subtitulo}
        </p>
      </Reveal>

      <div className="mt-8 grid sm:mt-12 sm:grid-cols-6 sm:gap-4">
        {problemaVet.tarjetas.map((tarjeta, i) => (
          <Reveal key={tarjeta.titulo} retraso={i * 0.08} className={i === 2 ? "sm:col-span-2" : "sm:col-span-3"}>
            <div
              className="group flex h-full items-start gap-3.5 border-b border-white/8 py-4
                         sm:block sm:rounded-tarjeta sm:border sm:border-white/9 sm:bg-gradient-to-br
                         sm:from-white/[.065] sm:to-white/[.015] sm:p-7 sm:shadow-[0_24px_60px_-24px_rgba(0,0,0,.55)]
                         sm:backdrop-blur-xl sm:transition-colors sm:duration-300 sm:hover:border-white/22"
            >
              <div className="shrink-0 sm:mb-5">
                <CajaIcono nombre={tarjeta.icono} tono={TONOS[i]} />
              </div>
              <div>
                <h3 className="text-[16px] leading-snug text-[#F4F6FF] sm:text-[21px]">{tarjeta.titulo}</h3>
                <p className="mt-2.5 hidden max-w-[42ch] text-[15px] leading-relaxed text-white/60 sm:block">
                  {tarjeta.texto}
                </p>
                <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-coral/28 bg-coral/10 px-3 py-1.5 font-mono text-[10.5px] leading-tight text-aviso sm:mt-5 sm:px-3.5 sm:py-2 sm:text-[11.5px]">
                  {tarjeta.coste}
                </div>
              </div>
            </div>
          </Reveal>
        ))}

        <Reveal retraso={0.32} className="mt-6 sm:col-span-4 sm:mt-0">
          <TarjetaGlow
            color={GLOW[0]}
            className="flex h-full items-center border-azul/22 bg-gradient-to-br from-azul/16 via-violeta/10 to-white/2"
          >
            <p className="max-w-[26ch] font-titular text-[clamp(1.15rem,2.6vw,2.1rem)] font-semibold leading-snug text-[#F4F6FF]">
              {problemaVet.destacado}
            </p>
          </TarjetaGlow>
        </Reveal>
      </div>
    </Seccion>
  );
}
