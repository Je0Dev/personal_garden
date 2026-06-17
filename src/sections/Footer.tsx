import { Github, Linkedin, Mail, Rss } from 'lucide-react';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/Je0Dev', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/geomas/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:george@example.com', label: 'Email' },
    { icon: Rss, href: '/rss.xml', label: 'RSS Feed' },
  ];

  return (
    <footer className="mt-20 pt-8 pb-6 border-t border-moss">
      <div className="max-w-wide mx-auto px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center justify-center w-10 h-10 bg-deep-forest border border-moss rounded hover:border-tomato hover:text-tomato transition-all duration-200"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
          
          <p className="text-xs text-earth-muted/60 -mt-2">
            © {new Date().getFullYear()} <a href="/" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="text-olive-light hover:text-tomato transition-colors">George</a>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
