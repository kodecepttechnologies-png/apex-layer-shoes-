import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Running Shoes in Thrissur | StepUp Shoes",
  description:
    "Explore running shoes, walking shoes, and tips for choosing comfortable footwear at StepUp Shoes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-[#fcfcfd] text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
