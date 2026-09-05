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
  twitter: {
    card: "summary_large_image",
    title: "GM MOHIT | Creative. Designer. Developer.",
    description: "Portfolio of GM Mohit. I craft digital experiences where elegance meets intention.",
    images: ["/opengraph-image.png"],
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
        sameAs: [
          "https://github.com/gmmohit",
          "https://linkedin.com/in/gmmohit",
          "https://twitter.com/gmmohit"
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
        }
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
            <PreloaderWrapper>
              <main>{children}</main>
            </PreloaderWrapper>
          </SmoothScroll>
        </TransitionProvider>
      </body>
    </html>
  );
}
