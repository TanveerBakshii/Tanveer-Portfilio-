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
  Globe,
  Hospital,
  Zap
} from 'lucide-react';
import { mockTools, mockTags } from '@/lib/mockData';
import { useState } from 'react';

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
  Globe,
  Hospital,
  Zap,
  EMR: Hospital,
  Analytics: BarChart3,
  Scraping: Zap,
  Engineering: Code2,
  Management: Workflow
};

export function ToolsSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(mockTools.map(t => t.category))];
    return cats;
  }, []);

  const filteredTools = useMemo(() => {
    if (activeCategory === 'All') return mockTools;
    return mockTools.filter(t => t.category === activeCategory);
  }, [activeCategory]);

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
        { y: 12, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.04,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: toolsEl,
            start: 'top 85%',
          },
        }
      );

      // Tags animation
      const tagItems = tagsEl.querySelectorAll('.tag-item');
      gsap.fromTo(
        tagItems,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.02,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: tagsEl,
            start: 'top 92%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Filter change animation
  useEffect(() => {
    const toolsEl = toolsRef.current;
    if (!toolsEl) return;

    gsap.fromTo(
      toolsEl.querySelectorAll('.tool-item'),
      { scale: 0.95, opacity: 0, y: 10 },
      { 
        scale: 1, 
        opacity: 1, 
        y: 0, 
        stagger: 0.03, 
        duration: 0.4, 
        ease: 'power2.out',
        overwrite: true
      }
    );
  }, [activeCategory]);

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

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-amber text-teal-dark border-amber shadow-[0_0_15px_rgba(246,199,109,0.3)]'
                  : 'bg-teal-light/20 text-mist-dark border-mist/10 hover:border-amber/40 hover:text-mist'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div
          ref={toolsRef}
          className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6 mb-20"
        >
          {filteredTools.map((tool) => {
            const Icon = iconMap[tool.category] || iconMap[tool.name] || iconMap['Globe'];
            return (
              <div
                key={tool.id}
                className="tool-item flex flex-col items-center gap-3 p-5 rounded-2xl bg-teal-light/30 border border-mist/5 hover:border-amber/30 hover:bg-teal-light/50 transition-all duration-500 group"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-dark/50 flex items-center justify-center group-hover:bg-amber/10 border border-mist/5 group-hover:border-amber/20 transition-all duration-300 shadow-inner">
                  <Icon className="w-6 h-6 text-mist-dark group-hover:text-amber transition-colors" />
                </div>
                <div className="text-center">
                  <span className="text-xs font-semibold text-mist-dark group-hover:text-mist transition-colors block">
                    {tool.name}
                  </span>
                  <span className="text-[9px] text-amber/40 uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                    {tool.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tags Cloud */}
        <div className="pt-16 border-t border-mist/5">
          <div className="text-center mb-8">
             <h4 className="text-sm font-mono text-mist-dark uppercase tracking-[0.3em]">Knowledge Graph</h4>
          </div>
          <div ref={tagsRef} className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
            {mockTags.map((tag) => (
              <span
                key={tag}
                className="tag-item px-4 py-2 rounded-xl text-xs bg-teal-light/20 text-mist-dark border border-mist/5 hover:border-amber/30 hover:text-mist hover:bg-teal-light/40 transition-all duration-300 cursor-default font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}