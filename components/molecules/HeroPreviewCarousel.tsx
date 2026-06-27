"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

const previewImages = [
  {
    src: "/images/img-1.png",
    alt: "Preview website marketplace utama",
    position: "object-[center_8%]",
  },
  {
    src: "/images/img-2.png",
    alt: "Preview website marketplace alternatif",
    position: "object-[center_14%]",
  },
  {
    src: "/images/img-3.png",
    alt: "Preview website marketplace ketiga",
    position: "object-[center_10%]",
  },
] as const;

const ROTATE_INTERVAL_MS = 2800;

export function HeroPreviewCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % previewImages.length);
    }, ROTATE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

  const activeImage = previewImages[activeIndex];

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeImage.src}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0"
          exit={{ opacity: 0, scale: 1.03 }}
          initial={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            priority={activeIndex === 0}
            alt={activeImage.alt}
            className={`object-cover ${activeImage.position}`}
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            src={activeImage.src}
          />
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center gap-2 px-4 pb-4">
        {previewImages.map((image, index) => (
          <span
            key={image.src}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === activeIndex ? "w-8 bg-white/95" : "w-2.5 bg-white/45"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
