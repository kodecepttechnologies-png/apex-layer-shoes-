import Link from "next/link";
import Image from "next/image";
import {
  Package,
  Search,
  Heart,
  User,
  ArrowRight,
  Footprints,
  Compass,
  Zap,
  Sparkles,
  Dumbbell,
  Flame,
  Truck,
  RotateCcw,
  ShieldCheck,
  Lock,
  Share2,
} from "lucide-react";
import ProductCatalog from "@/components/ProductCatalog";
import CartBadge from "@/components/CartBadge";


const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Apex Layer Shoes",
  "url": "https://apex-layer-shoes.vercel.app/",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fcfcfd] text-gray-900 selection:bg-neutral-900 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      {/* 1. Top Announcement Bar */}
      <div className="bg-[#0f0f11] px-4 py-2 text-center text-xs font-medium text-gray-200">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2">
          <Package className="h-3.5 w-3.5 text-gray-400" />
          <span>Free shipping on all orders over $100</span>
          <span className="text-gray-500">|</span>
          <span>Easy 30-day returns</span>
        </div>
      </div>

      {/* 2. Main Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-black uppercase tracking-wider text-gray-950 transition hover:opacity-80"
          >
            <span>Apex Layer shoes</span>
          </Link>

          {/* Navigation Links */}
          <nav aria-label="Main navigation" className="hidden items-center gap-7 text-sm font-semibold text-gray-700 md:flex">
            <Link href="/" className="relative text-black after:absolute after:-bottom-2.5 after:left-0 after:h-0.5 after:w-full after:bg-black">
              Home
            </Link>
            <a href="#shoes" className="transition hover:text-black">
              Shoes
            </a>
            <a href="/buying-guide" className="transition hover:text-black">
              Buying Guide
            </a>
            <a href="#faq" className="transition hover:text-black">
              FAQs
            </a>
            <a href="#shoes" className="transition hover:text-black">
              Men
            </a>
            <a href="#shoes" className="transition hover:text-black">
              Women
            </a>
            <a href="#sale" className="font-bold text-red-600 transition hover:text-red-700">
              Sale
            </a>
          </nav>

          {/* Header Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3 text-gray-800">
            <button aria-label="Search" className="rounded-full p-2.5 hover:bg-gray-100 transition">
              <Search className="h-5 w-5" />
            </button>
            <button aria-label="Wishlist" className="rounded-full p-2.5 hover:bg-gray-100 transition">
              <Heart className="h-5 w-5" />
            </button>
            <CartBadge />
            <button aria-label="User Account" className="rounded-full p-2.5 hover:bg-gray-100 transition">
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* 3. Hero Section (SOLEX Style) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f8f9fa] via-white to-[#f5f5f7] pb-16 pt-12 sm:pb-24 sm:pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            
            {/* Left Column: Hero Content */}
            <div className="z-10 lg:col-span-6">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Your footwear buying guide
              </p>

              <h1 className="mb-6 text-5xl font-black tracking-tight text-gray-950 sm:text-6xl lg:text-7xl leading-[1.05]">
                Find the Right Running Shoes
              </h1>

              <p className="mb-8 max-w-xl text-lg leading-relaxed text-gray-600 sm:text-xl">
                Learn how to choose running shoes, compare footwear options, and find a comfortable pair for your daily needs.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#shoes"
                  className="group inline-flex items-center gap-3 rounded-full bg-black px-8 py-4 text-base font-bold text-white shadow-lg transition duration-200 hover:bg-neutral-800 hover:shadow-xl active:scale-95"
                >
                  <span>Explore Shoes</span>
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>

                <a
                  href="/buying-guide"
                  className="inline-flex items-center rounded-full border border-gray-300 bg-white px-7 py-4 text-base font-semibold text-gray-800 shadow-xs transition hover:border-black hover:bg-gray-50 active:scale-95"
                >
                  Buying Guide
                </a>
              </div>
            </div>

            {/* Right Column: Hero Shoe Showcase with Pedestal and Floating Badge */}
            <div className="relative flex justify-center lg:col-span-6">
              {/* Dynamic lighting effects */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-gray-200/80 via-blue-100/40 to-transparent blur-3xl opacity-70"></div>
              
              <div className="relative w-full max-w-lg">
                {/* Floating Showcase Container */}
                <div className="relative overflow-hidden rounded-3xl bg-neutral-900 shadow-2xl border border-gray-150 group">
                  <Image
                    src="/images/hero-running-shoe.jpg"
                    alt="gray running shoe with a cushioned sole"
                    width={800}
                    height={600}
                    priority
                    className="h-auto w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  {/* Glassmorphism Floating Tag in Bottom-Right Corner */}
                  <div className="absolute bottom-5 right-5 rounded-2xl border border-white/20 bg-black/80 px-4 py-3 text-white backdrop-blur-md shadow-2xl">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">New Arrivals</p>
                    <p className="text-sm font-bold">Apex Air Velocity 1</p>
                    <div className="mt-1 flex items-center gap-1">
                      <span className="h-1.5 w-4 rounded-full bg-white"></span>
                      <span className="h-1.5 w-1.5 rounded-full bg-gray-500"></span>
                      <span className="h-1.5 w-1.5 rounded-full bg-gray-500"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Top Brands Strip */}
      <section className="border-y border-gray-200/80 bg-white py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-black uppercase tracking-widest text-gray-500">
            TOP BRANDS
          </span>

          <div className="flex flex-wrap items-center gap-8 sm:gap-12 text-sm font-extrabold uppercase tracking-wider text-gray-700">
            <span className="transition hover:text-black cursor-pointer font-black italic">NIKE</span>
            <span className="transition hover:text-black cursor-pointer font-black tracking-tighter">ADIDAS</span>
            <span className="transition hover:text-black cursor-pointer font-black tracking-widest">PUMA</span>
            <span className="transition hover:text-black cursor-pointer font-black">NEW BALANCE</span>
            <span className="transition hover:text-black cursor-pointer font-black italic">CONVERSE</span>
            <span className="transition hover:text-black cursor-pointer font-black tracking-tight">VANS</span>
          </div>

          <a href="#shoes" className="text-xs font-bold text-gray-500 hover:text-black hover:underline">
            View all
          </a>
        </div>
      </section>

      {/* 5. Shop By Category Quick Strip with Lucide Icons */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-wider text-gray-500">
              SHOP BY CATEGORY
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { name: "Running", icon: Footprints },
              { name: "Walking", icon: Compass },
              { name: "Sports", icon: Zap },
              { name: "Lifestyle", icon: Sparkles },
              { name: "Training", icon: Dumbbell },
              { name: "Sneakers", icon: Flame },
            ].map((cat, idx) => {
              const IconComponent = cat.icon;
              return (
                <a
                  key={idx}
                  href="#shoes"
                  className="group flex flex-col items-center justify-center rounded-2xl border border-gray-200/80 bg-[#f8f9fa] p-6 text-center transition duration-200 hover:border-black hover:bg-white hover:shadow-md"
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-gray-200/80 text-gray-800 shadow-xs transition duration-200 group-hover:scale-110 group-hover:border-black group-hover:bg-black group-hover:text-white">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-bold text-gray-900">{cat.name}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Dynamic Shoe Products Catalog & Interactive Details Modal */}
      <ProductCatalog />

      {/* 7. Promotional "Summer Sale / 40% OFF" Banner (from Reference) */}
      <section id="sale" className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-[#0b0c10] px-8 py-12 text-white sm:px-12 sm:py-16 shadow-2xl">
            {/* Background ambient lighting */}
            <div className="absolute -right-16 -top-16 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl"></div>
            
            <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <span className="inline-block rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-400 mb-4 border border-white/10">
                  LIMITED TIME ONLY
                </span>
                <h3 className="mb-3 text-4xl font-black sm:text-5xl">Summer Sale</h3>
                <p className="mb-6 text-gray-400 text-base sm:text-lg">Up to 40% off on selected items</p>
                <a
                  href="#shoes"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-black transition hover:bg-gray-100 active:scale-95"
                >
                  <span>Shop the Sale</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="flex justify-center lg:col-span-4">
                <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                  <Image
                    src="/images/summer-sale-sneakers.jpg"
                    alt="Summer sale running shoes splash edition"
                    width={600}
                    height={340}
                    className="h-auto w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center justify-center text-center lg:col-span-3 lg:items-end lg:text-right">
                <p className="text-6xl sm:text-7xl font-black tracking-tighter text-amber-300">
                  40%
                </p>
                <p className="text-3xl font-extrabold uppercase tracking-widest text-white">
                  OFF
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Trust Badges / Value Props Strip with Lucide Icons */}
      <section className="border-y border-gray-100 bg-[#fbfbfd] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            <div className="flex items-center gap-4 rounded-2xl bg-white p-5 border border-gray-150 shadow-xs">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 border border-gray-100 text-gray-900">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-950 text-sm">Free Shipping</h4>
                <p className="text-xs text-gray-500">On orders over $100</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-white p-5 border border-gray-150 shadow-xs">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 border border-gray-100 text-gray-900">
                <RotateCcw className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-950 text-sm">30-Day Returns</h4>
                <p className="text-xs text-gray-500">Hassle-free returns</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-white p-5 border border-gray-150 shadow-xs">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 border border-gray-100 text-gray-900">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-950 text-sm">100% Authentic</h4>
                <p className="text-xs text-gray-500">Genuine branded products</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-white p-5 border border-gray-150 shadow-xs">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 border border-gray-100 text-gray-900">
                <Lock className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-950 text-sm">Secure Payments</h4>
                <p className="text-xs text-gray-500">Safe & encrypted checkout</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Buying Guide Section */}
      <section id="guide" className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-50 via-white to-gray-50 p-8 sm:p-14 shadow-sm">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600 mb-3 block">
              EXPERT RUNNER TIPS
            </span>
            <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
              How to Choose Running Shoes
            </h2>

            <p className="mb-8 max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg">
              Start by considering where you run, how often you run, and which shoe size feels comfortable. Try shoes on and check that your toes have enough room.
            </p>

            <a
              href="#faq"
              className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-bold text-white transition hover:bg-neutral-800"
            >
              <span>Read our frequently asked questions</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 10. FAQ Section */}
      <section id="faq" className="border-t border-gray-100 bg-[#f8f9fa] py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center sm:text-left">
            <span className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2 block">
              HELP & SUPPORT
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            <article className="rounded-2xl border border-gray-200/90 bg-white p-6 shadow-xs sm:p-7">
              <h3 className="mb-2.5 text-xl font-bold text-gray-950">
                How should running shoes fit?
              </h3>
              <p className="leading-relaxed text-gray-600">
                They should feel secure without squeezing your feet, with enough space for your toes to move.
              </p>
            </article>

            <article className="rounded-2xl border border-gray-200/90 bg-white p-6 shadow-xs sm:p-7">
              <h3 className="mb-2.5 text-xl font-bold text-gray-950">
                Can I use running shoes for walking?
              </h3>
              <p className="leading-relaxed text-gray-600">
                Often, yes. Choose a pair that feels comfortable and suits your walking surface and daily needs.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 11. Full E-Commerce Footer with Lucide Icons */}
      <footer className="border-t border-neutral-800 bg-[#0d0d0f] text-gray-400">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12">
            
            {/* Column 1: Brand Info */}
            <div className="lg:col-span-4">
              <Link href="/" className="text-2xl font-black uppercase tracking-wider text-white">
                Apex Layer shoes
              </Link>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-400">
                Your destination for authentic branded shoes. Quality, style, and comfort — all in one place.
              </p>
              <div className="mt-6 flex items-center gap-3 text-white">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 cursor-pointer transition">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 cursor-pointer transition">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z"/>
                  </svg>
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 cursor-pointer transition">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 cursor-pointer transition">
                  <Share2 className="h-4 w-4" />
                </span>
              </div>
            </div>

            {/* Column 2: Shop */}
            <div className="lg:col-span-2">
              <p className="text-xs font-black uppercase tracking-wider text-white mb-4">SHOP</p>
              <ul className="space-y-3 text-sm">
                <li><a href="#shoes" className="hover:text-white transition">All Shoes</a></li>
                <li><a href="#shoes" className="hover:text-white transition">Men</a></li>
                <li><a href="#shoes" className="hover:text-white transition">Women</a></li>
                <li><a href="#shoes" className="hover:text-white transition">Kids</a></li>
                <li><a href="#sale" className="hover:text-white transition text-red-400">Sale</a></li>
              </ul>
            </div>

            {/* Column 3: Customer Care */}
            <div className="lg:col-span-2">
              <p className="text-xs font-black uppercase tracking-wider text-white mb-4">CUSTOMER CARE</p>
              <ul className="space-y-3 text-sm">
                <li><a href="#guide" className="hover:text-white transition">Contact Us</a></li>
                <li><a href="#guide" className="hover:text-white transition">Shipping Info</a></li>
                <li><a href="#guide" className="hover:text-white transition">Returns & Exchanges</a></li>
                <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
                <li><a href="#guide" className="hover:text-white transition">Size Guide</a></li>
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div className="lg:col-span-4">
              <p className="text-xs font-black uppercase tracking-wider text-white mb-4">NEWSLETTER</p>
              <p className="mb-4 text-sm text-gray-400">
                Get updates on new arrivals, exclusive offers and more.
              </p>
              <div className="flex items-center rounded-full bg-neutral-900 border border-neutral-800 p-1.5 focus-within:border-gray-500">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-transparent px-4 text-sm text-white placeholder-gray-500 outline-hidden"
                />
                <button
                  type="button"
                  aria-label="Subscribe"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-black hover:bg-gray-200 transition"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-8 text-xs text-gray-500 sm:flex-row">
            <p>StepUp Shoes — Practice website for SEO and AEO learning.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition">Terms & Conditions</a>
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
