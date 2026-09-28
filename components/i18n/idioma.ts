"use client";

import { usePathname } from "next/navigation";
import { idiomaDeRuta, type Idioma } from "@/lib/i18n";

/** Idioma de la página actual, leído de la dirección visible (sin prefijo = español). */
export function useIdioma(): Idioma {
  return idiomaDeRuta(usePathname() ?? "/");
}
