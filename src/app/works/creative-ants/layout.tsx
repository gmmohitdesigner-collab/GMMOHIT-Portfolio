import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creative Ants Case Study | GM Mohit",
  description: "A modern creative agency pushing the absolute boundaries of spatial interaction and web design.",
  openGraph: {
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
