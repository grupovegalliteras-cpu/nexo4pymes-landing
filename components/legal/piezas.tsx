import { esPendiente } from "@/lib/legal";

/* Piezas compartidas por el aviso legal en sus tres idiomas. */

export function Pendiente({ children }: { children: React.ReactNode }) {
  return <span className="rounded-caja border border-aviso/28 bg-aviso/12 px-1.5 py-0.5 font-mono text-[12.5px] text-aviso">{children}</span>;
}

/* Pinta un dato legal, o dice con una frase normal que todavía no está. */
export function Dato({ valor, falta }: { valor: string; falta: string }) {
  if (esPendiente(valor)) return <Pendiente>{falta}</Pendiente>;
  return <>{valor}</>;
}

export function Tarjeta({ children }: { children: React.ReactNode }) {
  return (
    <ul className="mt-4 space-y-2 rounded-tarjeta border border-white/10 bg-gradient-to-br from-white/[.06] to-white/[.014] p-5 text-[15px] leading-relaxed text-white/72 shadow-[0_24px_60px_rgba(0,0,0,.4),inset_0_1px_0_rgba(255,255,255,.1)] backdrop-blur-xl">
      {children}
    </ul>
  );
}

export const P = "mt-3 text-[15.5px] leading-relaxed text-white/68";
export const H2 = "text-[26px] text-[#F4F6FF]";
export const H3 = "mt-8 text-[18px] text-[#F4F6FF]";
export const H4 = "mt-6 text-[16px] font-medium text-[#F4F6FF]";
export const FUERTE = "font-medium text-[#F4F6FF]";
export const ENLACE = "text-[#9FB6FF] underline underline-offset-4 hover:text-white";
export const LISTA = "mt-4 list-disc space-y-2 pl-5 text-[15.5px] leading-relaxed text-white/68";
export const CODE = "rounded bg-white/8 px-1.5 py-0.5 font-mono text-[13.5px]";
