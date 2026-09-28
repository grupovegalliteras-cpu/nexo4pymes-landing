"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { conIdioma } from "@/lib/i18n";
import { useIdioma } from "./idioma";

/**
 * Igual que next/link, pero las direcciones internas conservan el idioma:
 * en la versión inglesa, href="/servicios" lleva a /en/servicios.
 */
export default function Link({ href, ...props }: ComponentProps<typeof NextLink>) {
  const lang = useIdioma();
  return <NextLink href={typeof href === "string" ? conIdioma(lang, href) : href} {...props} />;
}
