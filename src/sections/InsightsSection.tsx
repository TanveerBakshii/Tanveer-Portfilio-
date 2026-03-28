import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Clock, Tag } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

import { mockBlogs } from '@/lib/mockData';

export function InsightsSection() {
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
      const cards = grid.querySelectorAll('.insight-card');
      gsap.fromTo(
        cards,
        { y: 26, opacity: 0 },
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
      id="insights"
      className="relative section-padding z-30"
    >
      <div className="container-custom">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="micro-label mb-4 block">Blog</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-mist mb-6">
              Insights
            </h2>
            <p className="text-lg text-mist-dark leading-relaxed">
              Thoughts on healthcare data, interoperability, and building better
              systems.
            </p>
          </div>
          <a
            href="/blog"
            className="btn-secondary self-start"
          >
            View All Articles
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Articles Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockBlogs.map((article) => (
            <article
              key={article.id}
              className="insight-card portfolio-card overflow-hidden group cursor-pointer hover:-translate-y-2 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.coverImage || `https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop`}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-dark via-transparent to-transparent" />
                
                {/* Featured badge */}
                {article.featured && (
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber text-teal text-xs font-mono font-medium">
                    Featured
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 text-xs text-mist-dark"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-semibold text-mist mb-3 group-hover:text-amber transition-colors">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-mist-dark leading-relaxed mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-mist-dark">
                    <Clock className="w-3 h-3" />
                    {article.readTime} min read
                  </div>
                  <span className="flex items-center gap-1 text-sm text-amber font-medium group-hover:gap-2 transition-all">
                    Read More
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}