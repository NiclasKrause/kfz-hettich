import { Hero } from "@/components/sections/Hero";
import { QuickServiceFinder } from "@/components/sections/QuickServiceFinder";
import { HuSection } from "@/components/sections/HuSection";
import { ServiceIndex } from "@/components/sections/ServiceIndex";
import { ProblemFinder } from "@/components/sections/ProblemFinder";
import { UnfallSection } from "@/components/sections/UnfallSection";
import { CostTransparency } from "@/components/sections/CostTransparency";
import { DigitalServiceHub } from "@/components/sections/DigitalServiceHub";
import { WerkstattGallery } from "@/components/sections/WerkstattGallery";
import { RatgeberTeaser } from "@/components/sections/RatgeberTeaser";
import { AboutSection } from "@/components/sections/AboutSection";
import { Faq } from "@/components/sections/Faq";
import { ContactCta } from "@/components/sections/ContactCta";

export default function Home() {
  return (
    <>
      <Hero />
      <QuickServiceFinder />
      <HuSection />
      <ServiceIndex />
      <ProblemFinder />
      <UnfallSection />
      <CostTransparency />
      <DigitalServiceHub />
      <WerkstattGallery />
      <RatgeberTeaser />
      <AboutSection />
      <Faq />
      <ContactCta />
    </>
  );
}
