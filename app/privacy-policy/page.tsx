import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Shield, Lock, Eye, Users, Database } from "lucide-react";

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
        "Personal information you provide (name, email, phone number)",
        "Information about your participation in church activities",
        "Donation and giving information",
        "Website usage data and analytics",
        "Communication preferences and history",
      ],
    },
    {
      icon: Database,
      title: "How We Use Your Information",
      content: [
        "To provide church services and ministry programs",
        "To communicate about events, services, and activities",
        "To process donations and maintain financial records",
        "To improve our website and services",
        "To comply with legal obligations",
      ],
    },
    {
      icon: Lock,
      title: "How We Protect Your Information",
      content: [
        "Secure data storage and transmission",
        "Limited access to personal information",
        "Regular security audits and updates",
        "Employee training on data protection",
        "Compliance with privacy regulations",
      ],
    },
    {
      icon: Users,
      title: "Sharing Your Information",
      content: [
        "We do not sell your personal information",
        "Information may be shared with trusted service providers",
        "Required disclosures for legal compliance",
        "With your explicit consent for specific purposes",
        "Anonymous data may be used for statistical purposes",
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
                  Philadelphia Missionary Church is committed to protecting your
                  privacy and ensuring the security of your personal
                  information. This Privacy Policy explains how we collect, use,
                  disclose, and safeguard your information when you visit our
                  website, attend our services, or interact with our ministry.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  By using our services, you agree to the collection and use of
                  information in accordance with this policy. We will not use or
                  share your information with anyone except as described in this
                  Privacy Policy.
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

              {/* Additional Information */}
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
                      personal information.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Opt-Out
                    </h4>
                    <p className="text-gray-600 text-sm">
                      You can opt-out of certain communications and data
                      collection activities.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Data Portability
                    </h4>
                    <p className="text-gray-600 text-sm">
                      You can request a copy of your personal data in a portable
                      format.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Deletion
                    </h4>
                    <p className="text-gray-600 text-sm">
                      You can request deletion of your personal information in
                      certain circumstances.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mt-16 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Contact Us
                </h3>
                <p className="text-gray-600 mb-6">
                  If you have any questions about this Privacy Policy or our
                  data practices, please contact us:
                </p>
                <div className="space-y-2 text-gray-600">
                  <p>Philadelphia Missionary Church</p>
                  <p>123 Church Street, City, State 12345</p>
                  <p>Email: privacy@pmcchurch.org</p>
                  <p>Phone: (555) 123-4567</p>
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
