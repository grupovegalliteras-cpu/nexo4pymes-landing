import Image from "next/image";
import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { ItemStagger, Reveal, Stagger } from "@/components/motion/Reveal";
import { Boton } from "@/components/ui/Boton";
import { trabajoReal } from "@/content/inicio";
import { waLink } from "@/lib/whatsapp";

/* ============================================================
   LO QUE YA ESTÁ FUNCIONANDO

   La sección que le faltaba a la home. Todo lo demás explica; esta
   demuestra. Va justo después de "qué construimos" a propósito:
   primero se dice lo que se hace, y acto seguido se enseña hecho,
   antes de que al visitante le dé tiempo a dudar.

   La primera pieza va a doble ancho porque es la que mejor se
   entiende de un vistazo: un panel lleno de datos reales se lee
   como "esto existe" mucho antes que cualquier titular.

   `priority` NO se usa en ninguna imagen: esta sección queda por
   debajo del primer pantallazo y marcarlas como prioritarias le
   robaría ancho de banda al LCP del hero, que es lo que mide
   Lighthouse.

   Las capturas están anonimizadas y NO enlazan a las demos en
   vivo. El porqué está en content/inicio.ts, junto al contenido.
   ============================================================ */

export function TrabajoReal() {
  return (
    <Seccion id="funcionando" tono="oscuro-hondo" ancho="ancho">
      <div className="max-w-[720px]">
        <Antetitulo tono="oscuro">{trabajoReal.categoria}</Antetitulo>
        <TituloSeccion className="text-[#F4F6FF]">{trabajoReal.titular}</TituloSeccion>
        <Reveal retraso={0.08}>
          <p className="mt-5 text-[16px] leading-relaxed text-white/65 sm:text-[17.5px]">
            {trabajoReal.intro}
          </p>
        </Reveal>
      </div>

      {/* Seis columnas, no dos: la destacada ocupa la fila entera y las
          otras tres caben en la siguiente a dos columnas cada una. Con
          `grid-cols-2` la cuarta tarjeta se quedaba sola, con medio
          ancho de hueco al lado. */}
      <Stagger className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-6">
        {trabajoReal.piezas.map((pieza) => (
          <ItemStagger
            key={pieza.archivo}
            as="article"
            className={pieza.destacada ? "sm:col-span-6" : "sm:col-span-2"}
          >
            <figure
              className="flex h-full flex-col overflow-hidden rounded-panel border border-white/10
                         bg-gradient-to-br from-white/[.06] to-white/[.015]
                         shadow-[0_24px_60px_-24px_rgba(0,0,0,.55)]"
            >
              {/* CAJA DE ALTURA FIJA + object-contain.
                  Las cuatro capturas tienen proporciones muy distintas
                  (un panel apaisado, un móvil vertical, una tarjeta
                  estrecha). Dejarlas fluir recortaba unas y estiraba
                  otras, y las tarjetas de una misma fila quedaban
                  descuadradas. Con una altura fija y object-contain no
                  se recorta ninguna: la que sobra deja aire a los lados,
                  que es lo que se quiere.

                  El fondo claro evita el salto brusco entre el panel
                  (que es claro) y la tarjeta (oscura). */}
              <div
                className={`flex items-center justify-center overflow-hidden border-b border-white/8
                            bg-white/[.04] p-4 sm:p-5 ${
                              pieza.destacada ? "h-[240px] sm:h-[460px]" : "h-[240px] sm:h-[320px]"
                            }`}
              >
                <Image
                  src={pieza.archivo}
                  alt={pieza.titulo}
                  width={pieza.ancho}
                  height={pieza.alto}
                  sizes={
                    pieza.destacada
                      ? "(max-width: 639px) 100vw, 1100px"
                      : "(max-width: 639px) 100vw, 380px"
                  }
                  className="h-full w-full rounded-caja object-contain"
                />
              </div>

              <figcaption className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="text-[17px] text-white sm:text-[19px]">{pieza.titulo}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-white/60">{pieza.texto}</p>
              </figcaption>
            </figure>
          </ItemStagger>
        ))}
      </Stagger>

      <Reveal retraso={0.1}>
        <div className="mt-10 flex justify-center">
          <Boton
            href={waLink("SOFTWARE")}
            externo
            tamano="lg"
            flecha
            magnetico
            className="w-full font-titular font-semibold sm:w-auto"
          >
            {trabajoReal.cta}
          </Boton>
        </div>
      </Reveal>
    </Seccion>
  );
}
