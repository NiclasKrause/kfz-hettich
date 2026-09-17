import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { de } from "date-fns/locale";
import { HeadlineReveal } from "@/components/motion/HeadlineReveal";
import { Reveal } from "@/components/motion/Reveal";
import { newsArticles } from "@/data/news";

export const metadata: Metadata = {
  title: "Ratgeber",
  description: "Automotive Guide von Hettich: kompakt, verständlich, auf den Punkt.",
};

export default function RatgeberPage() {
  return (
    <section className="px-6 pb-24 pt-32 sm:px-10 sm:pt-40">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">Ratgeber</span>
      <h1 className="mt-4 font-display font-bold uppercase leading-[1.05] tracking-tight text-[clamp(2.2rem,6vw,4.2rem)]">
        <HeadlineReveal trigger="mount" lines={["Wissen, das", "unterwegs hilft."]} />
      </h1>

      <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {newsArticles.map((article, i) => (
          <Reveal key={article.slug} delay={0.05 * i}>
            <Link href={`/ratgeber/${article.slug}`} className="group block">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-accent">{article.category}</p>
              <p className="mt-1 font-display text-lg font-bold tracking-tight">{article.title}</p>
              <p className="mt-2 text-sm text-text-muted">{article.teaser}</p>
              <p className="mt-2 text-xs text-text-muted">
                {format(parseISO(article.date), "d. MMMM yyyy", { locale: de })}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
