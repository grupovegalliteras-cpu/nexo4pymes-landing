import type { Metadata } from "next";
import Link from "next/link";
import { FondoAmbiente } from "@/components/ui/FondoAmbiente";
import { Reveal } from "@/components/motion/Reveal";
import { BotonPreferencias } from "@/components/legal/BotonPreferencias";
import { marca } from "@/content/marca";

/* Aviso legal, privacidad y cookies.
   Tres secciones apiladas con id propio, no pestañas: así los enlaces
   /legal#privacidad del pie funcionan sin JS y el buscador indexa el
   texto entero.

   El texto es el mismo, palabra por palabra: es contenido legal, no
   copy de marketing. Los [PENDIENTE] son reales — se completan al
   inscribir la sociedad. */

export const metadata: Metadata = {
  title: "Aviso legal, privacidad y cookies",
  description:
    "Aviso legal, política de privacidad y política de cookies de Nexo4Pymes, automatización de procesos con IA para pymes y autónomos.",
  alternates: { canonical: "/legal" },
  robots: { index: false, follow: true },
};

const secciones = [
  { id: "aviso", texto: "Aviso legal" },
  { id: "privacidad", texto: "Privacidad" },
  { id: "cookies", texto: "Cookies" },
];

function Pendiente({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-caja border border-aviso/28 bg-aviso/12 px-1.5 py-0.5 font-mono text-[12.5px] text-aviso">
      {children}
    </span>
  );
}

function Tarjeta({ children }: { children: React.ReactNode }) {
  return (
    <ul className="mt-4 space-y-2 rounded-tarjeta border border-white/10 bg-gradient-to-br from-white/[.06] to-white/[.014] p-5 text-[15px] leading-relaxed text-white/72 shadow-[0_24px_60px_rgba(0,0,0,.4),inset_0_1px_0_rgba(255,255,255,.1)] backdrop-blur-xl">
      {children}
    </ul>
  );
}

export default function PaginaLegal() {
  return (
    <>
      <FondoAmbiente />

      <header className="relative z-10 sticky top-0 border-b border-white/7 bg-bottle/72 backdrop-blur-2xl backdrop-saturate-150">
        <div className="mx-auto flex max-w-[900px] items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Nexo4Pymes, inicio">
            <span className="flex h-9 w-9 items-center justify-center rounded-caja bg-gradient-to-br from-azul to-violeta shadow-[0_6px_22px_rgba(76,125,255,.4),inset_0_1px_0_rgba(255,255,255,.35)]">
              <span className="font-titular text-[15px] font-bold text-white">4</span>
            </span>
            <span className="font-titular text-[16px] font-semibold text-white">
              Nexo<span className="texto-degradado">4</span>Pymes
            </span>
          </Link>
          <Link
            href="/"
            className="rounded-full border border-white/12 bg-white/[.03] px-4 py-2 text-[13.5px] text-white/75 backdrop-blur-md transition-colors hover:border-azul/45 hover:bg-azul/10 hover:text-white"
          >
            ← Volver al inicio
          </Link>
        </div>
      </header>

      <main className="relative z-10 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-[900px]">
          <Reveal as="span" className="block">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-mint">
              <span aria-hidden="true" className="h-px w-6 bg-mint/60" />
              Información legal
            </span>
          </Reveal>
          <Reveal>
            <h1 className="mt-4 text-[clamp(1.9rem,5vw,2.8rem)] text-[#F4F6FF]">
              Aviso legal, privacidad y cookies
            </h1>
          </Reveal>
          <Reveal retraso={0.06}>
            <p className="mt-3 text-[14px] text-white/58">Última actualización: 4 de agosto de 2026</p>
          </Reveal>

          <Reveal retraso={0.12}>
            <nav aria-label="Secciones legales" className="mt-8 flex flex-wrap gap-2">
              {secciones.map((seccion) => (
                <a
                  key={seccion.id}
                  href={`#${seccion.id}`}
                  className="rounded-full border border-white/10 bg-white/[.03] px-4 py-2 text-[14px] text-white/65 backdrop-blur-md transition-colors hover:border-azul/40 hover:bg-azul/10 hover:text-white"
                >
                  {seccion.texto}
                </a>
              ))}
            </nav>
          </Reveal>

          <div className="mt-14 space-y-16">
            {/* ================= AVISO LEGAL ================= */}
            <Reveal>
              <section id="aviso" className="scroll-mt-24">
                <h2 className="text-[26px] text-[#F4F6FF]">Aviso legal</h2>

                <h3 className="mt-8 text-[18px] text-[#F4F6FF]">1. Datos identificativos</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-white/68">
                  En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de
                  la Sociedad de la Información y de Comercio Electrónico (LSSICE), se informa de los
                  siguientes datos:
                </p>
                <Tarjeta>
                  <li>
                    <strong className="font-medium text-[#F4F6FF]">Denominación social:</strong>{" "}
                    Nexo4Pymes Automatización, S.L. (sociedad en constitución)
                  </li>
                  <li>
                    <strong className="font-medium text-[#F4F6FF]">CIF:</strong>{" "}
                    <Pendiente>
                      [PENDIENTE — se asignará tras la inscripción en el Registro Mercantil]
                    </Pendiente>
                  </li>
                  <li>
                    <strong className="font-medium text-[#F4F6FF]">Domicilio social:</strong> Mallorca,
                    Illes Balears, España — <Pendiente>[PENDIENTE dirección completa]</Pendiente>
                  </li>
                  <li>
                    <strong className="font-medium text-[#F4F6FF]">Correo electrónico:</strong>{" "}
                    <a href={`mailto:${marca.email}`} className="text-[#9FB6FF] underline underline-offset-4 hover:text-white">
                      {marca.email}
                    </a>
                  </li>
                  <li>
                    <strong className="font-medium text-[#F4F6FF]">Actividad:</strong> automatización de
                    procesos mediante inteligencia artificial para pymes y autónomos
                  </li>
                  <li>
                    <strong className="font-medium text-[#F4F6FF]">Datos registrales:</strong>{" "}
                    <Pendiente>
                      [PENDIENTE — se completará al inscribirse la sociedad en el Registro Mercantil]
                    </Pendiente>
                  </li>
                </Tarjeta>

                <h3 className="mt-8 text-[18px] text-[#F4F6FF]">2. Objeto y condiciones de uso</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-white/68">
                  Este sitio web tiene como finalidad informar sobre los servicios de Nexo4Pymes y
                  facilitar el contacto con potenciales clientes. El acceso y uso del sitio atribuye
                  la condición de usuario e implica la aceptación plena de las condiciones aquí
                  recogidas desde el momento en que se accede al sitio.
                </p>

                <h3 className="mt-8 text-[18px] text-[#F4F6FF]">
                  3. Propiedad intelectual e industrial
                </h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-white/68">
                  Todos los contenidos del sitio (textos, imágenes, logotipos, diseño gráfico, código
                  fuente) son titularidad de Nexo4Pymes o de terceros que han autorizado su uso, y
                  están protegidos por la normativa de propiedad intelectual e industrial. Queda
                  prohibida su reproducción, distribución, comunicación pública o transformación total
                  o parcial sin autorización expresa y por escrito del titular.
                </p>

                <h3 className="mt-8 text-[18px] text-[#F4F6FF]">4. Enlaces a terceros</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-white/68">
                  Este sitio incluye enlaces a servicios de terceros (Calendly, Instagram, correo
                  electrónico) sobre cuyo contenido, disponibilidad o políticas de privacidad
                  Nexo4Pymes no tiene control ni asume responsabilidad. El acceso a dichos servicios
                  se rige por sus propias condiciones.
                </p>

                <h3 className="mt-8 text-[18px] text-[#F4F6FF]">5. Exclusión de responsabilidad</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-white/68">
                  Nexo4Pymes no garantiza la disponibilidad continua ni la ausencia de errores en el
                  sitio, y no se responsabiliza de los daños o perjuicios derivados de su uso, sin
                  perjuicio de las obligaciones legalmente establecidas en materia de protección al
                  consumidor.
                </p>

                <h3 className="mt-8 text-[18px] text-[#F4F6FF]">6. Legislación y jurisdicción</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-white/68">
                  Las presentes condiciones se rigen por la legislación española. Para la resolución
                  de cualquier controversia derivada del acceso o uso del sitio, y salvo que la
                  normativa aplicable disponga otra cosa cuando el usuario actúe como consumidor, las
                  partes se someten a los juzgados y tribunales de Mallorca (Illes Balears).
                </p>
              </section>
            </Reveal>

            {/* ================= PRIVACIDAD ================= */}
            <Reveal>
              <section id="privacidad" className="scroll-mt-24">
                <h2 className="text-[26px] text-[#F4F6FF]">Política de privacidad</h2>

                <h3 className="mt-8 text-[18px] text-[#F4F6FF]">1. Responsable del tratamiento</h3>
                <Tarjeta>
                  <li>
                    <strong className="font-medium text-[#F4F6FF]">
                      Nexo4Pymes Automatización, S.L.
                    </strong>{" "}
                    (sociedad en constitución)
                  </li>
                  <li>
                    CIF: <Pendiente>[PENDIENTE]</Pendiente>
                  </li>
                  <li>Domicilio: Mallorca, Illes Balears, España</li>
                  <li>
                    Email:{" "}
                    <a href={`mailto:${marca.email}`} className="text-[#9FB6FF] underline underline-offset-4 hover:text-white">
                      {marca.email}
                    </a>
                  </li>
                </Tarjeta>

                <h3 className="mt-8 text-[18px] text-[#F4F6FF]">
                  2. Qué datos tratamos y con qué finalidad
                </h3>
                {/* ACTUALIZADO CON EL REDISEÑO: el sitio SÍ incorpora ya un
                    formulario propio, en /contacto. Antes aquí ponía que no
                    lo había. Si algún día se quita el formulario, esta lista
                    hay que recortarla otra vez. */}
                <p className="mt-3 text-[15.5px] leading-relaxed text-white/68">
                  Los datos personales que tratamos proceden únicamente de:
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-[15.5px] leading-relaxed text-white/68">
                  <li>
                    <strong className="font-medium text-[#F4F6FF]">El formulario de contacto</strong> de
                    la página <em>Contacto</em> (nombre, empresa, dirección de email, teléfono
                    opcional, sector y el contenido del mensaje), con la finalidad de responder a tu
                    consulta. Todos los campos salvo nombre, email y mensaje son opcionales, y el
                    envío requiere que marques expresamente la casilla de consentimiento.
                  </li>
                  <li>
                    El correo electrónico que nos envíes voluntariamente (nombre, dirección de email y
                    cualquier dato incluido en el mensaje), con la finalidad de responder a tu
                    consulta.
                  </li>
                  <li>
                    La reserva de una llamada a través de Calendly (nombre, email y, en su caso,
                    teléfono), con la finalidad de gestionar la cita comercial solicitada. El
                    calendario de Calendly no se carga automáticamente: solo se activa si pulsas el
                    botón correspondiente, tras informarte de ello.
                  </li>
                </ul>
                <p className="mt-3 text-[15.5px] leading-relaxed text-white/68">
                  No se recaba ningún dato personal de forma automática por el simple hecho de navegar
                  por el sitio. Las tipografías se sirven desde nuestro propio dominio, por lo que la
                  navegación no genera ninguna conexión a servidores de terceros. Al enviar el
                  formulario se registra tu dirección IP de forma temporal, con la única finalidad de
                  evitar envíos automatizados masivos (interés legítimo, art. 6.1.f RGPD).
                </p>

                <h3 className="mt-8 text-[18px] text-[#F4F6FF]">3. Base legal del tratamiento</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-white/68">
                  El tratamiento se basa en tu consentimiento, prestado al facilitarnos tus datos
                  voluntariamente, y en la ejecución de medidas precontractuales solicitadas por ti
                  (art. 6.1.a y 6.1.b RGPD).
                </p>

                <h3 className="mt-8 text-[18px] text-[#F4F6FF]">4. Con quién compartimos tus datos</h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-[15.5px] leading-relaxed text-white/68">
                  <li>
                    <strong className="font-medium text-[#F4F6FF]">Calendly, LLC</strong> — encargado del
                    tratamiento para la gestión de reservas; empresa con sede en EE. UU. que ofrece
                    garantías de transferencia internacional (cláusulas contractuales tipo).
                  </li>
                  <li>
                    <strong className="font-medium text-[#F4F6FF]">Google LLC</strong> — proveedor del
                    correo electrónico (Gmail) a través del cual se reciben y responden las consultas.
                  </li>
                  <li>
                    <strong className="font-medium text-[#F4F6FF]">Vercel Inc.</strong> — proveedor de
                    alojamiento del sitio web; empresa con sede en EE. UU. Sus servidores registran
                    datos técnicos de conexión (como la dirección IP) por motivos de seguridad y
                    funcionamiento.
                  </li>
                  {/* Este punto describe al proveedor de automatización que
                      recibe los envíos del formulario (el webhook configurado
                      en WEBHOOK_CONTACTO). Si se cambia de proveedor, hay que
                      cambiar el nombre y la sede que figuran aquí. */}
                  <li>
                    <strong className="font-medium text-[#F4F6FF]">Make (Celonis SE)</strong> —
                    encargado del tratamiento que recibe y encamina los mensajes enviados desde el
                    formulario de contacto hasta nuestro correo. Los datos se procesan en servidores
                    de la Unión Europea.
                  </li>
                </ul>
                <p className="mt-3 text-[15.5px] leading-relaxed text-white/68">
                  No se cede ningún dato a terceros con fines comerciales o publicitarios.
                </p>

                <h3 className="mt-8 text-[18px] text-[#F4F6FF]">5. Plazo de conservación</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-white/68">
                  Los datos se conservan mientras exista una relación comercial activa o una solicitud
                  pendiente de respuesta, y posteriormente durante los plazos legalmente exigibles
                  para atender eventuales responsabilidades.
                </p>

                <h3 className="mt-8 text-[18px] text-[#F4F6FF]">6. Tus derechos</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-white/68">
                  Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición,
                  limitación del tratamiento y portabilidad escribiendo a{" "}
                  <a href={`mailto:${marca.email}`} className="text-[#9FB6FF] underline underline-offset-4 hover:text-white">
                    {marca.email}
                  </a>
                  . Si consideras que no hemos tratado tus datos conforme a la normativa, puedes
                  presentar una reclamación ante la Agencia Española de Protección de Datos (
                  <a
                    href="https://www.aepd.es"
                    target="_blank"
                    rel="noopener"
                    className="text-[#9FB6FF] underline underline-offset-4 hover:text-white"
                  >
                    www.aepd.es
                  </a>
                  ).
                </p>

                <h3 className="mt-8 text-[18px] text-[#F4F6FF]">7. Menores de edad</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-white/68">
                  Los servicios de Nexo4Pymes están dirigidos a empresas y profesionales. No recabamos
                  conscientemente datos de menores de edad.
                </p>
              </section>
            </Reveal>

            {/* ================= COOKIES ================= */}
            <Reveal>
              <section id="cookies" className="scroll-mt-24">
                <h2 className="text-[26px] text-[#F4F6FF]">Política de cookies</h2>

                <h3 className="mt-8 text-[18px] text-[#F4F6FF]">1. Qué son las cookies</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-white/68">
                  Las cookies son pequeños archivos que un sitio web puede almacenar en tu navegador
                  para recordar información sobre tu visita.
                </p>

                <h3 className="mt-8 text-[18px] text-[#F4F6FF]">
                  2. Cookies que utiliza este sitio
                </h3>
                <p className="mt-4 rounded-tarjeta border border-mint/22 bg-gradient-to-br from-mint/[.09] to-mint/[.02] p-5 text-[15.5px] leading-relaxed text-white/78 shadow-[0_24px_60px_rgba(0,0,0,.4),inset_0_1px_0_rgba(255,255,255,.1)] backdrop-blur-xl">
                  <strong className="font-medium text-mint">
                    No se instala ninguna cookie no esencial hasta que la aceptas.
                  </strong>{" "}
                  Al entrar por primera vez verás un banner con dos opciones al mismo nivel: aceptar
                  todas o rechazar todas. Si rechazas —o si simplemente sigues navegando sin
                  responder— no se carga ninguna herramienta de analítica ni de publicidad, y el sitio
                  funciona exactamente igual.
                </p>

                <h4 className="mt-6 text-[16px] font-medium text-[#F4F6FF]">Necesarias</h4>
                <p className="mt-2 text-[15.5px] leading-relaxed text-white/68">
                  Imprescindibles para prestar el servicio, por lo que no requieren consentimiento
                  (art. 22.2 LSSICE). No son cookies de terceros: tu decisión sobre este aviso se
                  guarda en el almacenamiento local de tu propio navegador, para no volver a
                  preguntártelo en cada página. Además, al enviar el formulario de contacto se
                  registra tu dirección IP de forma temporal para evitar envíos automatizados
                  masivos.
                </p>

                <h4 className="mt-6 text-[16px] font-medium text-[#F4F6FF]">Analítica (opcional)</h4>
                <p className="mt-2 text-[15.5px] leading-relaxed text-white/68">
                  Google Analytics 4, de Google Ireland Ltd. Nos permite saber cuánta gente visita el
                  sitio, desde dónde llega y qué páginas consulta, con el fin de mejorarlo. Los
                  informes son agregados y no se usan para identificarte. Instala las cookies{" "}
                  <code className="rounded bg-white/8 px-1.5 py-0.5 font-mono text-[13.5px]">_ga</code> y{" "}
                  <code className="rounded bg-white/8 px-1.5 py-0.5 font-mono text-[13.5px]">_ga_*</code>,
                  con una duración de 24 meses. La dirección IP se trunca antes de almacenarse.
                </p>

                <h4 className="mt-6 text-[16px] font-medium text-[#F4F6FF]">Marketing (opcional)</h4>
                <p className="mt-2 text-[15.5px] leading-relaxed text-white/68">
                  Meta Pixel, de Meta Platforms Ireland Ltd. Permite medir el resultado de nuestros
                  anuncios en Instagram y Facebook y mostrar publicidad a quien ya ha visitado la web.
                  Instala las cookies{" "}
                  <code className="rounded bg-white/8 px-1.5 py-0.5 font-mono text-[13.5px]">_fbp</code> y{" "}
                  <code className="rounded bg-white/8 px-1.5 py-0.5 font-mono text-[13.5px]">_fbc</code>,
                  con una duración de 3 meses. Implica una transferencia internacional de datos a
                  EE. UU., amparada en el Marco de Privacidad de Datos UE-EE. UU. y en cláusulas
                  contractuales tipo.
                </p>

                <h3 className="mt-8 text-[18px] text-[#F4F6FF]">3. Contenido incrustado de terceros</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-white/68">
                  El calendario de reservas de la página de contacto lo proporciona Calendly, LLC. No
                  se carga automáticamente: solo se activa si pulsas el botón correspondiente, después
                  de informarte de qué datos recibirá Calendly. Mientras no lo pulses, tu navegador no
                  establece ninguna conexión con sus servidores.
                </p>
                <p className="mt-3 text-[15.5px] leading-relaxed text-white/68">
                  Las tipografías del sitio se sirven desde nuestro propio dominio y no desde un CDN de
                  terceros, precisamente para evitar que tu dirección IP se transmita a otras empresas
                  durante la simple visita a la web. El sitio está alojado en Vercel Inc., cuyos
                  servidores registran datos técnicos de conexión por motivos de seguridad y
                  funcionamiento, sin que ello implique la instalación de cookies en tu navegador.
                </p>

                <h3 className="mt-8 text-[18px] text-[#F4F6FF]">
                  4. Cómo cambiar o retirar tu consentimiento
                </h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-white/68">
                  Puedes cambiar tu decisión en cualquier momento, y retirarla es tan sencillo como
                  darla. Al retirar una categoría, las cookies que hubiera instalado se eliminan de
                  inmediato.
                </p>
                <p className="mt-4">
                  {/* Este botón es la vía de retirada exigida por el art. 7.3
                      RGPD. También está en el pie de todas las páginas. */}
                  <BotonPreferencias estilo="enlace">
                    Abrir las preferencias de cookies
                  </BotonPreferencias>
                </p>
                <p className="mt-4 text-[15.5px] leading-relaxed text-white/68">
                  En cualquier caso, volveremos a preguntarte pasados 24 meses. También puedes
                  configurar tu navegador para bloquear, eliminar o ser avisado de las cookies desde su
                  configuración de privacidad.
                </p>
              </section>
            </Reveal>
          </div>
        </div>
      </main>

      <footer className="relative z-10 bg-bottle-900/60 px-5 py-8 text-center text-[13.5px] text-white/50 backdrop-blur-xl sm:px-8">
        Nexo4Pymes Automatización, S.L. (en constitución) ·{" "}
        <a href={`mailto:${marca.email}`} className="text-mint/80 underline underline-offset-4 hover:text-mint">
          {marca.email}
        </a>
      </footer>
    </>
  );
}
