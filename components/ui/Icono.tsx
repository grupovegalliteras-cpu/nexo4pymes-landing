import {
  Bell,
  CalendarDays,
  CheckCircle2,
  Clock,
  FileText,
  Globe,
  Info,
  ListChecks,
  Map,
  Megaphone,
  MessageCircle,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Syringe,
  TrendingUp,
  Wrench,
} from "lucide-react";

/* Un único mapa nombre → icono. Los archivos de contenido guardan el
   nombre ("agenda", "vacuna"...) y no importan lucide: así el copy no
   depende de la librería de iconos. */
const iconos = {
  mensaje: MessageCircle,
  agenda: CalendarDays,
  grafico: TrendingUp,
  cohete: Send,
  altavoz: Megaphone,
  engranaje: Settings,
  documento: FileText,
  vacuna: Syringe,
  lupa: Search,
  mapa: Map,
  herramienta: Wrench,
  reloj: Clock,
  escudo: ShieldCheck,
  globo: Globe,
  verificado: CheckCircle2,
  campana: Bell,
  lista: ListChecks,
  info: Info,
} as const;

export type NombreIcono = keyof typeof iconos;

export function Icono({
  nombre,
  size = 20,
  className = "",
}: {
  nombre: NombreIcono;
  size?: number;
  className?: string;
}) {
  const Componente = iconos[nombre];
  return <Componente size={size} strokeWidth={1.9} className={className} aria-hidden="true" />;
}

/* Cajita del icono, con el micro-movimiento en hover de la tarjeta padre
   (la tarjeta lleva la clase `group`). */
export function CajaIcono({
  nombre,
  tono = "claro",
}: {
  nombre: NombreIcono;
  tono?: "claro" | "oscuro" | "coral" | "azul" | "violeta" | "mint";
}) {
  const estilos = {
    claro: "bg-teal-claro text-teal",
    oscuro: "bg-white/8 text-mint ring-1 ring-inset ring-mint/20",
    coral: "bg-coral/12 text-coral-dark",
    azul: "bg-azul/15 text-[#9FB6FF] ring-1 ring-inset ring-azul/25",
    violeta: "bg-violeta/15 text-[#D3B0FF] ring-1 ring-inset ring-violeta/25",
    mint: "bg-mint/15 text-mint ring-1 ring-inset ring-mint/25",
  };

  return (
    <span
      className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${estilos[tono]}
                  transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]
                  group-hover:-translate-y-0.5 group-hover:rotate-[-6deg]`}
    >
      <Icono nombre={nombre} size={21} />
    </span>
  );
}
