"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Package,
  Search,
  Heart,
  User,
  Menu,
  X,
  Footprints,
} from "lucide-react";
import CartBadge from "./CartBadge";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shoes", href: "/shoes" },
    { name: "Buying Guide", href: "/buying-guide" },
    { name: "FAQs", href: "/#faq" },
    { name: "Men", href: "/shoes?category=Sports" },
    { name: "Women", href: "/shoes?category=Walking" },
    { name: "Sale", href: "/shoes?sale=true", isSale: true },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.split("?")[0]) && href !== "/#faq";
  };

  return (
    <>
      {/* 1. Top Announcement Bar */}
      <div className="bg-[#0f0f11] px-4 py-2 text-center text-xs font-medium text-gray-200">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2">
          <Package className="h-3.5 w-3.5 text-gray-400" />
          <span>Free shipping on all orders over $100</span>
          <span className="text-gray-500">|</span>
          <span>Easy 30-day wear-test returns</span>
        </div>
      </div>

      {/* 2. Main Navigation Header */}
      <header className="sticky top-0 z-40 border-b border-gray-150 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-lg p-2 text-gray-700 hover:bg-gray-100 transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl sm:text-2xl font-black uppercase tracking-wider text-gray-950 transition hover:opacity-85"
          >
            <Footprints className="h-6 w-6 text-black" />
            <span>Apex Layer shoes</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main navigation" className="hidden items-center gap-7 text-sm font-semibold text-gray-700 md:flex">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative transition ${
                    link.isSale
                      ? "font-bold text-red-600 hover:text-red-700"
                      : active
                      ? "text-black after:absolute after:-bottom-2.5 after:left-0 after:h-0.5 after:w-full after:bg-black"
                      : "hover:text-black"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-3 text-gray-800">
            <Link
              href="/shoes"
              aria-label="Search"
              className="rounded-full p-2.5 hover:bg-gray-100 transition text-gray-700 hover:text-black"
            >
              <Search className="h-5 w-5" />
            </Link>
            <Link
              href="/shoes"
              aria-label="Wishlist"
              className="rounded-full p-2.5 hover:bg-gray-100 transition text-gray-700 hover:text-black"
            >
              <Heart className="h-5 w-5" />
            </Link>
            <CartBadge />
            <button
              aria-label="User Account"
              className="rounded-full p-2.5 hover:bg-gray-100 transition text-gray-700 hover:text-black"
            >
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-150 bg-white px-4 py-4 animate-in slide-in-from-top-2 duration-150">
            <nav className="flex flex-col gap-3 text-sm font-semibold text-gray-800">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-xl px-3 py-2 transition ${
                    link.isSale
                      ? "text-red-600 font-bold bg-red-50"
                      : isActive(link.href)
                      ? "bg-black text-white font-bold"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
