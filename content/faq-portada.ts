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
   ============================================================ */

export type ParFaq = readonly [pregunta: string, respuesta: string];

export const FAQ_PORTADA = {
  es: [
    ["¿Qué pasa con mis datos?", "Son tuyos. Se alojan en servidores de la Unión Europea, con copias de seguridad diarias, y puedes exportarlos cuando quieras. Cada persona del equipo ve solo lo que le toca."],
    ["¿Tengo que cambiar de número de teléfono?", "No. Tus clientes siguen llamando al número de siempre. Las llamadas se desvían a Central Avisos, que las atiende, las graba y las registra."],
    ["¿Funciona si el técnico no tiene cobertura?", "Sí. La app guarda el parte, las fotos y la firma en el móvil y lo envía todo en cuanto vuelve la señal. En la demo puedes probarlo desde el menú Más."],
    ["¿Tengo que instalar algo?", "No hace falta tienda de aplicaciones. La app se instala desde el navegador del móvil y el panel se abre en cualquier ordenador o tablet."],
    ["¿Sustituye a mi gestoría?", "No. Las nóminas las sigue haciendo tu gestoría: nosotros se las repartimos a cada trabajador. Y la contabilidad queda ordenada y lista para que tu gestoría trabaje menos."],
    ["¿Cómo se factura?", "Facturación integrada con VeriFactu: la factura sale del parte de trabajo, con su QR, y se envía por email o WhatsApp con enlace de pago."],
    ["¿Cuánto cuesta?", "Depende de los módulos y del tamaño del equipo. Tras el diagnóstico te damos un precio cerrado por escrito, sin sorpresas."],
  ],
  en: [
    ["What happens to my data?", "It's yours. It's hosted on servers in the European Union, with daily backups, and you can export it whenever you like. Each team member only sees what concerns them."],
    ["Do I have to change my phone number?", "No. Your customers keep calling your usual number. Calls are forwarded to Central Avisos, which answers, records and logs them."],
    ["Does it work if the technician has no signal?", "Yes. The app stores the job report, photos and signature on the phone and sends everything as soon as the signal is back. You can try it in the demo from the More menu."],
    ["Do I need to install anything?", "No app store needed. The app installs from the phone's browser and the dashboard opens on any computer or tablet."],
    ["Does it replace my accountant (gestoría)?", "No. Your gestoría keeps doing the payroll: we just deliver each payslip to each worker. And the books stay tidy and ready, so your gestoría has less to do."],
    ["How does invoicing work?", "Invoicing with VeriFactu built in, the Spanish tax agency's system for registered invoices: the invoice is created from the job report, with its QR code, and sent by email or WhatsApp with a payment link."],
    ["How much does it cost?", "It depends on the modules and the size of your team. After the diagnosis we give you a fixed price in writing, no surprises."],
  ],
  de: [
    ["Was passiert mit meinen Daten?", "Sie gehören Ihnen. Sie liegen auf Servern in der Europäischen Union, mit täglichen Backups, und Sie können sie jederzeit exportieren. Jede Person im Team sieht nur, was sie betrifft."],
    ["Muss ich meine Telefonnummer ändern?", "Nein. Ihre Kunden rufen weiter Ihre gewohnte Nummer an. Die Anrufe werden an Central Avisos weitergeleitet, das sie annimmt, aufzeichnet und erfasst."],
    ["Funktioniert es, wenn der Techniker kein Netz hat?", "Ja. Die App speichert Bericht, Fotos und Unterschrift auf dem Handy und sendet alles, sobald wieder Empfang da ist. In der Demo können Sie das über das Menü Mehr ausprobieren."],
    ["Muss ich etwas installieren?", "Kein App-Store nötig. Die App wird über den Browser des Handys installiert, und das Dashboard öffnet sich auf jedem Computer oder Tablet."],
    ["Ersetzt das meine Steuerberatung (Gestoría)?", "Nein. Die Lohnabrechnung macht weiterhin Ihre Gestoría: Wir verteilen nur jedem Mitarbeiter seinen Lohnzettel. Und die Buchhaltung ist geordnet und fertig, damit Ihre Gestoría weniger Arbeit hat."],
    ["Wie funktioniert die Rechnungsstellung?", "Mit integriertem VeriFactu, dem System der spanischen Steuerbehörde für registrierte Rechnungen: Die Rechnung entsteht aus dem Arbeitsbericht, mit QR-Code, und geht per E-Mail oder WhatsApp mit Zahlungslink raus."],
    ["Was kostet das?", "Das hängt von den Modulen und der Größe Ihres Teams ab. Nach der Analyse bekommen Sie einen Festpreis schriftlich, ohne Überraschungen."],
  ],
} as const satisfies Record<"es"|"en"|"de", readonly ParFaq[]>;
