"use client";

import { motion } from "motion/react";

interface HeadlineRevealProps {
  lines: string[];
  className?: string;
  delay?: number;
  trigger?: "mount" | "inView";
  as?: "h1" | "h2" | "h3" | "span";
}

export function HeadlineReveal({
  lines,
  className,
  delay = 0,
  trigger = "inView",
  as: Tag = "span",
}: HeadlineRevealProps) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <motion.span
          key={`${line}-${i}`}
          className="block"
          initial={{ opacity: 0, y: 12 }}
          {...(trigger === "mount"
            ? { animate: { opacity: 1, y: 0 } }
            : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-10% 0px" } })}
          transition={{ duration: 0.7, delay: delay + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {line}
        </motion.span>
      ))}
    </Tag>
  );
}
