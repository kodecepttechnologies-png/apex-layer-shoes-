"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  Search,
  Heart,
  ShoppingBag,
  User,
  ArrowRight,
  Footprints,
  Compass,
  Zap,
  Sparkles,
  Dumbbell,
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
  Lock,
  Share2,
  CheckCircle2,
  Check,
  Info,
  ChevronDown,
  ChevronRight,
  Sliders,
  Mountain,
  Award,
  Activity,
  Layers,
  Ruler,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Interactive Finder Data
interface ShoeMatch {
  name: string;
  tagline: string;
  category: string;
  matchScore: number;
  image: string;
  price: string;
  drop: string;
  weight: string;
  stackHeight: string;
  cushionLevel: string;
  archSupport: string;
  bestFor: string;
  description: string;
}

const SHOE_MATCHES: Record<string, ShoeMatch> = {
  "road-max-neutral": {
    name: "Apex Air Velocity 1 - Cloud Edition",
    tagline: "Plush Max-Cushion Road Cruiser",
    category: "Road Running / High Mileage",
    matchScore: 98,
    image: "/images/hero-running-shoe.jpg",
    price: "$135.00",
    drop: "8 mm",
    weight: "265 g",
    stackHeight: "36 mm / 28 mm",
    cushionLevel: "Maximal Plush",
    archSupport: "Neutral / Balanced",
    bestFor: "Long Sunday runs, recovery days, marathon prep",
    description:
      "Engineered with nitrogen-infused supercritical foam that absorbs up to 42% more road vibration while maintaining a featherlight spring in every stride.",
  },
  "road-max-stability": {
    name: "Apex Strider Guard Pro",
    tagline: "Guiding Support with Cloud Comfort",
    category: "Road Running / Stability",
    matchScore: 97,
    image: "/images/hero-running-shoe.jpg",
    price: "$140.00",
    drop: "10 mm",
    weight: "280 g",
    stackHeight: "34 mm / 24 mm",
    cushionLevel: "Maximal Plush",
    archSupport: "High Stability / Medial Post",
    bestFor: "Overpronation, flat arches, high-mileage road training",
    description:
      "Dual-density medial support system prevents excessive inward ankle rolling while offering cloud-level cushioning for long training blocks.",
  },
  "road-firm-neutral": {
    name: "Apex TempoSpeed Carbon 2",
    tagline: "Ultralight Snappy Race Day Accelerator",
    category: "Speedwork & Race Day",
    matchScore: 99,
    image: "/images/summer-sale-sneakers.jpg",
    price: "$165.00",
    drop: "6 mm",
    weight: "198 g",
    stackHeight: "30 mm / 24 mm",
    cushionLevel: "Firm & Responsive",
    archSupport: "Neutral Agility",
    bestFor: "5K/10K pacing, tempo runs, personal bests",
    description:
      "Features a curved spoon-geometry carbon plate nestled in ultra-responsive foam to propel your toe-off with razor-sharp efficiency.",
  },
  "trail-all": {
    name: "Apex TerraGrip Outland Pro",
    tagline: "Rugged All-Weather Mountain Grip",
    category: "Trail & Outdoor",
    matchScore: 96,
    image: "/images/gray-running-shoes.webp",
    price: "$145.00",
    drop: "5 mm",
    weight: "290 g",
    stackHeight: "32 mm / 27 mm",
    cushionLevel: "Balanced Protective",
    archSupport: "Adaptive Terrain Arch",
    bestFor: "Rocky scrambles, wet dirt trails, ultra trail runs",
    description:
      "Equipped with 4.5mm multi-directional rubber lugs, a flexible rock-plate shield, and water-repellent ripstop upper for extreme conditions.",
  },
  "walking-all": {
    name: "Apex All-Day Glide Walk",
    tagline: "Ergonomic 12-Hour Comfort Architecture",
    category: "Walking & Daily Standing",
    matchScore: 99,
    image: "/images/gray-running-shoes.webp",
    price: "$95.00",
    drop: "8 mm",
    weight: "240 g",
    stackHeight: "31 mm / 23 mm",
    cushionLevel: "Memory Cloud Foam",
    archSupport: "Ergonomic Contoured Arch",
    bestFor: "10,000+ daily steps, healthcare workers, commuting",
    description:
      "Designed specifically for heel-to-toe walking biomechanics with Ortholite memory sockliner and wide landing platform to relieve plantar stress.",
  },
  "default": {
    name: "Apex Air Velocity 1",
    tagline: "The Versatile Everyday Benchmark",
    category: "Versatile Daily Trainer",
    matchScore: 95,
    image: "/images/hero-running-shoe.jpg",
    price: "$115.00",
    drop: "8 mm",
    weight: "250 g",
    stackHeight: "32 mm / 24 mm",
    cushionLevel: "Balanced Daily",
    archSupport: "Neutral Universal",
    bestFor: "Everyday running, gym workouts, casual fitness",
    description:
      "Our flagship trainer strikes the gold-standard balance of cushion, breathability, and bounce for novice runners and seasoned athletes alike.",
  },
};

export default function BuyingGuidePage() {
  // Shoe Finder State
  const [activity, setActivity] = useState<"road" | "trail" | "walking" | "speed">("road");
  const [cushion, setCushion] = useState<"max" | "balanced" | "firm">("max");
  const [arch, setArch] = useState<"neutral" | "flat" | "high">("neutral");

  // Anatomy Interactive Focus
  const [activeAnatomyPart, setActiveAnatomyPart] = useState<number>(0);

  // FAQ Accordion State
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Calculate current matched shoe
  const getMatch = (): ShoeMatch => {
    if (activity === "trail") return SHOE_MATCHES["trail-all"];
    if (activity === "walking") return SHOE_MATCHES["walking-all"];
    if (activity === "speed") return SHOE_MATCHES["road-firm-neutral"];
    if (cushion === "firm") return SHOE_MATCHES["road-firm-neutral"];
    if (arch === "flat") return SHOE_MATCHES["road-max-stability"];
    if (cushion === "max") return SHOE_MATCHES["road-max-neutral"];
    return SHOE_MATCHES["default"];
  };

  const currentMatch = getMatch();

  // Anatomy points
  const anatomyParts = [
    {
      title: "1. Engineered Jacquard Mesh Upper",
      tag: "Upper Zone",
      highlight: "Breathability & Frictionless Lockdown",
      description:
        "Zone-mapped engineered mesh offers dynamic stretch where your foot widens during landing, paired with structural micro-weaves around the midfoot that eliminate hot spots and blistering.",
      specs: ["Seamless laser-cut ventilation ports", "Gusseted anti-slip tongue", "Recycled hydrophobic yarn"],
    },
    {
      title: "2. Supercritical Foam Midsole",
      tag: "Midsole Engine",
      highlight: "Impact Attenuation & Rebound",
      description:
        "Infused with nitrogen under supercritical pressure, our proprietary foam weighs 30% less than standard EVA while returning 76% of kinetic energy into forward propulsion.",
      specs: ["42% higher vibration damping", "Non-packing temperature-stable foam", "Dynamic stack height geometry"],
    },
    {
      title: "3. Internal Carbon / TPU Propulsion Plate",
      tag: "Propulsion Core",
      highlight: "Torsional Rigidity & Snappy Toe-Off",
      description:
        "Tucked securely between dual foam densities, the curved plate guides the foot along its natural sagittal plane, minimizing calf fatigue and maximizing kinetic efficiency.",
      specs: ["Curved spoon contour", "Balanced torsional flex", "Race-certified energy return"],
    },
    {
      title: "4. Reinforced Heel Counter & Achilles Notch",
      tag: "Rearfoot Lock",
      highlight: "Calcaneal Stability & Zero Slip",
      description:
        "An ergonomically molded internal cup cradles the heel bone (calcaneus), while an articulated Achilles relief flare protects the sensitive tendon during deep ankle flexion.",
      specs: ["Zero-heel-lift memory collar", "Plush microfiber lining", "Reflective safety clip"],
    },
    {
      title: "5. High-Abrasion Zonal Rubber Outsole",
      tag: "Ground Contact",
      highlight: "All-Surface Traction & Wear Resistance",
      description:
        "High-density carbon rubber is placed exclusively in high-wear strike zones (heel lateral edge and forefoot toe-off) to keep the shoe lightweight without compromising durability.",
      specs: ["Tested for 800+ kilometers", "Multi-directional flex sipes", "Hydro-channeling wet grip"],
    },
    {
      title: "6. Ortholite Contoured Sockliner",
      tag: "Footbed",
      highlight: "Antimicrobial Memory Cushion",
      description:
        "5mm removable open-cell PU insole creates a custom foot impression within your first 3 runs, managing moisture and odor while providing subtle arch support.",
      specs: ["Open-cell moisture dissipation", "Washable & anti-fungal", "Customizable for orthotics"],
    },
  ];

  const faqs = [
    {
      q: "How should running shoes fit compared to everyday sneakers?",
      a: "Running shoes should always fit about a half-size larger than your casual dress or lifestyle sneakers. When running, your feet naturally expand, swell, and slide forward slightly with every impact. You should always have half a thumb's width (approx. 10 to 12 mm) between your longest toe and the tip of the shoe.",
    },
    {
      q: "Can I use running shoes for daily walking or gym workouts?",
      a: "Yes, running shoes are exceptional for daily walking and standing because they absorb repetitive heel impacts. However, for lateral-heavy gym training (like crossfit, side lunges, or heavy squats), a dedicated cross-training shoe with flatter soles and firmer side walls is recommended to avoid ankle rolling.",
    },
    {
      q: "What is heel-to-toe drop, and how does it affect my body?",
      a: "Heel-to-toe drop (measured in millimeters) is the height difference between the heel cushion and the forefoot cushion. A high drop (8–12 mm) directs impact force higher up toward your knees and hips, which is great for heel strikers. A low or zero drop (0–5 mm) shifts the workload down toward your calves and Achilles tendon, promoting a midfoot or forefoot strike.",
    },
    {
      q: "How often should I replace my running shoes?",
      a: "Most quality running shoes should be replaced every 500 to 800 kilometers (approx. 300 to 500 miles). Even if the rubber outsole still looks intact, the internal nitrogen or EVA foam loses elasticity, shock absorption, and resilience over time. If you notice persistent joint fatigue or compressed foam wrinkles, it's time for a fresh pair.",
    },
    {
      q: "How do I know if I need a wide width (2E or 4E)?",
      a: "If you feel your pinky toe rubbing against the outer fabric, your foot spills over the edges of the insole, or your laces feel overly stretched apart across the instep, you likely need a Wide (2E) fit. We offer standard D width and wide 2E options on all flagship models.",
    },
    {
      q: "Can I wash my shoes in the washing machine?",
      a: "We strongly advise against machine washing or machine drying. High heat and spinning break down the glue bonds and degrade supercritical midsole foams. Instead, remove the laces and insole, hand wash with a soft brush and mild soap, and air dry stuffed with paper towels away from direct sunlight.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#fcfcfd] text-gray-900 selection:bg-neutral-900 selection:text-white">
      {/* Global Navigation Header */}
      <Navbar />

      {/* 3. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0f1015] via-[#14151b] to-[#1c1e27] text-white pt-12 pb-20 sm:pt-16 sm:pb-28">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-gray-400">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-gray-600" />
            <span className="text-gray-200">Footwear Buying Guide</span>
          </div>

          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>Apex Footwear Lab • 2026 Edition</span>
            </div>

            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.08]">
              The Ultimate Guide to Choosing the Right Running Shoes
            </h1>

            <p className="mt-6 text-lg sm:text-xl leading-relaxed text-gray-300 font-normal">
              From pronation mechanics and foam stack heights to toe-box spacing and heel drop:
              everything you need to make confident, blister-free footwear decisions engineered for your stride.
            </p>

            {/* Quick jump navigation pills */}
            <div className="mt-8 flex flex-wrap items-center gap-2.5 text-xs font-semibold text-gray-300">
              <span className="text-gray-400 uppercase tracking-wider text-[11px] mr-1">Quick Jump:</span>
              <a
                href="#shoe-finder"
                className="rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 hover:bg-white hover:text-black transition"
              >
                Shoe Matcher Tool
              </a>
              <a
                href="#anatomy"
                className="rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 hover:bg-white hover:text-black transition"
              >
                Shoe Anatomy
              </a>
              <a
                href="#pronation"
                className="rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 hover:bg-white hover:text-black transition"
              >
                Gait & Pronation
              </a>
              <a
                href="#cushioning"
                className="rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 hover:bg-white hover:text-black transition"
              >
                Cushioning & Drop
              </a>
              <a
                href="#fit-checklist"
                className="rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 hover:bg-white hover:text-black transition"
              >
                Precision Fit Test
              </a>
              <a
                href="#faq"
                className="rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 hover:bg-white hover:text-black transition"
              >
                FAQs
              </a>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 border-t border-white/10 pt-8">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-xs">
              <div className="text-2xl font-black text-white">4 Tiers</div>
              <p className="text-xs text-gray-400 mt-1">Cushioning Spectrum (Minimal to Plush)</p>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-xs">
              <div className="text-2xl font-black text-white">3 Gaits</div>
              <p className="text-xs text-gray-400 mt-1">Neutral, Overpronation & High Arch</p>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-xs">
              <div className="text-2xl font-black text-white">12 mm</div>
              <p className="text-xs text-gray-400 mt-1">The Golden Toe-Box Spacing Rule</p>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-xs">
              <div className="text-2xl font-black text-white">800 KM</div>
              <p className="text-xs text-gray-400 mt-1">Peak Midsole Resilience Lifespan</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Shoe Finder / Matcher */}
      <section id="shoe-finder" className="relative -mt-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-10 lg:p-12 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-gray-150">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-xs font-bold uppercase tracking-wider mb-2">
                <Sliders className="h-3.5 w-3.5" />
                Interactive Diagnostic Tool
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-950">
                Find Your Optimal Shoe in 3 Clicks
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Customize your terrain, feel preference, and gait for instant biomechanical matching.
              </p>
            </div>

            <button
              onClick={() => {
                setActivity("road");
                setCushion("max");
                setArch("neutral");
              }}
              className="self-start sm:self-center text-xs font-bold text-gray-500 hover:text-black underline underline-offset-4"
            >
              Reset to Defaults
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
            {/* Left 7 Columns: Questions */}
            <div className="lg:col-span-7 space-y-8">
              {/* Question 1: Activity */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-3">
                  Step 1 • Primary Surface & Purpose
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: "road", label: "Road & Pavement", icon: Footprints, desc: "Daily runs, 5K-marathon" },
                    { id: "trail", label: "Trail & Nature", icon: Mountain, desc: "Gravel, dirt, mud" },
                    { id: "walking", label: "Daily Walking", icon: Compass, desc: "Work, all-day standing" },
                    { id: "speed", label: "Speed & Intervals", icon: Zap, desc: "Fast pacing, track drills" },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isSelected = activity === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActivity(item.id as any)}
                        className={`group relative flex flex-col items-start p-4 rounded-2xl border text-left transition duration-200 ${
                          isSelected
                            ? "border-black bg-black text-white shadow-md"
                            : "border-gray-200 bg-[#f8f9fa] text-gray-900 hover:border-gray-300 hover:bg-white"
                        }`}
                      >
                        <div
                          className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl transition ${
                            isSelected ? "bg-white/20 text-white" : "bg-white border border-gray-200 text-gray-700"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-black">{item.label}</span>
                        <span className={`text-[11px] mt-1 line-clamp-1 ${isSelected ? "text-gray-300" : "text-gray-500"}`}>
                          {item.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 2: Cushioning */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-3">
                  Step 2 • Cushioning Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: "max",
                      label: "Max Plush Cloud",
                      sub: "Maximum soft pillow feel, high stack shock absorption for tender joints",
                    },
                    {
                      id: "balanced",
                      label: "Balanced Trainer",
                      sub: "Versatile blend of ground connection, arch support, and comfortable bounce",
                    },
                    {
                      id: "firm",
                      label: "Firm & Responsive",
                      sub: "Springy, fast rebound with low energy loss for explosive tempo transitions",
                    },
                  ].map((item) => {
                    const isSelected = cushion === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setCushion(item.id as any)}
                        className={`p-4 rounded-2xl border text-left transition duration-200 ${
                          isSelected
                            ? "border-black bg-black text-white shadow-md"
                            : "border-gray-200 bg-[#f8f9fa] text-gray-900 hover:border-gray-300 hover:bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-black">{item.label}</span>
                          {isSelected && <Check className="h-4 w-4 text-emerald-400" />}
                        </div>
                        <p className={`text-[11px] leading-relaxed ${isSelected ? "text-gray-300" : "text-gray-500"}`}>
                          {item.sub}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 3: Arch & Gait */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-3">
                  Step 3 • Foot Arch & Pronation Profile
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: "neutral",
                      label: "Neutral / Normal Arch",
                      sub: "Normal ~15% inward roll. Weight disperses evenly across the forefoot.",
                    },
                    {
                      id: "flat",
                      label: "Low Arch / Flat Foot",
                      sub: "Pronounces inward roll (overpronation). Benefits from medial arch guidance.",
                    },
                    {
                      id: "high",
                      label: "High Rigid Arch",
                      sub: "Foot tends to roll outward (supination). Needs extra shock absorption.",
                    },
                  ].map((item) => {
                    const isSelected = arch === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setArch(item.id as any)}
                        className={`p-4 rounded-2xl border text-left transition duration-200 ${
                          isSelected
                            ? "border-black bg-black text-white shadow-md"
                            : "border-gray-200 bg-[#f8f9fa] text-gray-900 hover:border-gray-300 hover:bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-black">{item.label}</span>
                          {isSelected && <Check className="h-4 w-4 text-emerald-400" />}
                        </div>
                        <p className={`text-[11px] leading-relaxed ${isSelected ? "text-gray-300" : "text-gray-500"}`}>
                          {item.sub}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Result Recommendation Card */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-b from-gray-50 via-white to-gray-50 p-6 sm:p-8 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 text-xs font-bold">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {currentMatch.matchScore}% Biomechanical Match
                  </span>
                  <span className="text-xs font-bold text-gray-500">{currentMatch.category}</span>
                </div>

                <div className="mt-5">
                  <h3 className="text-2xl font-black text-gray-950">{currentMatch.name}</h3>
                  <p className="text-sm font-semibold text-gray-600 mt-0.5">{currentMatch.tagline}</p>
                </div>

                {/* Shoe Preview Thumbnail */}
                <div className="mt-6 relative h-48 w-full overflow-hidden rounded-2xl bg-neutral-900 border border-gray-150">
                  <Image
                    src={currentMatch.image}
                    alt={currentMatch.name}
                    fill
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                  <div className="absolute bottom-3 left-3 rounded-xl bg-black/70 backdrop-blur-md px-3 py-1.5 text-white">
                    <span className="text-xs font-bold">{currentMatch.price}</span>
                  </div>
                </div>

                {/* Specs Matrix */}
                <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl border border-gray-200 bg-white p-3">
                    <span className="text-gray-500 font-medium block">Heel Drop</span>
                    <span className="font-bold text-gray-900 text-sm">{currentMatch.drop}</span>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white p-3">
                    <span className="text-gray-500 font-medium block">Shoe Weight</span>
                    <span className="font-bold text-gray-900 text-sm">{currentMatch.weight}</span>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white p-3">
                    <span className="text-gray-500 font-medium block">Cushion Tier</span>
                    <span className="font-bold text-gray-900 text-sm">{currentMatch.cushionLevel}</span>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white p-3">
                    <span className="text-gray-500 font-medium block">Arch Support</span>
                    <span className="font-bold text-gray-900 text-sm">{currentMatch.archSupport}</span>
                  </div>
                </div>

                <p className="mt-5 text-xs leading-relaxed text-gray-600">
                  {currentMatch.description}
                </p>

                <div className="mt-6 pt-5 border-t border-gray-200 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] text-gray-400 font-medium block">Best suited for</span>
                    <span className="text-xs font-bold text-gray-900">{currentMatch.bestFor}</span>
                  </div>
                  <Link
                    href="/shoes"
                    className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-xs font-bold text-white transition hover:bg-neutral-800 shrink-0 shadow-md active:scale-95"
                  >
                    <span>View Models</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Anatomy of a Running Shoe (Visual Blueprint Section) */}
      <section id="anatomy" className="py-20 sm:py-28 bg-[#f8f9fa] border-t border-gray-200/80 mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600 mb-2 block">
              ENGINEERING & MATERIALS
            </span>
            <h2 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
              Anatomy of a High-Performance Running Shoe
            </h2>
            <p className="mt-4 text-base text-gray-600 leading-relaxed">
              Every millimeter of a modern running shoe is calibrated to manage ground reaction forces,
              stabilize joint angles, and return kinetic propulsion.
            </p>
          </div>

          {/* Blueprint Image & Interactive Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Exploded 3D Visual Diagram */}
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-[#0c0d12] shadow-2xl p-2 group">
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
                  <Image
                    src="/images/shoe-anatomy.jpg"
                    alt="Exploded view diagram of athletic shoe anatomy showing upper mesh, foam midsole, carbon plate, and outsole"
                    fill
                    className="object-cover transition duration-700 group-hover:scale-102"
                  />
                </div>
                <div className="p-4 flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Apex Multi-Layer Biomechanical Architecture
                  </span>
                  <span>Nitrogen Supercritical Foam Core</span>
                </div>
              </div>
            </div>

            {/* Interactive Component Detail Accordion */}
            <div className="lg:col-span-5 space-y-3">
              {anatomyParts.map((part, index) => {
                const isActive = activeAnatomyPart === index;
                return (
                  <div
                    key={index}
                    onClick={() => setActiveAnatomyPart(index)}
                    className={`cursor-pointer rounded-2xl border p-4 transition duration-200 ${
                      isActive
                        ? "border-black bg-white shadow-md"
                        : "border-gray-200 bg-white/70 hover:border-gray-300 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                            isActive ? "bg-black text-white" : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {index + 1}
                        </span>
                        <h4 className="text-sm font-bold text-gray-950">{part.title}</h4>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        {part.tag}
                      </span>
                    </div>

                    {isActive && (
                      <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-600 leading-relaxed">
                        <p className="font-semibold text-gray-900 mb-1.5">{part.highlight}</p>
                        <p>{part.description}</p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {part.specs.map((spec, sIdx) => (
                            <span
                              key={sIdx}
                              className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-700"
                            >
                              ✓ {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Gait & Pronation Guide */}
      <section id="pronation" className="py-20 sm:py-28 bg-white border-t border-gray-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-2 block">
              BIOMECHANICS 101
            </span>
            <h2 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
              Understanding Pronation & Arch Mechanics
            </h2>
            <p className="mt-4 text-base text-gray-600 leading-relaxed">
              Pronation is simply the natural inward rolling motion of your foot during weight transfer.
              Identifying whether your foot rolls normally, too far inward, or stays rigid outward dictates
              the shoe architecture your body requires.
            </p>
          </div>

          {/* 3 Gait Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Neutral Pronation */}
            <div className="rounded-3xl border border-gray-200 bg-[#fbfbfd] p-7 transition duration-300 hover:shadow-lg hover:border-black flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                    50-60% of Runners
                  </span>
                  <Activity className="h-5 w-5 text-emerald-600" />
                </div>
                <h3 className="text-xl font-black text-gray-950 mb-2">Neutral Pronation</h3>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Normal Arch Height</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  The heel strikes the ground, rolling inward approximately 15% to absorb impact evenly.
                  Push-off occurs uniformly from the ball of the foot and first two toes.
                </p>

                <div className="mt-6 rounded-2xl bg-white p-4 border border-gray-200 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Sole Wear Pattern:</span>
                    <span className="font-bold text-gray-900">S-shaped wear, heel to big toe</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Recommended Category:</span>
                    <span className="font-bold text-emerald-700">Neutral Cushion</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  Ideal Match
                </span>
                <p className="text-sm font-black text-gray-950">Apex Air Velocity 1</p>
              </div>
            </div>

            {/* Overpronation */}
            <div className="rounded-3xl border border-gray-200 bg-[#fbfbfd] p-7 transition duration-300 hover:shadow-lg hover:border-black flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                    25-30% of Runners
                  </span>
                  <Layers className="h-5 w-5 text-amber-600" />
                </div>
                <h3 className="text-xl font-black text-gray-950 mb-2">Overpronation</h3>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Low Arch / Flat Foot</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  The ankle rolls excessively inward beyond 15%, causing the arch to collapse. The inner edge
                  of the foot bears excessive load, which can transfer stress to shins and knee tendons.
                </p>

                <div className="mt-6 rounded-2xl bg-white p-4 border border-gray-200 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Sole Wear Pattern:</span>
                    <span className="font-bold text-gray-900">Heavy wear inside heel & big toe</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Recommended Category:</span>
                    <span className="font-bold text-amber-700">Stability & GuideRails</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  Ideal Match
                </span>
                <p className="text-sm font-black text-gray-950">Apex Strider Guard Pro</p>
              </div>
            </div>

            {/* Supination / Underpronation */}
            <div className="rounded-3xl border border-gray-200 bg-[#fbfbfd] p-7 transition duration-300 hover:shadow-lg hover:border-black flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800">
                    10-15% of Runners
                  </span>
                  <Award className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-black text-gray-950 mb-2">Underpronation (Supination)</h3>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">High Rigid Arch</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  The foot rolls inward less than 15%. Impact shock stays along the outer lateral perimeter,
                  failing to disperse forces efficiently. Needs extra pillowy cushion to compensate.
                </p>

                <div className="mt-6 rounded-2xl bg-white p-4 border border-gray-200 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Sole Wear Pattern:</span>
                    <span className="font-bold text-gray-900">Excess wear on outside edge</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Recommended Category:</span>
                    <span className="font-bold text-blue-700">Max Plush Neutral</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  Ideal Match
                </span>
                <p className="text-sm font-black text-gray-950">Apex Air Velocity Cloud</p>
              </div>
            </div>
          </div>

          {/* The Wet Footprint Test DIY Box */}
          <div className="mt-14 rounded-3xl border border-gray-200 bg-gradient-to-r from-gray-900 via-neutral-900 to-gray-900 text-white p-8 sm:p-10 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300 mb-3">
                  DIY 30-Second At-Home Test
                </span>
                <h3 className="text-2xl sm:text-3xl font-black">The Wet Footprint Test</h3>
                <p className="mt-3 text-sm text-gray-300 leading-relaxed">
                  Don't have access to a gait lab? Grab a bowl of shallow water and a piece of brown cardboard
                  to check your arch pattern in seconds.
                </p>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <div className="text-amber-400 font-black text-sm mb-1">Step 1</div>
                  <p className="text-xs text-gray-200 leading-relaxed">
                    Dip the sole of your bare foot in shallow water, shaking off large excess droplets.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <div className="text-amber-400 font-black text-sm mb-1">Step 2</div>
                  <p className="text-xs text-gray-200 leading-relaxed">
                    Step firmly down onto blank brown paper with normal body weight, then step off.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <div className="text-amber-400 font-black text-sm mb-1">Step 3</div>
                  <p className="text-xs text-gray-200 leading-relaxed">
                    A distinct curve = Neutral. Complete solid footprint = Flat arch. Thin outer sliver = High arch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Cushioning Spectrum & Heel Drop Comparison */}
      <section id="cushioning" className="py-20 sm:py-28 bg-[#f8f9fa] border-t border-gray-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2 block">
              STACK HEIGHT & DROP
            </span>
            <h2 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
              Cushioning Spectrum & Heel Drop Matrix
            </h2>
            <p className="mt-4 text-base text-gray-600 leading-relaxed">
              Heel drop (the differential between heel and toe height) and stack height directly dictate
              how muscular stress is distributed between your calves, Achilles, and knees.
            </p>
          </div>

          {/* Cushioning Spectrum Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1">
                Stack: 0 - 16 mm
              </span>
              <h4 className="text-lg font-black text-gray-950">Minimalist / Barefoot</h4>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                Max ground sensitivity. Strengthens intrinsic foot musculature. Requires slow adaptation to prevent calf strain.
              </p>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold">
                <span className="text-gray-500">Feel:</span>
                <span className="text-gray-900">Ultra Firm & Raw</span>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1">
                Stack: 18 - 25 mm
              </span>
              <h4 className="text-lg font-black text-gray-950">Low Profile Tempo</h4>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                Snappy, responsive, lightweight. Excellent for speed drills, 5K races, and athletes who hate mushy foam.
              </p>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold">
                <span className="text-gray-500">Feel:</span>
                <span className="text-gray-900">Firm, Fast Rebound</span>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs border-black ring-2 ring-black/5">
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 block mb-1">
                Stack: 26 - 32 mm • Most Popular
              </span>
              <h4 className="text-lg font-black text-gray-950">Balanced Daily Trainer</h4>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                The golden standard for 80% of runners. Enough cushioning for 20km long runs with sufficient stability for daily wear.
              </p>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold">
                <span className="text-gray-500">Feel:</span>
                <span className="text-gray-900">Balanced Bounce</span>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1">
                Stack: 33 - 42 mm
              </span>
              <h4 className="text-lg font-black text-gray-950">Maximalist Ultra Plush</h4>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                Deep supercritical foam cushion. Dramatically reduces impact shock on knees, hips, and lower back during high mileage.
              </p>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold">
                <span className="text-gray-500">Feel:</span>
                <span className="text-gray-900">Pillow Soft Cloud</span>
              </div>
            </div>
          </div>

          {/* Heel Drop Explanation Table */}
          <div className="mt-12 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xs">
            <div className="p-6 sm:p-8 bg-gray-50 border-b border-gray-200">
              <h3 className="text-xl font-black text-gray-950">Heel-to-Toe Drop (Drop mm) Decoded</h3>
              <p className="text-xs text-gray-500 mt-1">
                The elevation angle between heel and forefoot changes where impact stress travels in your kinetic chain.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-[#f8f9fa] text-gray-500 uppercase tracking-wider text-[11px] font-bold">
                    <th className="py-3.5 px-6">Drop Range</th>
                    <th className="py-3.5 px-6">Strike Type</th>
                    <th className="py-3.5 px-6">Biomechanical Load</th>
                    <th className="py-3.5 px-6">Who It's Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  <tr className="hover:bg-gray-50/50">
                    <td className="py-4 px-6 font-bold text-gray-950">0 mm (Zero Drop)</td>
                    <td className="py-4 px-6">Forefoot / Midfoot</td>
                    <td className="py-4 px-6">High calf & Achilles engagement; relieves knees</td>
                    <td className="py-4 px-6">Natural stride purists, strong calves</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="py-4 px-6 font-bold text-gray-950">4 – 6 mm (Low Drop)</td>
                    <td className="py-4 px-6">Midfoot Strike</td>
                    <td className="py-4 px-6">Balanced distribution between lower leg & knee</td>
                    <td className="py-4 px-6">Trail runners, tempo pacers, agile runners</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 bg-blue-50/20">
                    <td className="py-4 px-6 font-bold text-gray-950">8 – 10 mm (Standard Drop)</td>
                    <td className="py-4 px-6">Heel to Midfoot</td>
                    <td className="py-4 px-6">Reduces Achilles & calf strain, gentle on joints</td>
                    <td className="py-4 px-6">Most daily runners, beginners, walkers</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="py-4 px-6 font-bold text-gray-950">12 mm (Traditional High)</td>
                    <td className="py-4 px-6">Pronounced Heel Strike</td>
                    <td className="py-4 px-6">Directs shock toward knee/hip; protects tight calves</td>
                    <td className="py-4 px-6">Runners recovering from Achilles tendinitis</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Precision Sizing & Fit Test Checklist (Expanding "Check the Fit") */}
      <section id="fit-checklist" className="py-20 sm:py-28 bg-white border-t border-gray-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-2 block">
              THE 4-POINT PROTOCOL
            </span>
            <h2 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
              How to Check the Fit: The 4-Point Checklist
            </h2>
            <p className="mt-4 text-base text-gray-600 leading-relaxed">
              A shoe that looks great will quickly ruin your training if the fit is compromised.
              Never guess your size—use our 4-point verification when trying on new footwear.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1: Rule of Thumb */}
            <div className="rounded-3xl border border-gray-200 bg-[#fbfbfd] p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white font-black mb-5">
                  <Ruler className="h-6 w-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Point 01</span>
                <h3 className="text-xl font-bold text-gray-950 mt-1 mb-3">The Rule of Thumb</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Stand up straight. Press your thumb down horizontally between your longest toe and the front of the shoe.
                  You must have roughly <strong className="text-gray-900">10 to 12 mm</strong> (about half a thumb width) of space.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 text-[11px] text-gray-500 font-medium">
                ⚠️ Avoid black toenails on downhill runs
              </div>
            </div>

            {/* Step 2: Heel Lockdown */}
            <div className="rounded-3xl border border-gray-200 bg-[#fbfbfd] p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white font-black mb-5">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Point 02</span>
                <h3 className="text-xl font-bold text-gray-950 mt-1 mb-3">Heel Lockdown Check</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Tie your laces snugly and perform 3 heel raises. Your heel should remain glued to the internal counter cup
                  with <strong className="text-gray-900">zero vertical slipping</strong>. Slippage creates blister friction.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 text-[11px] text-gray-500 font-medium">
                💡 Use the runner's lace lock loop if needed
              </div>
            </div>

            {/* Step 3: Toe Box Splay */}
            <div className="rounded-3xl border border-gray-200 bg-[#fbfbfd] p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white font-black mb-5">
                  <Footprints className="h-6 w-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Point 03</span>
                <h3 className="text-xl font-bold text-gray-950 mt-1 mb-3">Toe Box Splay Test</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Wiggle your toes. Your foot should spread out naturally without feeling pinched against the upper walls.
                  If the outer edge of your pinky toe bulges over the midsole rim, you need a <strong className="text-gray-900">Wide (2E)</strong> size.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 text-[11px] text-gray-500 font-medium">
                🦶 Prevents bunions and nerve pinching
              </div>
            </div>

            {/* Step 4: Afternoon Measurement */}
            <div className="rounded-3xl border border-gray-200 bg-[#fbfbfd] p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white font-black mb-5">
                  <RotateCcw className="h-6 w-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Point 04</span>
                <h3 className="text-xl font-bold text-gray-950 mt-1 mb-3">Afternoon Try-On</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Always try on shoes in the <strong className="text-gray-900">late afternoon or evening</strong>.
                  Daily standing and running cause feet to naturally swell by up to half a full size compared to early morning.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 text-[11px] text-gray-500 font-medium">
                🧦 Wear the exact running socks you plan to use
              </div>
            </div>
          </div>

          {/* Width Size Guide Callout */}
          <div className="mt-12 rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
                <Info className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-950 text-base">Standard vs. Wide Widths (D vs. 2E vs. 4E)</h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed max-w-2xl">
                  Standard men's width is D (women's is B). If your feet feel constricted along the ball or instep,
                  do not size up in length—switch to a Wide (2E) or Extra Wide (4E) profile to ensure your arch sits
                  over the correct biomechanical contour.
                </p>
              </div>
            </div>
            <Link
              href="/shoes"
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-xs font-bold text-gray-900 hover:border-black transition shrink-0"
            >
              Browse Width Options
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Shoe Lifespan & Replacement Guide */}
      <section className="py-20 sm:py-28 bg-[#0b0c10] text-white border-t border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 border border-white/10">
                LIFESPAN & SAFETY
              </span>
              <h2 className="text-3xl font-black sm:text-4xl">
                When Is It Time to Retire Your Shoes?
              </h2>
              <p className="mt-4 text-sm text-gray-300 leading-relaxed">
                Even when the outer rubber looks passable, internal foam loses rebound resilience.
                Running in dead foam drastically increases impact forces transmitted into knees and hips.
              </p>

              <div className="mt-8 rounded-2xl bg-white/5 border border-white/10 p-5">
                <div className="text-3xl font-black text-amber-400">500 – 800 KM</div>
                <p className="text-xs text-gray-300 mt-1">
                  The recommended mileage retirement threshold (approx. 300 – 500 miles).
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xs">
                <span className="text-xs font-black text-amber-400 mb-1 block">Warning Sign 01</span>
                <h4 className="text-base font-bold text-white mb-2">Midsole Wrinkling & Creasing</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Deep horizontal compression lines running along the foam indicate cell wall collapse.
                  The foam will no longer bounce back after being loaded.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xs">
                <span className="text-xs font-black text-amber-400 mb-1 block">Warning Sign 02</span>
                <h4 className="text-base font-bold text-white mb-2">Uneven Outsole Tread Loss</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Worn-flat lugs on one corner tilt the shoe angle during footstrike, forcing unnatural
                  pronation angles that pull on tendons.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xs">
                <span className="text-xs font-black text-amber-400 mb-1 block">Warning Sign 03</span>
                <h4 className="text-base font-bold text-white mb-2">Unexplained Joint Fatigue</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  If your shins, arches, or knees start aching after routine runs that used to feel effortless,
                  your shoe's vibration damping has dissipated.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xs">
                <span className="text-xs font-black text-amber-400 mb-1 block">Warning Sign 04</span>
                <h4 className="text-base font-bold text-white mb-2">Upper Heel Counter Distortion</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Place the shoe on a flat table at eye level. If the shoe leans inward or outward on its heel,
                  the heel counter has collapsed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Frequently Asked Questions (FAQ Accordion) */}
      <section id="faq" className="py-20 sm:py-28 bg-[#f8f9fa] border-t border-gray-200/80">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2 block">
              EXPERT ANSWERS
            </span>
            <h2 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-sm text-gray-600">
              Clear answers to the most common footwear selection and fit questions.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = expandedFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-gray-200/90 bg-white overflow-hidden shadow-xs transition"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between p-6 text-left"
                  >
                    <span className="text-base sm:text-lg font-bold text-gray-950 pr-4">
                      {faq.q}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition duration-200 ${
                        isOpen ? "rotate-180 bg-black text-white" : ""
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 text-sm text-gray-600 leading-relaxed border-t border-gray-100 mt-2 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. High-Impact Call to Action Banner */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-950 via-neutral-900 to-black p-8 sm:p-14 text-white shadow-2xl">
            <div className="relative z-10 max-w-2xl">
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300 mb-4 border border-white/10">
                READY FOR YOUR NEXT PR?
              </span>
              <h2 className="text-3xl sm:text-4xl font-black">
                Step Into Precision Comfort with Apex Layer
              </h2>
              <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed">
                Take what you learned and explore our collection of road, trail, and daily walking footwear.
                Every pair ships with free 30-day wear-and-return flexibility.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/shoes"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-black hover:bg-gray-100 transition shadow-lg active:scale-95"
                >
                  <span>Explore Shoe Collection</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-semibold text-white hover:bg-white/10 transition"
                >
                  Return to Home
                </Link>
              </div>
            </div>

            {/* Subtle brand watermark */}
            <div className="absolute right-4 -bottom-10 select-none text-9xl font-black text-white/5 pointer-events-none hidden lg:block uppercase">
              APEX
            </div>
          </div>
        </div>
      </section>

      {/* Global E-Commerce Footer */}
      <Footer />
    </main>
  );
}
