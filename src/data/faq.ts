export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "Wann findet die Hauptuntersuchung statt?",
    answer: "Die HU führen wir dienstags und donnerstags durch – Termine buchen Sie direkt online.",
  },
  {
    question: "Wie schnell bekomme ich einen HU-Termin?",
    answer:
      "Der Kalender zeigt Ihnen alle freien Termine der nächsten Wochen in Echtzeit an.",
  },
  {
    question: "Was passiert nach einem Unfall?",
    answer:
      "Rufen Sie uns an – wir kümmern uns um Abschleppen, Schadensfeststellung und stellen auf Wunsch ein Ersatzfahrzeug.",
  },
  {
    question: "Übernehmen Sie die Abrechnung mit der Versicherung?",
    answer:
      "Auf Wunsch dokumentieren wir alle Reparaturschritte und kümmern uns direkt um die Abrechnung mit Ihrer Versicherung.",
  },
  {
    question: "Kann ich auch ohne Termin vorbeikommen?",
    answer:
      "Für Reparaturen und Diagnosen empfehlen wir eine kurze Anfrage vorab, damit wir Zeit einplanen können.",
  },
  {
    question: "Bieten Sie einen Ersatzwagen an?",
    answer: "Für die Dauer einer Unfallreparatur stellen wir Ihnen gern ein Ersatzfahrzeug zur Verfügung.",
  },
];
