import { HeadlineReveal } from "@/components/motion/HeadlineReveal";
import { Reveal } from "@/components/motion/Reveal";
import { AnimatedLink } from "@/components/AnimatedLink";
import { company } from "@/data/company";

export function ContactCta() {
  return (
    <section className="border-t border-border px-6 py-20 sm:px-10 sm:py-24">
      <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display font-bold uppercase leading-[1.05] tracking-tight text-[clamp(2rem,5vw,3.4rem)]">
            <HeadlineReveal lines={["Was braucht", "Ihr Auto?"]} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-4 text-base text-text-muted">
              {company.legalName} · {company.phoneDisplay}
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <AnimatedLink href="/kontakt" variant="solid">
            Kontakt aufnehmen
          </AnimatedLink>
        </Reveal>
      </div>
    </section>
  );
}
