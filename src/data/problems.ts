export interface ProblemItem {
  slug: string;
  label: string;
  recommendationTitle: string;
  recommendation: string;
  topic: "Inspektion" | "HU" | "Reifen" | "Reparatur" | "Unfall" | "Sonstiges";
}

export const problems: ProblemItem[] = [
  {
    slug: "warnsymbol",
    label: "Warnsymbol leuchtet",
    recommendationTitle: "WARNSYMBOL",
    recommendation:
      "Ein aufleuchtendes Warnsymbol kann viele Ursachen haben. Eine Fahrzeugdiagnose zeigt, was dahintersteckt.",
    topic: "Reparatur",
  },
  {
    slug: "geraeusche",
    label: "Geräusche",
    recommendationTitle: "GERÄUSCHE",
    recommendation:
      "Ungewohnte Geräusche sollten zeitnah geprüft werden, bevor aus einer Kleinigkeit ein größerer Schaden wird.",
    topic: "Reparatur",
  },
  {
    slug: "bremsen",
    label: "Bremsen",
    recommendationTitle: "BREMSEN",
    recommendation:
      "Bremsgeräusche, längerer Bremsweg oder Vibrationen sollten überprüft werden.",
    topic: "Reparatur",
  },
  {
    slug: "reifen",
    label: "Reifen",
    recommendationTitle: "REIFEN",
    recommendation:
      "Profiltiefe, Alter und ungleichmäßiger Verschleiß beeinflussen Sicherheit und Fahrverhalten.",
    topic: "Reifen",
  },
  {
    slug: "klima",
    label: "Klima",
    recommendationTitle: "KLIMA",
    recommendation:
      "Lässt die Kühlleistung nach, liegt das häufig an fehlender Wartung der Klimaanlage.",
    topic: "Sonstiges",
  },
  {
    slug: "inspektion-faellig",
    label: "Inspektion fällig",
    recommendationTitle: "INSPEKTION",
    recommendation:
      "Regelmäßige Inspektion nach Herstellervorgabe erhält Sicherheit und Wert Ihres Fahrzeugs.",
    topic: "Inspektion",
  },
  {
    slug: "hu-faellig",
    label: "HU fällig",
    recommendationTitle: "HAUPTUNTERSUCHUNG",
    recommendation: "HU-Termine bieten wir dienstags und donnerstags an – direkt online buchbar.",
    topic: "HU",
  },
  {
    slug: "unfallschaden",
    label: "Unfallschaden",
    recommendationTitle: "UNFALLSCHADEN",
    recommendation:
      "Nach einem Unfall zählt schnelle Klarheit: Absichern, anrufen, Schaden prüfen lassen.",
    topic: "Unfall",
  },
  {
    slug: "sonstiges",
    label: "Sonstiges",
    recommendationTitle: "SONSTIGES ANLIEGEN",
    recommendation: "Beschreiben Sie uns kurz Ihr Anliegen – wir melden uns zeitnah zurück.",
    topic: "Sonstiges",
  },
];
