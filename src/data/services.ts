export interface ServiceItem {
  slug: string;
  navLabel: string;
  eyebrow: string;
  headline: string[];
  subline: string;
  intro: string;
  points: string[];
  valueText?: string;
  ctaLabel: string;
  image: string;
}

export const services: ServiceItem[] = [
  {
    slug: "inspektion",
    navLabel: "Inspektion",
    eyebrow: "INSPEKTION",
    headline: ["DARAUF WARTEN,", "DASS ETWAS", "KAPUTTGEHT?"],
    subline: "MUSS NICHT SEIN.",
    intro:
      "Inspektionen und Ölwechsel nach Herstellervorgaben – damit Wartungen durchgeführt werden, bevor aus Verschleiß ein Problem wird.",
    points: [
      "Prüfung aller sicherheitsrelevanten und verschleißbetroffenen Teile",
      "Ölwechsel nach Herstellervorgabe",
      "Dokumentation im Serviceheft",
    ],
    valueText:
      "Regelmäßige Wartung kann helfen, Folgeschäden früher zu erkennen, größere Reparaturen zu vermeiden, den Fahrzeugwert zu erhalten und ungeplante Ausfallzeiten zu reduzieren. Die Dokumentation im Serviceheft ist zudem oft Voraussetzung für die Hersteller-Garantie.",
    ctaLabel: "Inspektion buchen",
    image: "/photos/engine.jpg",
  },
  {
    slug: "reifenservice",
    navLabel: "Reifen",
    eyebrow: "REIFEN",
    headline: ["VIER KONTAKTPUNKTE.", "MEHR IST ES NICHT."],
    subline: "SICHERHEIT DURCH DIE RICHTIGEN REIFEN",
    intro:
      "Reifentyp, Dimension, Geschwindigkeitsindex und DOT-Nummer entscheiden über sicheres, komfortables Fahren. Wir beraten Sie bei der Wahl.",
    points: ["Reifenwechsel", "Auswuchten", "Einlagerung", "Prüfung"],
    valueText:
      "Ein Reifen sollte nicht erst ersetzt werden, wenn das Profil offensichtlich zu gering ist. Profiltiefe, Alter, Luftdruck und ungleichmäßiger Verschleiß beeinflussen Sicherheit und Lebensdauer.",
    ctaLabel: "Reifentermin anfragen",
    image: "/photos/tire.jpg",
  },
  {
    slug: "unfallservice",
    navLabel: "Unfall",
    eyebrow: "UNFALL",
    headline: ["ES IST PASSIERT.", "WAS JETZT?"],
    subline: "SCHNELLER SERVICE IM SCHADENSFALL",
    intro:
      "Unsere Leistungen beginnen bereits mit dem Abschleppen Ihres Fahrzeugs direkt in unsere Werkstatt.",
    points: [
      "Abschleppen",
      "Schadensfeststellung",
      "Ersatzfahrzeug für die Reparaturdauer",
      "Dokumentation für Ihre Versicherung",
      "Auf Wunsch direkte Abrechnung mit der Versicherung",
    ],
    ctaLabel: "Unfallservice anfragen",
    image: "/photos/bodywork-paint.jpg",
  },
  {
    slug: "karosseriearbeiten",
    navLabel: "Karosserie",
    eyebrow: "KAROSSERIE",
    headline: ["WAS BLEIBT,", "MUSS RICHTIG", "GERICHTET SEIN."],
    subline: "INSTANDSETZUNG VON KAROSSERIESCHÄDEN",
    intro:
      "Leichte Unfallschäden beseitigen wir mit geübten Handgriffen und speziellem Werkzeug – oft ohne Neulackierung. Bei schweren Schäden werden betroffene Teile ausgewechselt und die Karosserie gerichtet.",
    points: [
      "Detaillierte Schadenanalyse",
      "Abstimmung von Umfang, Alternativen, Kosten und Dauer",
      "Instandsetzung und Lackierung",
    ],
    ctaLabel: "Karosserie anfragen",
    image: "/photos/bodywork-paint.jpg",
  },
  {
    slug: "klimaservice",
    navLabel: "Klimaservice",
    eyebrow: "KLIMASERVICE",
    headline: ["LUFT RAUS?", "KÜHLMITTEL REIN."],
    subline: "PROFESSIONELLE WARTUNG IHRER KLIMAANLAGE",
    intro:
      "Lässt die Kühlleistung nach oder riecht es unangenehm, liegt das meist an fehlender Wartung. Alle 2–3 Jahre sollte das Kühlmittel erneuert werden.",
    points: [
      "Kühlmittelerneuerung",
      "Leckage-Prüfung mit Kontrastmittel",
      "Beseitigung von Defekten",
    ],
    ctaLabel: "Klimaservice anfragen",
    image: "/photos/diagnostic.jpg",
  },
  {
    slug: "fahrzeugdiagnose",
    navLabel: "Diagnose",
    eyebrow: "DIAGNOSE",
    headline: ["FEHLER FINDEN,", "BEVOR SIE", "GRÖSSER WERDEN."],
    subline: "MODERNE FEHLERDIAGNOSE UND INSTANDSETZUNG",
    intro:
      "Mit modernen Diagnosegeräten lesen wir die Ereignisspeicher Ihres Fahrzeugs aus und erstellen einen Kostenvoranschlag für die gezielte Fehlerbeseitigung.",
    points: [
      "Auslesen der Fahrzeugdaten",
      "Analyse durch geschulte Mitarbeiter",
      "Kostenvoranschlag vor der Reparatur",
    ],
    ctaLabel: "Diagnose anfragen",
    image: "/photos/diagnostic.jpg",
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
