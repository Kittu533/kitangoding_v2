import { StudioProjectCta, StudioHeader, StudioFooter } from "@/components/marketing/sections/StudioChrome";
import type { PublicBlogCard, PublicBlogCategory } from "@/features/blog/types";
import { BlogListing } from "./BlogListing";
import studio from "../Studio.module.css";
import styles from "./Blog.module.css";

export function BlogPage({ posts, categories }: { posts: PublicBlogCard[]; categories: PublicBlogCategory[] }) {
  return <div className={studio.root}>
    <StudioHeader />
    <main id="konten">
      <header className={styles.hero}>
        <span className={studio.eyebrow}><i aria-hidden="true" />News & articles</span>
        <h1>INSIGHT & <em>ARTIKEL.</em></h1>
        <p>Catatan tentang desain, website, dan pertumbuhan bisnis.<br />Ide praktis dari Rekalur untuk langkah digitalmu berikutnya.</p>
      </header>
      <BlogListing categories={categories} posts={posts} />
      <StudioProjectCta />
    </main>
    <StudioFooter />
  </div>;
}
