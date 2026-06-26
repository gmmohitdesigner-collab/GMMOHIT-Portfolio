import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import PreloaderWrapper from "@/components/PreloaderWrapper";
import { TransitionProvider } from "@/context/TransitionContext";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "GM MOHIT | Designer. Strategist. Creator.",
  description: "Portfolio of GM Mohit. I craft digital experiences where elegance meets intention.",
  openGraph: {
    title: "GM MOHIT | Designer. Strategist. Creator.",
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
    title: "GM MOHIT | Designer. Strategist. Creator.",
    description: "Portfolio of GM Mohit. I craft digital experiences where elegance meets intention.",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <TransitionProvider>
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
