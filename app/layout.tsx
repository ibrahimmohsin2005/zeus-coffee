import type { Metadata } from "next";
// import { Inter } from "next/font/google"; // Disabled due to network error during build
import "./globals.css";
import NoiseOverlay from "@/components/NoiseOverlay";
import CustomCursor from "@/components/CustomCursor";

// const inter = Inter({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-inter",
// });

export const metadata: Metadata = {
  title: "ZEUS COFFEE | Iced Coffee Redefined",
  description: "Experience the chill. Premium iced coffee delivered to your door.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`antialiased bg-[#050505] text-white/90 selection:bg-[#A5D2EB] selection:text-[#050505]`}>
        <NoiseOverlay />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
