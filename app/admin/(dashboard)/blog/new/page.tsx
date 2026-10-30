import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { BlogForm } from "@/features/blog/components/blog-form";
import { getBlogCategoryNames } from "@/features/blog/queries";

export default async function NewBlogPage() {
  const categories = await getBlogCategoryNames();

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
