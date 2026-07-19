import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { BlogForm } from "@/components/admin/blog-form";
import { db } from "@/lib/db";
import { blogCategories } from "@/lib/db/schema";
import { asc } from "drizzle-orm";

export default async function NewBlogPage() {
  const categories = await db.select({ name: blogCategories.name }).from(blogCategories).orderBy(asc(blogCategories.name));

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <Link className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground" href="/admin/blog">
        <ArrowLeftIcon className="size-4" />
        Kembali ke artikel
      </Link>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tulis Artikel Baru</h1>
        <p className="mt-2 text-muted-foreground">Susun artikel yang jelas, terstruktur, dan siap dipublikasikan.</p>
      </div>
      <BlogForm categories={categories.map((category) => category.name)} />
    </div>
  );
}
