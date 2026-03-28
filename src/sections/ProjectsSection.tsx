import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowUpRight, 
  TrendingUp, 
  Users, 
  Clock, 
  DollarSign, 
  Database, 
  CheckCircle,
  Activity,
  Layers,
  Code2
} from 'lucide-react';
import { mockProjects } from '@/lib/mockData';

gsap.registerPlugin(ScrollTrigger);

// Icon mapping for metrics
const iconMap: Record<string, any> = {
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  Database,
  CheckCircle,
  Activity,
  Layers,
  Code2
};

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;

    if (!section || !header || !grid) return;

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

      // Cards animation
      const cards = grid.querySelectorAll('.project-card');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 32, opacity: 0, scale: 0.99 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Image parallax
        const image = card.querySelector('.project-image');
        if (image) {
          gsap.fromTo(
            image,
            { y: 12 },
            {
              y: -12,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative section-padding z-30"
    >
      <div className="container-custom">
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-16">
          <span className="micro-label mb-4 block">Portfolio</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-mist mb-6">
            Selected Projects
          </h2>
          <p className="text-lg text-mist-dark leading-relaxed">
            Case studies showcasing AI automation, healthcare data analytics,
            and high-performance data acquisition.
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 gap-8">
          {mockProjects.map((project) => (
            <div
              key={project.id}
              className="project-card portfolio-card overflow-hidden group cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-56 md:h-64 overflow-hidden">
                <img
                  src={project.thumbnail || `https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop`}
                  alt={project.title}
                  className="project-image w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-dark via-teal-dark/50 to-transparent" />
                
                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber text-teal text-xs font-mono font-medium">
                    Featured
                  </div>
                )}

                {/* Title overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-mist mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-mist-dark line-clamp-2">
                    {project.summary}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Metrics */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {project.metrics.map((metric) => {
                    const Icon = iconMap[metric.icon] || TrendingUp;
                    return (
                      <div
                        key={metric.label}
                        className="text-center p-3 rounded-xl bg-teal-light/50"
                      >
                        <Icon className="w-4 h-4 text-amber mx-auto mb-1" />
                        <div className="text-lg font-display font-semibold text-mist">
                          {metric.value}
                        </div>
                        <div className="text-xs text-mist-dark">{metric.label}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-mono bg-mist/5 text-mist-dark border border-mist/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button className="flex items-center gap-2 text-amber text-sm font-medium group-hover:gap-3 transition-all">
                  View Case Study
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}