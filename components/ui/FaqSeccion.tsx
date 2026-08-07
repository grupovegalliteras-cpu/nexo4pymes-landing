import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Acordeon } from "@/components/ui/Acordeon";

export function FaqSeccion({
  id = "preguntas-frecuentes",
  categoria,
  titular,
  preguntas,
  tono = "alt",
}: {
  id?: string;
  categoria: string;
  titular: string;
  preguntas: { p: string; r: string }[];
  tono?: "claro" | "alt";
}) {
  return (
    <Seccion id={id} tono={tono} ancho="medido">
      <Antetitulo>{categoria}</Antetitulo>
      <TituloSeccion className="mb-10">{titular}</TituloSeccion>
      <Acordeon preguntas={preguntas} />
    </Seccion>
  );
}
