import { Reveal } from "@/components/motion/Reveal";
import { BotonPreferencias } from "@/components/legal/BotonPreferencias";
import { datosLegales, marca } from "@/content/marca";
import { esPendiente } from "@/lib/legal";
import { CODE, Dato, ENLACE, FUERTE, H2, H3, H4, LISTA, P, Tarjeta } from "./piezas";

/* English courtesy translation of LegalEs. The Spanish version prevails. */
export function LegalEn() {
  return (
    <div className="mt-14 space-y-16">
      <Reveal>
        <section id="aviso" className="scroll-mt-24">
          <h2 className={H2}>Legal notice</h2>

          <h3 className={H3}>1. Identification details</h3>
          <p className={P}>
            In accordance with article 10 of Spanish Law 34/2002 of 11 July on Information Society Services and Electronic Commerce (LSSICE), the following
            details are provided:
          </p>
          <Tarjeta>
            <li>
              <strong className={FUERTE}>Website owner:</strong> <Dato valor={datosLegales.titular} falta="to be completed" />
            </li>
            <li>
              <strong className={FUERTE}>Trade name:</strong> {datosLegales.nombreComercial} — {marca.razonSocial}
            </li>
            <li>
              <strong className={FUERTE}>{datosLegales.etiquetaIdentificacion === "NIF" ? "Tax ID (NIF)" : datosLegales.etiquetaIdentificacion}:</strong>{" "}
              <Dato valor={datosLegales.identificacion} falta="to be assigned" />
              {datosLegales.tipoTitular === "persona" && (
                <span className="text-white/50"> — the company is being incorporated, so until it is assigned a tax ID one of the partners is responsible for the site as an individual</span>
              )}
            </li>
            <li>
              <strong className={FUERTE}>Address for notices:</strong> <Dato valor={datosLegales.domicilio} falta="to be completed" />
              {!esPendiente(datosLegales.domicilio) && ` — ${marca.region}, Spain`}
            </li>
            <li>
              <strong className={FUERTE}>Email:</strong>{" "}
              <a href={`mailto:${marca.email}`} className={ENLACE}>
                {marca.email}
              </a>
            </li>
            <li>
              <strong className={FUERTE}>Activity:</strong> custom software development and systems integration for small businesses and the self-employed
            </li>
            {datosLegales.registroMercantil ? (
              <li>
                <strong className={FUERTE}>Registration details:</strong> {datosLegales.registroMercantil}
              </li>
            ) : (
              <li className="text-white/55">
                <strong className={FUERTE}>Registration details:</strong> will be published once the company is entered in the Mercantile Register.
              </li>
            )}
          </Tarjeta>

          <h3 className={H3}>2. Purpose and terms of use</h3>
          <p className={P}>
            This website is intended to provide information about Nexo4Pymes&apos; services and to make it easy for potential clients to get in touch. Accessing
            and using the site makes you a user and implies full acceptance of the terms set out here from the moment you access it.
          </p>

          <h3 className={H3}>3. Intellectual and industrial property</h3>
          <p className={P}>
            All content on the site (text, images, logos, graphic design, source code) belongs to Nexo4Pymes or to third parties who have authorised its use,
            and is protected by intellectual and industrial property law. Its total or partial reproduction, distribution, public communication or
            transformation without the owner&apos;s express written authorisation is prohibited.
          </p>

          <h3 className={H3}>4. Links to third parties</h3>
          <p className={P}>
            This site includes links to third-party services (Calendly, Instagram, email) over whose content, availability or privacy policies Nexo4Pymes has
            no control and for which it accepts no responsibility. Access to those services is governed by their own terms.
          </p>

          <h3 className={H3}>5. Disclaimer</h3>
          <p className={P}>
            Nexo4Pymes does not guarantee the continuous availability of the site or that it is free of errors, and is not responsible for any damage arising
            from its use, without prejudice to the obligations established by consumer protection law.
          </p>

          <h3 className={H3}>6. Governing law and jurisdiction</h3>
          <p className={P}>
            These terms are governed by Spanish law. To resolve any dispute arising from access to or use of the site, and unless applicable law provides
            otherwise where the user acts as a consumer, the parties submit to the courts of Mallorca (Balearic Islands).
          </p>
        </section>
      </Reveal>

      <Reveal>
        <section id="privacidad" className="scroll-mt-24">
          <h2 className={H2}>Privacy policy</h2>

          <h3 className={H3}>1. Data controller</h3>
          <Tarjeta>
            <li>
              <strong className={FUERTE}>
                <Dato valor={datosLegales.titular} falta="to be completed" />
              </strong>{" "}
              ({marca.razonSocial})
            </li>
            <li>
              {datosLegales.etiquetaIdentificacion === "NIF" ? "Tax ID (NIF)" : datosLegales.etiquetaIdentificacion}:{" "}
              <Dato valor={datosLegales.identificacion} falta="to be assigned" />
            </li>
            <li>
              Address: <Dato valor={datosLegales.domicilio} falta="to be completed" />
              {!esPendiente(datosLegales.domicilio) && ` — ${marca.region}, Spain`}
            </li>
            <li>
              Email:{" "}
              <a href={`mailto:${marca.email}`} className={ENLACE}>
                {marca.email}
              </a>
            </li>
          </Tarjeta>

          <h3 className={H3}>2. What data we process and why</h3>
          <p className={P}>The personal data we process comes only from:</p>
          <ul className={LISTA}>
            <li>
              <strong className={FUERTE}>The contact form</strong> on the <em>Contact</em> page (name, company, email address, optional phone number, industry
              and the content of the message), in order to reply to your enquiry. All fields except name, email and message are optional, and sending it
              requires you to tick the consent box explicitly.
            </li>
            <li>Any email you choose to send us (name, email address and any data included in the message), in order to reply to your enquiry.</li>
            <li>
              Booking a call through Calendly (name, email and, where applicable, phone number), in order to manage the requested sales appointment. The
              Calendly calendar does not load automatically: it is only activated if you press the corresponding button, after being informed about it.
            </li>
          </ul>
          <p className={P}>
            No personal data is collected automatically simply by browsing the site. Fonts are served from our own domain, so browsing does not create any
            connection to third-party servers. When you send the form, your IP address is recorded temporarily, solely to prevent mass automated submissions
            (legitimate interest, art. 6.1.f GDPR).
          </p>

          <h3 className={H3}>3. Legal basis for processing</h3>
          <p className={P}>
            Processing is based on your consent, given when you voluntarily provide your data, and on the performance of pre-contractual steps requested by
            you (art. 6.1.a and 6.1.b GDPR).
          </p>

          <h3 className={H3}>4. Who we share your data with</h3>
          <ul className={LISTA}>
            <li>
              <strong className={FUERTE}>Calendly, LLC</strong> — processor for booking management; a US-based company that offers international transfer
              safeguards (standard contractual clauses).
            </li>
            <li>
              <strong className={FUERTE}>Google LLC</strong> — provider of the email service (Gmail) through which enquiries are received and answered.
            </li>
            <li>
              <strong className={FUERTE}>Vercel Inc.</strong> — website hosting provider; a US-based company. Its servers record technical connection data
              (such as the IP address) for security and operational reasons.
            </li>
            <li>
              <strong className={FUERTE}>Make (Celonis SE)</strong> — processor that receives the messages sent from the contact form and forwards them to our
              email. Data is processed on servers in the European Union.
            </li>
          </ul>
          <p className={P}>No data is passed to third parties for commercial or advertising purposes.</p>

          <h3 className={H3}>5. Retention period</h3>
          <p className={P}>
            Data is kept while there is an active business relationship or a request pending a reply, and afterwards for the legally required periods to
            address any possible liabilities.
          </p>

          <h3 className={H3}>6. Your rights</h3>
          <p className={P}>
            You can exercise your rights of access, rectification, erasure, objection, restriction of processing and portability by writing to{" "}
            <a href={`mailto:${marca.email}`} className={ENLACE}>
              {marca.email}
            </a>
            . If you believe we have not processed your data in accordance with the law, you can lodge a complaint with the Spanish Data Protection Agency (
            <a href="https://www.aepd.es" target="_blank" rel="noopener" className={ENLACE}>
              www.aepd.es
            </a>
            ).
          </p>

          <h3 className={H3}>7. Minors</h3>
          <p className={P}>Nexo4Pymes&apos; services are aimed at businesses and professionals. We do not knowingly collect data from minors.</p>
        </section>
      </Reveal>

      <Reveal>
        <section id="cookies" className="scroll-mt-24">
          <h2 className={H2}>Cookie policy</h2>

          <h3 className={H3}>1. What cookies are</h3>
          <p className={P}>Cookies are small files that a website can store in your browser to remember information about your visit.</p>

          <h3 className={H3}>2. Cookies used on this site</h3>
          <p className="mt-4 rounded-tarjeta border border-mint/22 bg-gradient-to-br from-mint/[.09] to-mint/[.02] p-5 text-[15.5px] leading-relaxed text-white/78 shadow-[0_24px_60px_rgba(0,0,0,.4),inset_0_1px_0_rgba(255,255,255,.1)] backdrop-blur-xl">
            <strong className="font-medium text-mint">No non-essential cookie is set until you accept it.</strong> When you first visit you will see a banner
            with two options at the same level: accept all or reject all. If you reject — or simply keep browsing without answering — no analytics or
            advertising tool is loaded, and the site works exactly the same.
          </p>

          <h4 className={H4}>Essential</h4>
          <p className="mt-2 text-[15.5px] leading-relaxed text-white/68">
            Needed to provide the service, so they do not require consent (art. 22.2 LSSICE). They are not third-party cookies: your choice about this notice
            and the language you pick are stored in your own browser&apos;s local storage and in a first-party cookie, so we don&apos;t ask you again on
            every page. The live demo also stores there what you do in it (test requests, job reports and invoices, with fictitious data) and whether you
            prefer the light or dark theme, so the demo remembers where you left off; it never leaves your device. In addition, when you send the contact
            form your IP address is recorded temporarily to prevent mass automated submissions.
          </p>

          <h4 className={H4}>Analytics (optional)</h4>
          <p className="mt-2 text-[15.5px] leading-relaxed text-white/68">
            Google Analytics 4, from Google Ireland Ltd. It tells us how many people visit the site, where they come from and which pages they view, so we
            can improve it. Reports are aggregated and not used to identify you. It sets the cookies <code className={CODE}>_ga</code> and{" "}
            <code className={CODE}>_ga_*</code>, lasting 24 months. The IP address is truncated before being stored.
          </p>

          <h4 className={H4}>Marketing (optional)</h4>
          <p className="mt-2 text-[15.5px] leading-relaxed text-white/68">
            Meta Pixel, from Meta Platforms Ireland Ltd. It lets us measure the results of our Instagram and Facebook ads and show advertising to people who
            have already visited the website. It sets the cookies <code className={CODE}>_fbp</code> and <code className={CODE}>_fbc</code>, lasting 3
            months. It involves an international data transfer to the USA, covered by the EU-US Data Privacy Framework and standard contractual clauses.
          </p>

          <h3 className={H3}>3. Embedded third-party content</h3>
          <p className={P}>
            The booking calendar on the contact page is provided by Calendly, LLC. It does not load automatically: it is only activated if you press the
            corresponding button, after being told what data Calendly will receive. Until you press it, your browser makes no connection to its servers.
          </p>
          <p className={P}>
            The site&apos;s fonts are served from our own domain and not from a third-party CDN, precisely to avoid your IP address being sent to other
            companies just by visiting the website. The site is hosted by Vercel Inc., whose servers record technical connection data for security and
            operational reasons, without this involving any cookies being set in your browser.
          </p>

          <h3 className={H3}>4. How to change or withdraw your consent</h3>
          <p className={P}>
            You can change your decision at any time, and withdrawing it is as easy as giving it. When you withdraw a category, any cookies it had set are
            deleted immediately.
          </p>
          <p className="mt-4">
            <BotonPreferencias estilo="enlace">Open cookie preferences</BotonPreferencias>
          </p>
          <p className="mt-4 text-[15.5px] leading-relaxed text-white/68">
            In any case, we will ask you again after 24 months. You can also set your browser to block, delete or warn you about cookies from its privacy
            settings.
          </p>
        </section>
      </Reveal>
    </div>
  );
}
