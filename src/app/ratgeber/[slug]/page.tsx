import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { format, parseISO } from "date-fns";
import { de } from "date-fns/locale";
import { HeadlineReveal } from "@/components/motion/HeadlineReveal";
import { Reveal } from "@/components/motion/Reveal";
import { KindersitzGuide } from "@/components/ratgeber/KindersitzGuide";
import { getArticleBySlug, kindersitzCategories, newsArticles } from "@/data/news";
import { company } from "@/data/company";

export function generateStaticParams() {
  return newsArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return { title: article.title, description: article.teaser };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    datePublished: article.date,
    author: { "@type": "Organization", name: company.legalName },
    publisher: { "@type": "Organization", name: company.legalName },
  };

  return (
    <article className="pb-24 pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="relative h-[45svh] min-h-[280px]">
        <Image src={article.image} alt={article.title} fill priority sizes="100vw" className="object-cover" />
      </div>

      <div className="px-6 py-10 sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">{article.category}</p>
        <h1 className="mt-3 font-display font-bold uppercase leading-[1.05] tracking-tight text-[clamp(2rem,5vw,3.4rem)]">
          <HeadlineReveal trigger="mount" lines={article.title.split(". ").map((l, i, arr) => (i < arr.length - 1 ? `${l}.` : l))} />
        </h1>
        <p className="mt-4 max-w-xl text-balance text-base text-text-muted sm:text-lg">{article.teaser}</p>
        <p className="mt-3 text-xs text-text-muted">
          {format(parseISO(article.date), "d. MMMM yyyy", { locale: de })}
        </p>
      </div>

      {slug === "kindersitze-fuer-wen-gilt-was" ? (
        <div className="px-6 sm:px-10">
          <Reveal className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {kindersitzCategories.map((cat) => (
              <div key={cat.id} className="border border-border p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">{cat.direction}</p>
                <p className="mt-1 font-display text-base font-bold uppercase">{cat.label}</p>
                <p className="text-xs text-text-muted">{cat.range}</p>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="mb-10 max-w-2xl">
            <p className="text-base leading-relaxed text-text">
              Kindersicherung im Auto ist gesetzlich klar geregelt – entscheidend sind
              Größe, Gewicht und das passende Rückhaltesystem. Neben den klassischen
              ECE-R44/04-Normen gilt zunehmend der moderne i-Size-Standard (ECE R129),
              der sich primär an der Körpergröße orientiert und strengere Prüfverfahren
              sowie verpflichtenden Seitenaufprallschutz bietet.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mb-10">
            <KindersitzGuide />
          </Reveal>

          <Reveal delay={0.2} className="max-w-2xl border-t border-border pt-8 text-sm leading-relaxed text-text-muted">
            <p>
              <strong className="text-text">Wichtig:</strong> Verstöße gegen die
              Kindersicherungspflicht können mit Bußgeldern und Punkten geahndet werden.
              Achten Sie darauf, dass der Kindersitz zur Größe Ihres Kindes und zu Ihrem
              Fahrzeug passt – insbesondere bei i-Size-Systemen ist die richtige
              Einbauposition entscheidend.
            </p>
            <p className="mt-4">
              Gerne unterstützen wir Sie bei der Auswahl und Kontrolle der passenden
              Rückhalteeinrichtung für Ihr Fahrzeug.
            </p>
          </Reveal>
        </div>
      ) : (
        <GenericArticleBody slug={slug} />
      )}
    </article>
  );
}

function GenericArticleBody({ slug }: { slug: string }) {
  if (slug === "e5-oder-e10") {
    return (
      <div className="px-6 sm:px-10">
        <Reveal className="max-w-2xl">
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-border p-5">
              <p className="font-display text-xl font-bold">E5</p>
              <p className="mt-2 text-sm text-text-muted">
                Bis zu 5 % Bioethanol beigemischt. Für praktisch alle Fahrzeuge freigegeben.
              </p>
            </div>
            <div className="border border-border p-5">
              <p className="font-display text-xl font-bold">E10</p>
              <p className="mt-2 text-sm text-text-muted">
                Bis zu 10 % Bioethanol. Nicht jeder Motor ist dafür freigegeben.
              </p>
            </div>
          </div>
          <p className="mt-8 text-base leading-relaxed text-text-muted">
            Ob Ihr Fahrzeug E10 verträgt, steht in der Betriebsanleitung oder auf der
            Freigabeliste des Herstellers. Im Zweifel hilft ein kurzer Blick in die
            Fahrzeugpapiere oder eine Nachfrage bei uns, bevor Sie tanken.
          </p>
        </Reveal>
      </div>
    );
  }

  return (
    <div className="px-6 sm:px-10">
      <Reveal className="max-w-2xl text-base leading-relaxed text-text-muted">
        <p>
          Ein beschädigter oder blinder Außenspiegel schränkt die Sicht ein und kann
          bei einer Hauptuntersuchung zur Beanstandung führen. Risse, lose Halterungen
          oder ausgefallene Verstellmotoren sollten zeitnah geprüft werden.
        </p>
        <p className="mt-4">
          Sprechen Sie uns an – wir prüfen, ob eine Reparatur oder ein Austausch
          sinnvoll ist.
        </p>
      </Reveal>
    </div>
  );
}
