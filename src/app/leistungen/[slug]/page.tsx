import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { HeadlineReveal } from "@/components/motion/HeadlineReveal";
import { Reveal } from "@/components/motion/Reveal";
import { AnimatedLink } from "@/components/AnimatedLink";
import { services, getServiceBySlug } from "@/data/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return { title: service.navLabel, description: service.intro };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <section className="relative flex min-h-[60svh] flex-col justify-end overflow-hidden pt-24">
        <div className="absolute inset-0">
          <Image src={service.image} alt={service.navLabel} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/5" />
        </div>
        <div className="relative px-6 pb-14 sm:px-10">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            {service.eyebrow}
          </span>
          <h1 className="mt-4 font-display font-bold uppercase leading-[1.05] tracking-tight text-[clamp(2.2rem,6vw,4.5rem)] text-white">
            <HeadlineReveal trigger="mount" lines={service.headline} />
          </h1>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 sm:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="text-balance text-lg leading-relaxed text-text">{service.intro}</p>
            {service.valueText ? (
              <p className="mt-6 text-balance text-base leading-relaxed text-text-muted">{service.valueText}</p>
            ) : null}
            <div className="mt-8">
              <AnimatedLink href={`/kontakt?thema=${encodeURIComponent(service.navLabel)}`} variant="solid">
                {service.ctaLabel}
              </AnimatedLink>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">Im Überblick</span>
            <ul className="mt-5 flex flex-col gap-3 border-t border-border pt-5">
              {service.points.map((point) => (
                <li key={point} className="flex gap-3 border-b border-border pb-3 text-sm text-text">
                  <span className="text-accent">—</span>
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
