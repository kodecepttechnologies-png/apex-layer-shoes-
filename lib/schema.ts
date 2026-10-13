import { Product } from "@/data/products";

const BASE_URL = "https://apex-layer-shoes.vercel.app";

/**
 * Generate comprehensive Schema.org JSON-LD structured data for a Product.
 * Tailored for Google Rich Results (Merchant Listing, Product Snippet)
 * and Answer Engine Optimization (AEO - ChatGPT, Perplexity, Gemini, Claude).
 */
export function generateProductJsonLd(product: Product) {
  const productUrl = `${BASE_URL}/shoes/${product.id}`;
  
  // Collect all unique absolute image URLs
  const rawImages = [product.image, ...(product.additionalImages || [])];
  const images = Array.from(
    new Set(
      rawImages.map((img) =>
        img.startsWith("http") ? img : `${BASE_URL}${img}`
      )
    )
  );

  const productSchema = {
    "@type": "Product",
    "@id": `${productUrl}#product`,
    "name": product.name,
    "description": product.longDescription || product.description,
    "image": images,
    "sku": product.id,
    "mpn": product.id,
    "brand": {
      "@type": "Brand",
      "name": "Apex Layer Shoes",
    },
    "category": product.category,
    "offers": {
      "@type": "Offer",
      "@id": `${productUrl}#offer`,
      "url": productUrl,
      "priceCurrency": "USD",
      "price": product.price.toFixed(2),
      "priceValidUntil": "2027-12-31",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": "Apex Layer Shoes",
        "url": BASE_URL,
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0.00",
          "currency": "USD",
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "US",
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 2,
            "unitCode": "d",
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 2,
            "maxValue": 5,
            "unitCode": "d",
          },
        },
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "US",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 30,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn",
      },
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating.toString(),
      "reviewCount": product.reviewsCount.toString(),
      "bestRating": "5",
      "worstRating": "1",
    },
    // AEO (Answer Engine Optimization): Explicit technical attributes parsed by AI models
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Cushioning",
        "value": product.specs.cushioning,
      },
      {
        "@type": "PropertyValue",
        "name": "Heel-to-Toe Drop",
        "value": product.specs.drop,
      },
      {
        "@type": "PropertyValue",
        "name": "Weight",
        "value": product.specs.weight,
      },
      {
        "@type": "PropertyValue",
        "name": "Surface",
        "value": product.specs.surface,
      },
      {
        "@type": "PropertyValue",
        "name": "Closure Type",
        "value": product.specs.closure,
      },
      {
        "@type": "PropertyValue",
        "name": "Upper Material",
        "value": product.specs.upperMaterial,
      },
      {
        "@type": "PropertyValue",
        "name": "Available Sizes (US)",
        "value": product.sizes.join(", "),
      },
      {
        "@type": "PropertyValue",
        "name": "Color Options",
        "value": product.colors.map((c) => c.name).join(", "),
      },
    ],
  };

  const breadcrumbsSchema = {
    "@type": "BreadcrumbList",
    "@id": `${productUrl}#breadcrumb`,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${BASE_URL}/`,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "All Shoes",
        "item": `${BASE_URL}/shoes`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.category,
        "item": `${BASE_URL}/shoes?category=${encodeURIComponent(product.category)}`,
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": product.name,
        "item": productUrl,
      },
    ],
  };

  // AEO FAQ Schema: Provides direct question-and-answer pairs for AI engines (ChatGPT, Perplexity, Gemini)
  const faqSchema = {
    "@type": "FAQPage",
    "@id": `${productUrl}#faq`,
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What are the key features and benefits of ${product.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${product.description} Key highlights include: ${product.features.join("; ")}.`,
        },
      },
      {
        "@type": "Question",
        "name": `What are the technical specifications of ${product.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${product.name} features ${product.specs.cushioning} cushioning, a ${product.specs.drop} drop, weighs approximately ${product.specs.weight}, designed for ${product.specs.surface} surfaces with ${product.specs.closure} closure and ${product.specs.upperMaterial} upper material.`,
        },
      },
      {
        "@type": "Question",
        "name": `What sizes and colors are available for ${product.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${product.name} is available in US sizes ${product.sizes.join(", ")} across the following colorways: ${product.colors.map((c) => c.name).join(", ")}.`,
        },
      },
      {
        "@type": "Question",
        "name": `What is the price and return policy for ${product.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The price for ${product.name} is $${product.price.toFixed(2)} USD. All purchases include free shipping and a 30-day return policy.`,
        },
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [productSchema, breadcrumbsSchema, faqSchema],
  };
}

/**
 * Generate ItemList schema for product catalog pages (/shoes)
 */
export function generateShoesCatalogJsonLd(products: Product[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Apex Layer Shoes Footwear Collection",
    "description":
      "Browse our high-performance running shoes, ergonomic walking shoes, athletic trainers, and lifestyle sneakers.",
    "numberOfItems": products.length,
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `${BASE_URL}/shoes/${product.id}`,
      "name": product.name,
      "image": product.image.startsWith("http")
        ? product.image
        : `${BASE_URL}${product.image}`,
    })),
  };
}
