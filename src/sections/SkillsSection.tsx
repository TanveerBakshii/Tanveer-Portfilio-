import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { mockSkills } from '@/lib/mockData';

gsap.registerPlugin(ScrollTrigger);

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Group skills by category
  const skillCategories = useMemo(() => {
    const categories: Record<string, any[]> = {};
    mockSkills.forEach(skill => {
      const catName = skill.category.replace('_', ' ');
      if (!categories[catName]) categories[catName] = [];
      categories[catName].push(skill);
    });
    return Object.entries(categories).map(([name, skills]) => ({ name, skills }));
  }, []);

  // Radar data mapping
  const radarData = useMemo(() => {
    // Map specific skills to radar axes for visual consistency
    const axesMap = [
      { subject: 'EMR/EHR', key: 'EMR/EHR' },
      { subject: 'UAT Testing', key: 'UAT Testing' },
      { subject: 'Workflow', key: 'Workflow Analysis' },
      { subject: 'AI/Automation', key: 'AI Model Training' },
      { subject: 'RCA Support', key: 'Incident Analysis (RCA)' },
      { subject: 'Analytics', key: 'Power BI / Tableau' },
    ];

    return axesMap.map(axis => {
      const skill = mockSkills.find(s => s.name === axis.key);
      return {
        subject: axis.subject,
        A: skill ? skill.proficiency : 80,
        fullMark: 100
      };
    });
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const content = contentRef.current;

    if (!section || !header || !content) return;

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

      // Radar chart animation
      const radarContainer = content.querySelector('.radar-container');
      gsap.fromTo(
        radarContainer,
        { scale: 0.98, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: radarContainer,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Skill bars animation
      const bars = content.querySelectorAll('.skill-bar');
      bars.forEach((bar, index) => {
        gsap.fromTo(
          bar,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative section-padding z-30"
    >
      <div className="container-custom">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="micro-label mb-4 block">Capabilities</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-mist mb-6">
            Skills Matrix
          </h2>
          <p className="text-lg text-mist-dark leading-relaxed">
            A comprehensive view of technical expertise and AI-driven healthcare solutions.
          </p>
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          className="grid lg:grid-cols-2 gap-12 items-start"
        >
          {/* Radar Chart */}
          <div className="radar-container portfolio-card p-6 md:p-8">
            <h3 className="font-display text-xl font-semibold text-mist mb-6 text-center">
              Skill Distribution
            </h3>
            <div className="h-80 md:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="rgba(243, 247, 248, 0.1)" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: '#A9BDC2', fontSize: 12 }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={false}
                    axisLine={false}
                  />
                  <Radar
                    name="Skills"
                    dataKey="A"
                    stroke="#F6C76D"
                    strokeWidth={2}
                    fill="#F6C76D"
                    fillOpacity={0.2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Skill Bars */}
          <div className="space-y-8">
            {skillCategories.map((category) => (
              <div key={category.name}>
                <h3 className="font-display text-lg font-semibold text-mist mb-4 capitalize">
                  {category.name.toLowerCase()}
                </h3>
                <div className="space-y-4">
                  {category.skills.map((skill: any) => (
                    <div key={skill.id} className="group">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-mist">{skill.name}</span>
                        <span className="text-sm text-mist-dark font-mono">
                          {skill.proficiency}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-teal-light overflow-hidden relative group-hover:shadow-[0_0_10px_rgba(246,199,109,0.2)] transition-all">
                        <div
                          className="skill-bar h-full rounded-full bg-gradient-to-r from-amber to-amber-light origin-left group-hover:from-amber-light group-hover:to-amber transition-all duration-300"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                        <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:animate-shimmer" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}