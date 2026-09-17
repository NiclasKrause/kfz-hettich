import type { Metadata } from "next";
import { Suspense } from "react";
import { HeadlineReveal } from "@/components/motion/HeadlineReveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Kontakt",
  description: `Sprechen Sie mit ${company.legalName} über Ihr Anliegen.`,
};

export default function KontaktPage() {
  return (
    <section className="px-6 pb-24 pt-32 sm:px-10 sm:pt-40">
      <h1 className="font-display font-bold uppercase leading-[1.05] tracking-tight text-[clamp(2.2rem,6vw,4.2rem)]">
        <HeadlineReveal trigger="mount" lines={["Was braucht", "Ihr Auto?"]} />
      </h1>

      <div className="mt-14 grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">Telefon</p>
            <a href={`tel:${company.phoneHref}`} className="font-display text-2xl font-bold">
              {company.phoneDisplay}
            </a>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">Adresse</p>
            <p className="text-base">
              {company.street}
              <br />
              {company.zip} {company.place}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">Öffnungszeiten</p>
            <ul className="mt-1 flex flex-col gap-0.5 text-sm text-text-muted">
              {company.openingHours.map((o) => (
                <li key={o.day} className="flex justify-between gap-6">
                  <span>{o.day}</span>
                  <span>{o.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
