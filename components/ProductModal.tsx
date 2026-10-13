"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Star,
  Check,
  Truck,
  RotateCcw,
  ShieldCheck,
  Shuffle,
  Heart,
  ShoppingBag,
  ChevronRight,
  Info,
} from "lucide-react";
import { Product, getRandomProduct } from "../data/products";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart?: (product: Product, quantity: number, size: string | number, color: string) => void;
}

export default function ProductModal({
  product,
  onClose,
  onSelectProduct,
  onAddToCart,
}: ProductModalProps) {
  // Lock body scroll and listen for escape key while modal is active
  useEffect(() => {
    if (!product) return;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <ProductModalContent
        key={product.id}
        product={product}
        onClose={onClose}
        onSelectProduct={onSelectProduct}
        onAddToCart={onAddToCart}
      />
    </div>
  );
}

function ProductModalContent({
  product,
  onClose,
  onSelectProduct,
  onAddToCart,
}: {
  product: Product;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart?: (product: Product, quantity: number, size: string | number, color: string) => void;
}) {
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || "");
  const [selectedSize, setSelectedSize] = useState<string | number>(
    product.sizes[2] || product.sizes[0] || 9
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"features" | "specs">("features");

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const savings = product.originalPrice
    ? (product.originalPrice - product.price).toFixed(2)
    : null;

  const handleRandomAnother = () => {
    const nextRandom = getRandomProduct(product.id);
    onSelectProduct(nextRandom);
  };

  const handleAddToCart = () => {
    setAddedSuccess(true);
    if (onAddToCart) {
      onAddToCart(product, quantity, selectedSize, selectedColor);
    }
    setTimeout(() => {
      setAddedSuccess(false);
    }, 2200);
  };

  return (
    <div className="relative flex flex-col max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/10 transition-all animate-in zoom-in-95 duration-200">
      {/* Modal Top Header Bar */}
      <div className="flex items-center justify-between border-b border-gray-150 px-5 py-3.5 bg-gray-50/70 sm:px-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
          <span className="uppercase tracking-wider">Apex Collection</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-bold text-gray-900">{product.category}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRandomAnother}
            className="inline-flex items-center gap-1.5 rounded-full border border-gray-250 bg-white px-3 py-1.5 text-xs font-bold text-gray-700 shadow-xs hover:border-black hover:bg-black hover:text-white transition active:scale-95"
            title="View another random shoe"
          >
            <Shuffle className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Next Random Shoe</span>
          </button>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 hover:border-black hover:bg-black hover:text-white transition"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Modal Scrollable Body */}
      <div className="overflow-y-auto p-5 sm:p-7 lg:p-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Image Showcase */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center min-h-[300px] sm:min-h-[380px] p-4 group">
              {product.tag && (
                <span className="absolute top-4 left-4 z-10 rounded-full bg-black/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-xs">
                  {product.tag}
                </span>
              )}

              {discountPercent && (
                <span className="absolute top-4 right-4 z-10 rounded-full bg-red-600 px-2.5 py-1 text-xs font-black text-white shadow-xs">
                  {discountPercent}% OFF
                </span>
              )}

              <Image
                src={selectedImage || product.image}
                alt={product.name}
                width={600}
                height={450}
                priority
                className="h-auto max-h-[340px] w-full object-contain transition duration-500 group-hover:scale-105"
              />
            </div>

            {/* Thumbnails switcher */}
            {product.additionalImages && product.additionalImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {product.additionalImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative h-18 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                      selectedImage === img
                        ? "border-black shadow-md"
                        : "border-gray-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} angle ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Badges Strip */}
            <div className="mt-2 grid grid-cols-3 gap-2 rounded-2xl border border-gray-150 bg-gray-50/70 p-3 text-center text-[11px] text-gray-600">
              <div className="flex flex-col items-center gap-1">
                <Truck className="h-4 w-4 text-gray-800" />
                <span className="font-semibold text-gray-900">Free 2-Day Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-1 border-x border-gray-200">
                <RotateCcw className="h-4 w-4 text-gray-800" />
                <span className="font-semibold text-gray-900">30-Day Wear Test</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-gray-800" />
                <span className="font-semibold text-gray-900">100% Authentic</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Details & Purchase Form */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Category & Brand */}
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-widest text-gray-500">
                  {product.category} Footwear
                </span>
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-gray-400 font-normal">
                    ({product.reviewsCount.toLocaleString()} reviews)
                  </span>
                </div>
              </div>

              {/* Title */}
              <h2
                id="product-modal-title"
                className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-950"
              >
                {product.name}
              </h2>

              {/* Price Display */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-3xl font-black text-gray-950">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg font-semibold text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {savings && (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Save ${savings}
                  </span>
                )}
              </div>

              {/* Short Description */}
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                {product.description}
              </p>

              {/* Color Selector */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Color:{" "}
                    <span className="font-medium text-gray-900">{selectedColor}</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(color.name)}
                      className={`group relative flex h-9 w-9 items-center justify-center rounded-full transition ${
                        selectedColor === color.name
                          ? "ring-2 ring-black ring-offset-2 scale-110"
                          : "hover:scale-105"
                      }`}
                      title={color.name}
                    >
                      <span
                        className={`h-7 w-7 rounded-full shadow-inner ${color.class}`}
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Select Size (US Men/Unisex)
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 cursor-pointer hover:underline">
                    <Info className="h-3 w-3" /> Size Guide
                  </span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-xl border py-2.5 text-xs font-bold transition ${
                        selectedSize === size
                          ? "border-black bg-black text-white shadow-xs"
                          : "border-gray-200 bg-white text-gray-800 hover:border-gray-400 hover:bg-gray-50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Wishlist */}
              <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center rounded-xl border border-gray-200 bg-white p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-8 w-8 rounded-lg text-gray-600 hover:bg-gray-100 font-bold transition flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-8 w-8 rounded-lg text-gray-600 hover:bg-gray-100 font-bold transition flex items-center justify-center"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border transition ${
                    isWishlisted
                      ? "border-red-200 bg-red-50 text-red-600"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-400"
                  }`}
                  aria-label="Save to Wishlist"
                >
                  <Heart
                    className={`h-5 w-5 ${isWishlisted ? "fill-red-500" : ""}`}
                  />
                </button>
              </div>

              {/* Purchase Actions */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 inline-flex items-center justify-center gap-2 rounded-2xl py-3.5 px-6 font-bold text-sm shadow-md transition active:scale-95 ${
                    addedSuccess
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "bg-black text-white hover:bg-neutral-800"
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Added to Cart ({quantity})</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" />
                      <span>Add to Cart • ${(product.price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleAddToCart}
                  className="inline-flex items-center justify-center rounded-2xl border border-gray-300 bg-gray-50 py-3.5 px-6 text-sm font-bold text-gray-900 hover:border-black hover:bg-white transition active:scale-95"
                >
                  Instant Checkout
                </button>
              </div>

              {/* Product Tabs: Features vs Specs */}
              <div className="mt-8 border-t border-gray-150 pt-6">
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab("features")}
                    className={`pb-2.5 text-xs font-bold uppercase tracking-wider transition ${
                      activeTab === "features"
                        ? "border-b-2 border-black text-black"
                        : "text-gray-400 hover:text-gray-700"
                    }`}
                  >
                    Key Highlights
                  </button>
                  <button
                    onClick={() => setActiveTab("specs")}
                    className={`ml-6 pb-2.5 text-xs font-bold uppercase tracking-wider transition ${
                      activeTab === "specs"
                        ? "border-b-2 border-black text-black"
                        : "text-gray-400 hover:text-gray-700"
                    }`}
                  >
                    Tech Specs
                  </button>
                </div>

                <div className="mt-4">
                  {activeTab === "features" ? (
                    <ul className="space-y-2 text-xs text-gray-600">
                      {product.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="rounded-xl bg-gray-50 p-2.5 border border-gray-100">
                        <span className="block text-[10px] uppercase font-bold text-gray-400">
                          Cushioning
                        </span>
                        <span className="font-semibold text-gray-900">
                          {product.specs.cushioning}
                        </span>
                      </div>
                      <div className="rounded-xl bg-gray-50 p-2.5 border border-gray-100">
                        <span className="block text-[10px] uppercase font-bold text-gray-400">
                          Drop
                        </span>
                        <span className="font-semibold text-gray-900">
                          {product.specs.drop}
                        </span>
                      </div>
                      <div className="rounded-xl bg-gray-50 p-2.5 border border-gray-100">
                        <span className="block text-[10px] uppercase font-bold text-gray-400">
                          Weight
                        </span>
                        <span className="font-semibold text-gray-900">
                          {product.specs.weight}
                        </span>
                      </div>
                      <div className="rounded-xl bg-gray-50 p-2.5 border border-gray-100">
                        <span className="block text-[10px] uppercase font-bold text-gray-400">
                          Surface
                        </span>
                        <span className="font-semibold text-gray-900">
                          {product.specs.surface}
                        </span>
                      </div>
                      <div className="rounded-xl bg-gray-50 p-2.5 border border-gray-100">
                        <span className="block text-[10px] uppercase font-bold text-gray-400">
                          Closure
                        </span>
                        <span className="font-semibold text-gray-900">
                          {product.specs.closure}
                        </span>
                      </div>
                      <div className="rounded-xl bg-gray-50 p-2.5 border border-gray-100">
                        <span className="block text-[10px] uppercase font-bold text-gray-400">
                          Upper
                        </span>
                        <span className="font-semibold text-gray-900">
                          {product.specs.upperMaterial}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
