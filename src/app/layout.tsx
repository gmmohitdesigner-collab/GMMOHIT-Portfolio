import type { Metadata } from "next";
import "./globals.css";

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
        <main>{children}</main>
      </body>
    </html>
  );
}
