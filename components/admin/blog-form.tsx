"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { createBlogPost, updateBlogPost } from "@/app/admin/(dashboard)/blog/actions";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { optimizeImageForServerAction } from "@/lib/admin-image-upload";

function htmlToPlainText(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function parseTags(value: string) {
  return [...new Set(value.split(",").map((tag) => tag.trim()).filter(Boolean))];
}

const formSchema = z.object({
  title: z.string().trim().min(12, "Judul minimal 12 karakter").max(120, "Judul maksimal 120 karakter"),
  author: z.string().trim().min(2, "Nama penulis wajib diisi").max(120, "Nama penulis maksimal 120 karakter"),
  category: z.string().min(1, "Kategori wajib dipilih"),
  tags: z.array(z.string().trim().min(2, "Tag minimal 2 karakter").max(30, "Tag maksimal 30 karakter")).min(1, "Tambahkan minimal satu tag").max(8, "Maksimal 8 tag"),
  excerpt: z.string().trim().min(70, "Ringkasan minimal 70 karakter").max(220, "Ringkasan maksimal 220 karakter"),
  content: z.string().refine((value) => htmlToPlainText(value).length >= 280, "Isi artikel minimal 280 karakter"),
  status: z.enum(["draft", "published"]),
  thumbnail: z.string().optional(),
});

type BlogFormProps = {
  initialData?: {
    id: string;
    title: string;
    author: string;
    category: string;
    tags: string[];
    excerpt: string | null;
    content: string | null;
    status: string;
    thumbnail: string | null;
  };
  categories: string[];
};

export function BlogForm({ initialData, categories }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [processingImage, setProcessingImage] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>(initialData?.thumbnail || "");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      author: initialData?.author || "Tim kitangoding",
      category: initialData?.category || "",
      tags: initialData?.tags || [],
      excerpt: initialData?.excerpt || "",
      content: initialData?.content || "",
      status: initialData?.status === "published" ? "published" : "draft",
      thumbnail: initialData?.thumbnail || "",
    },
  });

  const categoryValue = useWatch({ control: form.control, name: "category" }) ?? "";
  const statusValue = useWatch({ control: form.control, name: "status" }) ?? "draft";
  const tagsValue = useWatch({ control: form.control, name: "tags" }) ?? [];
  const contentValue = useWatch({ control: form.control, name: "content" }) ?? "";

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setProcessingImage(true);
    try {
      const optimizedImage = await optimizeImageForServerAction(file);
      setPreviewImage(optimizedImage);
      form.setValue("thumbnail", optimizedImage, { shouldDirty: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal memproses gambar");
    } finally {
      setProcessingImage(false);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (processingImage) {
      toast.error("Tunggu gambar selesai diproses");
      return;
    }

    setLoading(true);
    const response = initialData
      ? await updateBlogPost(initialData.id, values)
      : await createBlogPost(values);
    setLoading(false);

    if (!response.success) {
      toast.error(response.error || "Terjadi kesalahan");
      return;
    }

    toast.success(initialData ? "Artikel berhasil diperbarui" : "Artikel berhasil ditambahkan");
    router.push("/admin/blog");
    router.refresh();
  }

  return (
    <form className="space-y-6 rounded-xl border bg-card p-5 text-card-foreground shadow-sm sm:p-7" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <Label htmlFor="title">Judul Artikel</Label>
        <Input id="title" placeholder="Contoh: Cara memilih website UMKM yang mudah menghasilkan leads" {...form.register("title")} />
        {form.formState.errors.title ? <span className="text-xs text-destructive">{form.formState.errors.title.message}</span> : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="author">Penulis</Label>
          <Input id="author" placeholder="Contoh: Tim kitangoding" {...form.register("author")} />
          {form.formState.errors.author ? <span className="text-xs text-destructive">{form.formState.errors.author.message}</span> : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="status">Status</Label>
          <Select onValueChange={(value) => value === "draft" || value === "published" ? form.setValue("status", value) : undefined} value={statusValue}>
            <SelectTrigger id="status"><SelectValue placeholder="Pilih status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="category">Kategori</Label>
          <Select disabled={categories.length === 0} onValueChange={(value) => {
            if (value) form.setValue("category", value, { shouldValidate: true });
          }} value={categoryValue}>
            <SelectTrigger id="category"><SelectValue placeholder="Pilih kategori" /></SelectTrigger>
            <SelectContent>
              {categories.map((category) => <SelectItem key={category} value={category}>{category}</SelectItem>)}
            </SelectContent>
          </Select>
          {categories.length === 0 ? <span className="text-xs text-destructive">Buat kategori terlebih dahulu di menu Categories.</span> : null}
          {form.formState.errors.category ? <span className="text-xs text-destructive">{form.formState.errors.category.message}</span> : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="tags">Tag</Label>
          <Input id="tags" onChange={(event) => form.setValue("tags", parseTags(event.target.value), { shouldValidate: true })} placeholder="SEO, Website UMKM, Branding" value={tagsValue.join(", ")} />
          <span className="text-xs text-muted-foreground">Pisahkan tag dengan koma, maksimal 8 tag.</span>
          {form.formState.errors.tags ? <span className="text-xs text-destructive">{form.formState.errors.tags.message}</span> : null}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="thumbnail">Cover Artikel</Label>
        <Input accept="image/jpeg,image/png,image/webp" disabled={processingImage} id="thumbnail" onChange={handleImageChange} type="file" />
        {previewImage ? (
          <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-muted/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Preview cover artikel" className="h-full w-full object-contain" src={previewImage} />
          </div>
        ) : null}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="excerpt">Ringkasan Artikel</Label>
        <Textarea className="h-24" id="excerpt" placeholder="Jelaskan masalah yang dibahas dan manfaat yang pembaca dapatkan." {...form.register("excerpt")} />
        {form.formState.errors.excerpt ? <span className="text-xs text-destructive">{form.formState.errors.excerpt.message}</span> : null}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="content">Isi Artikel</Label>
        <RichTextEditor disabled={loading} id="content" onChange={(value) => form.setValue("content", value, { shouldDirty: true, shouldValidate: true })} value={contentValue} />
        <span className="text-xs text-muted-foreground">Gunakan heading, daftar, dan tautan untuk membuat artikel mudah dibaca.</span>
        {form.formState.errors.content ? <span className="text-xs text-destructive">{form.formState.errors.content.message}</span> : null}
      </div>

      <div className="flex flex-col-reverse justify-end gap-3 border-t border-border pt-5 sm:flex-row">
        <Link className={buttonVariants({ variant: "outline" })} href="/admin/blog">Batal</Link>
        <Button disabled={loading || processingImage || categories.length === 0} type="submit">
          {loading ? "Menyimpan..." : "Simpan Artikel"}
        </Button>
      </div>
    </form>
  );
}
