import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Cookie, Settings, Shield, Clock, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy | Philadelphia Missionary Church",
  description:
    "Learn about how Philadelphia Missionary Church uses cookies and similar technologies to enhance your browsing experience and provide personalized services.",
  keywords: [
    "cookie policy",
    "cookies",
    "web tracking",
    "browser cookies",
    "church website",
    "Philadelphia Missionary Church",
  ],
  openGraph: {
    title: "Cookie Policy | Philadelphia Missionary Church",
    description:
      "Learn about how Philadelphia Missionary Church uses cookies and similar technologies.",
    type: "website",
  },
};

export default function CookiePolicyPage() {
  const cookieTypes = [
    {
      name: "Essential Cookies",
      description:
        "These cookies are necessary for the website to function properly and cannot be disabled.",
      examples: [
        "Session management",
        "Security features",
        "Basic functionality",
      ],
      duration: "Session to 1 year",
      color: "bg-green-500",
    },
    {
      name: "Analytics Cookies",
      description:
        "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.",
      examples: ["Page views", "User behavior", "Performance metrics"],
      duration: "1-2 years",
      color: "bg-blue-500",
    },
    {
      name: "Marketing Cookies",
      description:
        "These cookies are used to track visitors across websites to display relevant and engaging advertisements.",
      examples: ["Ad targeting", "Social media integration", "Remarketing"],
      duration: "1-2 years",
      color: "bg-purple-500",
    },
    {
      name: "Preference Cookies",
      description:
        "These cookies allow the website to remember choices you make and provide enhanced, more personal features.",
      examples: [
        "Language preferences",
        "Theme settings",
        "Personalized content",
      ],
      duration: "1 year",
      color: "bg-orange-500",
    },
  ];

  const thirdPartyServices = [
    {
      name: "Google Analytics",
      purpose: "Website analytics and performance monitoring",
      dataCollected: "Anonymous usage data, page views, user behavior",
    },
    {
      name: "Google Fonts",
      purpose: "Typography and font loading",
      dataCollected: "IP address, browser information",
    },
    {
      name: "Social Media Platforms",
      purpose: "Social sharing and integration",
      dataCollected: "Usage data when interacting with social features",
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
                  <Cookie className="h-12 w-12 text-red-400" />
                </div>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                Cookie Policy
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Learn how Philadelphia Missionary Church uses cookies and
                similar technologies to enhance your browsing experience and
                provide personalized services.
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
                  What Are Cookies?
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Cookies are small text files that are stored on your device
                  when you visit our website. They help us provide you with a
                  better experience by remembering your preferences, analyzing
                  how you use our site, and personalizing content.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  This Cookie Policy explains what cookies we use, why we use
                  them, and how you can control them. By continuing to use our
                  website, you consent to our use of cookies as described in
                  this policy.
                </p>
              </div>

              {/* Cookie Types */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Types of Cookies We Use
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {cookieTypes.map((cookie, index) => (
                    <div
                      key={index}
                      className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div
                          className={`w-3 h-3 ${cookie.color} rounded-full`}
                        ></div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {cookie.name}
                        </h3>
                      </div>
                      <p className="text-gray-600 mb-4">{cookie.description}</p>
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Examples:
                        </h4>
                        <ul className="space-y-1">
                          {cookie.examples.map((example, exampleIndex) => (
                            <li
                              key={exampleIndex}
                              className="text-sm text-gray-600 flex items-center space-x-2"
                            >
                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                              <span>{example}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>Duration: {cookie.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Third Party Services */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Third-Party Services
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  We use third-party services that may set their own cookies.
                  These services help us provide better functionality and
                  analyze our website performance.
                </p>
                <div className="space-y-6">
                  {thirdPartyServices.map((service, index) => (
                    <div
                      key={index}
                      className="p-6 bg-white border border-gray-200 rounded-xl"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-900">
                          {service.name}
                        </h3>
                        <div className="p-2 bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-lg">
                          <Database className="h-5 w-5 text-red-600" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Purpose
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {service.purpose}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Data Collected
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {service.dataCollected}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Managing Cookies */}
              <div className="mb-16 p-8 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl border border-red-200">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-xl border border-red-500/20">
                    <Settings className="h-8 w-8 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      Managing Your Cookie Preferences
                    </h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Browser Settings
                    </h3>
                    <p className="text-gray-600 mb-4">
                      You can control cookies through your browser settings.
                      Most browsers allow you to:
                    </p>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Block all cookies</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Delete existing cookies</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Set preferences for specific sites</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Cookie Banner
                    </h3>
                    <p className="text-gray-600 mb-4">
                      When you first visit our website, you'll see a cookie
                      banner that allows you to:
                    </p>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Accept all cookies</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Reject non-essential cookies</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Customize your preferences</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Updates to Policy */}
              <div className="mb-16 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg border border-blue-500/20">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Updates to This Policy
                    </h3>
                    <p className="text-gray-600">
                      We may update this Cookie Policy from time to time to
                      reflect changes in our practices or for other operational,
                      legal, or regulatory reasons. We will notify you of any
                      material changes by posting the updated policy on our
                      website and updating the "Last updated" date.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Questions About Cookies?
                </h3>
                <p className="text-gray-600 mb-6">
                  If you have any questions about our use of cookies or this
                  Cookie Policy, please contact us:
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
