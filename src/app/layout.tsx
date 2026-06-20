import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSenseSlot from "@/components/AdSenseSlot";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://flashvault.local"),
  title: {
    default: "FlashVault — Play Classic Flash Games in Your Browser",
    template: "%s — FlashVault",
  },
  description:
    "A nostalgic, mobile-friendly portal for classic Flash games powered by Ruffle.",
  keywords: ["flash games", "ruffle", "classic games", "browser games", "nostalgia"],
  openGraph: {
    title: "FlashVault — Play Classic Flash Games in Your Browser",
    description:
      "A nostalgic, mobile-friendly portal for classic Flash games powered by Ruffle.",
    type: "website",
    siteName: "FlashVault",
    url: "/",
    images: [
      {
        url: "/flashvault-og.png",
        width: 1200,
        height: 630,
        alt: "FlashVault — Play Classic Flash Games in Your Browser",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FlashVault — Play Classic Flash Games in Your Browser",
    description:
      "A nostalgic, mobile-friendly portal for classic Flash games powered by Ruffle.",
    images: ["/flashvault-og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="fv-noise" aria-hidden="true" />
        <Header />
        <main className="min-h-[calc(100vh-10rem)]">{children}</main>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-6">
          <div className="fv-panel rounded-3xl px-4 py-3 flex justify-center">
            <AdSenseSlot slotId="footer-banner" width={728} height={90} />
          </div>
        </div>
        <Footer />
        <Script
          defer
          data-domain="flashvault.app"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
