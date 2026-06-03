import Image from "next/image";
import { ButtonLink } from "@/components/atoms/Button";
import { whatsappHref } from "@/lib/site";

export type CreativeCardItem = {
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
};

export function CreativeCard({
  creative,
  imageLoading = "lazy",
}: {
  creative: CreativeCardItem;
  imageLoading?: "eager" | "lazy";
}) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-market p-7 shadow-sm">
      <div className="creative-thumb relative h-56 overflow-hidden rounded-lg border border-border/60 bg-white">
        <Image
          alt={`Preview ${creative.name}`}
          className="object-cover object-top"
          fill
          loading={imageLoading}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          src={creative.image}
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[20px] leading-[30px] font-medium text-foreground">{creative.name}</h3>
          <p className="mt-1 text-[14px] leading-[17px] font-medium text-black">{creative.category}</p>
        </div>
        <p className="text-[16px] leading-6 font-medium text-success">{creative.price}</p>
      </div>
      <p className="mt-3 min-h-16 leading-7 text-black">{creative.description}</p>
      <ButtonLink
        className="mt-auto pt-5 w-full !text-white shadow-soft"
        href={whatsappHref}
        rel="noreferrer"
        target="_blank"
      >
        View Details
      </ButtonLink>
    </article>
  );
}
