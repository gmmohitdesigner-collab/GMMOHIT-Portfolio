import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creative Ants Case Study | GM Mohit",
  description: "A modern creative agency pushing the absolute boundaries of spatial interaction and web design.",
  // Must be set explicitly: metadata is inherited from the root layout, so without
  // this the page would emit the root's canonical ("/") and be treated as a
  // duplicate of the homepage. This has to stay correct even while noindex is set
  // below -- a noindex paired with a canonical pointing elsewhere risks Google
  // carrying the noindex over to the canonical target.
  alternates: {
    canonical: "/works/creative-ants",
  },
  // This case study is still work in progress: FeaturedWorksSection intentionally
  // shows a WIP popup instead of linking here, leaving the page unlinked and thin.
  // Keep it out of the index until it ships, then delete this block and add the
  // URL back to sitemap.ts.
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    // A child openGraph object REPLACES the parent's rather than merging, so
    // these three have to be restated or the page ships without them.
    type: "article",
    siteName: "GM Mohit Portfolio",
    locale: "en_US",
    title: "Creative Ants Case Study | GM Mohit",
    description: "A modern creative agency pushing the absolute boundaries of spatial interaction and web design.",
    url: "https://www.gmmohit.com/works/creative-ants",
    images: [
      {
        url: "/opengraph-image.png", // Fallback to main OG image if specific one isn't available
        width: 1200,
        height: 630,
        alt: "Creative Ants Case Study by GM Mohit",
      },
    ],
  },
};

export default function CreativeAntsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
