export interface NewsArticle {
  slug: string;
  title: string;
  category: string;
  date: string; // ISO
  teaser: string;
  image: string;
}

export const newsArticles: NewsArticle[] = [
  {
    slug: "kindersitze-fuer-wen-gilt-was",
    title: "Kindersitze. Wer braucht was?",
    category: "SICHERHEIT",
    date: "2026-09-13",
    teaser: "Größe, Alter, Sitztyp – die wichtigsten Regeln auf einen Blick.",
    image: "/photos/tire.jpg",
  },
  {
    slug: "e5-oder-e10",
    title: "E5 oder E10 – was Sie wirklich wissen müssen",
    category: "TECHNIK",
    date: "2025-06-01",
    teaser: "An der Tankstelle stehen zwei Sorten zur Auswahl. Was steckt dahinter?",
    image: "/photos/engine.jpg",
  },
  {
    slug: "autospiegel-alles-im-blick",
    title: "Alles im Blick? Autospiegel.",
    category: "SICHERHEIT",
    date: "2025-03-01",
    teaser: "Enge Straßen, viel Verkehr – wann ein Spiegel ausgetauscht werden sollte.",
    image: "/photos/diagnostic.jpg",
  },
];

export function getArticleBySlug(slug: string) {
  return newsArticles.find((a) => a.slug === slug);
}

export const kindersitzCategories = [
  {
    id: "baby",
    label: "BABY",
    range: "bis ca. 83 cm",
    direction: "RÜCKWÄRTSGERICHTET",
    minCm: 40,
    maxCm: 83,
    text: "Für Neugeborene und Babys ist eine rückwärtsgerichtete Babyschale vorgeschrieben. Sie schützt Kopf und Nacken und wird auf Rückbank oder Beifahrersitz (Airbag deaktiviert) befestigt.",
  },
  {
    id: "kleinkind",
    label: "KLEINKIND",
    range: "ca. 61–105 cm",
    direction: "RÜCKWÄRTS ODER VORWÄRTS",
    minCm: 61,
    maxCm: 105,
    text: "Viele moderne i-Size-Sitze sind rückwärtsgerichtet oder bieten flexible Nutzung. Befestigung in der Regel sicher auf der Rückbank.",
  },
  {
    id: "schulkind",
    label: "SCHULKIND",
    range: "ca. 100–150 cm",
    direction: "SITZERHÖHUNG",
    minCm: 100,
    maxCm: 150,
    text: "Eine Sitzerhöhung sorgt dafür, dass der Sicherheitsgurt korrekt über Schulter und Becken verläuft.",
  },
  {
    id: "ohne",
    label: "OHNE KINDERSITZ",
    range: "ab ca. 150 cm oder 12 Jahre",
    direction: "ANSCHNALLPFLICHT",
    minCm: 150,
    maxCm: 220,
    text: "Ab ausreichender Körpergröße gilt die reguläre Anschnallpflicht mit dem Fahrzeuggurt.",
  },
] as const;

export function kindersitzRecommendationFor(cm: number) {
  return (
    kindersitzCategories.find((c) => cm >= c.minCm && cm <= c.maxCm) ??
    kindersitzCategories[kindersitzCategories.length - 1]
  );
}
