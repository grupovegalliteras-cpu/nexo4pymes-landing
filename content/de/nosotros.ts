/* Deutsche Fassung von content/nosotros.ts */

export const navNosotros = [
  { href: "#historia", texto: "Wer wir sind" },
  { href: "#valores", texto: "So arbeiten wir" },
  { href: "#datos", texto: "Daten und DSGVO" },
];

export const heroNosotros = {
  categoria: "Wer wir sind",
  titularA: "Ein kleines Team",
  titularB: "von Mallorca",
  parrafo: "Kein gläsernes Büro und keine Vertriebsabteilung. Wir sind dieselben Menschen, die den Anruf annehmen, die Analyse machen und den Code schreiben.",
  cta: "Schreiben Sie uns auf WhatsApp",
  micro: "15 Min. · unverbindlich · ohne Karte",
};

export const historia = {
  categoria: "Die Idee",
  titular: "Die meisten kleinen Firmen brauchen nicht noch ein Programm",
  parrafos: [
    "Nexo4Pymes entstand aus einer einfachen Idee: Die meisten kleinen Unternehmen brauchen kein weiteres Standardwerkzeug, an das sie sich anpassen müssen, sondern jemanden, der sich ansieht, wie sie arbeiten, und ihnen baut, was fehlt. In dieser Branche gibt es genug spektakuläre Demos und zu wenige, die sich hinsetzen und das Geschäft verstehen, bevor sie etwas verkaufen.",
    "Wir sind ein kleines Team und arbeiten mit einer begrenzten Zahl von Kunden gleichzeitig. Das ist keine künstliche Knappheit: Nur so können wir in den Wochen nach dem Start dranbleiben, und genau dann entscheidet sich, ob ein System genutzt oder aufgegeben wird.",
    "Wir sprechen die Sprache des Geschäfts, keinen Fachjargon. Wenn Sie einmal etwas nicht verstehen, ist das unser Fehler, nicht Ihrer.",
  ],
  hechos: [
    { valor: "Mallorca", etiqueta: "Von hier aus arbeiten wir" },
    { valor: "Ganz Spanien", etiqueta: "Dort betreuen wir Kunden, aus der Ferne" },
    { valor: "3", etiqueta: "Projekte gleichzeitig, höchstens" },
  ],
};

export const valores = {
  categoria: "So arbeiten wir",
  titular: "Vier Regeln, über die wir nicht verhandeln",
  intro: "Das sind keine Werte für die Wand. Es sind Entscheidungen, die uns ab und zu Geld kosten und die wir trotzdem treffen.",
  lista: [
    {
      icono: "lupa" as const,
      titulo: "Analyse vor Produkt",
      texto: "Wir beginnen nie mit dem Werkzeug. Software auf einem kaputten Prozess lässt ihn genauso kaputt, nur bezahlt. Zuerst schauen wir, wie Sie arbeiten; dann entscheiden wir, was gebaut wird.",
    },
    {
      icono: "verificado" as const,
      titulo: "Nein sagen, wenn es richtig ist",
      texto: "Wenn die Analyse zeigt, dass nichts gebaut werden muss, schreiben wir das in den Bericht. Lieber verlieren wir einen Auftrag, als jemanden mit einem System zurückzulassen, das er nicht nutzt.",
    },
    {
      icono: "escudo" as const,
      titulo: "Das System gehört am Ende Ihnen",
      texto: "Code und Daten bleiben in Ihren Konten, ohne monatliche Lizenz. Wenn Sie eines Tages ohne uns weitermachen möchten, nehmen Sie alles mit und es gibt nichts zu retten.",
    },
    {
      icono: "reloj" as const,
      titulo: "Wenige Kunden gleichzeitig",
      texto: "Lieber drei Projekte gut als zehn angefangen und keines fertig. Die Wochen nach dem Start entscheiden, ob etwas funktioniert.",
    },
  ],
};

export const enfoquePyme = {
  categoria: "Unser Ansatz",
  titular: "Warum wir nur mit kleinen Unternehmen arbeiten",
  parrafos: [
    "Ein großes Unternehmen hat eine IT-Abteilung, ein Jahresbudget und sechs Monate für ein Pilotprojekt. Ein kleiner Betrieb hat eine Person in der Verwaltung, die vier Dinge gleichzeitig macht, und braucht das Neue sofort, nicht in einem Jahr.",
    "Das sind zwei verschiedene Aufgaben. Wir machen die zweite: individuelle Software in kurzen Phasen, die ab der ersten Zeit zurückgibt und für die Einführung keinen Betriebsstillstand verlangt.",
  ],
  contraste: [
    {
      etiqueta: "Was wir nicht tun",
      bien: false,
      items: [
        "Sechsmonatige Projekte, bevor Sie das erste Ergebnis sehen",
        "Mindestlaufzeiten: weder bei Projekten noch bei Abos",
        "Ihre Daten behalten, wenn Sie eines Tages gehen",
        "Bauen, bevor wir verstehen, wie das Geschäft funktioniert",
      ],
    },
    {
      etiqueta: "Was wir tun",
      bien: true,
      items: [
        "Kurze, einzeln freigegebene Phasen mit sichtbarem Ergebnis",
        "Das System in Ihren Konten, und es gehört Ihnen",
        "Ein Bericht, der Ihnen auch nützt, wenn Sie nicht weitermachen",
        "Klare Sprache statt Beraterjargon",
      ],
    },
  ],
};

export const datosRgpd = {
  categoria: "Daten und DSGVO",
  titular: "Was mit den Daten Ihrer Kunden passiert",
  intro: "Die Frage, die am häufigsten kommt und in dieser Branche am seltensten klar beantwortet wird. Hier ist die Antwort.",
  tarjetas: [
    {
      icono: "escudo" as const,
      titulo: "Die Daten bleiben Ihre",
      texto: "Das System läuft in Ihren eigenen Konten. Wir nehmen keine Kopie Ihres Kundenstamms irgendwohin mit.",
    },
    {
      icono: "documento" as const,
      titulo: "Auftragsverarbeitungsvertrag",
      texto: "Vor dem Start wird der von der DSGVO verlangte Vertrag unterschrieben, in dem schriftlich steht, auf welche Daten wir zugreifen und wozu.",
    },
    {
      icono: "info" as const,
      titulo: "Was angefasst wird und was nicht",
      texto:
        "In der Analyse halten wir schriftlich fest, welche Informationen das System nutzt und welche es nie anfasst. Sensible Informationen — Akten, Gesundheitsdaten, vertrauliche Unterlagen — bleiben außerhalb dessen, was die KI verarbeitet, außer es wird ausdrücklich und mit den nötigen Garantien vereinbart.",
    },
    {
      icono: "verificado" as const,
      titulo: "Sie können den Zugang jederzeit entziehen",
      texto: "Weil das System in Ihren Konten liegt, ist unser Zugang mit einem Klick entzogen. Keine Mindestlaufzeit und keine Daten als Geisel.",
    },
  ],
  pie: {
    texto: "Die vollständigen rechtlichen Details, falls Sie sie brauchen",
    enlace: { texto: "Impressum und Datenschutz", href: "/legal" },
  },
};

export const cierreNosotros = {
  titular: "Sprechen wir 15 Minuten?",
  texto: "Erzählen Sie uns, wie Ihr Geschäft läuft, und wir sagen Ihnen ehrlich, ob Sie eigene Software brauchen. Ohne Verkaufspräsentation und unverbindlich.",
  cta: "Schreiben Sie uns auf WhatsApp",
  finePrint: "Kostenlos und unverbindlich · 15 Min.",
  alternativa: { texto: "Oder schreiben Sie uns, wir antworten schriftlich", href: "/contacto" },
};
