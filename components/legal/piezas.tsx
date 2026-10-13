import { esPendiente } from "@/lib/legal";

/* Piezas compartidas por el aviso legal en sus tres idiomas. */

export function Pendiente({ children }: { children: React.ReactNode }) {
  return <span className="rounded-caja border border-warn/30 bg-warn-soft px-1.5 py-0.5 font-mono text-[12.5px] text-warn">{children}</span>;
}

/* Pinta un dato legal, o dice con una frase normal que todavía no está. */
export function Dato({ valor, falta }: { valor: string; falta: string }) {
  if (esPendiente(valor)) return <Pendiente>{falta}</Pendiente>;
  return <>{valor}</>;
}

export function Tarjeta({ children }: { children: React.ReactNode }) {
  return (
    <ul className="mt-4 space-y-2 rounded-tarjeta border border-line bg-surface p-5 text-[15px] leading-relaxed text-fg shadow-e2">
      {children}
    </ul>
  );
}

export const P = "mt-3 text-[15.5px] leading-relaxed text-fg-2";
export const H2 = "text-[26px] text-fg";
export const H3 = "mt-8 text-[18px] text-fg";
export const H4 = "mt-6 text-[16px] font-medium text-fg";
export const FUERTE = "font-medium text-fg";
export const ENLACE = "text-brand underline underline-offset-4 hover:text-fg";
export const LISTA = "mt-4 list-disc space-y-2 pl-5 text-[15.5px] leading-relaxed text-fg-2";
export const CODE = "rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[13.5px]";
