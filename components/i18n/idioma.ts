"use client";

import { usePathname } from "next/navigation";
import { idiomaDeRuta, type Idioma } from "@/lib/i18n";
import { fmtDe, type Fmt } from "@/lib/utils";

/** Idioma de la página actual, leído de la dirección visible (sin prefijo = español). */
export function useIdioma(): Idioma {
  return idiomaDeRuta(usePathname() ?? "/");
}

/** Formatos de números, euros y fechas en el idioma de la página. */
export function useFmt(): Fmt {
  return fmtDe(useIdioma());
}
