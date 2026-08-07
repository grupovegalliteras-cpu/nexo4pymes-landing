import Link from "next/link";
import { AlertTriangle, BookOpen } from "lucide-react";
import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { ItemStagger, Reveal, Stagger } from "@/components/motion/Reveal";
import { Contador } from "@/components/ui/Contador";
import { formaDeVerlo } from "@/content/home";

/* Bloque de autoridad. Las tres cifras del caso del taller animan al
   entrar porque son el argumento: el problema no es la tecnología,
   es la capacidad que nadie miró. */

export function FormaDeVerlo() {
  return (
    <Seccion id="diagnostico-antes" tono="alt" ancho="medido">
      <Antetitulo>{formaDeVerlo.categoria}</Antetitulo>
      <TituloSeccion>{formaDeVerlo.titular}</TituloSeccion>

      <Reveal retraso={0.06}>
        <p className="mt-6 text-[16.5px] leading-relaxed text-suave">{formaDeVerlo.entradilla}</p>
      </Reveal>

      <Reveal retraso={0.1} direccion="escala">
        <div className="mt-10 overflow-hidden rounded-[22px] border border-coral/25 bg-white shadow-[0_24px_60px_-40px_rgba(199,78,43,.5)]">
          <div className="border-l-[3px] border-coral p-6 sm:p-8">
            <div className="flex items-center gap-2.5">
              <AlertTriangle size={17} className="text-coral-dark" aria-hidden="true" />
              <h3 className="text-[17px] text-bottle">{formaDeVerlo.caso.titulo}</h3>
            </div>

            {formaDeVerlo.caso.parrafos.map((parrafo, i) => (
              <p key={i} className="mt-3.5 text-[15.5px] leading-relaxed text-suave">
                {parrafo}
              </p>
            ))}

            <Stagger className="mt-7 grid grid-cols-3 gap-3 border-t border-linea pt-6">
              {formaDeVerlo.caso.cifras.map((cifra) => (
                <ItemStagger key={cifra.etiqueta} direccion="escala">
                  <p className="font-titular text-[30px] font-semibold text-coral-dark sm:text-[38px]">
                    <Contador hasta={cifra.valor} sufijo={cifra.sufijo} />
                  </p>
                  <p className="mt-1 text-[12.5px] leading-tight text-suave">{cifra.etiqueta}</p>
                </ItemStagger>
              ))}
            </Stagger>
          </div>
        </div>
      </Reveal>

      <Reveal retraso={0.06}>
        <p className="mt-8 text-[16.5px] leading-relaxed text-suave">{formaDeVerlo.cierre}</p>
      </Reveal>

      <Reveal retraso={0.08}>
        <div className="mt-8 flex gap-3 rounded-2xl border border-teal/20 bg-teal-claro/60 p-5">
          <BookOpen size={18} className="mt-0.5 shrink-0 text-teal" aria-hidden="true" />
          <p className="text-[14.5px] leading-relaxed text-suave">
            <strong className="font-medium text-bottle">Seguir leyendo:</strong>{" "}
            <Link
              href={formaDeVerlo.enlacePost.href}
              className="font-medium text-teal underline decoration-teal/35 underline-offset-4 transition-colors hover:decoration-teal"
            >
              {formaDeVerlo.enlacePost.texto}
            </Link>
            {formaDeVerlo.enlacePost.resto}
          </p>
        </div>
      </Reveal>
    </Seccion>
  );
}
