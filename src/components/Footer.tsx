import { Linkedin, Mail, Github, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-30 bg-teal-dark border-t border-mist/10">
      <div className="container-custom py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <a
              href="#"
              className="font-display text-2xl font-semibold text-mist hover:text-amber transition-colors"
            >
              Tanveer
            </a>
            <p className="text-sm text-mist-dark mt-2">
              Healthcare Data Analyst & AI Systems Integrator
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:tanveerbakshii@gmail.com"
              className="w-10 h-10 rounded-full bg-mist/5 flex items-center justify-center text-mist-dark hover:text-amber hover:bg-amber/10 transition-all"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/tanveerbakshii"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-mist/5 flex items-center justify-center text-mist-dark hover:text-amber hover:bg-amber/10 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-mist/5 flex items-center justify-center text-mist-dark hover:text-amber hover:bg-amber/10 transition-all"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-sm text-mist-dark flex items-center gap-1 justify-center md:justify-end">
              Made with <Heart className="w-4 h-4 text-amber fill-amber" /> in Bengaluru
            </p>
            <p className="text-xs text-mist-dark/60 mt-1">
              © {currentYear} Tanveer Bakshi. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}