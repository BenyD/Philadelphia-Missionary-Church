import { Metadata } from "next";

export const siteConfig = {
  name: "Philadelphia Missionary Church",
  description: "Spreading the Good News Since 1989",
  url: "https://pmchurch.ch",
  ogImage: "/images/church-og.jpg",
  links: {
    facebook: "https://www.facebook.com/pmchurch",
    instagram: "https://www.instagram.com/pmchurch",
    youtube: "https://www.youtube.com/pmchurch",
  },
  contact: {
    phone: "+41-XX-XXX-XXXX",
    email: "info@pmchurch.ch",
    address: "Switzerland",
  },
};

export const defaultMetadata: Metadata = {
  title: {
    default: `${siteConfig.name} - ${siteConfig.description} | Welcome to Our Community`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Philadelphia Missionary Church began in 1989 as Tamil Christian Fellowship. Today, we have 10 vibrant churches across Switzerland with over 400 believers, making disciples and spreading the message of salvation in Jesus Christ.",
  keywords: [
    "Philadelphia Missionary Church",
    "Switzerland church",
    "Christian church Switzerland",
    "Tamil Christian Fellowship",
    "missionary church",
    "church planting",
    "discipleship",
    "Christian community Switzerland",
    "faith",
    "spiritual growth",
    "Sunday service",
    "Christian fellowship",
    "bible study",
    "ministry",
    "outreach",
    "community service",
    "Christian worship",
    "church services",
    "religious community",
    "Swiss church",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - ${siteConfig.description}`,
    description:
      "Join our welcoming community dedicated to spreading God's love and serving our neighbors. Experience worship, fellowship, and spiritual growth.",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - A welcoming community of faith`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - ${siteConfig.description}`,
    description:
      "Join our welcoming community dedicated to spreading God's love and serving our neighbors.",
    images: [siteConfig.ogImage],
    creator: "@pmcchurch",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "religion",
};

export function generateMetadata({
  title,
  description,
  keywords,
  image,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title: title ? `${title} | ${siteConfig.name}` : defaultMetadata.title,
    description: description || defaultMetadata.description,
    keywords: keywords || defaultMetadata.keywords,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: title
        ? `${title} | ${siteConfig.name}`
        : defaultMetadata.openGraph?.title,
      description: description || defaultMetadata.openGraph?.description,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: title || siteConfig.name,
            },
          ]
        : defaultMetadata.openGraph?.images,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: title
        ? `${title} | ${siteConfig.name}`
        : defaultMetadata.twitter?.title,
      description: description || defaultMetadata.twitter?.description,
      images: image ? [image] : defaultMetadata.twitter?.images,
    },
    robots: noIndex ? { index: false, follow: false } : defaultMetadata.robots,
  };
}

export const structuredData = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Church",
    name: siteConfig.name,
    alternateName: "PMC",
    description:
      "Philadelphia Missionary Church began in 1989 as Tamil Christian Fellowship. Today, we have 10 vibrant churches across Switzerland with over 400 believers, making disciples and spreading the message of salvation in Jesus Christ.",
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/church-logo.png`,
    image: `${siteConfig.url}/images/church-building.jpg`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "CH",
    },
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    openingHours: "Su 09:00-12:00",
    serviceType: "Christian Worship Service",
    sameAs: Object.values(siteConfig.links),
    geo: {
      "@type": "GeoCoordinates",
      latitude: "46.8182",
      longitude: "8.2275",
    },
    areaServed: {
      "@type": "Country",
      name: "Switzerland",
    },
  },
  breadcrumb: (items: Array<{ name: string; url: string }>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  }),
  event: (eventData: {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    location: string;
    organizer: string;
  }) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: eventData.name,
    description: eventData.description,
    startDate: eventData.startDate,
    endDate: eventData.endDate,
    location: {
      "@type": "Place",
      name: eventData.location,
    },
    organizer: {
      "@type": "Organization",
      name: eventData.organizer,
    },
  }),
};
 