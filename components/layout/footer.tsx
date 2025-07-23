import {
  Church,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import { Container } from "./container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "About Us",
      links: [
        { name: "Our Story", href: "#" },
        { name: "Leadership", href: "#" },
        { name: "Beliefs", href: "#" },
        { name: "Mission & Vision", href: "#" },
      ],
    },
    {
      title: "Ministries",
      links: [
        { name: "Children's Ministry", href: "#" },
        { name: "Youth Ministry", href: "#" },
        { name: "Adult Ministry", href: "#" },
        { name: "Outreach", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Sermons", href: "#" },
        { name: "Events", href: "#" },
        { name: "Prayer Requests", href: "#" },
        { name: "Give Online", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30px_30px,rgba(255,255,255,0.02)_2px,transparent_2px)] bg-[length:60px_60px]"></div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-orange-800/15 to-yellow-700/10"></div>

      {/* Accent Lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
      {/* Main Footer Content */}
      <Container className="relative z-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Church Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg shadow-lg">
                <Church className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">PMC Church</h3>
            </div>
            <p className="text-gray-200 mb-6 leading-relaxed">
              We are a welcoming community dedicated to spreading God's love and
              serving our neighbors. Join us in worship, fellowship, and
              spiritual growth.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-orange-400" />
                <span className="text-gray-300">
                  123 Church Street, City, State 12345
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-400" />
                <span className="text-gray-300">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-400" />
                <span className="text-gray-300">info@pmcchurch.org</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold mb-4 text-white flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full mr-3"></div>
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-200 hover:text-orange-400 transition-colors duration-200 flex items-center group"
                    >
                      <span className="w-2 h-2 bg-orange-500/50 rounded-full mr-3 group-hover:bg-orange-400 transition-colors"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="mt-12 pt-8 border-t border-gray-700/50">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-6 sm:space-y-0">
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-4 bg-gradient-to-br from-orange-500/20 to-red-500/20 hover:from-orange-500/30 hover:to-red-500/30 rounded-xl transition-all duration-300 group border border-orange-500/20 hover:border-orange-500/40"
                  aria-label={social.label}
                >
                  <social.icon className="h-6 w-6 text-orange-400 group-hover:text-orange-300 transition-colors" />
                </a>
              ))}
            </div>

            <div className="text-center sm:text-right">
              <p className="text-gray-300 text-sm font-medium">
                © {currentYear} PMC Church. All rights reserved.
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
                  className="text-orange-400 hover:text-orange-300 transition-colors ml-1"
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
