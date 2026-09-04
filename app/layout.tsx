import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "System Design Visualizer | Drag and Drop Cloud Architecture",
    template: "%s | System Design Visualizer",
  },
  description: "A fast, interactive, and free system design and cloud architecture diagramming tool. Drag and drop nodes, freely link components, and export to JSON.",
  keywords: ["system design", "architecture", "visualizer", "diagramming", "cloud architecture", "aws", "gcp", "azure", "drag and drop", "next.js", "react flow"],
  authors: [{ name: "System Design Editor" }],
  creator: "System Design Editor",
  publisher: "System Design Editor",
  metadataBase: new URL("https://system-design-visualizer.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://system-design-visualizer.vercel.app",
    title: "System Design Visualizer | Drag and Drop Cloud Architecture",
    description: "A fast, interactive, and free system design and cloud architecture diagramming tool. Build and export architecture diagrams instantly.",
    siteName: "System Design Visualizer",
  },
  twitter: {
    card: "summary_large_image",
    title: "System Design Visualizer | Drag and Drop Cloud Architecture",
    description: "A fast, interactive, and free system design and cloud architecture diagramming tool. Build and export architecture diagrams instantly.",
    creator: "@systemdesign",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
