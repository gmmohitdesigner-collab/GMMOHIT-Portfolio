import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import PreloaderWrapper from "@/components/PreloaderWrapper";
import { TransitionProvider } from "@/context/TransitionContext";
import PageTransition from "@/components/PageTransition";
import CursorTrail from "@/components/CursorTrail";
import { MotionConfig } from "framer-motion";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.gmmohit.com"),
  title: "GM MOHIT | Creative. Designer. Developer.",
  description: "Portfolio of GM Mohit. I craft digital experiences where elegance meets intention.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "GM MOHIT | Creative. Designer. Developer.",
    description: "Portfolio of GM Mohit. I craft digital experiences where elegance meets intention.",
    url: "https://www.gmmohit.com",
    siteName: "GM Mohit Portfolio",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "GM Mohit Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  // Only `card` is set here. Hardcoding title/description/images would be
  // inherited by every child page (metadata merges per-field), so case studies
  // would share as the homepage. Left unset, Next derives them from each
  // page's own openGraph.
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://www.gmmohit.com/#person",
        name: "GM Mohit",
        url: "https://www.gmmohit.com",
        jobTitle: ["Creative Developer", "UI/UX Designer"],
        // These must match the URLs actually linked from the site, character for
        // character -- Google uses them to corroborate the entity. A handle that
        // doesn't match a real outbound link weakens the signal instead.
        sameAs: [
          "https://www.linkedin.com/in/gmmohit/",
          "https://www.behance.net/gmmohit",
          "https://x.com/G_M_Mohit",
          "https://www.instagram.com/noblessedesigns/"
        ]
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://www.gmmohit.com/#business",
        name: "GM Mohit Portfolio",
        url: "https://www.gmmohit.com",
        image: "https://www.gmmohit.com/opengraph-image.png",
        description: "Portfolio of GM Mohit. I craft digital experiences where elegance meets intention.",
        founder: {
          "@id": "https://www.gmmohit.com/#person"
        },
        // ProfessionalService is a LocalBusiness subtype -- without an address
        // it is a much weaker entity, and the site targeted no geography at all
        // despite the footer already saying Bengaluru.
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bengaluru",
          addressRegion: "Karnataka",
          addressCountry: "IN"
        },
        areaServed: [
          { "@type": "Country", name: "India" },
          { "@type": "Place", name: "Worldwide" }
        ],
        email: "hello@gmmohit.com",
        // Mirrors the skills already listed in AboutSection, so the entity states
        // what it actually does rather than leaving it to be inferred from prose.
        // Keep this list to things the site can actually evidence -- it is the
        // machine-readable version of the skills claim, so it should never be
        // broader than what AboutSection and the case studies back up.
        knowsAbout: [
          "UI Design", "UX Research", "Brand Identity", "Design Systems",
          "Wireframing", "Prototyping", "Usability Testing",
          "React", "Next.js", "Framer Motion",
          "Motion Design", "Creative Direction"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.gmmohit.com/#website",
        url: "https://www.gmmohit.com",
        name: "GM Mohit Portfolio",
        inLanguage: "en",
        publisher: { "@id": "https://www.gmmohit.com/#person" }
      },
      {
        // Declares the case study as a work AUTHORED BY the Person, via @id
        // reference -- that is what joins these nodes into one graph instead of
        // three unrelated entities.
        "@type": "CreativeWork",
        "@id": "https://www.gmmohit.com/works/teaure/#work",
        url: "https://www.gmmohit.com/works/teaure",
        name: "Teaure — E-Commerce UX, Brand and Motion Design",
        description: "A serene, high-end e-commerce flagship crafted to communicate holistic purity through minimal grid architecture and immersive motion.",
        image: "https://www.gmmohit.com/works/teaure/og.png",
        datePublished: "2025-12-01",
        author: { "@id": "https://www.gmmohit.com/#person" },
        isPartOf: { "@id": "https://www.gmmohit.com/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.gmmohit.com/works/teaure/#breadcrumb",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.gmmohit.com" },
          { "@type": "ListItem", position: 2, name: "Works", item: "https://www.gmmohit.com/works" },
          { "@type": "ListItem", position: 3, name: "Teaure" }
        ]
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {/* reducedMotion="user" makes every motion component in the app respect
            the OS-level "Reduce motion" setting: transform and layout animations
            are dropped, opacity ones are kept (they don't trigger motion
            sensitivity). Nothing changes for anyone who hasn't enabled it.
            To add a manual in-page toggle later, swap "user" for state. */}
        <MotionConfig reducedMotion="user">
          <TransitionProvider>
            <CursorTrail />
            <PageTransition />
            <SmoothScroll>
              {/* No <main> here: every page renders its own, and two per
                  document is invalid. Verified no CSS targets `main`. */}
              <PreloaderWrapper>{children}</PreloaderWrapper>
            </SmoothScroll>
          </TransitionProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
