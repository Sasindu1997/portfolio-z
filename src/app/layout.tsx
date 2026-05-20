import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "sonner";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zenodesoftware.com"),
  title: {
    default: "Zenode Software — Premium Web Systems & Digital Experiences",
    template: "%s | Zenode Software",
  },
  description:
    "Zenode Software builds premium web systems, SaaS platforms, e-commerce solutions, and digital experiences for ambitious businesses worldwide.",
  keywords: [
    "Zenode Software",
    "web development",
    "SaaS development",
    "Next.js development",
    "React development",
    "TypeScript",
    "premium web agency",
    "e-commerce",
    "admin dashboards",
    "management systems",
  ],
  authors: [{ name: "Zenode Software", url: "https://zenodesoftware.com" }],
  creator: "Zenode Software",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zenodesoftware.com",
    title: "Zenode Software — Premium Web Systems & Digital Experiences",
    description:
      "We build premium web systems, SaaS platforms, and digital experiences for ambitious businesses.",
    siteName: "Zenode Software",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zenode Software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zenode Software — Premium Web Systems",
    description:
      "We build premium web systems, SaaS platforms, and digital experiences.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <ScrollProgress />
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "rgba(0,0,0,0.9)",
                border: "1px solid rgba(18,171,141,0.2)",
                color: "#fff",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
