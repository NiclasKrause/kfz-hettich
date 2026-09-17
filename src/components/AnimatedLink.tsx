import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface AnimatedLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "text" | "solid" | "outline";
}

export function AnimatedLink({ href, children, className, variant = "text" }: AnimatedLinkProps) {
  const isExternal = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");

  const classes = cn(
    "group inline-flex items-center gap-2 text-sm font-semibold",
    variant === "text" && "text-text",
    variant === "solid" && "bg-accent px-6 py-3.5 text-white transition-colors hover:bg-accent-dark",
    variant === "outline" &&
      "border border-current px-6 py-3.5 text-text transition-colors hover:bg-dark hover:text-white hover:border-dark",
    className,
  );

  const content = (
    <>
      <span
        className={cn(
          variant === "text" && "border-b border-transparent transition-colors group-hover:border-current",
        )}
      >
        {children}
      </span>
      <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">
        →
      </span>
    </>
  );

  if (isExternal) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
