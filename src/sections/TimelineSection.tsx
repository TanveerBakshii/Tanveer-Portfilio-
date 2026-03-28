import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Calendar, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

import { mockExperiences } from '@/lib/mockData';


export function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const timeline = timelineRef.current;
    const line = lineRef.current;

    if (!section || !header || !timeline || !line) return;

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

      // Timeline line draw animation
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timeline,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Timeline cards animation
      const cards = timeline.querySelectorAll('.timeline-card');
      cards.forEach((card, index) => {
        const isLeft = index % 2 === 0;
        gsap.fromTo(
          card,
          { x: isLeft ? '-6vw' : '6vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Date badges animation
      const badges = timeline.querySelectorAll('.date-badge');
      badges.forEach((badge) => {
        gsap.fromTo(
          badge,
          { y: 10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: badge,
              start: 'top 85%',
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
      id="timeline"
      className="relative section-padding z-30"
    >
      <div className="container-custom">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="micro-label mb-4 block">Journey</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-mist mb-6">
            Career Timeline
          </h2>
          <p className="text-lg text-mist-dark leading-relaxed">
            7+ years of transforming healthcare data into actionable insights.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          {/* Center line - desktop only */}
          <div
            ref={lineRef}
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-amber/30 origin-top -translate-x-1/2"
          />

          {/* Timeline items */}
          <div className="space-y-12 md:space-y-0">
            {mockExperiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              const period = `${new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - ${exp.isCurrent ? 'Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''}`;
              
              return (
                <div
                  key={exp.id}
                  className={`timeline-card relative md:grid md:grid-cols-2 md:gap-8 ${
                    index > 0 ? 'md:mt-12' : ''
                  }`}
                >
                  {/* Date badge - desktop */}
                  <div
                    className={`date-badge hidden md:flex absolute left-1/2 top-0 -translate-x-1/2 z-10`}
                  >
                    <div className="px-4 py-2 rounded-full bg-amber text-teal text-sm font-mono font-medium whitespace-nowrap">
                      {period}
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`${
                      isLeft
                        ? 'md:col-start-1 md:text-right md:pr-12'
                        : 'md:col-start-2 md:pl-12'
                    }`}
                  >
                    <div className={`portfolio-card-sm p-6 md:p-8 relative ${exp.isCurrent ? 'ring-2 ring-amber/50 bg-amber/5' : ''}`}>
                      {/* Current badge */}
                      {exp.isCurrent && (
                        <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-amber text-teal-dark text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5 animate-pulse shadow-[0_0_15px_rgba(246,199,109,0.4)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-dark" />
                          Current
                        </div>
                      )}

                      <div className="md:hidden flex items-center gap-2 mb-4 text-amber text-sm font-mono">
                        <Calendar className="w-4 h-4" />
                        {period}
                      </div>

                      {/* Title */}
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-amber/10 flex items-center justify-center flex-shrink-0">
                          <Briefcase className="w-5 h-5 text-amber" />
                        </div>
                        <div className={isLeft ? 'md:text-right' : ''}>
                          <h3 className="font-display text-xl font-semibold text-mist">
                            {exp.title}
                          </h3>
                          <p className="text-amber font-medium">{exp.company}</p>
                        </div>
                      </div>

                      {/* Location */}
                      <div
                        className={`flex items-center gap-2 mb-4 text-mist-dark text-sm ${
                          isLeft ? 'md:justify-end' : ''
                        }`}
                      >
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </div>

                      {/* Description */}
                      <p className="text-mist-dark text-sm leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      {/* Impact */}
                      <ul className="space-y-2 mb-6">
                        {exp.impact.map((item, i) => (
                          <li
                            key={i}
                            className={`flex items-start gap-2 text-sm text-mist-dark ${
                              isLeft ? 'md:flex-row-reverse md:text-right' : ''
                            }`}
                          >
                            <span className="text-amber mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Skills */}
                      <div
                        className={`flex flex-wrap gap-2 ${
                          isLeft ? 'md:justify-end' : ''
                        }`}
                      >
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 rounded-full text-xs font-mono bg-mist/5 text-mist-dark border border-mist/10"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Empty column for alternating layout */}
                  <div
                    className={`hidden md:block ${
                      isLeft ? 'md:col-start-2' : 'md:col-start-1 md:row-start-1'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}