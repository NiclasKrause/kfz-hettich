import type { Metadata } from "next";
import { HeadlineReveal } from "@/components/motion/HeadlineReveal";
import { Reveal } from "@/components/motion/Reveal";
import { jobs } from "@/data/jobs";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Karriere",
  description: "Offene Stellen bei Hettich, Kfz-Meisterbetrieb in Pinneberg.",
};

export default function KarrierePage() {
  return (
    <section className="px-6 pb-24 pt-32 sm:px-10 sm:pt-40">
      <h1 className="font-display font-bold uppercase leading-[1.05] tracking-tight text-[clamp(2.2rem,6vw,4.2rem)]">
        <HeadlineReveal trigger="mount" lines={["Karriere bei", "Hettich."]} />
      </h1>

      <div className="mt-14 flex flex-col gap-12">
        {jobs.map((job) => (
          <Reveal key={job.slug} className="max-w-2xl border-t border-border pt-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">
              {job.type} · {job.location}
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight">{job.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-text-muted">{job.intro}</p>

            <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-text-muted">Ihr Profil</p>
            <ul className="mt-3 flex flex-col gap-2">
              {job.requirements.map((r) => (
                <li key={r} className="text-sm text-text">
                  — {r}
                </li>
              ))}
            </ul>

            <p className="mt-8 text-sm text-text-muted">
              Bewerben Sie sich telefonisch, per E-Mail oder postalisch:
            </p>
            <p className="mt-2 text-sm">
              <a href={`tel:${company.phoneHref}`} className="font-semibold text-text hover:text-accent">
                {company.phoneDisplay}
              </a>
              {" · "}
              <a href={`mailto:${company.email}`} className="font-semibold text-text hover:text-accent">
                {company.email}
              </a>
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
