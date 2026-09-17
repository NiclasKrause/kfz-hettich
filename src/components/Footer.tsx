import Image from "next/image";
import Link from "next/link";
import { footerNav, legalNav } from "@/data/navigation";
import { company } from "@/data/company";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-[1600px] px-6 py-16 sm:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <Image src="/brand/logo.jpg" alt={company.legalName} width={984} height={304} className="h-10 w-auto" />
            <p className="mt-4 text-sm text-text-muted">{company.legalName}</p>
            <p className="text-sm text-text-muted">Pinneberg</p>
          </div>

          <nav className="flex flex-col gap-2.5">
            {footerNav.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-text transition-colors hover:text-accent">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2 text-sm text-text-muted">
            <a href={`tel:${company.phoneHref}`} className="text-text hover:text-accent">
              {company.phoneDisplay}
            </a>
            <a href={`mailto:${company.email}`} className="hover:text-accent">
              {company.email}
            </a>
            <p>
              {company.street}
              <br />
              {company.zip} {company.place}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} {company.legalName}
          </p>
          <nav className="flex gap-6">
            {legalNav.map((link) => (
              <Link key={link.href} href={link.href} className="text-xs text-text-muted hover:text-text">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
