import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import PreloaderWrapper from "@/components/PreloaderWrapper";
import { TransitionProvider } from "@/context/TransitionContext";
import PageTransition from "@/components/PageTransition";
import CursorTrail from "@/components/CursorTrail";

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
        email: "hello@gmmohit.com"
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
        <TransitionProvider>
          <CursorTrail />
          <PageTransition />
          <SmoothScroll>
            {/* No <main> here: every page renders its own, and two per
                document is invalid. Verified no CSS targets `main`. */}
            <PreloaderWrapper>{children}</PreloaderWrapper>
          </SmoothScroll>
        </TransitionProvider>
      </body>
    </html>
  );
}
