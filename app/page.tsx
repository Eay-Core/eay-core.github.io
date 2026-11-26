import { AsciiDivider } from '@/components/ascii/AsciiDivider';
import { CapabilitiesSection } from '@/components/sections/CapabilitiesSection';
import { CommunitySection, FooterSection } from '@/components/sections/CommunityFooter';
import { HeroSection } from '@/components/sections/HeroSection';
import { InstallSection } from '@/components/sections/InstallSection';
import { Navbar } from '@/components/sections/Navbar';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { WhySection } from '@/components/sections/WhySection';
import { WorksWithSection } from '@/components/sections/WorksWithSection';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <WorksWithSection />
        <CapabilitiesSection />
        <AsciiDivider label="ECOSYSTEM" />
        <ProductsSection />
        <WhySection />
        <InstallSection />
        <CommunitySection />
      </main>
      <FooterSection />
    </>
  );
}
