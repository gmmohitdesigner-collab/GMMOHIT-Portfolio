import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Works | Selected Case Studies | GM Mohit",
  description:
    "Selected design and development case studies by GM Mohit: e-commerce UX, brand identity, design systems and motion-led web experiences built in Bengaluru, India.",
  alternates: {
    canonical: "/works",
  },
  openGraph: {
    type: "website",
    siteName: "GM Mohit Portfolio",
    locale: "en_US",
    title: "Works | Selected Case Studies | GM Mohit",
    description:
      "Selected design and development case studies by GM Mohit: e-commerce UX, brand identity, design systems and motion-led web experiences.",
    url: "https://www.gmmohit.com/works",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Works by GM Mohit",
      },
    ],
  },
};

// Creative Ants is deliberately absent: it is still work in progress, carries
// robots.noindex, and is not in the sitemap. Add it here when it ships.
const PROJECTS = [
  {
    slug: "teaure",
    title: "Teaure",
    subtitle: "E-Commerce UX, Brand and Motion Design",
    year: "2025",
    category: "E-Commerce",
    description:
      "A serene, high-end e-commerce flagship crafted to communicate holistic purity through minimal grid architecture and immersive motion.",
    image: "/works/teaure/og.png",
  },
];

export default function WorksIndex() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center">
      <NavBar />

      <section className="w-full max-w-[1700px] px-4 md:px-12 lg:px-16 pt-40 md:pt-48 pb-24 flex-1">
        <header className="border-b border-current pb-6 md:pb-10 mb-16 md:mb-24">
          <h1 className="font-monument text-[40px] leading-[1.05] md:text-[60px] lg:text-[77px] tracking-tight uppercase">
            Works
          </h1>
          <p className="font-circular text-base md:text-lg lg:text-xl opacity-70 mt-6 max-w-[560px]">
            Selected case studies in e-commerce UX, brand identity, design
            systems and motion-led development.
          </p>
        </header>

        <ul className="flex flex-col gap-20 md:gap-32">
          {PROJECTS.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/works/${p.slug}`}
                className="group flex flex-col gap-8 md:flex-row md:items-center md:gap-16"
              >
                <div className="relative w-full md:w-[46%] aspect-[1.9/1] overflow-hidden rounded-[6px] bg-[#EAE8E3]">
                  <Image
                    src={p.image}
                    alt={`${p.title} | ${p.subtitle}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 46vw"
                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex flex-col gap-4 md:flex-1">
                  <span className="font-mono text-xs md:text-sm uppercase tracking-widest opacity-50">
                    {p.category} / {p.year}
                  </span>
                  <h2 className="font-monument text-3xl md:text-4xl lg:text-5xl tracking-tight uppercase">
                    {p.title}
                  </h2>
                  <p className="font-circular text-base md:text-lg opacity-70 max-w-[460px]">
                    {p.description}
                  </p>
                  <span className="font-mono text-xs uppercase tracking-widest mt-2 opacity-60 group-hover:opacity-100 transition-opacity">
                    View case study →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Footer />
    </main>
  );
}
