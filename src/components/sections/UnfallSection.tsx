import { HeadlineReveal } from "@/components/motion/HeadlineReveal";
import { Reveal } from "@/components/motion/Reveal";
import { company } from "@/data/company";

const steps = [
  { index: "01", title: "Absichern" },
  { index: "02", title: "Hettich anrufen" },
  { index: "03", title: "Schaden prüfen" },
  { index: "04", title: "Reparatur abstimmen" },
  { index: "05", title: "Fahrzeug zurück" },
];

export function UnfallSection() {
  return (
    <section id="unfall" className="dark-section bg-dark px-6 py-24 text-white sm:px-10 sm:py-28">
      <h2 className="font-display font-bold uppercase leading-[1.05] tracking-tight text-[clamp(2.2rem,6vw,4rem)]">
        <HeadlineReveal lines={["Es ist passiert.", "Was jetzt?"]} />
      </h2>

      <Reveal delay={0.15} className="mt-12 flex flex-wrap gap-6 border-t border-dark-line pt-10 sm:gap-10">
        {steps.map((step) => (
          <div key={step.index} className="min-w-[110px]">
            <span className="text-xs text-dark-muted">{step.index}</span>
            <p className="mt-1 font-display text-sm font-bold uppercase tracking-wide">{step.title}</p>
          </div>
        ))}
      </Reveal>

      <Reveal delay={0.25} className="mt-14 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
        <a href={`tel:${company.phoneHref}`} className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {company.phoneDisplay}
        </a>
        <a
          href={`tel:${company.phoneHref}`}
          className="bg-accent px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-dark"
        >
          Unfallservice
        </a>
      </Reveal>
    </section>
  );
}
