import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Shield,
  Cookie,
} from "lucide-react";
import { Container } from "./container";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Navigation",
      links: [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Events", href: "/events" },
        { name: "Gallery", href: "/gallery" },
        { name: "Locations", href: "/locations" },
        { name: "Prayer Request", href: "/prayer-request" },
      ],
    },
    {
      title: "About Us",
      links: [
        { name: "Our Story", href: "/about" },
        { name: "Who We Are", href: "/about#who-we-are" },
        { name: "Our Pastors", href: "/about#pastors" },
        { name: "Our Mission", href: "/about#mission" },
      ],
    },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy-policy", icon: Shield },
    { name: "Cookie Policy", href: "/cookie-policy", icon: Cookie },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/pmcchurch",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/pmcchurch",
      label: "Instagram",
    },
    {
      icon: Youtube,
      href: "https://www.youtube.com/pmcchurch",
      label: "YouTube",
    },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30px_30px,rgba(255,255,255,0.02)_2px,transparent_2px)] bg-[length:60px_60px]"></div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-red-800/15 to-red-700/10"></div>

      {/* Accent Lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>

      {/* Main Footer Content */}
      <Container className="relative z-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Church Info */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Logo size="lg" variant="white" />
            </div>
            <p className="text-gray-200 mb-6 leading-relaxed">
              We are a welcoming community dedicated to spreading God's love and
              serving our neighbors. Join us in worship, fellowship, and
              spiritual growth.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-red-400" />
                <span className="text-gray-300">
                  Multiple locations across Switzerland
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-red-400" />
                <span className="text-gray-300">
                  Contact your nearest location
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-red-400" />
                <span className="text-gray-300">info@pmcchurch.ch</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold mb-4 text-white flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-red-600 to-red-500 rounded-full mr-3"></div>
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-200 hover:text-red-400 transition-colors duration-200 flex items-center group relative"
                    >
                      <span className="w-2 h-2 bg-red-500/50 rounded-full mr-3 group-hover:bg-red-400 transition-colors"></span>
                      <span className="relative">
                        {link.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-red-500 transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal Links */}
        <div className="mt-8 pt-8 border-t border-gray-700/50">
          <div className="flex flex-wrap justify-center gap-6">
            {legalLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center space-x-2 text-gray-300 hover:text-red-400 transition-colors duration-200 group"
              >
                <link.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="relative">
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-red-500 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 pt-8 border-t border-gray-700/50">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-6 sm:space-y-0">
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-4 bg-gradient-to-br from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 rounded-xl transition-all duration-300 group border border-red-500/20 hover:border-red-500/40 hover:scale-105 hover:shadow-lg"
                  aria-label={social.label}
                >
                  <social.icon className="h-6 w-6 text-red-400 group-hover:text-red-300 transition-colors group-hover:scale-110" />
                </a>
              ))}
            </div>

            <div className="text-center sm:text-right">
              <p className="text-gray-300 text-sm font-medium">
                © {currentYear} Philadelphia Missionary Church. All rights
                reserved.
              </p>
              <p className="text-gray-400 text-xs mt-2 flex items-center justify-center sm:justify-end">
                Made with ❤️ for our community
              </p>
              <p className="text-gray-400 text-xs mt-2 flex items-center justify-center sm:justify-end">
                Developed by{" "}
                <a
                  href="https://www.maxsoft.ch/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 hover:text-red-300 transition-colors ml-1 hover:underline"
                >
                  Maxsoft AG
                </a>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
