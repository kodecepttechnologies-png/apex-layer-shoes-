"use client";

import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";

export default function CartBadge() {
  const [count, setCount] = useState<number>(0);
  const [bump, setBump] = useState<boolean>(false);

  useEffect(() => {
    const handleCartUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ count: number }>;
      if (customEvent.detail?.count !== undefined) {
        setCount(customEvent.detail.count);
        setBump(true);
        setTimeout(() => setBump(false), 300);
      }
    };

    window.addEventListener("apex-cart-updated", handleCartUpdate);
    return () => window.removeEventListener("apex-cart-updated", handleCartUpdate);
  }, []);

  return (
    <button
      aria-label="Cart"
      className={`relative rounded-full p-2.5 hover:bg-gray-100 transition ${
        bump ? "scale-110" : ""
      }`}
    >
      <ShoppingBag className="h-5 w-5" />
      <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white transition-transform">
        {count}
      </span>
    </button>
  );
}
