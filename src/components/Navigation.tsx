import { useState, useEffect } from 'react';
import { Menu, User } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const navItems = [
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Insights', href: '#insights' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: href, autoKill: true, offsetY: 0 },
      ease: 'expo.inOut'
    });
    setIsOpen(false);
  };



  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-teal/80 backdrop-blur-lg border-b border-amber/10 nav-glow py-2'
          : 'bg-transparent py-4'
      }`}
    >

      <div className="container-custom">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            className="font-display text-xl md:text-2xl font-semibold text-mist hover:text-amber transition-colors"
          >
            Tanveer
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-sm text-mist-dark hover:text-mist transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Admin link - desktop only */}
            <a
              href="/admin"
              className="hidden md:flex items-center gap-2 text-sm text-mist-dark hover:text-amber transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Admin</span>
            </a>

            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="lg:hidden p-2 text-mist hover:text-amber transition-colors">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] bg-teal-dark border-l border-mist/10"
              >
                <div className="flex flex-col gap-6 mt-8">
                  {navItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => scrollToSection(item.href)}
                      className="text-lg text-mist hover:text-amber transition-colors text-left"
                    >
                      {item.label}
                    </button>
                  ))}
                  <hr className="border-mist/10" />
                  <a
                    href="/admin"
                    className="flex items-center gap-2 text-lg text-mist hover:text-amber transition-colors"
                  >
                    <User className="w-5 h-5" />
                    Admin
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}