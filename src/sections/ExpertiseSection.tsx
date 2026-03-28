import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Stethoscope,
  Network,
  DollarSign,
  Building2,
  Bot,
  HeadphonesIcon,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const expertiseAreas = [
  {
    icon: Stethoscope,
    title: 'EMR/EHR Systems',
    description:
      'Deep expertise in Epic, Cerner, and Practo platforms. Proficient in clinical workflows, reporting workbench, and data extraction for analytics.',
    skills: ['Epic', 'Cerner', 'PowerChart', 'Hyperspace'],
  },
  {
    icon: Network,
    title: 'HL7 / FHIR Interoperability',
    description:
      'Building seamless data exchange between healthcare systems using modern interoperability standards and APIs.',
    skills: ['HL7 v2', 'FHIR R4', 'REST APIs', 'Data Mapping'],
  },
  {
    icon: DollarSign,
    title: 'Revenue Cycle Management',
    description:
      'End-to-end RCM analytics from patient registration to claim submission and payment posting.',
    skills: ['Claim Management', 'Denial Analysis', 'Charge Capture'],
  },
  {
    icon: Building2,
    title: 'US Healthcare Workflows',
    description:
      'Understanding of payer and provider workflows, compliance requirements, and operational best practices.',
    skills: ['Payer/Provider', 'HIPAA', 'HEDIS', 'Quality Measures'],
  },
  {
    icon: Bot,
    title: 'Data Intelligence & Automation',
    description:
      'Leveraging Headless Scraping and AI to automate complex data extraction and processing for healthcare insights.',
    skills: ['Python', 'Headless Scraping', 'ML Models', 'NLP'],
  },
  {
    icon: HeadphonesIcon,
    title: 'Production Support',
    description:
      'L1/L2/L3 support for critical healthcare applications with fast incident response and resolution.',
    skills: ['Incident Management', 'UAT/QA', 'Documentation', 'Training'],
  },
];

export function ExpertiseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!section || !header || !cards) return;

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
      const cardElements = cards.querySelectorAll('.expertise-card');
      gsap.fromTo(
        cardElements,
        { y: 28, opacity: 0, scale: 0.985 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 85%',
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
      id="expertise"
      className="relative section-padding z-30"
    >
      <div className="container-custom">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="micro-label mb-4 block">Capabilities</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-mist mb-6">
            Built for healthcare operations.
          </h2>
          <p className="text-lg text-mist-dark leading-relaxed">
            I work at the intersection of data, compliance, and delivery—turning
            requirements into reliable reporting.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {expertiseAreas.map((area) => {
            const Icon = area.icon;
            return (
              <div
                key={area.title}
                className="expertise-card portfolio-card-sm p-6 md:p-8 group hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center mb-6 group-hover:bg-amber/20 transition-colors">
                  <Icon className="w-6 h-6 text-amber" />
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-semibold text-mist mb-3">
                  {area.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-mist-dark leading-relaxed mb-6">
                  {area.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {area.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full text-xs font-mono bg-mist/5 text-mist-dark border border-mist/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}