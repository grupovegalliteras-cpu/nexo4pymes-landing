import type { Idioma } from "@/lib/i18n";
import * as serviciosEs from "./servicios";
import * as serviciosEn from "./en/servicios";
import * as serviciosDe from "./de/servicios";
import * as contactoEs from "./contacto";
import * as contactoEn from "./en/contacto";
import * as contactoDe from "./de/contacto";
import * as nosotrosEs from "./nosotros";
import * as nosotrosEn from "./en/nosotros";
import * as nosotrosDe from "./de/nosotros";
import * as blogEs from "./blog";
import * as blogEn from "./en/blog";
import * as blogDe from "./de/blog";
import { centralAvisos as avisosEs } from "./inicio";
import { centralAvisos as avisosEn } from "./en/inicio";
import { centralAvisos as avisosDe } from "./de/inicio";

/*
  Contenido de los apartados de la web en cada idioma. Los archivos en/ y de/
  tienen exactamente las mismas exportaciones que los españoles; si falta algo,
  TypeScript lo marca aquí.
  En componentes de servidor: contenido(idiomaServidor()). En los de cliente:
  contenido(useIdioma()).
*/
type Contenido = {
  servicios: typeof serviciosEs;
  contacto: typeof contactoEs;
  nosotros: typeof nosotrosEs;
  blog: typeof blogEs;
  centralAvisos: typeof avisosEs;
};

const CONTENIDO: Record<Idioma, Contenido> = {
  es: { servicios: serviciosEs, contacto: contactoEs, nosotros: nosotrosEs, blog: blogEs, centralAvisos: avisosEs },
  en: { servicios: serviciosEn, contacto: contactoEn, nosotros: nosotrosEn, blog: blogEn, centralAvisos: avisosEn },
  de: { servicios: serviciosDe, contacto: contactoDe, nosotros: nosotrosDe, blog: blogDe, centralAvisos: avisosDe },
};

export function contenido(lang: Idioma): Contenido {
  return CONTENIDO[lang];
}
