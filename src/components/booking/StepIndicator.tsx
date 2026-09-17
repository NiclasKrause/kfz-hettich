import { cn } from "@/lib/cn";

const labels = ["Service", "Fahrzeug", "Termin", "Kontakt", "Fertig"];

export function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2">
      {labels.map((label, i) => {
        const index = i + 1;
        const active = index === step;
        const done = index < step;
        return (
          <div key={label} className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold transition-colors",
                done && "bg-accent text-white",
                active && !done && "border border-accent text-accent",
                !active && !done && "border border-border text-text-muted",
              )}
            >
              {index}
            </div>
            {index < labels.length ? (
              <div className={cn("h-px w-4 sm:w-8", done ? "bg-accent" : "bg-border")} />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
