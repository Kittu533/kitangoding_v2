"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock3 } from "lucide-react";
import { getAuthorInitials, getBlogAuthorName } from "@/features/blog/authors";
import type { PublicBlogCard, PublicBlogCategory } from "@/features/blog/types";
import styles from "./Blog.module.css";

const allCategory = "Semua Artikel";

function getCategoryFromUrl(categories: PublicBlogCategory[]) {
  const category = new URLSearchParams(window.location.search).get("category") || allCategory;
  return categories.some(item => item.label === category) ? category : allCategory;
}

export function BlogListing({ posts, categories }: { posts: PublicBlogCard[]; categories: PublicBlogCategory[] }) {
  const [selectedCategory, setSelectedCategory] = useState(allCategory);
  const visiblePosts = useMemo(() => selectedCategory === allCategory ? posts : posts.filter(post => post.category === selectedCategory), [posts, selectedCategory]);

  useEffect(() => {
    const syncCategory = () => setSelectedCategory(getCategoryFromUrl(categories));
    syncCategory();
    window.addEventListener("popstate", syncCategory);
    return () => window.removeEventListener("popstate", syncCategory);
  }, [categories]);

  return <section className={styles.listing} aria-label="Daftar artikel">
    {categories.length > 1 && <nav className={styles.filters} aria-label="Kategori artikel">{categories.map(filter => {
      const active = filter.label === selectedCategory;
      const href = filter.label === allCategory ? "/blog" : `/blog?category=${encodeURIComponent(filter.label)}`;
      return <a href={href} key={filter.label} aria-current={active ? "page" : undefined} onClick={event => { event.preventDefault(); window.history.pushState(null, "", href); setSelectedCategory(filter.label); }}>{filter.label}</a>;
    })}</nav>}
    {visiblePosts.length > 0 ? <div className={styles.grid}>{visiblePosts.map(post => {
      const author = getBlogAuthorName(post.author);
      return <article className={styles.card} key={post.slug}>
        <header className={styles.byline}>
          <span className={styles.avatar} aria-hidden="true">{getAuthorInitials(author)}</span>
          <div className={styles.author}><strong>{author}</strong><span>Penulis</span></div>
          {post.date && <span className={styles.date}><Clock3 size={14} aria-hidden="true" /><time dateTime={post.publishedAt}>{post.date}</time></span>}
        </header>
        <Link className={styles.cardLink} href={`/blog/${post.slug}`} aria-labelledby={`article-${post.slug}`} data-analytics-event="blog_cta_click" data-analytics-label={post.title}>
          <div className={styles.cover}><Image src={post.image} alt={post.title} fill sizes="(max-width: 700px) 90vw, (max-width: 1100px) 45vw, 30vw" /></div>
          <h2 id={`article-${post.slug}`}>{post.title}</h2>
        </Link>
      </article>;
    })}</div> : <div className={styles.empty}><p>Belum ada artikel pada kategori ini.</p><Link href="/blog">Lihat semua artikel</Link></div>}
  </section>;
}
