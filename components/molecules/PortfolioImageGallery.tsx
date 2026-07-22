"use client";

import Image from "next/image";
import { useState } from "react";

type PortfolioImageGalleryProps = {
  images: string[];
  projectName: string;
};

export function PortfolioImageGallery({ images, projectName }: PortfolioImageGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-border bg-white shadow-card">
        <Image
          alt={`Tampilan proyek ${projectName}`}
          className="object-contain"
          fill
          priority
          sizes="(min-width: 1024px) 55vw, 100vw"
          src={activeImage}
          unoptimized
        />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {images.map((image, index) => {
          const isActive = activeImage === image;

          return (
            <button
              aria-label={`Tampilkan gambar ${index + 1} proyek ${projectName}`}
              aria-pressed={isActive}
              className={`relative aspect-[4/3] overflow-hidden rounded-xl border bg-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange ${
                isActive ? "border-orange ring-2 ring-orange" : "border-border hover:border-orange/50"
              }`}
              key={image}
              onClick={() => setActiveImage(image)}
              type="button"
            >
              <Image
                alt=""
                className="object-cover"
                fill
                sizes="(min-width: 1024px) 18vw, 30vw"
                src={image}
                unoptimized
              />
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="sr-only">Gambar aktif: {images.indexOf(activeImage) + 1}</p>
    </div>
  );
}
