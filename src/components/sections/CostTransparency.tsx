import { HeadlineReveal } from "@/components/motion/HeadlineReveal";
import { Reveal } from "@/components/motion/Reveal";

export function CostTransparency() {
  return (
    <section className="border-t border-border px-6 py-20 text-center sm:px-10 sm:py-24">
      <h2 className="mx-auto max-w-2xl font-display font-bold uppercase leading-[1.05] tracking-tight text-[clamp(1.8rem,4vw,2.8rem)]">
        <HeadlineReveal lines={["Keine Überraschung", "auf der Rechnung."]} />
      </h2>
      <Reveal delay={0.15}>
        <p className="mx-auto mt-6 max-w-xl text-balance text-base text-text-muted sm:text-lg">
          Vor zusätzlichen Arbeiten stimmen wir ab, was notwendig ist und welche
          Kosten voraussichtlich entstehen.
        </p>
      </Reveal>
    </section>
  );
}
