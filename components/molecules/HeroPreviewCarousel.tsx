import Image from "next/image";

const previewImages = [
  {
    src: "/images/img-1.webp",
    alt: "Preview website marketplace utama",
    position: "object-[center_8%]",
  },
  {
    src: "/images/img-2.webp",
    alt: "Preview website marketplace alternatif",
    position: "object-[center_14%]",
  },
  {
    src: "/images/img-3.webp",
    alt: "Preview website marketplace ketiga",
    position: "object-[center_10%]",
  },
] as const;

export function HeroPreviewCarousel() {
  const activeImage = previewImages[0];

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-white">
      <div className="absolute inset-0">
        <Image
          priority
          alt={activeImage.alt}
          className={`object-cover ${activeImage.position}`}
          fill
          sizes="(max-width: 768px) 100vw, 1200px"
          src={activeImage.src}
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center gap-2 px-4 pb-4">
        {previewImages.map((image, index) => (
          <span
            key={image.src}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === 0 ? "w-8 bg-white/95" : "w-2.5 bg-white/45"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
