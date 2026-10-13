import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShoesCatalogView from "@/components/ShoesCatalogView";

export const metadata: Metadata = {
  title: "All Shoes & Footwear | Apex Layer Shoes",
  description:
    "Explore our complete collection of high-performance running shoes, ergonomic walking shoes, multi-sport trainers, and lifestyle sneakers.",
};

export default function ShoesPage() {
  return (
    <main className="min-h-screen bg-[#fcfcfd] text-gray-900">
      <Navbar />
      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-black border-r-transparent"></div>
            <p className="mt-4 text-sm font-bold text-gray-600">Loading shoes catalog...</p>
          </div>
        }
      >
        <ShoesCatalogView />
      </Suspense>
      <Footer />
    </main>
  );
}
