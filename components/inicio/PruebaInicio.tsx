import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Reveal, Stagger, ItemStagger } from "@/components/motion/Reveal";
import { CajaIcono } from "@/components/ui/Icono";
import { pruebaInicio } from "@/content/inicio";

/* ============================================================
   PRUEBA SOCIAL

   El brief pedía "testimonios y logos de clientes". No los
   publicamos inventados: opiniones ficticias con nombre y empresa
   son publicidad engañosa, y en una empresa que vende honestidad
   como argumento de venta ("os diremos que no si toca") serían
   además una contradicción que cualquiera puede comprobar.

   Así que la sección tiene dos modos y elige sola:

   · sin testimonios reales → muestra COMPROMISOS. Es prueba
     social honesta: cosas concretas que el cliente puede
     exigirnos, no adjetivos.

   · con testimonios reales → los pinta y baja los compromisos a
     una fila secundaria.

   Para activar el segundo modo basta con rellenar el array
   `testimonios` en content/inicio.ts. No hay que tocar este
   archivo.
   ============================================================ */

export function PruebaInicio() {
  const hayTestimonios = pruebaInicio.testimonios.length > 0;

  return (
    <Seccion id="compromisos" tono="oscuro" ancho="ancho">
      <div className="max-w-[720px]">
        <Antetitulo tono="oscuro">{pruebaInicio.categoria}</Antetitulo>
        <TituloSeccion className="text-[#F4F6FF]">{pruebaInicio.titular}</TituloSeccion>
        {!hayTestimonios && (
          <Reveal retraso={0.08}>
            <p className="mt-5 text-[16px] leading-relaxed text-white/65 sm:text-[17.5px]">
              {pruebaInicio.intro}
            </p>
          </Reveal>
        )}
      </div>

      {hayTestimonios && (
        <Stagger className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {pruebaInicio.testimonios.map((testimonio) => (
            <ItemStagger key={testimonio.nombre} as="article">
              <figure
                className="h-full rounded-panel border border-white/10 bg-gradient-to-br from-white/[.06] to-white/[.015]
                           p-6 shadow-[0_24px_60px_-24px_rgba(0,0,0,.55)]"
              >
                <span aria-hidden="true" className="font-titular text-[40px] leading-none text-azul/50">
                  &ldquo;
                </span>
                <blockquote className="mt-1 text-[15.5px] leading-relaxed text-white/80">
                  {testimonio.cita}
                </blockquote>
                <figcaption className="mt-5 border-t border-white/8 pt-4 text-[13.5px]">
                  <span className="block font-medium text-white">{testimonio.nombre}</span>
                  <span className="block text-white/50">
                    {testimonio.cargo} · {testimonio.empresa}
                  </span>
                </figcaption>
              </figure>
            </ItemStagger>
          ))}
        </Stagger>
      )}

      <Stagger
        className={`grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 ${
          hayTestimonios ? "mt-8 sm:mt-10" : "mt-10 sm:mt-14"
        }`}
      >
        {pruebaInicio.compromisos.map((compromiso) => (
          <ItemStagger key={compromiso.titulo} as="article">
            <div className="group h-full rounded-panel border border-white/9 bg-white/[.025] p-5 sm:p-6">
              <CajaIcono nombre={compromiso.icono} tono="mint" />
              <h3 className="mt-4 text-[17.5px] text-white sm:text-[18.5px]">{compromiso.titulo}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-white/60">{compromiso.texto}</p>
            </div>
          </ItemStagger>
        ))}
      </Stagger>
    </Seccion>
  );
}
