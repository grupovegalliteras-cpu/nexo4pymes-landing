/* Deutsche Fassung der noch genutzten Teile von content/inicio.ts */

export const centralAvisos = {
  categoria: "Eigenes Produkt · in Zusammenarbeit mit Multiservicios Mallorca",
  titular: "Gehen Ihnen Anfragen verloren, während Sie arbeiten?",
  parrafo:
    "CentralAvisos sammelt Ihre Anrufe, WhatsApp-Nachrichten, E-Mails und das Website-Formular und ordnet sie nach Dringlichkeit in einem Dashboard, das Büro und Techniker sehen. Ihre Nummer und Ihre Arbeitsweise bleiben.",
  puntos: [
    { icono: "mensaje" as const, titulo: "Alles kommt an einer Stelle an", texto: "Angenommene und verpasste Anrufe, WhatsApp, E-Mail und Web. Ohne dass jemand etwas notiert." },
    { icono: "campana" as const, titulo: "Was brennt, steht oben", texto: "Jede Anfrage kommt mit ihrer Dringlichkeit. Sie lesen die Liste einfach von oben nach unten." },
    { icono: "reloj" as const, titulo: "Der ganze Tag, um neun", texto: "Was hereinkam, was noch offen ist und was abgerechnet werden kann." },
  ],
  condiciones: ["Ab 89 €/Monat", "Keine Mindestlaufzeit", "Ihre gewohnte Nummer", "Daten in der EU"],
  ctaPrincipal: "Schreiben Sie uns AVISOS auf WhatsApp",
  ctaSecundario: "So funktioniert es",
};

/* Vorher / nachher. Die Paare sind über den Index zugeordnet: antes[i] und
   despues[i] sprechen über dasselbe. Das spanische Original und die
   Begründung stehen in content/inicio.ts. */
export const antesDespues = {
  categoria: "Vorher und nachher",
  titular: "Derselbe Betrieb, zwei Arten zu arbeiten",
  intro:
    "Was Sie verkaufen und wer es verkauft, ändert sich nicht. Es ändert sich, ob sich das Werkzeug an Ihre Arbeitsweise anpasst oder Sie sich an das Werkzeug.",
  antes: {
    etiqueta: "Heute, ohne individuelle Software",
    resumen: "Sie passen sich dem Programm an",
    filas: [
      { titulo: "Das Programm bestimmt", texto: "Sie zahlen eine Lizenz für ein starres Programm und arbeiten am Ende so, wie es das will, nicht wie Sie es brauchen." },
      { titulo: "Die Daten, verteilt auf Excel-Dateien", texto: "Eine Datei für jede Sache, Versionen, die nicht zusammenpassen, und niemand weiß, welche die richtige ist." },
      { titulo: "Angebote entstehen von Hand", texto: "Preise suchen, rechnen, das PDF schreiben und senden. Jedes Mal von vorn." },
      { titulo: "Jedes Werkzeug geht seinen eigenen Weg", texto: "Was im einen steht, kommt im anderen nicht an. Jemand tippt es erneut ein." },
      { titulo: "Was Sie besonders macht, passt nicht hinein", texto: "Ihre eigene Arbeitsweise findet am Ende außerhalb des Programms statt, in losen Notizen." },
    ],
  },
  despues: {
    etiqueta: "Mit Software, die für Sie gebaut ist",
    resumen: "Das System passt sich Ihrer Arbeitsweise an",
    filas: [
      { titulo: "Die Software passt sich Ihnen an", texto: "Sie wird auf Ihrem echten Prozess gebaut. Wenn Ihre Arbeitsweise eigen ist, versteht das System sie." },
      { titulo: "Ein Ort, eine Zahl", texto: "Kunden, Aufträge und Historie an einer Stelle. Die Zahl, die erscheint, ist die Zahl, die gilt." },
      { titulo: "Ihr Kunde kalkuliert selbst, auf Ihrer Website", texto: "Er wählt, konfiguriert und sieht den Preis sofort, mit Ihren Regeln und Ihren Margen." },
      { titulo: "Alles synchron, ohne Tippen", texto: "Was über die Website hereinkommt, erscheint in der Verwaltung. Kein Kopieren und Einfügen zwischen Programmen." },
      { titulo: "Ihre Arbeitsweise, im System", texto: "Was Sie unterscheidet, ist keine manuelle Ausnahme mehr, sondern Teil des Systems." },
    ],
  },
  nota: "Es wird nicht alles auf einmal gebaut: In der Analyse wird entschieden, welcher Baustein sich zuerst lohnt und welcher warten kann.",
};
