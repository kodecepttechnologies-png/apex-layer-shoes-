
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://apex-layer-shoes.vercel.app/",
      lastModified: new Date(),
    },
    {
      url: "https://apex-layer-shoes.vercel.app/buying-guide",
      lastModified: new Date(),
    },
  ];
}
