import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Acordeon } from "@/components/ui/Acordeon";

export function FaqSeccion({
  id = "preguntas-frecuentes",
  categoria,
  titular,
  preguntas,
  tono = "oscuro",
}: {
  id?: string;
  categoria: string;
  titular: string;
  preguntas: { p: string; r: string }[];
  tono?: "oscuro" | "oscuro-hondo";
}) {
  return (
    <Seccion id={id} tono={tono} ancho="medido">
      <Antetitulo tono="oscuro">{categoria}</Antetitulo>
      <TituloSeccion className="mb-10 text-[#F4F6FF]">{titular}</TituloSeccion>
      {/* Todas cerradas al entrar: con la primera abierta la sección arrancaba
          ~200 px más alta en móvil sin que nadie hubiera pedido esa respuesta. */}
      <Acordeon preguntas={preguntas} tono="oscuro" abiertaPorDefecto={null} />
    </Seccion>
  );
}
