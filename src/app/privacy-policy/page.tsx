import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export const metadata = {
  title: "Privacy Policy | GM MOHIT",
  description: "Privacy policy for GM Mohit's portfolio website.",
  // Must be set explicitly: metadata is inherited from the root layout, so without
  // this the page would emit the root's canonical ("/") and be treated as a
  // duplicate of the homepage.
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicy() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center">
      <NavBar />
      <section className="w-full max-w-4xl mx-auto px-6 md:px-12 py-32 flex-1">
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 font-[family-name:var(--font-monument)]">Privacy Policy</h1>
          <p className="text-foreground/60 text-lg">Last updated: August 2026</p>
        </div>

        {/* Caps the reading measure. Uncapped this rendered 92 ACTUAL characters
            per line on desktop, well past the 45-75 that stays comfortable.
            Tuned against counted line lengths, not against the unit: `ch` is the
            width of the "0" glyph, and Circular Std's lowercase is far narrower,
            so 68ch still measured ~92 real characters. The heading keeps full width. */}
        <div className="space-y-12 text-foreground/80 leading-relaxed text-lg max-w-[52ch]">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground font-[family-name:var(--font-monument)]">1. Introduction</h2>
            <p>
              Welcome to the portfolio of GM Mohit ("I", "we", "our"). I am committed to protecting your personal information and your right to privacy. 
              If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact me through the links available on the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground font-[family-name:var(--font-monument)]">2. Information Collection</h2>
            <p className="mb-4">
              I collect personal information that you voluntarily provide to me when you express an interest in obtaining information about me or my products and services, when you participate in activities on the Website, or otherwise when you contact me.
            </p>
            <p>
              The personal information that I collect depends on the context of your interactions with me and the Website, the choices you make, and the features you use. The personal information I collect may include the following:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Name and Contact Data (such as email address)</li>
              <li>Professional information (if you inquire about freelance services)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground font-[family-name:var(--font-monument)]">3. Analytics and Cookies</h2>
            <p>
              This website may use privacy-first analytics tools to measure traffic and usage trends. These tools collect information sent by your device or our Service, including the web pages you visit, add-ons, and other information that assists us in improving the Service. 
              I prioritize privacy, meaning I avoid invasive tracking cookies wherever possible. If cookies are used, they are strictly for essential functional purposes (like remembering session preferences).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground font-[family-name:var(--font-monument)]">4. Use of Your Information</h2>
            <p>
              I use personal information collected via my Website for a variety of business purposes described below. I process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>To respond to your inquiries and offer support.</li>
              <li>To evaluate potential freelance or employment opportunities.</li>
              <li>To improve the design and user experience of my portfolio.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground font-[family-name:var(--font-monument)]">5. Third-Party Links</h2>
            <p>
              My website may contain links to other sites that are not operated by me (such as Behance, LinkedIn, X, or GitHub). If you click on a third-party link, you will be directed to that third party's site. I strongly advise you to review the Privacy Policy of every site you visit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground font-[family-name:var(--font-monument)]">6. Changes to This Privacy Policy</h2>
            <p>
              I may update this privacy notice from time to time. The updated version will be indicated by an updated "Last updated" date and the updated version will be effective as soon as it is accessible. I encourage you to review this privacy notice frequently to be informed of how I am protecting your information.
            </p>
          </section>
        </div>
      </section>
      <Footer />
    </main>
  );
}
