"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const previewImages = [
  "/images/portofolio-1.png",
  "/images/portofolio-2.png",
  "/images/portofolio-3.png",
  "/images/portofolio-4.png",
  "/images/portofolio-5.png",
  "/images/portofolio-6.png",
] as const;

export function HeroPreviewCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % previewImages.length);
    }, 2800);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-white">
      <div className="absolute inset-0">
        {previewImages.map((image, index) => (
          <Image
            priority={index === 0}
            alt={index === activeIndex ? "Preview portofolio website Kitangoding" : ""}
            aria-hidden={index !== activeIndex}
            className={`object-cover object-top transition-opacity duration-700 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            fill
            key={image}
            sizes="(max-width: 768px) 100vw, 1200px"
            src={image}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center gap-2 px-4 pb-4">
        {previewImages.map((image, index) => (
          <span
            key={image}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === activeIndex ? "w-8 bg-white/95" : "w-2.5 bg-white/45"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
