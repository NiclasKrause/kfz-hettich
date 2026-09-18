"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { mainNav } from "@/data/navigation";
import { company } from "@/data/company";
import { useBooking } from "@/components/booking/BookingProvider";
import { cn } from "@/lib/cn";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { openBooking } = useBooking();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 16);
  });

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b bg-white/95 backdrop-blur-sm transition-all duration-300",
          scrolled ? "border-border py-2.5" : "border-transparent py-4",
        )}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 sm:px-10">
          <Link href="/" onClick={() => setMenuOpen(false)} className="relative z-[60] shrink-0">
            <Image
              src="/brand/logo.svg"
              alt={company.legalName}
              width={250}
              height={64}
              priority
              className={cn("w-auto transition-all duration-300", scrolled ? "h-9" : "h-11")}
            />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {mainNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative py-1 text-[13px] font-semibold uppercase tracking-wide text-text"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <a href={`tel:${company.phoneHref}`} className="text-[13px] font-semibold text-text hover:text-accent">
              {company.phoneDisplay}
            </a>
            <button
              type="button"
              onClick={() => openBooking("HU")}
              className="bg-accent px-5 py-2.5 text-[13px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-dark"
            >
              Termin buchen
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
            className="relative z-[60] flex h-9 w-9 flex-col items-center justify-center gap-[6px] lg:hidden"
          >
            <span className={cn("block h-[2px] w-6 bg-text transition-all duration-300", menuOpen && "translate-y-[4px] rotate-45")} />
            <span className={cn("block h-[2px] w-6 bg-text transition-all duration-300", menuOpen && "-translate-y-[4px] -rotate-45")} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-white px-6 pb-10 pt-24 lg:hidden"
          >
            <nav className="flex flex-1 flex-col items-start justify-center gap-2">
              {mainNav.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-3xl font-bold uppercase tracking-tight text-text"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex flex-col gap-3 border-t border-border pt-6"
            >
              <a href={`tel:${company.phoneHref}`} className="text-sm font-semibold text-text">
                {company.phoneDisplay}
              </a>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  openBooking("HU");
                }}
                className="bg-accent px-5 py-3.5 text-sm font-semibold uppercase tracking-wide text-white"
              >
                Termin buchen
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
