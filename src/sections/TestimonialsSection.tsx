import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Dr. Sarah Mitchell',
    role: 'Chief Medical Officer',
    company: 'Metro Health Systems',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face',
    quote:
      "Tanveer turned our reporting backlog into a live dashboard in weeks. His understanding of healthcare workflows is exceptional, and the impact on our decision-making was immediate.",
  },
  {
    name: 'Rajesh Kumar',
    role: 'VP of Revenue Cycle',
    company: 'Premier Healthcare',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    quote:
      "Reliable, clear, and always thinking about the end user. Tanveer's RCM dashboard saved us countless hours and helped identify revenue opportunities we didn't know existed.",
  },
  {
    name: 'Lisa Chen',
    role: 'Director of IT',
    company: 'Unity Medical Group',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
    quote:
      'The FHIR integration Tanveer built was flawless. His technical skills combined with healthcare domain knowledge made complex interoperability challenges seem simple.',
  },
];

export function TestimonialsSection() {
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
      const cards = grid.querySelectorAll('.testimonial-card');
      gsap.fromTo(
        cards,
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grid,
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
      id="testimonials"
      className="relative section-padding z-30"
    >
      <div className="container-custom">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="micro-label mb-4 block">Testimonials</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-mist mb-6">
            What teams say
          </h2>
          <p className="text-lg text-mist-dark leading-relaxed">
            Feedback from colleagues and clients I've worked with.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="testimonial-card portfolio-card p-6 md:p-8 relative"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-amber/10 flex items-center justify-center">
                <Quote className="w-5 h-5 text-amber" />
              </div>

              {/* Quote text */}
              <blockquote className="text-mist leading-relaxed mb-8 relative z-10">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber/20"
                />
                <div>
                  <div className="font-medium text-mist">{testimonial.name}</div>
                  <div className="text-sm text-mist-dark">
                    {testimonial.role}
                  </div>
                  <div className="text-xs text-amber">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}