import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  Shield,
  Lock,
  Eye,
  Users,
  Database,
  Heart,
  Cookie,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Philadelphia Missionary Church",
  description:
    "Learn about how Philadelphia Missionary Church collects, uses, and protects your personal information in accordance with privacy laws and our commitment to transparency.",
  keywords: [
    "privacy policy",
    "data protection",
    "personal information",
    "church privacy",
    "Philadelphia Missionary Church",
  ],
  openGraph: {
    title: "Privacy Policy | Philadelphia Missionary Church",
    description:
      "Learn about how Philadelphia Missionary Church collects, uses, and protects your personal information.",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: Eye,
      title: "Information We Collect",
      content: [
        "Personal information you provide through prayer request forms (name, email, phone number)",
        "Prayer request content and spiritual needs you share with us",
        "Website usage data and analytics (with your consent)",
        "Communication preferences and interaction history",
        "Information about your participation in church events and activities",
        "Contact information for ministry communications",
      ],
    },
    {
      icon: Database,
      title: "How We Use Your Information",
      content: [
        "To process and respond to your prayer requests with care and confidentiality",
        "To provide spiritual support and pastoral care services",
        "To communicate about church events, services, and ministry activities",
        "To improve our website and ministry services",
        "To maintain accurate records of church activities and participation",
        "To comply with legal obligations and church governance requirements",
      ],
    },
    {
      icon: Lock,
      title: "How We Protect Your Information",
      content: [
        "Secure data storage using Supabase with encryption and access controls",
        "Limited access to personal information to authorized ministry staff only",
        "Regular security audits and system updates",
        "Training for all staff on data protection and confidentiality",
        "Compliance with GDPR and Swiss data protection regulations",
        "Secure email communications for prayer request confirmations",
      ],
    },
    {
      icon: Users,
      title: "Sharing Your Information",
      content: [
        "We do not sell, trade, or rent your personal information",
        "Prayer requests are shared only with authorized prayer team members",
        "Information may be shared with trusted service providers (email services, hosting)",
        "Required disclosures for legal compliance or church governance",
        "With your explicit consent for specific ministry purposes",
        "Anonymous data may be used for ministry effectiveness analysis",
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <div className="pt-16 lg:pt-20">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30px_30px,rgba(255,255,255,0.02)_2px,transparent_2px)] bg-[length:60px_60px]"></div>
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-red-800/15 to-red-700/10"></div>

          {/* Accent Lines */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>

          <Container className="relative z-10 py-16 lg:py-24">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-2xl border border-red-500/20">
                  <Shield className="h-12 w-12 text-red-400" />
                </div>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                Privacy Policy
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Your privacy is important to us. Learn how Philadelphia
                Missionary Church collects, uses, and protects your personal
                information.
              </p>
              <div className="mt-8 text-sm text-gray-400">
                Last updated:{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </Container>
        </div>

        {/* Content Section */}
        <div className="py-16 lg:py-24 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto">
              {/* Introduction */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Our Commitment to Privacy
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Philadelphia Missionary Church, founded in 1989 and serving
                  communities in Switzerland, India, and Sri Lanka, is committed
                  to protecting your privacy and ensuring the security of your
                  personal information. This Privacy Policy explains how we
                  collect, use, disclose, and safeguard your information when
                  you visit our website, submit prayer requests, attend our
                  services, or interact with our ministry.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  As a church community, we understand the sensitive nature of
                  prayer requests and spiritual information. We treat all
                  personal information, especially prayer requests, with the
                  utmost care, confidentiality, and respect. Your trust is
                  sacred to us, and we are committed to maintaining that trust
                  through transparent and responsible data practices.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  By using our services, you agree to the collection and use of
                  information in accordance with this policy. We will not use or
                  share your information with anyone except as described in this
                  Privacy Policy and always with the highest regard for your
                  privacy and spiritual well-being.
                </p>
              </div>

              {/* Policy Sections */}
              <div className="space-y-16">
                {sections.map((section, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="p-3 bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-xl border border-red-500/20">
                        <section.icon className="h-8 w-8 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {section.title}
                        </h3>
                      </div>
                    </div>
                    <ul className="space-y-3 ml-16">
                      {section.content.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-start space-x-3"
                        >
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600 leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Prayer Requests and Spiritual Data */}
              <div className="mt-16 p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Heart className="w-6 h-6 text-blue-600 mr-3" />
                  Prayer Requests and Spiritual Data
                </h3>
                <div className="space-y-4 text-gray-700">
                  <p className="text-base leading-relaxed">
                    <strong>Confidentiality Commitment:</strong> We treat all
                    prayer requests and spiritual information with the highest
                    level of confidentiality and respect. Your prayer requests
                    are shared only with authorized prayer team members who are
                    committed to maintaining your privacy.
                  </p>
                  <p className="text-base leading-relaxed">
                    <strong>Data Processing:</strong> When you submit a prayer
                    request, we collect your name, email, phone number
                    (optional), and the prayer request content. This information
                    is stored securely and used solely for the purpose of
                    providing spiritual support and pastoral care.
                  </p>
                  <p className="text-base leading-relaxed">
                    <strong>Communication:</strong> We may send you confirmation
                    emails when your prayer request is received and may follow
                    up with spiritual support or pastoral care communications.
                    You can opt-out of these communications at any time.
                  </p>
                  <p className="text-base leading-relaxed">
                    <strong>Retention:</strong> Prayer request data is retained
                    for ministry purposes and pastoral care follow-up. You may
                    request deletion of your prayer request data at any time,
                    subject to our legal obligations and ministry record-keeping
                    requirements.
                  </p>
                </div>
              </div>

              {/* Your Rights and Choices */}
              <div className="mt-16 p-8 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl border border-red-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Your Rights and Choices
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Access and Update
                    </h4>
                    <p className="text-gray-600 text-sm">
                      You have the right to access, update, or correct your
                      personal information and prayer request data.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Opt-Out
                    </h4>
                    <p className="text-gray-600 text-sm">
                      You can opt-out of certain communications and data
                      collection activities, including analytics cookies.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Data Portability
                    </h4>
                    <p className="text-gray-600 text-sm">
                      You can request a copy of your personal data in a portable
                      format, including your prayer request history.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Deletion
                    </h4>
                    <p className="text-gray-600 text-sm">
                      You can request deletion of your personal information and
                      prayer requests, subject to our legal and ministry
                      obligations.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cookies and Analytics */}
              <div className="mt-16 p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Cookie className="w-6 h-6 text-green-600 mr-3" />
                  Cookies and Website Analytics
                </h3>
                <div className="space-y-4 text-gray-700">
                  <p className="text-base leading-relaxed">
                    <strong>Cookie Consent:</strong> Our website uses cookies to
                    enhance your browsing experience. We respect your privacy
                    choices and only use analytics cookies with your explicit
                    consent. You can manage your cookie preferences at any time
                    through our cookie banner.
                  </p>
                  <p className="text-base leading-relaxed">
                    <strong>Analytics:</strong> We use Google Analytics to
                    understand how visitors use our website, which helps us
                    improve our ministry services and website functionality.
                    Analytics data is collected anonymously and does not
                    identify individual users.
                  </p>
                  <p className="text-base leading-relaxed">
                    <strong>Essential Cookies:</strong> Some cookies are
                    necessary for the website to function properly, such as
                    session management and security features. These cannot be
                    disabled as they are essential for basic functionality.
                  </p>
                  <p className="text-base leading-relaxed">
                    <strong>Your Control:</strong> You can accept, reject, or
                    customize your cookie preferences through our cookie banner.
                    You can also change your preferences at any time by visiting
                    our Cookie Policy page.
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mt-16 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Contact Us
                </h3>
                <p className="text-gray-600 mb-6">
                  If you have any questions about this Privacy Policy, our data
                  practices, or wish to exercise your privacy rights, please
                  contact us:
                </p>
                <div className="space-y-2 text-gray-600">
                  <p className="font-semibold">
                    Philadelphia Missionary Church
                  </p>
                  <p>Sulgeneckstrasse 58</p>
                  <p>3005 Bern, Switzerland</p>
                  <p>
                    Email:{" "}
                    <a
                      href="mailto:info@pmcinternational.ch"
                      className="text-red-600 hover:text-red-700 underline"
                    >
                      info@pmcinternational.ch
                    </a>
                  </p>
                  <p className="text-sm text-gray-500 mt-4">
                    For privacy-specific inquiries, please include "Privacy
                    Policy" in your email subject line.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
}
