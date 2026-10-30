import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { notFound } from "next/navigation";
import { BlogForm } from "@/features/blog/components/blog-form";
import { getAdminBlogPostForEdit } from "@/features/blog/queries";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditBlogPage({ params }: Props) {
  const { id } = await params;
  const { post, categories } = await getAdminBlogPostForEdit(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <Link className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground" href="/admin/blog">
        <ArrowLeftIcon className="size-4" />
        Kembali ke artikel
      </Link>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Artikel</h1>
        <p className="mt-2 text-muted-foreground">Perbarui isi artikel sebelum dipublikasikan.</p>
      </div>
      <BlogForm categories={categories.map((category) => category.name)} initialData={post} />
    </div>
  );
}
