import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ParticleBackground } from "@/components/ParticleBackground";

export const metadata: Metadata = {
  title: "Danyal Khorami – Embodied Perception & Computational Media",
  description:
    "Portfolio and research site for Danyal Khorami: embodied perception systems, sensor fusion, low-cost motion capture, and computational media.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <ParticleBackground />
          <div className="min-h-screen flex flex-col">
            <SiteHeader />
            <main className="flex-1">
              <div className="container-page py-8 sm:py-10">{children}</div>
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
