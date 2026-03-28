import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/sections/HeroSection';
import { DashboardSection } from '@/sections/DashboardSection';
import { ExpertiseSection } from '@/sections/ExpertiseSection';
import { TimelineSection } from '@/sections/TimelineSection';
import { ProjectsSection } from '@/sections/ProjectsSection';
import { SkillsSection } from '@/sections/SkillsSection';
import { ToolsSection } from '@/sections/ToolsSection';
import { InsightsSection } from '@/sections/InsightsSection';
import { TestimonialsSection } from '@/sections/TestimonialsSection';
import { ContactSection } from '@/sections/ContactSection';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';

gsap.registerPlugin(ScrollTrigger);

import { ResumeView } from '@/views/ResumeView';

function App() {
  const isResumeView = typeof window !== 'undefined' && window.location.pathname === '/resume';

  useEffect(() => {
    // Initialize scroll-triggered animations
    const ctx = gsap.context(() => {
      // Refresh ScrollTrigger on load
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  if (isResumeView) {
    return (
      <>
        <ResumeView />
        <Toaster position="bottom-right" />
      </>
    );
  }

  return (
    <div className="relative min-h-screen bg-teal">
      {/* Background effects */}
      <div className="grid-overlay" />
      <div className="radial-glow" />
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main className="relative z-10">
        <HeroSection />
        <DashboardSection />
        <ExpertiseSection />
        <TimelineSection />
        <ProjectsSection />
        <SkillsSection />
        <ToolsSection />
        <InsightsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      
      {/* Footer */}
      <Footer />
      
      {/* Toast notifications */}
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#082D36',
            border: '1px solid rgba(243, 247, 248, 0.1)',
            color: '#F3F7F8',
          },
        }}
      />
    </div>
  );
}

export default App;