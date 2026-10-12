import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shoe Buying Guide 2026 — Fit, Cushioning & Gait | Apex Layer Shoes",
  description:
    "Find your perfect running and walking shoe with the Apex Layer expert buying guide. Master pronation, stack height, sizing rules, and use our interactive shoe finder.",
  keywords: [
    "running shoe buying guide",
    "how to choose running shoes",
    "shoe cushioning guide",
    "pronation and arch support",
    "running shoe fit test",
    "Apex Layer shoes",
  ],
};

export default function BuyingGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
