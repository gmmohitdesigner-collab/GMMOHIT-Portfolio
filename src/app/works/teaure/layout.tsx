import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teaure Case Study | GM Mohit",
  description: "A serene, high-end e-commerce flagship crafted to communicate holistic purity through minimal grid architecture and immersive motion.",
  // Must be set explicitly: metadata is inherited from the root layout, so without
  // this the page would emit the root's canonical ("/") and be treated as a
  // duplicate of the homepage.
  alternates: {
    canonical: "/works/teaure",
  },
  openGraph: {
    // A child openGraph object REPLACES the parent's rather than merging, so
    // these three have to be restated or the page ships without them.
    type: "article",
    siteName: "GM Mohit Portfolio",
    locale: "en_US",
    title: "Teaure Case Study | GM Mohit",
    description: "A serene, high-end e-commerce flagship crafted to communicate holistic purity through minimal grid architecture and immersive motion.",
    url: "https://www.gmmohit.com/works/teaure",
    images: [
      {
        url: "/works/teaure/teaure_webshowcase.png",
        width: 1200,
        height: 630,
        alt: "Teaure Case Study by GM Mohit",
      },
    ],
  },
};

export default function TeaureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
