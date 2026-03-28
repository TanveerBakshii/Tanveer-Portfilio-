import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Database,
  BarChart3,
  FileSpreadsheet,
  Code2,
  Cloud,
  GitBranch,
  Bug,
  Figma,
  Server,
  Layers,
  Workflow,
  Shield,
  Activity,
  Globe
} from 'lucide-react';
import { mockTools } from '@/lib/mockData';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, any> = {
  Database,
  Server,
  Cloud,
  BarChart3,
  FileSpreadsheet,
  Code2,
  GitBranch,
  Bug,
  Figma,
  Shield,
  Layers,
  Workflow,
  Activity,
  Globe
};

export function ToolsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  // Derived tags from tools and mockData
  const tags = useMemo(() => {
    const skillTags = ['SQL', 'Power BI', 'Tableau', 'Excel', 'Python', 'HL7', 'FHIR', 'GCP', 'JIRA', 'Epic', 'Cerner', 'RCM', 'Playwright', 'Puppeteer'];
    return skillTags;
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const toolsEl = toolsRef.current;
    const tagsEl = tagsRef.current;

    if (!section || !header || !toolsEl || !tagsEl) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        header,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Tools animation
      const toolItems = toolsEl.querySelectorAll('.tool-item');
      gsap.fromTo(
        toolItems,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: toolsEl,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Tags animation
      const tagItems = tagsEl.querySelectorAll('.tag-item');
      gsap.fromTo(
        tagItems,
        { scale: 0.96, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.03,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: tagsEl,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tools"
      className="relative section-padding z-30"
    >
      <div className="container-custom">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="micro-label mb-4 block">Toolkit</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-mist mb-6">
            Tools & Tech
          </h2>
          <p className="text-lg text-mist-dark leading-relaxed">
            The technologies and platforms I use to build healthcare data solutions and automated scrapers.
          </p>
        </div>

        {/* Tools Grid */}
        <div
          ref={toolsRef}
          className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6 mb-12"
        >
          {mockTools.map((tool) => {
            const Icon = iconMap[tool.category] || iconMap[tool.name] || Globe;
            return (
              <div
                key={tool.id}
                className="tool-item flex flex-col items-center gap-3 p-4 rounded-2xl bg-teal-light/30 border border-mist/10 hover:border-amber/30 hover:bg-teal-light/50 transition-all duration-300 group"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-amber/10 flex items-center justify-center group-hover:bg-amber/20 transition-colors">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-amber" />
                </div>
                <span className="text-xs md:text-sm text-mist-dark text-center group-hover:text-mist transition-colors">
                  {tool.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Tags Cloud */}
        <div ref={tagsRef} className="flex flex-wrap justify-center gap-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="tag-item px-4 py-2 rounded-full text-sm bg-mist/5 text-mist-dark border border-mist/10 hover:border-amber/30 hover:text-amber transition-all duration-300 cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}