import Image from "next/image";
import { HeadlineReveal } from "@/components/motion/HeadlineReveal";

const images = [
  { src: "/photos/tire-service.jpg", caption: "Reifenmontage" },
  { src: "/photos/brake.jpg", caption: "Bremsanlage" },
  { src: "/photos/engine.jpg", caption: "Motorraum" },
  { src: "/photos/diagnostic.jpg", caption: "Diagnose" },
];

export function WerkstattGallery() {
  return (
    <section id="werkstatt" className="border-t border-border px-6 py-20 sm:px-10 sm:py-24">
      <h2 className="font-display font-bold uppercase leading-[1.05] tracking-tight text-[clamp(1.8rem,4.5vw,3rem)]">
        <HeadlineReveal lines={["Nicht nur sehen, was wir", "machen. Sondern wo."]} />
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {images.map((img) => (
          <div key={img.src} className="relative h-[70vw] max-h-[440px] min-h-[280px] overflow-hidden sm:h-[38vw]">
            <Image
              src={img.src}
              alt={img.caption}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
            <span className="absolute bottom-4 left-4 text-[11px] font-semibold uppercase tracking-widest text-white drop-shadow">
              {img.caption}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
