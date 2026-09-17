export interface Job {
  slug: string;
  title: string;
  type: string;
  location: string;
  intro: string;
  requirements: string[];
}

/** Stand der offenen Stellen zum Zeitpunkt der Analyse (kfz-hettich.de/jobs). */
export const jobs: Job[] = [
  {
    slug: "kfz-mechatroniker-in",
    title: "Kfz-Mechatroniker/in",
    type: "Vollzeit (w/m/d)",
    location: "Pinneberg",
    intro:
      "Wir suchen zu sofort oder später eine Kfz-Mechatroniker/in für unsere Werkstatt. Wir bieten eine Festanstellung, leistungsgerechte Bezahlung, berufliche Weiterbildung und ein familiäres Betriebsklima.",
    requirements: [
      "Gültiger Führerschein der Klasse B",
      "Interesse an Fahrzeugen",
      "Spaß an Technik und Elektronik",
      "Problemlösefähigkeit und handwerkliches Geschick",
      "Teamfähigkeit",
      "Soziale Kompetenz",
    ],
  },
];
