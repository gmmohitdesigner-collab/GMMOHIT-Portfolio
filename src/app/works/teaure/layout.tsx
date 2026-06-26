import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teaure Case Study | GM Mohit",
  description: "A serene, high-end e-commerce flagship crafted to communicate holistic purity through minimal grid architecture and immersive motion.",
  openGraph: {
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
