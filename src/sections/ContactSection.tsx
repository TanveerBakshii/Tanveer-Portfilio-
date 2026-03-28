import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Linkedin, MapPin, Send, Phone, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;

    if (!section || !left || !right) return;

    const ctx = gsap.context(() => {
      // Left column animation
      gsap.fromTo(
        left,
        { x: '-4vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Right column animation
      gsap.fromTo(
        right,
        { x: '4vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success('Message sent successfully! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative section-padding z-30 bg-teal-dark"
    >
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Info */}
          <div ref={leftRef}>
            <span className="micro-label mb-4 block">Contact</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-mist mb-6">
              Let's build something reliable.
            </h2>
            <p className="text-lg text-mist-dark leading-relaxed mb-10">
              If you need dashboards, data pipelines, or healthcare reporting—let's
              talk. I'm always open to discussing new projects and opportunities.
            </p>

            {/* Contact Info */}
            <div className="space-y-6 mb-10">
              <a
                href="mailto:tanveerbakshii@gmail.com"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center group-hover:bg-amber/20 transition-colors">
                  <Mail className="w-5 h-5 text-amber" />
                </div>
                <div>
                  <div className="text-sm text-mist-dark">Email</div>
                  <div className="text-mist group-hover:text-amber transition-colors">
                    tanveerbakshii@gmail.com
                  </div>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/tanveerbakshii"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center group-hover:bg-amber/20 transition-colors">
                  <Linkedin className="w-5 h-5 text-amber" />
                </div>
                <div>
                  <div className="text-sm text-mist-dark">LinkedIn</div>
                  <div className="text-mist group-hover:text-amber transition-colors">
                    linkedin.com/in/tanveerbakshii
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-amber" />
                </div>
                <div>
                  <div className="text-sm text-mist-dark">Phone</div>
                  <div className="text-mist">+91-9844999202</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-amber" />
                </div>
                <div>
                  <div className="text-sm text-mist-dark">Location</div>
                  <div className="text-mist">Bengaluru, India</div>
                </div>
              </div>
            </div>

            {/* Download Resume */}
            <a
              href="/resume.pdf"
              download
              className="btn-secondary inline-flex"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          </div>

          {/* Right Column - Form */}
          <div ref={rightRef}>
            <div className="portfolio-card p-6 md:p-8">
              <h3 className="font-display text-xl font-semibold text-mist mb-6">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-mist-dark">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Your name"
                      required
                      className="bg-teal-light/50 border-mist/10 text-mist placeholder:text-mist-dark/50 focus:border-amber/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-mist-dark">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="your@email.com"
                      required
                      className="bg-teal-light/50 border-mist/10 text-mist placeholder:text-mist-dark/50 focus:border-amber/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-mist-dark">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="What's this about?"
                    className="bg-teal-light/50 border-mist/10 text-mist placeholder:text-mist-dark/50 focus:border-amber/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-mist-dark">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell me about your project..."
                    rows={5}
                    required
                    className="bg-teal-light/50 border-mist/10 text-mist placeholder:text-mist-dark/50 focus:border-amber/50 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-accent"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-teal/30 border-t-teal rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}