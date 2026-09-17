import type { Metadata } from "next";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: { index: false, follow: true },
};

export default function DatenschutzPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-24 pt-32 sm:px-10 sm:pt-40">
      <h1 className="font-display text-3xl font-bold text-text sm:text-4xl">Datenschutzerklärung</h1>

      <div className="mt-10 flex flex-col gap-8 text-sm leading-relaxed text-text">
        <div>
          <h2 className="font-semibold uppercase tracking-wide text-text-muted">Verantwortlicher</h2>
          <p className="mt-2">
            {company.legalName}
            <br />
            {company.street}, {company.zip} {company.place}
            <br />
            E-Mail: {company.email}
          </p>
        </div>

        <div>
          <h2 className="font-semibold uppercase tracking-wide text-text-muted">Hosting</h2>
          <p className="mt-2">
            Diese Website wird bei einem externen Hosting-Anbieter betrieben. Beim Aufruf
            der Website werden technisch notwendige Daten (z. B. IP-Adresse, Zeitpunkt des
            Zugriffs) automatisch durch den Hoster verarbeitet.
          </p>
        </div>

        <div>
          <h2 className="font-semibold uppercase tracking-wide text-text-muted">
            HU-Terminbuchung und HU-Erinnerung
          </h2>
          <p className="mt-2">
            Zur Terminvergabe verarbeiten wir Name, Telefonnummer, E-Mail-Adresse,
            Kennzeichen und optional Fahrzeugdaten. Diese Angaben werden in einer
            Datenbank bei Supabase (Serverstandort EU/Frankfurt) gespeichert, um Termine
            zu verwalten und Doppelbuchungen zu verhindern. Rechtsgrundlage ist Art. 6
            Abs. 1 lit. b DSGVO (Vertragsanbahnung/-erfüllung). Für die HU-Erinnerung
            gilt dies entsprechend, hier auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1
            lit. a DSGVO).
          </p>
        </div>

        <div>
          <h2 className="font-semibold uppercase tracking-wide text-text-muted">Kontaktformular</h2>
          <p className="mt-2">
            Ihre Angaben aus dem Kontaktformular verarbeiten wir ausschließlich zur
            Bearbeitung Ihrer Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b bzw. lit.
            f DSGVO.
          </p>
        </div>

        <div>
          <h2 className="font-semibold uppercase tracking-wide text-text-muted">E-Mail-Versand</h2>
          <p className="mt-2">
            Bestätigungs- und Benachrichtigungs-E-Mails versenden wir über einen
            E-Mail-Dienstleister. Es werden dabei nur die für den jeweiligen Vorgang
            notwendigen Daten (z. B. Terminangaben) übermittelt.
          </p>
        </div>

        <div>
          <h2 className="font-semibold uppercase tracking-wide text-text-muted">Cookies &amp; Tracking</h2>
          <p className="mt-2">
            Diese Website verwendet keine Analyse- oder Marketing-Cookies und keine
            Tracking-Dienste. Technisch notwendige Cookies werden nur eingesetzt, sofern
            sie für den Betrieb der Website erforderlich sind.
          </p>
        </div>

        <div>
          <h2 className="font-semibold uppercase tracking-wide text-text-muted">Schriftarten</h2>
          <p className="mt-2">
            Wir binden die verwendete Schriftart lokal ein. Es findet keine Verbindung zu
            externen Font-Anbietern statt.
          </p>
        </div>

        <div>
          <h2 className="font-semibold uppercase tracking-wide text-text-muted">Speicherdauer</h2>
          <p className="mt-2">
            Wir speichern personenbezogene Daten nur so lange, wie es für den jeweiligen
            Zweck erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.
          </p>
        </div>

        <div>
          <h2 className="font-semibold uppercase tracking-wide text-text-muted">Ihre Rechte</h2>
          <p className="mt-2">
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung
            der Verarbeitung Ihrer personenbezogenen Daten sowie ein Recht auf
            Datenübertragbarkeit und Widerspruch. Wenden Sie sich hierzu an{" "}
            {company.email}. Zudem steht Ihnen ein Beschwerderecht bei der zuständigen
            Aufsichtsbehörde für den Datenschutz zu.
          </p>
        </div>
      </div>
    </section>
  );
}
