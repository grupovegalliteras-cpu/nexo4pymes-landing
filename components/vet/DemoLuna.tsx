import { Check } from "lucide-react";
import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { ItemStagger, Reveal, Stagger } from "@/components/motion/Reveal";
import { Boton } from "@/components/ui/Boton";
import { ChatLuna } from "@/components/mockups/ChatLuna";
import { demoVet } from "@/content/vet";
import { marca } from "@/content/marca";

/* La sección con más carga de demostración de la página: en vez de
   contar lo que hace el agente, se ve funcionando. */

export function DemoLuna() {
  return (
    <Seccion tono="alt" ancho="ancho">
      <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <div className="order-2 lg:order-1">
          <ChatLuna />
        </div>

        <div className="order-1 lg:order-2">
          <Antetitulo>{demoVet.categoria}</Antetitulo>
          <TituloSeccion>{demoVet.titular}</TituloSeccion>

          <Reveal retraso={0.06}>
            <p className="mt-6 max-w-[54ch] text-[16.5px] leading-relaxed text-suave">
              {demoVet.texto}
            </p>
          </Reveal>

          <Stagger className="mt-7 space-y-3" intervalo={0.09}>
            {demoVet.puntos.map((punto) => (
              <ItemStagger key={punto} direccion="izquierda">
                <div className="flex gap-3 rounded-xl border border-linea bg-white px-4 py-3.5">
                  <Check
                    size={14}
                    strokeWidth={3}
                    className="mt-1.5 shrink-0 text-teal"
                    aria-hidden="true"
                  />
                  <p className="text-[14.5px] leading-relaxed text-suave">{punto}</p>
                </div>
              </ItemStagger>
            ))}
          </Stagger>

          <Reveal retraso={0.1}>
            <div className="mt-8">
              <Boton href={marca.calendly} externo variante="secundario" flecha>
                {demoVet.cta}
              </Boton>
            </div>
          </Reveal>
        </div>
      </div>
    </Seccion>
  );
}
