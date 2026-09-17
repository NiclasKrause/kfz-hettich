import { HeadlineReveal } from "@/components/motion/HeadlineReveal";
import { Reveal } from "@/components/motion/Reveal";
import { company } from "@/data/company";

export function AboutSection() {
  return (
    <section className="border-t border-border px-6 py-20 sm:px-10 sm:py-24">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
            Hettich
          </span>
        </div>
        <div className="lg:col-span-8">
          <h2 className="font-display font-bold uppercase leading-[1.05] tracking-tight text-[clamp(2rem,4.5vw,3.2rem)]">
            <HeadlineReveal lines={["Werkstatt ist", "Vertrauen."]} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-text-muted sm:text-lg">
              {company.legalName} ist Ihr Kfz-Meisterbetrieb in Pinneberg. Inhaber
              {" "}
              {company.owner} und sein Team kümmern sich um Service, Wartung und
              Reparatur – persönlich und direkt vor Ort.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
