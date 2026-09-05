import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { CustomCursor, Navbar, Footer } from "@/components/chrome";

export const metadata: Metadata = {
  title: "CodeCraft Concept — We Craft Digital Experiences",
  description:
    "Creative technology studio building premium websites, web apps, e-commerce and 3D digital experiences. We don't just build websites — we build experiences.",
  keywords: ["web development", "digital agency", "Three.js", "Next.js", "UI/UX", "e-commerce"],
  openGraph: {
    title: "CodeCraft Concept — We Craft Digital Experiences",
    description: "Premium websites, apps & 3D experiences that convert.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body 
        className="noise bg-[#060607] text-[#F4F1E8] antialiased"
        suppressHydrationWarning  // ✅ This fixes the hydration error!
      >
        <CustomCursor />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}