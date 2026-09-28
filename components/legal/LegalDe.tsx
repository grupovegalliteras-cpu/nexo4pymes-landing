import { Reveal } from "@/components/motion/Reveal";
import { BotonPreferencias } from "@/components/legal/BotonPreferencias";
import { datosLegales, marca } from "@/content/marca";
import { esPendiente } from "@/lib/legal";
import { CODE, Dato, ENLACE, FUERTE, H2, H3, H4, LISTA, P, Tarjeta } from "./piezas";

/* Deutsche Übersetzung von LegalEs, nur zur Information. Maßgeblich ist die spanische Fassung. */
export function LegalDe() {
  return (
    <div className="mt-14 space-y-16">
      <Reveal>
        <section id="aviso" className="scroll-mt-24">
          <h2 className={H2}>Impressum</h2>

          <h3 className={H3}>1. Angaben zum Anbieter</h3>
          <p className={P}>
            Gemäß Artikel 10 des spanischen Gesetzes 34/2002 vom 11. Juli über Dienste der Informationsgesellschaft und den elektronischen Geschäftsverkehr
            (LSSICE) werden folgende Angaben gemacht:
          </p>
          <Tarjeta>
            <li>
              <strong className={FUERTE}>Inhaber der Website:</strong> <Dato valor={datosLegales.titular} falta="wird ergänzt" />
            </li>
            <li>
              <strong className={FUERTE}>Handelsname:</strong> {datosLegales.nombreComercial} — {marca.razonSocial}
            </li>
            <li>
              <strong className={FUERTE}>{datosLegales.etiquetaIdentificacion === "NIF" ? "Steuernummer (NIF)" : datosLegales.etiquetaIdentificacion}:</strong>{" "}
              <Dato valor={datosLegales.identificacion} falta="wird noch vergeben" />
              {datosLegales.tipoTitular === "persona" && (
                <span className="text-white/50">
                  {" "}
                  — die Gesellschaft befindet sich in Gründung; bis zur Vergabe ihrer Steuernummer haftet einer der Gesellschafter als natürliche Person für die
                  Website
                </span>
              )}
            </li>
            <li>
              <strong className={FUERTE}>Zustellanschrift:</strong> <Dato valor={datosLegales.domicilio} falta="wird ergänzt" />
              {!esPendiente(datosLegales.domicilio) && ` — ${marca.region}, Spanien`}
            </li>
            <li>
              <strong className={FUERTE}>E-Mail:</strong>{" "}
              <a href={`mailto:${marca.email}`} className={ENLACE}>
                {marca.email}
              </a>
            </li>
            <li>
              <strong className={FUERTE}>Tätigkeit:</strong> Entwicklung individueller Software und Systemintegration für kleine Unternehmen und Selbstständige
            </li>
            {datosLegales.registroMercantil ? (
              <li>
                <strong className={FUERTE}>Registerangaben:</strong> {datosLegales.registroMercantil}
              </li>
            ) : (
              <li className="text-white/55">
                <strong className={FUERTE}>Registerangaben:</strong> werden veröffentlicht, sobald die Gesellschaft im Handelsregister eingetragen ist.
              </li>
            )}
          </Tarjeta>

          <h3 className={H3}>2. Zweck und Nutzungsbedingungen</h3>
          <p className={P}>
            Diese Website informiert über die Leistungen von Nexo4Pymes und erleichtert potenziellen Kunden die Kontaktaufnahme. Mit dem Zugriff auf die
            Website und ihrer Nutzung werden Sie zum Nutzer und akzeptieren die hier genannten Bedingungen ab dem Zeitpunkt des Zugriffs vollständig.
          </p>

          <h3 className={H3}>3. Geistiges und gewerbliches Eigentum</h3>
          <p className={P}>
            Alle Inhalte der Website (Texte, Bilder, Logos, Grafikdesign, Quellcode) gehören Nexo4Pymes oder Dritten, die ihre Nutzung genehmigt haben, und
            sind durch das Recht des geistigen und gewerblichen Eigentums geschützt. Ihre vollständige oder teilweise Vervielfältigung, Verbreitung,
            öffentliche Wiedergabe oder Bearbeitung ohne ausdrückliche schriftliche Genehmigung des Inhabers ist untersagt.
          </p>

          <h3 className={H3}>4. Links zu Dritten</h3>
          <p className={P}>
            Diese Website enthält Links zu Diensten Dritter (Calendly, Instagram, E-Mail), auf deren Inhalte, Verfügbarkeit oder Datenschutzrichtlinien
            Nexo4Pymes keinen Einfluss hat und für die keine Verantwortung übernommen wird. Für den Zugriff auf diese Dienste gelten deren eigene Bedingungen.
          </p>

          <h3 className={H3}>5. Haftungsausschluss</h3>
          <p className={P}>
            Nexo4Pymes garantiert weder die ständige Verfügbarkeit der Website noch ihre Fehlerfreiheit und haftet nicht für Schäden aus ihrer Nutzung,
            unbeschadet der gesetzlichen Pflichten im Bereich des Verbraucherschutzes.
          </p>

          <h3 className={H3}>6. Anwendbares Recht und Gerichtsstand</h3>
          <p className={P}>
            Diese Bedingungen unterliegen spanischem Recht. Für Streitigkeiten aus dem Zugriff auf die Website oder ihrer Nutzung unterwerfen sich die
            Parteien den Gerichten von Mallorca (Balearen), sofern das anwendbare Recht nicht Abweichendes vorsieht, wenn der Nutzer als Verbraucher handelt.
          </p>
        </section>
      </Reveal>

      <Reveal>
        <section id="privacidad" className="scroll-mt-24">
          <h2 className={H2}>Datenschutzerklärung</h2>

          <h3 className={H3}>1. Verantwortlicher</h3>
          <Tarjeta>
            <li>
              <strong className={FUERTE}>
                <Dato valor={datosLegales.titular} falta="wird ergänzt" />
              </strong>{" "}
              ({marca.razonSocial})
            </li>
            <li>
              {datosLegales.etiquetaIdentificacion === "NIF" ? "Steuernummer (NIF)" : datosLegales.etiquetaIdentificacion}:{" "}
              <Dato valor={datosLegales.identificacion} falta="wird noch vergeben" />
            </li>
            <li>
              Anschrift: <Dato valor={datosLegales.domicilio} falta="wird ergänzt" />
              {!esPendiente(datosLegales.domicilio) && ` — ${marca.region}, Spanien`}
            </li>
            <li>
              E-Mail:{" "}
              <a href={`mailto:${marca.email}`} className={ENLACE}>
                {marca.email}
              </a>
            </li>
          </Tarjeta>

          <h3 className={H3}>2. Welche Daten wir verarbeiten und wozu</h3>
          <p className={P}>Die personenbezogenen Daten, die wir verarbeiten, stammen ausschließlich aus:</p>
          <ul className={LISTA}>
            <li>
              <strong className={FUERTE}>Dem Kontaktformular</strong> auf der Seite <em>Kontakt</em> (Name, Firma, E-Mail-Adresse, optionale Telefonnummer,
              Branche und Inhalt der Nachricht), um Ihre Anfrage zu beantworten. Alle Felder außer Name, E-Mail und Nachricht sind optional, und das Absenden
              setzt voraus, dass Sie das Einwilligungsfeld ausdrücklich ankreuzen.
            </li>
            <li>E-Mails, die Sie uns freiwillig senden (Name, E-Mail-Adresse und alle Angaben in der Nachricht), um Ihre Anfrage zu beantworten.</li>
            <li>
              Der Buchung eines Gesprächs über Calendly (Name, E-Mail und gegebenenfalls Telefonnummer), um den angefragten Vertriebstermin zu verwalten. Der
              Calendly-Kalender wird nicht automatisch geladen: Er wird erst aktiviert, wenn Sie nach entsprechendem Hinweis auf die Schaltfläche klicken.
            </li>
          </ul>
          <p className={P}>
            Durch das bloße Surfen auf der Website werden keine personenbezogenen Daten automatisch erhoben. Die Schriften werden von unserer eigenen Domain
            ausgeliefert, sodass beim Surfen keine Verbindung zu Servern Dritter entsteht. Beim Absenden des Formulars wird Ihre IP-Adresse vorübergehend
            gespeichert, ausschließlich um massenhafte automatisierte Einsendungen zu verhindern (berechtigtes Interesse, Art. 6 Abs. 1 lit. f DSGVO).
          </p>

          <h3 className={H3}>3. Rechtsgrundlage der Verarbeitung</h3>
          <p className={P}>
            Die Verarbeitung beruht auf Ihrer Einwilligung, die Sie durch die freiwillige Angabe Ihrer Daten erteilen, sowie auf der Durchführung
            vorvertraglicher Maßnahmen auf Ihre Anfrage (Art. 6 Abs. 1 lit. a und b DSGVO).
          </p>

          <h3 className={H3}>4. An wen wir Ihre Daten weitergeben</h3>
          <ul className={LISTA}>
            <li>
              <strong className={FUERTE}>Calendly, LLC</strong> — Auftragsverarbeiter für die Terminverwaltung; Unternehmen mit Sitz in den USA, das Garantien für
              internationale Übermittlungen bietet (Standardvertragsklauseln).
            </li>
            <li>
              <strong className={FUERTE}>Google LLC</strong> — Anbieter des E-Mail-Dienstes (Gmail), über den Anfragen empfangen und beantwortet werden.
            </li>
            <li>
              <strong className={FUERTE}>Vercel Inc.</strong> — Hosting-Anbieter der Website; Unternehmen mit Sitz in den USA. Seine Server speichern technische
              Verbindungsdaten (etwa die IP-Adresse) aus Sicherheits- und Betriebsgründen.
            </li>
            <li>
              <strong className={FUERTE}>Make (Celonis SE)</strong> — Auftragsverarbeiter, der die über das Kontaktformular gesendeten Nachrichten empfängt und an
              unsere E-Mail weiterleitet. Die Daten werden auf Servern in der Europäischen Union verarbeitet.
            </li>
          </ul>
          <p className={P}>Es werden keine Daten zu kommerziellen oder Werbezwecken an Dritte weitergegeben.</p>

          <h3 className={H3}>5. Speicherdauer</h3>
          <p className={P}>
            Die Daten werden gespeichert, solange eine aktive Geschäftsbeziehung oder eine unbeantwortete Anfrage besteht, und danach während der gesetzlich
            vorgeschriebenen Fristen zur Erfüllung etwaiger Haftungsansprüche.
          </p>

          <h3 className={H3}>6. Ihre Rechte</h3>
          <p className={P}>
            Sie können Ihre Rechte auf Auskunft, Berichtigung, Löschung, Widerspruch, Einschränkung der Verarbeitung und Datenübertragbarkeit ausüben, indem
            Sie an{" "}
            <a href={`mailto:${marca.email}`} className={ENLACE}>
              {marca.email}
            </a>{" "}
            schreiben. Wenn Sie der Meinung sind, dass wir Ihre Daten nicht rechtmäßig verarbeitet haben, können Sie Beschwerde bei der spanischen
            Datenschutzbehörde einlegen (
            <a href="https://www.aepd.es" target="_blank" rel="noopener" className={ENLACE}>
              www.aepd.es
            </a>
            ).
          </p>

          <h3 className={H3}>7. Minderjährige</h3>
          <p className={P}>Die Leistungen von Nexo4Pymes richten sich an Unternehmen und Selbstständige. Wir erheben wissentlich keine Daten von Minderjährigen.</p>
        </section>
      </Reveal>

      <Reveal>
        <section id="cookies" className="scroll-mt-24">
          <h2 className={H2}>Cookie-Richtlinie</h2>

          <h3 className={H3}>1. Was Cookies sind</h3>
          <p className={P}>Cookies sind kleine Dateien, die eine Website in Ihrem Browser speichern kann, um sich an Informationen über Ihren Besuch zu erinnern.</p>

          <h3 className={H3}>2. Cookies auf dieser Website</h3>
          <p className="mt-4 rounded-tarjeta border border-mint/22 bg-gradient-to-br from-mint/[.09] to-mint/[.02] p-5 text-[15.5px] leading-relaxed text-white/78 shadow-[0_24px_60px_rgba(0,0,0,.4),inset_0_1px_0_rgba(255,255,255,.1)] backdrop-blur-xl">
            <strong className="font-medium text-mint">Kein nicht notwendiges Cookie wird gesetzt, bevor Sie zustimmen.</strong> Beim ersten Besuch sehen Sie ein
            Banner mit zwei gleichrangigen Optionen: alle akzeptieren oder alle ablehnen. Wenn Sie ablehnen — oder einfach weitersurfen, ohne zu antworten —,
            wird kein Statistik- oder Werbewerkzeug geladen, und die Website funktioniert genauso.
          </p>

          <h4 className={H4}>Notwendig</h4>
          <p className="mt-2 text-[15.5px] leading-relaxed text-white/68">
            Für die Erbringung des Dienstes unerlässlich und daher nicht einwilligungspflichtig (Art. 22.2 LSSICE). Es sind keine Cookies von Drittanbietern:
            Ihre Entscheidung zu diesem Hinweis und die gewählte Sprache werden im lokalen Speicher Ihres Browsers und in einem eigenen Cookie abgelegt,
            damit wir nicht auf jeder Seite erneut fragen. Die Live-Demo speichert dort außerdem, was Sie in ihr tun (Testanfragen, Arbeitsberichte und
            Rechnungen mit erfundenen Daten) und ob Sie das helle oder dunkle Design bevorzugen, damit die Demo sich merkt, wo Sie aufgehört haben; nichts
            davon verlässt Ihr Gerät. Außerdem wird beim Absenden des Kontaktformulars Ihre IP-Adresse vorübergehend gespeichert, um massenhafte
            automatisierte Einsendungen zu verhindern.
          </p>

          <h4 className={H4}>Statistik (optional)</h4>
          <p className="mt-2 text-[15.5px] leading-relaxed text-white/68">
            Google Analytics 4 von Google Ireland Ltd. Zeigt uns, wie viele Menschen die Website besuchen, woher sie kommen und welche Seiten sie aufrufen,
            damit wir sie verbessern können. Die Berichte sind zusammengefasst und dienen nicht Ihrer Identifizierung. Es setzt die Cookies{" "}
            <code className={CODE}>_ga</code> und <code className={CODE}>_ga_*</code> mit einer Laufzeit von 24 Monaten. Die IP-Adresse wird vor der
            Speicherung gekürzt.
          </p>

          <h4 className={H4}>Marketing (optional)</h4>
          <p className="mt-2 text-[15.5px] leading-relaxed text-white/68">
            Meta Pixel von Meta Platforms Ireland Ltd. Damit messen wir die Ergebnisse unserer Anzeigen auf Instagram und Facebook und zeigen Menschen, die
            die Website schon besucht haben, Werbung. Es setzt die Cookies <code className={CODE}>_fbp</code> und <code className={CODE}>_fbc</code> mit
            einer Laufzeit von 3 Monaten. Dies beinhaltet eine Datenübermittlung in die USA auf Grundlage des EU-US-Datenschutzrahmens und von
            Standardvertragsklauseln.
          </p>

          <h3 className={H3}>3. Eingebettete Inhalte Dritter</h3>
          <p className={P}>
            Der Buchungskalender auf der Kontaktseite wird von Calendly, LLC bereitgestellt. Er wird nicht automatisch geladen: Er wird erst aktiviert, wenn
            Sie auf die entsprechende Schaltfläche klicken, nachdem wir Sie informiert haben, welche Daten Calendly erhält. Bis dahin baut Ihr Browser keine
            Verbindung zu dessen Servern auf.
          </p>
          <p className={P}>
            Die Schriften der Website werden von unserer eigenen Domain und nicht über ein CDN Dritter ausgeliefert, gerade damit Ihre IP-Adresse beim
            bloßen Besuch nicht an andere Unternehmen übermittelt wird. Die Website wird bei Vercel Inc. gehostet, dessen Server technische Verbindungsdaten
            aus Sicherheits- und Betriebsgründen speichern, ohne dass dabei Cookies in Ihrem Browser gesetzt werden.
          </p>

          <h3 className={H3}>4. Einwilligung ändern oder widerrufen</h3>
          <p className={P}>
            Sie können Ihre Entscheidung jederzeit ändern, und der Widerruf ist so einfach wie die Erteilung. Wenn Sie eine Kategorie widerrufen, werden die
            von ihr gesetzten Cookies sofort gelöscht.
          </p>
          <p className="mt-4">
            <BotonPreferencias estilo="enlace">Cookie-Einstellungen öffnen</BotonPreferencias>
          </p>
          <p className="mt-4 text-[15.5px] leading-relaxed text-white/68">
            In jedem Fall fragen wir Sie nach 24 Monaten erneut. Sie können Ihren Browser außerdem in den Datenschutzeinstellungen so konfigurieren, dass er
            Cookies blockiert, löscht oder Sie vorher warnt.
          </p>
        </section>
      </Reveal>
    </div>
  );
}
