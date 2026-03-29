import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ArrowRight, Download, Activity, BarChart3, Database } from 'lucide-react';
import { mockProfile } from '@/lib/mockData';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export function HeroSection() {
  const profile = mockProfile;
  const resumeRoute = `${import.meta.env.BASE_URL}resume`;

  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;
    const chips = chipsRef.current;

    if (!section || !card || !title || !subtitle || !cta || !chips) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation on load
      const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Card entrance
      loadTl.fromTo(
        card,
        { y: 18, scale: 0.985, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.7 },
        0.15
      );

      // Title words stagger
      const words = title.querySelectorAll('.word');
      loadTl.fromTo(
        words,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
        0.35
      );

      // Subtitle + CTAs
      loadTl.fromTo(
        [subtitle, cta],
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        0.65
      );

      // Floating chips
      const chipElements = chips.querySelectorAll('.metric-chip');
      loadTl.fromTo(
        chipElements,
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.1 },
        0.9
      );

      // Add a persistent subtle glow pulse to the text-glow-amber class
      gsap.to('.text-glow-amber', {
        textShadow: '0 0 15px rgba(246, 199, 109, 0.4)',
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: 'sine.inOut'
      });


      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          pinSpacing: true,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set(card, { x: 0, opacity: 1, scale: 1 });
            gsap.set(chipElements, { y: 0, opacity: 1 });
          },
        },
      });

      // EXIT phase (70% - 100%)
      scrollTl.fromTo(
        card,
        { x: 0, opacity: 1 },
        { x: '-28vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        chipElements,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.75
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToDashboard = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: '#dashboard', autoKill: true },
      ease: 'power3.inOut'
    });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden z-10"
    >
      <div className="container-custom w-full">
        {/* Floating metric chips */}
        <div ref={chipsRef} className="absolute inset-0 pointer-events-none">
          <div className="metric-chip absolute top-[15%] left-[5%] md:left-[10%] flex items-center gap-2 px-4 py-2 rounded-full bg-teal-dark/80 border border-amber/20">
            <Activity className="w-4 h-4 text-amber" />
            <span className="text-sm text-mist font-mono">2.5M+ Nodes Scraped</span>
          </div>
          <div className="metric-chip absolute bottom-[20%] right-[5%] md:right-[8%] flex items-center gap-2 px-4 py-2 rounded-full bg-teal-dark/80 border border-amber/20">
            <BarChart3 className="w-4 h-4 text-amber" />
            <span className="text-sm text-mist font-mono">99.8% Data Accuracy</span>
          </div>
          <div className="metric-chip absolute top-[25%] right-[10%] md:right-[15%] flex items-center gap-2 px-4 py-2 rounded-full bg-teal-dark/80 border border-amber/20 hidden md:flex">
            <Database className="w-4 h-4 text-amber" />
            <span className="text-sm text-mist font-mono">AI-Driven Insights</span>
          </div>
        </div>

        {/* Hero Card */}
        <div
          ref={cardRef}
          className="portfolio-card w-full max-w-6xl mx-auto overflow-hidden"
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left column - Content */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              {/* Micro label */}
              <span className="micro-label mb-4 md:mb-6">
                {profile.role}
              </span>


              {/* Title */}
              <h1
                ref={titleRef}
                className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-mist leading-[0.95] mb-6"
              >
                {profile.tagline?.split(' ').map((word, i) => (
                  <span key={i} className={`word inline-block ${['Scraping', '&', 'AI', 'intelligent', 'insights.'].includes(word) ? 'text-amber text-glow-amber' : ''}`}>
                    {word}{' '}
                  </span>
                ))}
              </h1>

              {/* Subtitle */}
              <p
                ref={subtitleRef}
                className="text-base md:text-lg text-mist-dark leading-relaxed mb-8"
              >
                7+ years · Headless Scraping · EMR/EHR Systems · AI Automation
                <br />
                <span className="text-sm mt-2 block">
                  {profile.shortBio}
                </span>
              </p>


              {/* CTAs */}
              <div ref={ctaRef} className="flex flex-wrap gap-4">
                <button
                  onClick={scrollToDashboard}
                  className="btn-accent"
                >
                  View Dashboard
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={resumeRoute}
                  className="btn-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-4 h-4" />
                  Get Resume (PDF)
                </a>

              </div>
            </div>

            {/* Right column - Image */}
            <div className="relative h-64 md:h-auto min-h-[300px] lg:min-h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-br from-amber/10 to-teal-dark/50" />
              <img
                src={profile.avatar || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop"}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}

              <div className="absolute inset-0 bg-gradient-to-t from-teal-dark/60 via-transparent to-transparent" />
              
              {/* Stats overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex gap-4">
                <div className="flex-1 p-4 rounded-2xl bg-teal-dark/90 backdrop-blur-sm border border-mist/10">
                  <div className="text-2xl md:text-3xl font-display font-semibold text-amber">
                    7+
                  </div>
                  <div className="text-xs text-mist-dark">Years Experience</div>
                </div>
                <div className="flex-1 p-4 rounded-2xl bg-teal-dark/90 backdrop-blur-sm border border-mist/10">
                  <div className="text-2xl md:text-3xl font-display font-semibold text-amber">
                    50+
                  </div>
                  <div className="text-xs text-mist-dark">Projects Delivered</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}