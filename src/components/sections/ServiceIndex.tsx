import Image from "next/image";
import { HeadlineReveal } from "@/components/motion/HeadlineReveal";
import { Reveal } from "@/components/motion/Reveal";
import { AnimatedLink } from "@/components/AnimatedLink";
import { services } from "@/data/services";
import { ReifenEducation } from "./ReifenEducation";
import { cn } from "@/lib/cn";

export function ServiceIndex() {
  return (
    <section id="leistungen" className="border-t border-border">
      {services.slice(0, 2).map((service, i) => (
        <div key={service.slug}>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div
              className={cn(
                "relative h-[70vw] max-h-[560px] min-h-[360px] lg:h-auto",
                i % 2 === 1 && "lg:order-2",
              )}
            >
              <Image
                src={service.image}
                alt={service.navLabel}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className={cn("flex flex-col justify-center px-6 py-16 sm:px-10 sm:py-20", i % 2 === 1 && "lg:order-1")}>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                {service.eyebrow}
              </span>
              <h2 className="mt-4 font-display font-bold uppercase leading-[1.05] tracking-tight text-[clamp(2rem,4.5vw,3.2rem)]">
                <HeadlineReveal lines={service.headline} />
              </h2>
              <Reveal delay={0.1}>
                <p className="mt-3 text-sm font-semibold uppercase tracking-widest text-accent">
                  {service.subline}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-6 max-w-md text-balance text-base leading-relaxed text-text-muted">
                  {service.intro}
                </p>
              </Reveal>
              <Reveal delay={0.2} className="mt-6 border-t border-border pt-6">
                <ul className="flex flex-col gap-2">
                  {service.points.map((point) => (
                    <li key={point} className="text-sm text-text">
                      — {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
              {service.valueText ? (
                <Reveal delay={0.25}>
                  <p className="mt-6 max-w-md text-sm leading-relaxed text-text-muted">
                    {service.valueText}
                  </p>
                </Reveal>
              ) : null}
              <Reveal delay={0.3} className="mt-8">
                <AnimatedLink href={`/leistungen/${service.slug}`}>{service.ctaLabel}</AnimatedLink>
              </Reveal>
            </div>
          </div>

          {service.slug === "reifenservice" ? <ReifenEducation /> : null}
        </div>
      ))}
    </section>
  );
}
