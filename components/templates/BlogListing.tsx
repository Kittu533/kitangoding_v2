"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/atoms/Button";
import { Reveal } from "@/components/atoms/Reveal";
import type { PublicBlogCard, PublicBlogCategory } from "@/lib/public-content";
import { cn } from "@/lib/utils";

type BlogListingProps = {
  posts: PublicBlogCard[];
  categories: PublicBlogCategory[];
};

const allCategory = "Semua Artikel";

function getCategoryFromUrl(categories: PublicBlogCategory[]) {
  const category = new URLSearchParams(window.location.search).get("category") || allCategory;
  return categories.some((item) => item.label === category) ? category : allCategory;
}

export function BlogListing({ posts, categories }: BlogListingProps) {
  const [selectedCategory, setSelectedCategory] = useState(allCategory);
  const visiblePosts = useMemo(
    () => selectedCategory === allCategory ? posts : posts.filter((post) => post.category === selectedCategory),
    [posts, selectedCategory],
  );

  useEffect(() => {
    const syncCategory = () => setSelectedCategory(getCategoryFromUrl(categories));

    syncCategory();
    window.addEventListener("popstate", syncCategory);
    return () => window.removeEventListener("popstate", syncCategory);
  }, [categories]);

  return (
    <>
      <section className="marketplace-grid pb-14">
        <div className="container-shell">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((filter) => {
              const active = filter.label === selectedCategory;
              const href = filter.label === allCategory ? "/blog" : `/blog?category=${encodeURIComponent(filter.label)}`;

              return (
                <a
                  className={cn(
                    "rounded-xl border px-5 py-3 text-sm font-semibold shadow-sm transition-colors",
                    active
                      ? "border-success/30 bg-success-bg text-success"
                      : "border-border bg-white text-body hover:border-success/25 hover:text-foreground",
                  )}
                  href={href}
                  key={filter.label}
                  onClick={(event) => {
                    event.preventDefault();
                    window.history.pushState(null, "", href);
                    setSelectedCategory(filter.label);
                  }}
                >
                  {filter.label}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="marketplace-grid pb-20">
        <div className="container-shell">
          {visiblePosts.length > 0 ? (
            <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 xl:grid-cols-3">
              {visiblePosts.map((post, index) => (
                <Reveal key={post.slug} className="h-full" delay={(index % 3) * 0.04}>
                  <article className="flex h-full flex-col bg-market p-7">
                    <div className="blog-thumb relative h-56 overflow-hidden rounded-lg border border-border/60 bg-white">
                      <Image alt={post.title} className="object-cover object-top" fill sizes="(max-width: 768px) 100vw, 33vw" src={post.image} />
                    </div>
                    <div className="mt-5 flex items-center justify-between gap-3 text-xs text-muted">
                      <span className="font-medium text-body/80">{post.date}</span>
                      <span className="rounded-full border border-success/20 bg-success-bg px-3 py-1 font-bold text-success">
                        {post.category}
                      </span>
                    </div>
                    <h2 className="mt-3 min-h-16 text-xl leading-tight font-extrabold text-foreground">{post.title}</h2>
                    <p className="mt-4 min-h-20 leading-7 text-black">{post.excerpt}</p>
                    <ButtonLink
                      className="mt-auto w-full bg-ink !text-white shadow-soft hover:bg-navy"
                      data-analytics-event="blog_cta_click"
                      data-analytics-label={post.title}
                      href={`/blog/${post.slug}`}
                      icon={<ArrowUpRight aria-hidden="true" className="size-4" />}
                    >
                      Baca Artikel
                    </ButtonLink>
                  </article>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-white px-6 py-16 text-center shadow-card">
              <p className="text-lg font-bold text-foreground">Belum ada artikel pada kategori ini.</p>
              <Link className="mt-3 inline-flex text-sm font-semibold text-success underline underline-offset-4" href="/blog">
                Lihat semua artikel
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
