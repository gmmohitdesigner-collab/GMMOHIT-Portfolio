import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import PreloaderWrapper from "@/components/PreloaderWrapper";
import { TransitionProvider } from "@/context/TransitionContext";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "GM MOHIT | Designer. Strategist. Creator.",
  description: "Portfolio of GM Mohit. I craft digital experiences where elegance meets intention.",
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
