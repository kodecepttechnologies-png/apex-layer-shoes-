import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetailView from "@/components/ProductDetailView";
import { PRODUCTS, getProductById } from "@/data/products";
import { generateProductJsonLd } from "@/lib/schema";

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

  const pageUrl = `https://apex-layer-shoes.vercel.app/shoes/${product.id}`;
  const fullImageUrl = product.image.startsWith("http")
    ? product.image
    : `https://apex-layer-shoes.vercel.app${product.image}`;

  return {
    title: `${product.name} | Apex Layer Shoes`,
    description: product.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${product.name} | Apex Layer Shoes`,
      description: product.description,
      url: pageUrl,
      siteName: "Apex Layer Shoes",
      type: "website",
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Apex Layer Shoes`,
      description: product.description,
      images: [fullImageUrl],
    },
    keywords: [
      product.name,
      product.category,
      "Apex Layer Shoes",
      "running shoes",
      product.specs.cushioning,
      product.specs.surface,
    ],
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const jsonLd = generateProductJsonLd(product);

  return (
    <>
      {/* Product, Breadcrumb, and FAQ Structured Data for SEO & AEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <main className="min-h-screen bg-[#fcfcfd] text-gray-900">
        <Navbar />
        <ProductDetailView product={product} />
        <Footer />
      </main>
    </>
  );
}

