import Image from "next/image";
import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { ItemStagger, Reveal, Stagger } from "@/components/motion/Reveal";
import { EQUIPO, nombreCompleto } from "@/content/equipo";
import { idiomaServidor } from "@/lib/idioma-servidor";
import { tr } from "@/lib/i18n";

/* ============================================================
   LAS CARAS

   POR QUÉ VA AQUÍ Y NO EN EL HERO. La página empieza contando la
   idea y cómo trabajamos. Las caras llegan después, cuando alguien
   ya ha leído lo que defendemos y le interesa saber quién lo dice.
   Puestas arriba del todo son decoración; puestas aquí son prueba.

   POR QUÉ NO ES UNA REJILLA DE TARJETAS. Somos dos. Una rejilla de
   dos tarjetas con mucho aire alrededor parece una plantilla a la
   que le faltan cuatro personas. Dos retratos grandes, juntos y
   centrados, dicen lo que son: el estudio entero cabe en la foto.

   EL RETRATO ES ILUSTRADO A PROPÓSITO. No es una foto de archivo ni
   una foto real: es un retrato ilustrado a partir de la nuestra. Se
   reconoce a la persona sin exponer una fotografía, que para dos
   personas que trabajan desde casa en Palma es la decisión correcta.
   ============================================================ */

const TX = {
  es: {
    categoria: "Las personas",
    titular: "Esto somos, literalmente",
    intro:
 "No hay un departamento comercial que os atienda y luego os pase con otro que programa. Hablaréis con quien escribe el código, desde la primera conversación hasta el día que algo falle un martes por la tarde.",
  },
  en: {
    categoria: "The people",
    titular: "This is us, literally",
    intro:
 "There is no sales department that takes your call and then hands you over to whoever writes the code. You speak to the people building it, from the first conversation to the Tuesday afternoon something breaks.",
  },
  de: {
    categoria: "Die Menschen",
    titular: "Das sind wir, buchstäblich",
    intro:
 "Es gibt keine Vertriebsabteilung, die Sie annimmt und dann an jemanden weiterreicht, der programmiert. Sie sprechen mit denen, die den Code schreiben — vom ersten Gespräch bis zu dem Dienstagnachmittag, an dem etwas ausfällt.",
  },
};

export function Equipo() {
  const lang = idiomaServidor();
  const t = tr(lang, TX);

  return (
    <Seccion id="equipo" tono="oscuro" ancho="ancho">
      <div className="max-w-[62ch]">
        <Antetitulo tono="oscuro">{t.categoria}</Antetitulo>
        <TituloSeccion className="text-fg">{t.titular}</TituloSeccion>
        <Reveal retraso={0.08}>
          <p className="mt-5 text-[16px] leading-relaxed text-fg-2 sm:text-[17.5px]">{t.intro}</p>
        </Reveal>
      </div>

      {/* ItemStagger solo admite li/article/div/span, asi que el
          <figure> semantico va dentro y no como elemento raiz. */}
      <Stagger className="mt-12 flex flex-wrap justify-center gap-10 sm:mt-16 sm:gap-16">
        {EQUIPO.map((p) => (
          <ItemStagger key={p.nombre} as="div" className="text-center">
            <figure>
              {/* El borde en menta es lo que separa el circulo claro del
                  fondo oscuro. Sin el, el retrato flota como una pegatina. */}
              <Image
                src={p.foto}
                alt={nombreCompleto(p)}
                width={512}
                height={512}
                sizes="(min-width: 640px) 200px, 150px"
                className="size-[150px] rounded-full border-2 border-brand/30 object-cover sm:size-[200px]"
              />
              <figcaption className="mt-5">
                <div className="text-[19px] text-fg sm:text-[20px]">{nombreCompleto(p)}</div>
                <div className="mt-1 text-[14.5px] text-fg-2">{tr(lang, p.rol)}</div>
              </figcaption>
            </figure>
          </ItemStagger>
        ))}
      </Stagger>
    </Seccion>
  );
}
