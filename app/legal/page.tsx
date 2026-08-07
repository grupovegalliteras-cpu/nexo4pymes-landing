import type { Metadata } from "next";
import Link from "next/link";
import { marca } from "@/content/marca";

/* Aviso legal, privacidad y cookies.
   Antes eran tres pestañas con JavaScript; ahora son tres secciones
   apiladas con id propio. Los enlaces /legal#privacidad del pie y del
   formulario funcionan sin JS y el buscador indexa el texto entero.

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
    <span className="rounded bg-aviso/12 px-1.5 py-0.5 font-mono text-[12.5px] text-aviso">
      {children}
    </span>
  );
}

export default function PaginaLegal() {
  return (
    <>
      <header className="oscuro sticky top-0 z-50 border-b border-white/8 bg-bottle-900/92 backdrop-blur-lg">
        <div className="mx-auto flex max-w-[860px] items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          <Link href="/" className="font-titular text-[16px] font-semibold text-white">
            Nexo<span className="text-coral">4</span>Pymes
          </Link>
          <Link
            href="/"
            className="text-[13.5px] text-white/60 transition-colors hover:text-white"
          >
            ← Volver a la web
          </Link>
        </div>
      </header>

      <main className="bg-cream px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-[760px]">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-teal">
            Información legal
          </span>
          <h1 className="mt-4 text-[clamp(1.9rem,5vw,2.8rem)]">
            Aviso legal, privacidad y cookies
          </h1>
          <p className="mt-3 text-[14px] text-suave">
            Última actualización: 4 de agosto de 2026
          </p>

          <nav aria-label="Secciones legales" className="mt-8 flex flex-wrap gap-2">
            {secciones.map((seccion) => (
              <a
                key={seccion.id}
                href={`#${seccion.id}`}
                className="rounded-full border border-linea bg-white px-4 py-2 text-[14px] text-suave transition-colors hover:border-teal/40 hover:text-teal"
              >
                {seccion.texto}
              </a>
            ))}
          </nav>

          <div className="prose-legal mt-14 space-y-16">
            {/* ================= AVISO LEGAL ================= */}
            <section id="aviso" className="scroll-mt-24">
              <h2 className="text-[26px] text-bottle">Aviso legal</h2>

              <h3 className="mt-8 text-[18px] text-bottle">1. Datos identificativos</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-suave">
                En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de
                la Sociedad de la Información y de Comercio Electrónico (LSSICE), se informa de los
                siguientes datos:
              </p>
              <ul className="mt-4 space-y-2 rounded-2xl border border-linea bg-white p-5 text-[15px] leading-relaxed text-suave">
                <li>
                  <strong className="font-medium text-bottle">Denominación social:</strong>{" "}
                  Nexo4Pymes Automatización, S.L. (sociedad en constitución)
                </li>
                <li>
                  <strong className="font-medium text-bottle">CIF:</strong>{" "}
                  <Pendiente>
                    [PENDIENTE — se asignará tras la inscripción en el Registro Mercantil]
                  </Pendiente>
                </li>
                <li>
                  <strong className="font-medium text-bottle">Domicilio social:</strong> Mallorca,
                  Illes Balears, España — <Pendiente>[PENDIENTE dirección completa]</Pendiente>
                </li>
                <li>
                  <strong className="font-medium text-bottle">Correo electrónico:</strong>{" "}
                  <a href={`mailto:${marca.email}`} className="text-teal underline underline-offset-4">
                    {marca.email}
                  </a>
                </li>
                <li>
                  <strong className="font-medium text-bottle">Actividad:</strong> automatización de
                  procesos mediante inteligencia artificial para pymes y autónomos
                </li>
                <li>
                  <strong className="font-medium text-bottle">Datos registrales:</strong>{" "}
                  <Pendiente>
                    [PENDIENTE — se completará al inscribirse la sociedad en el Registro Mercantil]
                  </Pendiente>
                </li>
              </ul>

              <h3 className="mt-8 text-[18px] text-bottle">2. Objeto y condiciones de uso</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-suave">
                Este sitio web tiene como finalidad informar sobre los servicios de Nexo4Pymes y
                facilitar el contacto con potenciales clientes. El acceso y uso del sitio atribuye
                la condición de usuario e implica la aceptación plena de las condiciones aquí
                recogidas desde el momento en que se accede al sitio.
              </p>

              <h3 className="mt-8 text-[18px] text-bottle">
                3. Propiedad intelectual e industrial
              </h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-suave">
                Todos los contenidos del sitio (textos, imágenes, logotipos, diseño gráfico, código
                fuente) son titularidad de Nexo4Pymes o de terceros que han autorizado su uso, y
                están protegidos por la normativa de propiedad intelectual e industrial. Queda
                prohibida su reproducción, distribución, comunicación pública o transformación total
                o parcial sin autorización expresa y por escrito del titular.
              </p>

              <h3 className="mt-8 text-[18px] text-bottle">4. Enlaces a terceros</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-suave">
                Este sitio incluye enlaces a servicios de terceros (Calendly, Instagram, Facebook,
                correo electrónico) sobre cuyo contenido, disponibilidad o políticas de privacidad
                Nexo4Pymes no tiene control ni asume responsabilidad. El acceso a dichos servicios
                se rige por sus propias condiciones.
              </p>

              <h3 className="mt-8 text-[18px] text-bottle">5. Exclusión de responsabilidad</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-suave">
                Nexo4Pymes no garantiza la disponibilidad continua ni la ausencia de errores en el
                sitio, y no se responsabiliza de los daños o perjuicios derivados de su uso, sin
                perjuicio de las obligaciones legalmente establecidas en materia de protección al
                consumidor.
              </p>

              <h3 className="mt-8 text-[18px] text-bottle">6. Legislación y jurisdicción</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-suave">
                Las presentes condiciones se rigen por la legislación española. Para la resolución
                de cualquier controversia derivada del acceso o uso del sitio, y salvo que la
                normativa aplicable disponga otra cosa cuando el usuario actúe como consumidor, las
                partes se someten a los juzgados y tribunales de Mallorca (Illes Balears).
              </p>
            </section>

            {/* ================= PRIVACIDAD ================= */}
            <section id="privacidad" className="scroll-mt-24">
              <h2 className="text-[26px] text-bottle">Política de privacidad</h2>

              <h3 className="mt-8 text-[18px] text-bottle">1. Responsable del tratamiento</h3>
              <ul className="mt-4 space-y-2 rounded-2xl border border-linea bg-white p-5 text-[15px] leading-relaxed text-suave">
                <li>
                  <strong className="font-medium text-bottle">
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
                  <a href={`mailto:${marca.email}`} className="text-teal underline underline-offset-4">
                    {marca.email}
                  </a>
                </li>
              </ul>

              <h3 className="mt-8 text-[18px] text-bottle">
                2. Qué datos tratamos y con qué finalidad
              </h3>
              {/* Esta frase solo es cierta mientras el formulario de contacto
                  siga abriendo el correo del visitante en vez de enviar los
                  datos a un servidor. Ver el aviso en components/home/Contacto.tsx. */}
              <p className="mt-3 text-[15.5px] leading-relaxed text-suave">
                Este sitio web no incorpora formularios propios de recogida de datos. Los datos
                personales que tratamos proceden únicamente de:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-[15.5px] leading-relaxed text-suave">
                <li>
                  El correo electrónico que nos envíes voluntariamente (nombre, dirección de email y
                  cualquier dato incluido en el mensaje), con la finalidad de responder a tu
                  consulta.
                </li>
                <li>
                  La reserva de una llamada a través de Calendly (nombre, email y, en su caso,
                  teléfono), con la finalidad de gestionar la cita comercial solicitada.
                </li>
              </ul>
              <p className="mt-3 text-[15.5px] leading-relaxed text-suave">
                No se recaba ningún dato personal de forma automática por el simple hecho de navegar
                por el sitio. Las tipografías se sirven desde nuestro propio dominio, por lo que la
                navegación no genera ninguna conexión a servidores de terceros.
              </p>

              <h3 className="mt-8 text-[18px] text-bottle">3. Base legal del tratamiento</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-suave">
                El tratamiento se basa en tu consentimiento, prestado al facilitarnos tus datos
                voluntariamente, y en la ejecución de medidas precontractuales solicitadas por ti
                (art. 6.1.a y 6.1.b RGPD).
              </p>

              <h3 className="mt-8 text-[18px] text-bottle">4. Con quién compartimos tus datos</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-[15.5px] leading-relaxed text-suave">
                <li>
                  <strong className="font-medium text-bottle">Calendly, LLC</strong> — encargado del
                  tratamiento para la gestión de reservas; empresa con sede en EE. UU. que ofrece
                  garantías de transferencia internacional (cláusulas contractuales tipo).
                </li>
                <li>
                  <strong className="font-medium text-bottle">Google LLC</strong> — proveedor del
                  correo electrónico (Gmail) a través del cual se reciben y responden las consultas.
                </li>
                <li>
                  <strong className="font-medium text-bottle">Vercel Inc.</strong> — proveedor de
                  alojamiento del sitio web; empresa con sede en EE. UU. Sus servidores registran
                  datos técnicos de conexión (como la dirección IP) por motivos de seguridad y
                  funcionamiento.
                </li>
              </ul>
              <p className="mt-3 text-[15.5px] leading-relaxed text-suave">
                No se cede ningún dato a terceros con fines comerciales o publicitarios.
              </p>

              <h3 className="mt-8 text-[18px] text-bottle">5. Plazo de conservación</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-suave">
                Los datos se conservan mientras exista una relación comercial activa o una solicitud
                pendiente de respuesta, y posteriormente durante los plazos legalmente exigibles
                para atender eventuales responsabilidades.
              </p>

              <h3 className="mt-8 text-[18px] text-bottle">6. Tus derechos</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-suave">
                Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición,
                limitación del tratamiento y portabilidad escribiendo a{" "}
                <a href={`mailto:${marca.email}`} className="text-teal underline underline-offset-4">
                  {marca.email}
                </a>
                . Si consideras que no hemos tratado tus datos conforme a la normativa, puedes
                presentar una reclamación ante la Agencia Española de Protección de Datos (
                <a
                  href="https://www.aepd.es"
                  target="_blank"
                  rel="noopener"
                  className="text-teal underline underline-offset-4"
                >
                  www.aepd.es
                </a>
                ).
              </p>

              <h3 className="mt-8 text-[18px] text-bottle">7. Menores de edad</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-suave">
                Los servicios de Nexo4Pymes están dirigidos a empresas y profesionales. No recabamos
                conscientemente datos de menores de edad.
              </p>
            </section>

            {/* ================= COOKIES ================= */}
            <section id="cookies" className="scroll-mt-24">
              <h2 className="text-[26px] text-bottle">Política de cookies</h2>

              <h3 className="mt-8 text-[18px] text-bottle">1. Qué son las cookies</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-suave">
                Las cookies son pequeños archivos que un sitio web puede almacenar en tu navegador
                para recordar información sobre tu visita.
              </p>

              <h3 className="mt-8 text-[18px] text-bottle">
                2. Cookies que utiliza este sitio
              </h3>
              <p className="mt-4 rounded-2xl border border-linea bg-white p-5 text-[15.5px] leading-relaxed text-suave">
                Actualmente este sitio{" "}
                <strong className="font-medium text-bottle">
                  no instala cookies propias ni de terceros
                </strong>{" "}
                con fines analíticos, publicitarios o de seguimiento. Por eso no verás un banner de
                consentimiento: no es necesario, porque no se usan cookies no esenciales.
              </p>
              <p className="mt-3 text-[15.5px] leading-relaxed text-suave">
                Tampoco se realiza ninguna conexión externa al navegar: las tipografías del sitio se
                sirven desde nuestro propio dominio y no desde un CDN de terceros, precisamente para
                evitar que tu dirección IP se transmita a otras empresas durante la simple visita a
                la web.
              </p>
              <p className="mt-3 text-[15.5px] leading-relaxed text-suave">
                El sitio está alojado en Vercel Inc., cuyos servidores registran datos técnicos de
                conexión por motivos de seguridad y funcionamiento, sin que ello implique la
                instalación de cookies en tu navegador.
              </p>

              <h3 className="mt-8 text-[18px] text-bottle">3. Cambios futuros</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-suave">
                Si en el futuro incorporamos herramientas de analítica o publicidad (por ejemplo,
                Google Analytics o Meta Pixel), actualizaremos esta política e implementaremos un
                banner de consentimiento previo conforme a la LSSICE y a la Guía sobre el uso de
                cookies de la AEPD, antes de activar dichas cookies.
              </p>

              <h3 className="mt-8 text-[18px] text-bottle">
                4. Gestión de cookies desde el navegador
              </h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-suave">
                Aunque este sitio no instala cookies no esenciales, puedes configurar tu navegador
                en cualquier momento para bloquear, eliminar o ser avisado de las cookies desde su
                configuración de privacidad.
              </p>
            </section>
          </div>
        </div>
      </main>

      <footer className="oscuro bg-bottle-900 px-5 py-8 text-center text-[13.5px] text-white/50 sm:px-8">
        Nexo4Pymes Automatización, S.L. (en constitución) ·{" "}
        <a href={`mailto:${marca.email}`} className="text-mint/80 underline underline-offset-4">
          {marca.email}
        </a>
      </footer>
    </>
  );
}
