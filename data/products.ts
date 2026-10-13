export interface Product {
  id: string;
  name: string;
  category: "Running" | "Walking" | "Sports" | "Lifestyle" | "Training";
  tag: string;
  badgeColor?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  additionalImages: string[];
  description: string;
  longDescription: string;
  colors: { name: string; hex: string; class: string }[];
  sizes: (number | string)[];
  specs: {
    cushioning: string;
    drop: string;
    weight: string;
    surface: string;
    closure: string;
    upperMaterial: string;
  };
  features: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: "apex-nitro-velocity",
    name: "Apex Nitro Velocity Pro",
    category: "Running",
    tag: "Velocity Tier",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    price: 115.0,
    originalPrice: 145.0,
    rating: 4.9,
    reviewsCount: 2410,
    image: "/images/product-running-nitro.jpg",
    additionalImages: [
      "/images/product-running-nitro.jpg",
      "/images/hero-running-shoe.jpg",
      "/images/shoe-anatomy.jpg",
    ],
    description:
      "Engineered for race pace and high-mileage runs with dual-density nitrogen-infused foam and ultra-breathable engineered knit.",
    longDescription:
      "The Apex Nitro Velocity Pro is our flagship road-running shoe built for speed, durability, and smooth transitions. The dual-density Velox Nitro midsole provides 85% energy return while absorbing joint impact over asphalt and concrete. Designed with anatomical heel lockdown and an anti-slip carbon rubber outsole for wet and dry grip.",
    colors: [
      { name: "Neon Lime & Onyx", hex: "#a3e635", class: "bg-lime-400" },
      { name: "Midnight Stealth", hex: "#171717", class: "bg-neutral-900" },
      { name: "Polar White", hex: "#f8fafc", class: "bg-slate-100 border border-gray-300" },
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    specs: {
      cushioning: "High-Responsive Nitrogen Foam",
      drop: "8 mm (Heel 36mm / Forefoot 28mm)",
      weight: "238g (Size US 9)",
      surface: "Road, Pavement & Track",
      closure: "Asymmetric Lace Lock",
      upperMaterial: "Engineered Jacquard Breathable Mesh",
    },
    features: [
      "Velox Nitro foam core provides 85% energy rebound",
      "GripMaster all-weather micro-lugged rubber outsole",
      "Ergonomic contoured heel cup prevents Achilles friction",
      "Reflective 3M safety accents for low-light night runs",
      "Removable OrthoLite antimicrobial moisture-wicking sockliner",
    ],
  },
  {
    id: "aerowalk-comfort-cushion",
    name: "AeroWalk Comfort Cushion",
    category: "Walking",
    tag: "Comfort Daily",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    price: 90.0,
    originalPrice: 110.0,
    rating: 4.8,
    reviewsCount: 1820,
    image: "/images/product-walking-cushion.jpg",
    additionalImages: [
      "/images/product-walking-cushion.jpg",
      "/images/gray-running-shoes.webp",
      "/images/shoe-anatomy.jpg",
    ],
    description:
      "Engineered for all-day standing and brisk walking with a plush memory arch cradle and seamless zero-chafing knit upper.",
    longDescription:
      "Experience cloud-like support with the AeroWalk Comfort Cushion. Tailored specifically for healthcare workers, daily commuters, and active walkers who spend 8+ hours on their feet. The dual-pod shock absorbing heel absorbs every heel strike, easing knee and lower back fatigue.",
    colors: [
      { name: "Desert Oatmeal", hex: "#d6c7b2", class: "bg-stone-300" },
      { name: "Soft Charcoal", hex: "#374151", class: "bg-gray-700" },
      { name: "Chalk Cream", hex: "#f5f5f4", class: "bg-stone-100 border border-gray-300" },
    ],
    sizes: [6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
    specs: {
      cushioning: "Plush High-Density Memory Foam",
      drop: "10 mm",
      weight: "220g (Size US 9)",
      surface: "Sidewalks, Hard Floors & Parks",
      closure: "Stretch Slip-On with Integrated Laces",
      upperMaterial: "Seamless 4-Way Stretch Knit",
    },
    features: [
      "Podiatrist-designed anatomical arch support system",
      "Deep heel cup stabilizes foot strike on hard surfaces",
      "Breathable heat-releasing knit prevents moisture buildup",
      "Flexible segmented sole follows the foot's natural roll",
      "Ultra-soft padded collar prevents blister formation",
    ],
  },
  {
    id: "apex-air-trainer-x",
    name: "Apex Air Trainer X",
    category: "Sports",
    tag: "Multi-Sport",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    price: 120.0,
    originalPrice: 150.0,
    rating: 4.9,
    reviewsCount: 3240,
    image: "/images/product-sports-trainer.jpg",
    additionalImages: [
      "/images/product-sports-trainer.jpg",
      "/images/summer-sale-sneakers.jpg",
      "/images/shoe-anatomy.jpg",
    ],
    description:
      "Tough TPU lateral cage and visible pressurized air sole for explosive lateral cuts, gym HIIT, and multi-sport agility.",
    longDescription:
      "The Apex Air Trainer X is built to withstand high-intensity workouts, court sports, and cross-training routines. Equipped with a molded TPU chassis that locks down your midfoot during side-to-side cuts, plus an encapsulated heel Air-cushion pocket that buffers heavy landing shocks.",
    colors: [
      { name: "Electric Blue & Slate", hex: "#2563eb", class: "bg-blue-600" },
      { name: "Stealth Titanium", hex: "#475569", class: "bg-slate-600" },
      { name: "Solar Crimson", hex: "#dc2626", class: "bg-red-600" },
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    specs: {
      cushioning: "Pressurized Heel Air Unit + EVA",
      drop: "6 mm (Low-profile Court Drop)",
      weight: "285g (Size US 9)",
      surface: "Gym, Indoor Court, Turf & Asphalt",
      closure: "Reinforced Eyelet Lockdown",
      upperMaterial: "Abrasion-Resistant Ripstop & TPU",
    },
    features: [
      "Wrap-around lateral TPU stabilizer prevents ankle roll",
      "Non-marking multi-directional herringbone traction",
      "Reinforced rubber toe bumper protects during lunges and planks",
      "Dual pull-tabs for rapid slip-on transitions",
      "Responsive spring foam footbed for explosive jumps",
    ],
  },
  {
    id: "apex-court-classic-01",
    name: "Apex Court Classic 01",
    category: "Lifestyle",
    tag: "Heritage Edition",
    badgeColor: "bg-stone-100 text-stone-800 border-stone-200",
    price: 105.0,
    originalPrice: 130.0,
    rating: 4.8,
    reviewsCount: 960,
    image: "/images/product-lifestyle-court.jpg",
    additionalImages: [
      "/images/product-lifestyle-court.jpg",
      "/images/summer-sale-sneakers.jpg",
    ],
    description:
      "Premium full-grain leather, carbon fiber accents, and retro gum rubber outsole tailored for timeless streetwear luxury.",
    longDescription:
      "Inspired by vintage tennis courts and modern minimalism, the Apex Court Classic 01 features butter-soft full-grain leather with carbon-weave side accents. A stitched vulcanized gum cupsole delivers timeless aesthetic appeal while offering modern all-day foot support.",
    colors: [
      { name: "Vintage White & Gum", hex: "#ffffff", class: "bg-white border border-gray-300" },
      { name: "Carbon Shadow", hex: "#1f2937", class: "bg-gray-800" },
      { name: "Terracotta White", hex: "#ea580c", class: "bg-orange-600" },
    ],
    sizes: [7, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    specs: {
      cushioning: "Dual-layer PU Insole with Arch Cushion",
      drop: "4 mm Flat Street Profile",
      weight: "310g (Size US 9)",
      surface: "Urban & Casual Lifestyle",
      closure: "Flat Waxed Cotton Laces",
      upperMaterial: "Premium Full-Grain Leather & Suede",
    },
    features: [
      "Stitched 360-degree durable gum rubber cupsole",
      "Buttery soft micro-perforated toe box for air circulation",
      "Carbon-fiber reinforced midfoot side panel",
      "Padded leather tongue with embossed apex insignia",
      "Water-resistant leather finish easy to wipe clean",
    ],
  },
  {
    id: "apex-cloud-strider-max",
    name: "Apex CloudStrider Max",
    category: "Running",
    tag: "Long Distance",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    price: 135.0,
    originalPrice: 165.0,
    rating: 4.9,
    reviewsCount: 1540,
    image: "/images/hero-running-shoe.jpg",
    additionalImages: [
      "/images/hero-running-shoe.jpg",
      "/images/product-running-nitro.jpg",
      "/images/shoe-anatomy.jpg",
    ],
    description:
      "Ultra-stack maxi cushioning engineered to protect joints during marathon distance training and recovery miles.",
    longDescription:
      "When maximum comfort is the goal, CloudStrider Max delivers. Featuring a 40mm stack of dual-phase supercritical foam, this shoe glides over pavement shocks effortlessly. The rocker geometry gently rolls your stride forward, reducing calf exertion by up to 18%.",
    colors: [
      { name: "Space Gray & Slate", hex: "#64748b", class: "bg-slate-500" },
      { name: "Cosmic Black", hex: "#0a0a0a", class: "bg-neutral-950" },
      { name: "Glacier Blue", hex: "#38bdf8", class: "bg-sky-400" },
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    specs: {
      cushioning: "Max-Stack Supercritical Foam",
      drop: "6 mm (Stack: 40mm heel / 34mm forefoot)",
      weight: "260g (Size US 9)",
      surface: "Road & Long Distance",
      closure: "Integrated Lace Gusset",
      upperMaterial: "Recycled Engineered Monomesh",
    },
    features: [
      "Effortless GlideRocker curve promotes efficient toe-off",
      "Plush 12mm padded ankle collar for premium step-in comfort",
      "High-abrasion carbon rubber zones in heavy wear spots",
      "Wide stable base geometry prevents excess pronation",
      "Sustainable yarn upper made with 60% recycled ocean plastics",
    ],
  },
  {
    id: "apex-pulse-speed-surge",
    name: "Apex Pulse Speed Surge",
    category: "Sports",
    tag: "Summer Edition",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
    price: 99.0,
    originalPrice: 165.0,
    rating: 4.7,
    reviewsCount: 880,
    image: "/images/summer-sale-sneakers.jpg",
    additionalImages: [
      "/images/summer-sale-sneakers.jpg",
      "/images/product-sports-trainer.jpg",
    ],
    description:
      "Dynamic color-splash athletic sneaker built for high energy gym workouts, sprints, and street speed with 40% discount.",
    longDescription:
      "Make a bold statement while accelerating your PRs. The Pulse Speed Surge pairs vibrant color blocking with lightweight responsive rebound. Its flexible forefoot allows natural toe splay, while the midfoot torsion shank provides snappy snap-back recoil.",
    colors: [
      { name: "Sunset Splash & Cyan", hex: "#f97316", class: "bg-orange-500" },
      { name: "Electric Yellow", hex: "#eab308", class: "bg-yellow-500" },
      { name: "Hyper Violet", hex: "#9333ea", class: "bg-purple-600" },
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
    specs: {
      cushioning: "Dual-Density Kinetic Foam",
      drop: "7 mm",
      weight: "230g (Size US 9)",
      surface: "Track, Gym & Crossfit",
      closure: "Quick-Pull Dynamic Lacing",
      upperMaterial: "Thermal Molded Lightweight Mesh",
    },
    features: [
      "Midfoot composite torsion shank for explosive propulsion",
      "Laser-cut side vents for superior cooling airflow",
      "Ultra-sticky rubber pads on forefoot for grip during sprints",
      "Featherweight construction minimizes leg fatigue",
      "Limited summer edition colorway with high-def contrast",
    ],
  },
  {
    id: "apex-glide-walker-pro",
    name: "Apex Glide Walker Pro",
    category: "Walking",
    tag: "Orthopedic Fit",
    badgeColor: "bg-teal-100 text-teal-800 border-teal-200",
    price: 95.0,
    originalPrice: 120.0,
    rating: 4.8,
    reviewsCount: 1410,
    image: "/images/gray-running-shoes.webp",
    additionalImages: [
      "/images/gray-running-shoes.webp",
      "/images/product-walking-cushion.jpg",
    ],
    description:
      "Targeted arch cradling and shock-dispersion heel cavity engineered for 10,000+ daily steps without fatigue.",
    longDescription:
      "Tested and recommended for foot fatigue relief, plantar pressure relief, and extended daily walking. The Glide Walker Pro utilizes a gently curved rolling rocker sole that propels you into each step with minimal calf exertion.",
    colors: [
      { name: "Cool Heather Gray", hex: "#9ca3af", class: "bg-gray-400" },
      { name: "Obsidian Black", hex: "#111827", class: "bg-gray-900" },
      { name: "Sky Mist", hex: "#bae6fd", class: "bg-sky-200" },
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    specs: {
      cushioning: "ArchCradle Gel & Foam Compound",
      drop: "10 mm",
      weight: "245g (Size US 9)",
      surface: "Sidewalks, Hard Floors, Indoor/Outdoor",
      closure: "Adaptive Elastic Laces with Lock",
      upperMaterial: "Engineered Breathable Engineered Mesh",
    },
    features: [
      "Ergonomic arch reinforcement aligns ankle and knee posture",
      "Deep heel bevel reduces impact shock upon ground strike",
      "Wide toe box prevents bunion friction and cramped toes",
      "Machine washable removable insole for freshness",
      "Tested for over 500 miles of consistent shock absorption",
    ],
  },
  {
    id: "apex-stealth-trainer-gt",
    name: "Apex Stealth Trainer GT",
    category: "Training",
    tag: "Heavy Lift & HIIT",
    badgeColor: "bg-zinc-200 text-zinc-900 border-zinc-300",
    price: 128.0,
    originalPrice: 155.0,
    rating: 4.9,
    reviewsCount: 2120,
    image: "/images/product-sports-trainer.jpg",
    additionalImages: [
      "/images/product-sports-trainer.jpg",
      "/images/product-running-nitro.jpg",
      "/images/shoe-anatomy.jpg",
    ],
    description:
      "Wide stable base, zero-compression heel wedge, and high-friction rubber wrap built for heavy squats and functional training.",
    longDescription:
      "Engineered from the ground up for gym lifters, crossfitters, and strength athletes. The Stealth Trainer GT provides an ultra-flat, rock-solid platform for deadlifts and squats while maintaining just enough forefoot flex for box jumps and burpees.",
    colors: [
      { name: "Matte Blackout", hex: "#18181b", class: "bg-zinc-900" },
      { name: "Gunmetal Gray", hex: "#52525b", class: "bg-zinc-600" },
      { name: "Volt Accent", hex: "#84cc16", class: "bg-lime-500" },
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    specs: {
      cushioning: "Firm Zero-Compression Stability Sole",
      drop: "4 mm Flat Lifting Drop",
      weight: "295g (Size US 9)",
      surface: "Gym Mat, Platform, Turf & Concrete",
      closure: "Dual Dynamic Midfoot Straps & Laces",
      upperMaterial: "Kevlar-Reinforced Ballistic Mesh",
    },
    features: [
      "Rigid TPU heel clip ensures absolute lifting stability",
      "Rope-grip side rubber wraps resist rope climbs friction",
      "Anatomical wide toe box for solid foot splay under heavy loads",
      "Reinforced sidewalls prevent lateral blowouts during agility drills",
      "Firm rubber compound delivers maximum ground power transfer",
    ],
  },
];

export function getRandomProduct(excludeId?: string): Product {
  const available = excludeId
    ? PRODUCTS.filter((p) => p.id !== excludeId)
    : PRODUCTS;
  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex] || PRODUCTS[0];
}
