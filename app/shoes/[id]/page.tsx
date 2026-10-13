import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetailView from "@/components/ProductDetailView";
import { PRODUCTS, getProductById } from "@/data/products";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found | Apex Layer Shoes",
      description: "The requested shoe could not be found.",
    };
  }

  return {
    title: `${product.name} | Apex Layer Shoes`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Apex Layer Shoes`,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fcfcfd] text-gray-900">
      <Navbar />
      <ProductDetailView product={product} />
      <Footer />
    </main>
  );
}
