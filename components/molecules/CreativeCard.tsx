import { ButtonLink } from "@/components/atoms/Button";
import { whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

export type CreativeCardItem = {
  name: string;
  category: string;
  description: string;
  price: string;
  tone: string;
};

export function CreativeCard({ creative }: { creative: CreativeCardItem }) {
  return (
    <article className="bg-market p-7">
      <div className={cn("creative-thumb flex h-56 items-center justify-center rounded-lg", creative.tone)}>
        <span className="text-[40px] leading-[44px] font-semibold text-white">{creative.name.slice(0, 2)}</span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[20px] leading-[30px] font-medium text-foreground">{creative.name}</h3>
          <p className="mt-1 text-[14px] leading-[17px] font-medium text-muted">{creative.category}</p>
        </div>
        <p className="text-[16px] leading-6 font-medium text-success">{creative.price}</p>
      </div>
      <p className="mt-3 min-h-16 leading-7 text-muted">{creative.description}</p>
      <ButtonLink
        className="mt-5 w-full !text-white shadow-soft"
        href={whatsappHref}
        rel="noreferrer"
        target="_blank"
      >
        View Details
      </ButtonLink>
    </article>
  );
}
