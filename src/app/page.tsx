import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import WhyUsSection from '@/components/sections/WhyUsSection';
import MembershipSection from '@/components/sections/MembershipSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ChallengesPreview from '@/components/sections/ChallengesPreview';
import AiPreviewSection from '@/components/sections/AiPreviewSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <WhyUsSection />
      <AiPreviewSection />
      <ChallengesPreview />
      <TestimonialsSection />
      <MembershipSection />
    </>
  );
}
