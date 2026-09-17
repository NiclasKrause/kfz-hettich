import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { MotionConfig } from "motion/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBottomBar } from "@/components/MobileBottomBar";
import { BookingProvider } from "@/components/booking/BookingProvider";
import { BookingModal } from "@/components/booking/BookingModal";
import { company } from "@/data/company";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: company.title,
    template: `%s — ${company.name}`,
  },
  description: company.description,
  keywords: [
    "Autowerkstatt Pinneberg",
    "HU Pinneberg",
    "Hauptuntersuchung Termin",
    "Kfz Werkstatt Pinneberg",
    "Inspektion Pinneberg",
  ],
  authors: [{ name: company.legalName }],
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: company.url,
    title: company.title,
    description: company.description,
    siteName: company.name,
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: company.legalName,
  url: company.url,
  telephone: company.phoneHref,
  email: company.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.street,
    postalCode: company.zip,
    addressLocality: company.place,
    addressCountry: "DE",
  },
  openingHoursSpecification: company.openingHours
    .filter((o) => o.hours !== "geschlossen")
    .map((o) => {
      const [open, close] = o.hours.replace(" Uhr", "").split(" – ");
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: o.day,
        opens: open,
        closes: close,
      };
    }),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={manrope.variable}>
      <body className="bg-background text-text">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MotionConfig reducedMotion="user">
          <BookingProvider>
            <Header />
            <main className="has-mobile-bar">{children}</main>
            <Footer />
            <MobileBottomBar />
            <BookingModal />
          </BookingProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
