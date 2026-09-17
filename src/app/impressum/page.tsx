import type { Metadata } from "next";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false, follow: true },
};

export default function ImpressumPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-24 pt-32 sm:px-10 sm:pt-40">
      <h1 className="font-display text-3xl font-bold text-text sm:text-4xl">Impressum</h1>

      <div className="mt-10 flex flex-col gap-8 text-sm leading-relaxed text-text">
        <div>
          <h2 className="font-semibold uppercase tracking-wide text-text-muted">
            Angaben gemäß § 5 TMG
          </h2>
          <p className="mt-2">
            {company.legalName}
            <br />
            {company.street}
            <br />
            {company.zip} {company.place}
          </p>
        </div>

        <div>
          <h2 className="font-semibold uppercase tracking-wide text-text-muted">
            Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz
          </h2>
          <p className="mt-2">{company.vatId}</p>
        </div>

        <div>
          <h2 className="font-semibold uppercase tracking-wide text-text-muted">Vertreten durch</h2>
          <p className="mt-2">{company.owner}</p>
        </div>

        <div>
          <h2 className="font-semibold uppercase tracking-wide text-text-muted">Kontakt</h2>
          <p className="mt-2">
            Telefon: {company.phoneDisplay}
            <br />
            E-Mail: {company.email}
          </p>
        </div>

        <div>
          <h2 className="font-semibold uppercase tracking-wide text-text-muted">
            Verantwortlich für den Inhalt
          </h2>
          <p className="mt-2">{company.owner}</p>
        </div>

        <div>
          <h2 className="font-semibold uppercase tracking-wide text-text-muted">
            Hinweis gemäß § 36 Verbraucherstreitbeilegungsgesetz (VSBG)
          </h2>
          <p className="mt-2">
            Wir sind zur Teilnahme an einem Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle im Sinne des Verbraucherstreitbeilegungsgesetzes
            weder verpflichtet noch bereit.
          </p>
        </div>

        <div>
          <h2 className="font-semibold uppercase tracking-wide text-text-muted">Haftungshinweis</h2>
          <p className="mt-2">
            Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für
            die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind
            ausschließlich deren Betreiber verantwortlich.
          </p>
        </div>
      </div>
    </section>
  );
}
