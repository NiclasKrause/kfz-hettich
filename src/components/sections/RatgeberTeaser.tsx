import Image from "next/image";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { de } from "date-fns/locale";
import { HeadlineReveal } from "@/components/motion/HeadlineReveal";
import { Reveal } from "@/components/motion/Reveal";
import { AnimatedLink } from "@/components/AnimatedLink";
import { newsArticles } from "@/data/news";

export function RatgeberTeaser() {
  return (
    <section className="border-t border-border px-6 py-20 sm:px-10 sm:py-24">
      <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <h2 className="font-display font-bold uppercase leading-[1.05] tracking-tight text-[clamp(1.8rem,4.5vw,3rem)]">
          <HeadlineReveal lines={["Ratgeber."]} />
        </h2>
        <Reveal delay={0.1}>
          <AnimatedLink href="/ratgeber">Alle Artikel</AnimatedLink>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {newsArticles.slice(0, 3).map((article, i) => (
          <Reveal key={article.slug} delay={0.05 * i}>
            <Link href={`/ratgeber/${article.slug}`} className="group block">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-accent">
                {article.category}
              </p>
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
