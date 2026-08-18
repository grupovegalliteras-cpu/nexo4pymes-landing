import { ArrowRight } from "lucide-react";
import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Reveal } from "@/components/motion/Reveal";
import { TarjetaGlow } from "@/components/ui/TarjetaGlow";
import { metodoVet } from "@/content/vet";

/* ============================================================
   EL MÉTODO — fase 3.
   Absorbe la sección "Por qué nunca empezamos por la tecnología",
   que eran 847 px de ensayo sin apoyo visual colocados justo antes
   del precio. Aquí el mismo argumento explica por qué el paso 01 es
   el diagnóstico, que es donde tiene sentido leerlo.

   Los tres pasos pasan a carrusel en móvil (scroll-snap puro CSS,
   sin JS): se ve una tarjeta cada vez en vez de 660 px apilados. A
   partir de sm vuelven a ser la rejilla de tres columnas.
   ============================================================ */

export function MetodoVet() {
  return (
    <Seccion id="metodo" tono="oscuro" ancho="ancho">
      <Antetitulo tono="oscuro">{metodoVet.categoria}</Antetitulo>
      <TituloSeccion className="max-w-[24ch] text-[#F4F6FF]">{metodoVet.titular}</TituloSeccion>

      {/* Región desplazable: con tabIndex el teclado también puede recorrerla. */}
      <div
        role="group"
        aria-label="Los tres pasos del método"
        tabIndex={0}
        className="-mx-5 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2
                   [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                   sm:mx-0 sm:mt-12 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0"
      >
        {metodoVet.pasos.map((paso, i) => (
          <Reveal
            key={paso.num}
            retraso={i * 0.1}
            className="w-[82%] shrink-0 snap-start sm:w-auto sm:shrink"
          >
            <TarjetaGlow className="h-full">
              <span className="texto-degradado font-titular text-[15px] font-bold tracking-[0.04em]">
                {paso.num}
              </span>
              <h3 className="mt-3 text-[19px] font-semibold text-[#F4F6FF] sm:mt-4 sm:text-[21px]">{paso.titulo}</h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-white/62 sm:text-[15px]">{paso.texto}</p>
            </TarjetaGlow>
          </Reveal>
        ))}
      </div>
      <p aria-hidden="true" className="mt-2 font-mono text-[10.5px] tracking-[0.1em] text-white/35 sm:hidden">
        DESLIZA →
      </p>

      {/* ---------- POR QUÉ EL PASO 01 ES EL DIAGNÓSTICO ---------- */}
      <Reveal retraso={0.2}>
        <div className="mt-8 rounded-[24px] border border-white/9 bg-gradient-to-br from-white/[.055] to-white/[.012] p-5 sm:mt-10 sm:p-8">
          <h3 className="max-w-[26ch] text-[19px] font-semibold leading-snug tracking-[-0.02em] text-[#F4F6FF] sm:text-[26px]">
            {metodoVet.porQue.titular}
          </h3>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4">
            {metodoVet.porQue.estados.map((estado) => (
              <div
                key={estado.etiqueta}
                className={`rounded-[16px] border p-4 ${
                  estado.bien ? "border-mint/25 bg-mint/[.05]" : "border-coral/25 bg-coral/[.05]"
                }`}
              >
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.13em] ${
                    estado.bien ? "text-mint" : "text-aviso"
                  }`}
                >
                  {estado.etiqueta}
                </span>
                <p className="mt-2.5 text-[14px] leading-[1.45] text-white/70">{estado.entrada}</p>
                <p
                  className={`mt-3 flex items-start gap-2 text-[14px] font-semibold leading-[1.35] ${
                    estado.bien ? "text-[#8FEBD3]" : "text-aviso"
                  }`}
                >
                  <ArrowRight size={14} strokeWidth={2.6} className="mt-[3px] shrink-0" aria-hidden="true" />
                  {estado.salida}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-5 border-l-2 border-azul/50 pl-4 text-[16px] font-medium leading-snug text-[#F4F6FF] sm:pl-5 sm:text-[18px]">
            {metodoVet.porQue.cita}
          </p>
        </div>
      </Reveal>

      <Reveal retraso={0.3}>
        <div className="mt-4 rounded-2xl border-l-2 border-mint/50 bg-mint/[.05] py-4 pl-5 pr-4 sm:mt-6 sm:py-5 sm:pl-6 sm:pr-5">
          <p className="text-[14.5px] leading-relaxed text-white/72 sm:text-[15.5px]">
            <span aria-hidden="true" className="mr-2 text-mint">
              ◆
            </span>
            <strong className="font-semibold text-[#F4F6FF]">{metodoVet.callout.fuerte}</strong>{" "}
            {metodoVet.callout.texto}
          </p>
        </div>
      </Reveal>
    </Seccion>
  );
}
