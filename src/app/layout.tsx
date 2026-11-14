import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
import { site } from "@/lib/site";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import MotionProvider from "@/components/MotionProvider";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Medixis — Medical equipment sourcing for healthcare providers", template: "%s — Medixis" },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: "Medixis",
    url: site.url,
    title: "Medixis — The right equipment. Right on time.",
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Medixis" }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#ffffff", width: "device-width", initialScale: 1 };

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  description: site.description,
  address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: site.countryCode },
  areaServed: "Europe",
  logo: `${site.url}/icon.svg`,
  founder: { "@type": "Person", name: "Jonas Jorgensen", jobTitle: "Founder & CEO" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <MotionProvider>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <Cursor />
        </MotionProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  );
}
