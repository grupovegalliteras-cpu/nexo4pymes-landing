import { cache } from "react";
import { IDIOMA_BASE, type Idioma } from "@/lib/i18n";

/*
  Idioma de la petición para los componentes de servidor, que no pueden
  usar contexto de React. La plantilla y cada página lo fijan con
  fijarIdioma(lang) al empezar; cache() lo guarda solo para esa petición.
*/
const almacen = cache(() => ({ lang: IDIOMA_BASE as Idioma }));

export function fijarIdioma(lang: Idioma) {
  almacen().lang = lang;
}

export function idiomaServidor(): Idioma {
  return almacen().lang;
}
