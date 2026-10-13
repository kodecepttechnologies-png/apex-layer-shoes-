import Link from "next/link";
import { ArrowRight, Share2, Footprints } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-[#0d0d0f] text-gray-400">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2 text-2xl font-black uppercase tracking-wider text-white">
              <Footprints className="h-6 w-6 text-white" />
              <span>Apex Layer shoes</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-400">
              Your destination for authentic branded shoes. Quality, style, and comfort — engineered for every stride.
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
              <li><Link href="/shoes" className="hover:text-white transition">All Shoes</Link></li>
              <li><Link href="/shoes?category=Running" className="hover:text-white transition">Running Shoes</Link></li>
              <li><Link href="/shoes?category=Walking" className="hover:text-white transition">Walking Shoes</Link></li>
              <li><Link href="/shoes?category=Sports" className="hover:text-white transition">Sports Shoes</Link></li>
              <li><Link href="/shoes?sale=true" className="hover:text-white transition text-red-400">Sale & Offers</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="lg:col-span-2">
            <p className="text-xs font-black uppercase tracking-wider text-white mb-4">CUSTOMER CARE</p>
            <ul className="space-y-3 text-sm">
              <li><Link href="/buying-guide" className="hover:text-white transition">Footwear Buying Guide</Link></li>
              <li><Link href="/#faq" className="hover:text-white transition">FAQs</Link></li>
              <li><Link href="/shoes" className="hover:text-white transition">Browse Collection</Link></li>
              <li><Link href="/buying-guide" className="hover:text-white transition">Size Chart & Tips</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-4">
            <p className="text-xs font-black uppercase tracking-wider text-white mb-4">NEWSLETTER</p>
            <p className="mb-4 text-sm text-gray-400">
              Get updates on new shoe releases, exclusive drops and member discounts.
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
          <p>© 2026 Apex Layer Shoes — Premium Athletic Footwear.</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <Link href="/shoes" className="hover:text-white transition">Shoes</Link>
            <Link href="/buying-guide" className="hover:text-white transition">Buying Guide</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
