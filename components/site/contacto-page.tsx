"use client";

import { CalendarClock, Check, Clock, Mail, MapPin, MessageCircle, Phone, ShieldCheck, Star } from "lucide-react";
import Link from "@/components/i18n/Enlace";
import { marca } from "@/content/marca";
import { horarioTexto } from "@/lib/horario";
import { contenido } from "@/content/i18n";
import { useIdioma } from "@/components/i18n/idioma";
import { whatsappLink } from "@/data/site";
import { cn } from "@/lib/utils";
import { ItemStagger, Reveal, Stagger } from "@/components/motion/Reveal";
import { FormularioContacto } from "@/components/contacto/FormularioContacto";
import { CalendarioEmbebido } from "@/components/contacto/CalendarioEmbebido";
import { Caustics } from "./caustics";
import { SiteFooter, SiteNav, waHola } from "./chrome";

/* /contacto con la estética de la web nueva.

   ANTES ESTABA EN app/(web), que es la plantilla de la web anterior al
   rediseño: otras tipografías (Sora y Space Grotesk en vez de Bricolage
   y Geist), otro fondo (#05060c en vez del tema claro/oscuro) y otra
   cabecera. Quien llegaba desde la portada tenía la sensación de haber
   salido del sitio, que en la página donde se decide escribir o no
   escribir es justo lo que no interesa.

   El texto no cambia: sale del mismo content/contacto.ts en los tres
   idiomas. Lo que cambia es el envoltorio.

   El formulario y el calendario son los de siempre, con su lógica
   intacta (Web3Forms, trampa anti-bots, consentimiento, carga de
   Calendly bajo clic). Solo se han repintado con los colores del tema
   nuevo. */

const titulo2 = "font-display text-[28px] leading-tight font-semibold tracking-tight text-balance sm:text-[38px]";

const TX = {
  es: {
    whatsapp: "Escribidnos por WhatsApp",
    nosotros: "os contestamos nosotros, no un robot",
    agendar: "Ver huecos en el calendario",
    rapido: "Lo más rápido",
    datos: { razon: "Razón social", ubicacion: "Dónde estamos", ambito: "Ámbito", ambitoTexto: "Mallorca y Baleares en persona, toda España en remoto", google: "Ficha en Google", googleTexto: "Vernos en Google Maps", horario: "Horario" },
    nav: [
      ["Agendar", "#agendar"],
      ["Formulario", "#formulario"],
      ["Datos", "#datos-empresa"],
    ] as [string, string][],
    garantias: ["Respuesta en menos de 24 h laborables", "Sin presentación comercial", "Sin compromiso"],
  },
  en: {
    whatsapp: "Message us on WhatsApp",
    nosotros: "you get one of us, not a bot",
    agendar: "See available slots",
    rapido: "Quickest way",
    datos: { razon: "Registered name", ubicacion: "Where we are", ambito: "Coverage", ambitoTexto: "Mallorca and the Balearics in person, all of Spain remotely", google: "Google listing", googleTexto: "See us on Google Maps", horario: "Opening hours" },
    nav: [
      ["Book a call", "#agendar"],
      ["Form", "#formulario"],
      ["Details", "#datos-empresa"],
    ] as [string, string][],
    garantias: ["A reply within 24 working hours", "No sales pitch", "No commitment"],
  },
  de: {
    whatsapp: "Schreiben Sie uns auf WhatsApp",
    nosotros: "Sie bekommen uns, keinen Bot",
    agendar: "Freie Termine ansehen",
    rapido: "Am schnellsten",
    datos: { razon: "Firmenname", ubicacion: "Wo wir sind", ambito: "Tätigkeitsgebiet", ambitoTexto: "Mallorca und die Balearen persönlich, ganz Spanien aus der Ferne", google: "Google-Eintrag", googleTexto: "Auf Google Maps ansehen", horario: "Öffnungszeiten" },
    nav: [
      ["Termin buchen", "#agendar"],
      ["Formular", "#formulario"],
      ["Daten", "#datos-empresa"],
    ] as [string, string][],
    garantias: ["Antwort in weniger als 24 Arbeitsstunden", "Keine Verkaufspräsentation", "Unverbindlich"],
  },
};

export function ContactoPage() {
  const lang = useIdioma();
  const t = TX[lang];
  const { calendario, formulario, heroContacto, viasContacto } = contenido(lang).contacto;
  const wa = whatsappLink(waHola(lang));
  const horario = horarioTexto(lang);

  return (
    <div className="bg-bg text-fg">
      <SiteNav dark enlaces={t.nav} cta={{ texto: t.whatsapp.split(" ").slice(-1)[0] === "WhatsApp" ? "WhatsApp" : t.whatsapp, href: wa }} />

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden bg-[#041820] text-white">
        <div className="absolute inset-0">
          <Caustics deep="#041820" mid="#0b3a48" light="#3db1d3" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(4_24_32/0.6),rgb(4_24_32/0.92))]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-5 pt-24 pb-14 text-center sm:px-6 sm:pt-28 sm:pb-20">
          <div className="fade-up inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[13px] text-white/80 backdrop-blur">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-[#25d366]" />
            {heroContacto.categoria}
          </div>

          <h1 className="fade-up mt-5 font-display text-[34px] leading-[1.05] font-semibold tracking-tight min-[400px]:text-[40px] sm:text-[54px]" style={{ animationDelay: "80ms" }}>
            {heroContacto.titularA} <span className="text-[#8fd9ea]">{heroContacto.titularB}</span>
          </h1>

          <p className="fade-up mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-white/75 sm:text-[17px]" style={{ animationDelay: "0.3s" }}>
            {heroContacto.parrafo}
          </p>

          {/* WHATSAPP ANTES QUE NADA. Quien llega aquí ya ha decidido
              contactar; lo que falta es que no se arrepienta por el
              camino. El número va escrito y a la vista además de dentro
              del botón: en escritorio mucha gente prefiere copiarlo y
              escribir desde su propio móvil. */}
          <div className="fade-up mt-8 grid justify-center gap-3 sm:flex sm:flex-wrap sm:justify-center" style={{ animationDelay: "0.45s" }}>
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="vibrar flex h-13 items-center justify-center gap-2 rounded-xl bg-[#1faa59] px-5 text-[16px] font-semibold text-white transition hover:brightness-110 sm:h-12 sm:text-[15px]"
            >
              <MessageCircle className="size-5" /> {t.whatsapp}
            </a>
            <a
              href="#agendar"
              className="flex h-13 items-center justify-center gap-2 rounded-xl border border-white/20 px-5 text-[16px] font-medium text-white transition hover:bg-white/10 sm:h-12 sm:text-[15px]"
            >
              <CalendarClock className="size-5" /> {t.agendar}
            </a>
          </div>

          <p className="fade-up mt-4 text-[13.5px] text-white/55" style={{ animationDelay: "0.55s" }}>
            {marca.whatsappVisible} · {t.nosotros}
          </p>

          <ul className="fade-up mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[14px] text-white/70" style={{ animationDelay: "0.65s" }}>
            {t.garantias.map((g) => (
              <li key={g} className="flex items-center gap-1.5">
                <Check className="size-4 text-[#25d366]" /> {g}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Las tres vías ---------- */}
      <section className="border-b border-line bg-surface">
        <Stagger as="ul" className="mx-auto grid max-w-7xl gap-x-6 gap-y-5 px-5 py-8 sm:px-6 lg:grid-cols-3">
          {viasContacto.map((via, i) => (
            <ItemStagger as="li" key={via.titulo} className="flex gap-3">
              <span className={cn("grid size-10 shrink-0 place-items-center rounded-xl", i === 0 ? "bg-sun-soft text-sun" : i === 1 ? "bg-brand-soft text-brand" : "bg-ok-soft text-ok")}>
                {i === 0 ? <CalendarClock className="size-5" /> : i === 1 ? <MessageCircle className="size-5" /> : <Mail className="size-5" />}
              </span>
              <span className="min-w-0">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="text-[15px] font-semibold">{via.titulo}</span>
                  {via.destacado && (
                    <span className="rounded bg-sun-soft px-1.5 py-0.5 text-[11px] font-semibold text-warn">{t.rapido}</span>
                  )}
                </span>
                <span className="mt-0.5 block text-[14px] leading-relaxed text-fg-2">{via.texto}</span>
              </span>
            </ItemStagger>
          ))}
        </Stagger>
      </section>

      {/* ---------- Agendar ----------
          data-hide-dock: el botón flotante de WhatsApp sobra justo encima
          de un calendario para agendar. Ver ContactDock en chrome.tsx. */}
      <section id="agendar" data-hide-dock className="mx-auto max-w-5xl scroll-mt-20 px-5 py-14 sm:px-6 sm:py-20">
        <Reveal>
          <span className="text-[13px] font-semibold tracking-wide text-brand uppercase">{calendario.categoria}</span>
          <h2 className={cn(titulo2, "mt-2")}>{calendario.titular}</h2>
          <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-fg-2 sm:text-[17px]">{calendario.intro}</p>
        </Reveal>
        <Reveal retraso={0.1}>
          <div className="mt-8">
            <CalendarioEmbebido />
          </div>
        </Reveal>
      </section>

      {/* ---------- Formulario ---------- */}
      <section id="formulario" data-hide-dock className="scroll-mt-20 border-y border-line bg-surface">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 sm:py-20">
          <Reveal>
            <span className="text-[13px] font-semibold tracking-wide text-brand uppercase">{formulario.categoria}</span>
            <h2 className={cn(titulo2, "mt-2")}>{formulario.titular}</h2>
            <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-fg-2 sm:text-[17px]">{formulario.intro}</p>
          </Reveal>
          <Reveal retraso={0.1}>
            <div className="mt-8">
              <FormularioContacto />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Datos de la empresa ----------
          Identificación del responsable del tratamiento. El RGPD y la
          LSSI obligan a que sea localizable, y tenerlo aquí y no solo
          enterrado en /legal también ayuda a que un cliente se fíe.

          Y de paso es el mismo nombre, dirección y teléfono que la ficha
          de Google y el aviso legal: para un buscador local, que los tres
          coincidan letra por letra es lo que confirma que la empresa
          existe donde dice. */}
      <section id="datos-empresa" className="mx-auto max-w-5xl scroll-mt-20 px-5 py-14 sm:px-6 sm:py-20">
        <Reveal>
          <span className="text-[13px] font-semibold tracking-wide text-brand uppercase">{contenido(lang).contacto.datosEmpresa.categoria}</span>
          <h2 className={cn(titulo2, "mt-2")}>{contenido(lang).contacto.datosEmpresa.titular}</h2>
          <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-fg-2">{contenido(lang).contacto.datosEmpresa.intro}</p>
        </Reveal>

        <Reveal retraso={0.1}>
          <dl className="mt-8 grid gap-5 rounded-2xl border border-line bg-surface p-5 sm:grid-cols-2 sm:p-7">
            <Dato icono={ShieldCheck} etiqueta={t.datos.razon} valor={marca.razonSocial} />
            <Dato icono={Phone} etiqueta="WhatsApp" valor={marca.whatsappVisible} href={wa} externo />
            <Dato icono={Mail} etiqueta="Email" valor={marca.email} href={`mailto:${marca.email}`} />
            <Dato icono={MapPin} etiqueta={t.datos.ubicacion} valor={`${marca.calle}, ${marca.codigoPostal} ${marca.municipio}`} />
            {/* La ficha de Google, si ya existe. Sale aquí y no en el pie
                porque esta es la página donde alguien comprueba si la
                empresa es real, y una ficha verificada con reseñas es la
                comprobación que de verdad hace la gente. */}
            {marca.googleBusiness ? (
              <Dato icono={Star} etiqueta={t.datos.google} valor={t.datos.googleTexto} href={marca.googleBusiness} externo />
            ) : null}
            {/* El horario, si está puesto en content/marca.ts. El mismo
                dato que va en openingHoursSpecification, así que la
                página y los datos estructurados no pueden decir cosas
                distintas. */}
            {horario ? <Dato icono={Clock} etiqueta={t.datos.horario} valor={horario.join(" · ")} /> : null}
            <div className="sm:col-span-2">
              <Dato icono={MapPin} etiqueta={t.datos.ambito} valor={t.datos.ambitoTexto} />
            </div>
          </dl>
        </Reveal>

        <Reveal retraso={0.16}>
          <p className="mt-6 text-[14px] text-fg-3">
            <Link href="/legal#privacidad" className="text-brand underline underline-offset-4 hover:no-underline">
              {lang === "es" ? "Qué hacemos con vuestros datos" : lang === "en" ? "What we do with your data" : "Was wir mit Ihren Daten machen"}
            </Link>
          </p>
        </Reveal>
      </section>

      <SiteFooter />
    </div>
  );
}

function Dato({
  icono: Icono,
  etiqueta,
  valor,
  href,
  externo = false,
}: {
  icono: typeof Mail;
  etiqueta: string;
  valor: string;
  href?: string;
  externo?: boolean;
}) {
  return (
    <div className="flex gap-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface-2 text-fg-3">
        <Icono className="size-4" />
      </span>
      <div className="min-w-0">
        <dt className="text-[12.5px] font-medium tracking-wide text-fg-3 uppercase">{etiqueta}</dt>
        <dd className="mt-0.5 text-[15px] break-words text-fg">
          {href ? (
            <a
              href={href}
              {...(externo ? { target: "_blank", rel: "noreferrer" } : {})}
              className="text-brand underline-offset-4 hover:underline"
            >
              {valor}
            </a>
          ) : (
            valor
          )}
        </dd>
      </div>
    </div>
  );
}
