import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { ItemStagger, Reveal, Stagger } from "@/components/motion/Reveal";
import { CajaIcono } from "@/components/ui/Icono";
import { Boton } from "@/components/ui/Boton";
import { centralAvisos } from "@/content/inicio";
import { marca } from "@/content/marca";
import { waLink } from "@/lib/whatsapp";

/* ============================================================
   CENTRALAVISOS

   El único bloque de la home que vende algo que se puede
   contratar esta semana. Todo lo demás vende proyecto a medida,
   que es un salto grande para quien acaba de llegar de un
   anuncio; esto es una cuota mensual sin permanencia.

   Va después de las capturas: primero se demuestra que sabemos
   construir, y con esa confianza ya puesta se ofrece lo fácil.

   DOS SALIDAS, y las dos importan:
   · WhatsApp con la palabra AVISOS, que es la que nos dice de
     dónde viene el mensaje sin preguntar nada.
   · La landing propia del producto, para quien necesita leerse
     los detalles y probar la demo antes de escribir.

   El enlace sale de marca.ts. Cuando centralavisos.com esté
   publicado se cambia allí y aquí no se toca nada.
   ============================================================ */

export function CentralAvisos() {
  return (
    <Seccion id="central-avisos" tono="oscuro" ancho="ancho">
      <div className="max-w-[760px]">
        <Antetitulo tono="oscuro">{centralAvisos.categoria}</Antetitulo>
        <TituloSeccion className="text-[#F4F6FF]">{centralAvisos.titular}</TituloSeccion>
        <Reveal retraso={0.08}>
          <p className="mt-5 text-[16px] leading-relaxed text-white/65 sm:text-[17.5px]">
            {centralAvisos.parrafo}
          </p>
        </Reveal>
      </div>

      <Stagger className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-3">
        {centralAvisos.puntos.map((punto) => (
          <ItemStagger key={punto.titulo} as="article">
            <div
              className="group h-full rounded-panel border border-white/10 bg-gradient-to-br
                         from-white/[.06] to-white/[.015] p-5 sm:p-6"
            >
              <CajaIcono nombre={punto.icono} tono="mint" />
              <h3 className="mt-4 text-[17px] text-white">{punto.titulo}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-white/60">{punto.texto}</p>
            </div>
          </ItemStagger>
        ))}
      </Stagger>

      {/* CONDICIONES. Van juntas y a la vista, no en letra pequeña al
          final: que sea de pago mensual no es un defecto que esconder,
          es lo que permite decir "sin permanencia" y "lo cancelas
          cuando quieras" sin mentir. */}
      <Reveal retraso={0.1}>
        <ul className="mt-8 flex flex-wrap justify-center gap-2 sm:mt-10">
          {centralAvisos.condiciones.map((condicion) => (
            <li
              key={condicion}
              className="rounded-full border border-white/12 bg-white/[.04] px-3.5 py-1.5
                         font-mono text-[11.5px] uppercase tracking-[0.1em] text-white/60"
            >
              {condicion}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal retraso={0.14}>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Boton
            href={waLink("AVISOS")}
            externo
            tamano="lg"
            flecha
            magnetico
            className="w-full font-titular font-semibold sm:w-auto"
          >
            {centralAvisos.ctaPrincipal}
          </Boton>
          <Boton
            href={marca.centralAvisos}
            externo
            variante="secundario"
            tamano="lg"
            className="w-full sm:w-auto"
          >
            {centralAvisos.ctaSecundario}
          </Boton>
        </div>
      </Reveal>
    </Seccion>
  );
}
