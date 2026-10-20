/* ============================================================
   PREGUNTAS FRECUENTES DE LA PORTADA

   Estaban escritas dentro de components/site/landing.tsx, que es un
   componente de cliente. Para que el buscador vea estas mismas
   preguntas como datos estructurados (FAQPage) hace falta leerlas en
   el servidor, y de ahí este archivo.

   SE ESCRIBEN AQUÍ Y EN NINGÚN OTRO SITIO. La portada las pinta y
   app/(demo)/[lang]/page.tsx las publica en JSON-LD: dos copias a
   mano acabarían contradiciéndose el día que se cambie una.

   Cada entrada es [pregunta, respuesta]. La respuesta tiene que
   poder leerse suelta, sin la pregunta delante: así es como la
   recorta ChatGPT o una AI Overview cuando la cita.

   LAS DOS PRIMERAS SON DEL ESTUDIO Y VAN PRIMERAS A PROPÓSITO.
   Las siete preguntas eran del programa de empresas de servicios —el
   número de teléfono, la cobertura, la gestoría— y en una portada que
   ya enseña ese programa a fondo, eso dejaba sin contestar la duda
   que de verdad tiene quien llega: si esto vale para su negocio, que
   no es de servicios. Ahora la primera pregunta es justo esa.
   Salieron «¿tenemos que instalar algo?» y «¿sustituye a nuestra
   gestoría?», que son detalles del programa y tienen su sitio en las
   landings de /modulos.
   ============================================================ */

export type ParFaq = readonly [pregunta: string, respuesta: string];

export const FAQ_PORTADA = {
  es: [
    ["¿Solo trabajáis con empresas de servicios?", "No. Ese programa se enseña entero en esta página porque está construido y funcionando, y es la mejor prueba que tenemos, pero lo que hacemos es software a medida: sistemas de gestión, configuradores para la web, fichaje e integraciones, para pymes de cualquier sector."],
    ["¿De quién es el software que nos construís?", "Vuestro. El código y la base de datos se despliegan en vuestras propias cuentas, así que no hay licencia mensual por usar lo construido ni plataforma de la que no se pueda salir, y tampoco hay permanencia: cada fase se aprueba por separado. CentralAvisos es otra cosa —un producto nuestro que se contrata por cuota— y eso se dice donde se ofrece."],
    ["¿Qué pasa con nuestros datos?", "Son vuestros. Se alojan en servidores de la Unión Europea, con copias de seguridad diarias, y podéis exportarlos cuando queráis. Cada persona del equipo ve solo lo que le toca."],
    ["¿Tenemos que cambiar de número de teléfono?", "No. Vuestros clientes siguen llamando al número de siempre. Las llamadas se desvían a Central Avisos, que las atiende, las graba y las registra."],
    ["¿Funciona si el técnico no tiene cobertura?", "Sí. La app guarda el parte, las fotos y la firma en el móvil y lo envía todo en cuanto vuelve la señal. En la demo podéis probarlo desde el menú Más."],
    ["¿Cómo se factura?", "Facturación integrada con VeriFactu: la factura sale del parte de trabajo, con su QR, y se envía por email o WhatsApp con enlace de pago."],
    ["¿Cuánto cuesta?", "Depende de los módulos y del tamaño del equipo. Tras el diagnóstico os damos un precio cerrado por escrito, sin sorpresas."],
  ],
  en: [
    ["Do you only work with service companies?", "No. That system is shown in full on this page because it is built and running, and it is the best proof we have, but what we do is custom software: management systems, web configurators, time clocking and integrations, for small businesses in any sector."],
    ["Who owns the software you build for us?", "You do. The code and the database are deployed in your own accounts, so there is no monthly licence for using what we built and no platform you cannot leave, and there is no lock-in period either: each phase is approved on its own. CentralAvisos is a different thing — a product of ours with a monthly fee — and we say so where it is offered."],
    ["What happens to my data?", "It's yours. It's hosted on servers in the European Union, with daily backups, and you can export it whenever you like. Each team member only sees what concerns them."],
    ["Do I have to change my phone number?", "No. Your customers keep calling your usual number. Calls are forwarded to Central Avisos, which answers, records and logs them."],
    ["Does it work if the technician has no signal?", "Yes. The app stores the job report, photos and signature on the phone and sends everything as soon as the signal is back. You can try it in the demo from the More menu."],
    ["How does invoicing work?", "Invoicing with VeriFactu built in, the Spanish tax agency's system for registered invoices: the invoice is created from the job report, with its QR code, and sent by email or WhatsApp with a payment link."],
    ["How much does it cost?", "It depends on the modules and the size of your team. After the diagnosis we give you a fixed price in writing, no surprises."],
  ],
  de: [
    ["Arbeiten Sie nur mit Dienstleistungsbetrieben?", "Nein. Dieses System wird auf dieser Seite vollständig gezeigt, weil es gebaut ist und läuft — es ist unser bester Beleg. Was wir machen, ist individuelle Software: Verwaltungssysteme, Web-Konfiguratoren, Zeiterfassung und Integrationen, für kleine Unternehmen jeder Branche."],
    ["Wem gehört die Software, die Sie für uns bauen?", "Ihnen. Code und Datenbank werden in Ihren eigenen Konten bereitgestellt, es gibt also keine monatliche Lizenz für das Gebaute und keine Plattform, aus der man nicht herauskommt, und auch keine Mindestlaufzeit: Jede Phase wird einzeln freigegeben. CentralAvisos ist etwas anderes — ein eigenes Produkt mit monatlicher Gebühr — und das sagen wir dort, wo es angeboten wird."],
    ["Was passiert mit meinen Daten?", "Sie gehören Ihnen. Sie liegen auf Servern in der Europäischen Union, mit täglichen Backups, und Sie können sie jederzeit exportieren. Jede Person im Team sieht nur, was sie betrifft."],
    ["Muss ich meine Telefonnummer ändern?", "Nein. Ihre Kunden rufen weiter Ihre gewohnte Nummer an. Die Anrufe werden an Central Avisos weitergeleitet, das sie annimmt, aufzeichnet und erfasst."],
    ["Funktioniert es, wenn der Techniker kein Netz hat?", "Ja. Die App speichert Bericht, Fotos und Unterschrift auf dem Handy und sendet alles, sobald wieder Empfang da ist. In der Demo können Sie das über das Menü Mehr ausprobieren."],
    ["Wie funktioniert die Rechnungsstellung?", "Mit integriertem VeriFactu, dem System der spanischen Steuerbehörde für registrierte Rechnungen: Die Rechnung entsteht aus dem Arbeitsbericht, mit QR-Code, und geht per E-Mail oder WhatsApp mit Zahlungslink raus."],
    ["Was kostet das?", "Das hängt von den Modulen und der Größe Ihres Teams ab. Nach der Analyse bekommen Sie einen Festpreis schriftlich, ohne Überraschungen."],
  ],
} as const satisfies Record<"es"|"en"|"de", readonly ParFaq[]>;
