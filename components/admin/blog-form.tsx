"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import { PlusIcon } from "@heroicons/react/24/outline";
import { createBlogPost, updateBlogPost } from "@/app/admin/(dashboard)/blog/actions";

const formSchema = z.object({
  title: z.string().min(1, "Judul artikel wajib diisi"),
  category: z.string().min(1, "Kategori wajib diisi"),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  status: z.enum(["draft", "published"]),
  thumbnail: z.string().optional(),
});

type BlogFormProps = {
  initialData?: {
    id: string;
    title: string;
    category: string;
    excerpt: string | null;
    content: string | null;
    status: string;
    thumbnail: string | null;
  };
  categories: string[];
  trigger?: React.ReactElement;
};

export function BlogForm({ initialData, categories, trigger }: BlogFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>(initialData?.thumbnail || "");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      category: initialData?.category || "",
      excerpt: initialData?.excerpt || "",
      content: initialData?.content || "",
      status: initialData?.status === "published" ? "published" : "draft",
      thumbnail: initialData?.thumbnail || "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Ukuran file maksimal 10MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewImage(base64String);
        form.setValue("thumbnail", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const categoryValue = useWatch({ control: form.control, name: "category" }) ?? "";
  const statusValue = useWatch({ control: form.control, name: "status" }) ?? "draft";

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    
    const response = initialData
      ? await updateBlogPost(initialData.id, values)
      : await createBlogPost(values);

    setLoading(false);

    if (response.success) {
      toast.success(initialData ? "Artikel berhasil diupdate" : "Artikel berhasil ditambahkan");
      setOpen(false);
      form.reset();
      setPreviewImage("");
    } else {
      toast.error(response.error || "Terjadi kesalahan");
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={
        trigger ?? (
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            Tulis Artikel
          </Button>
        )
      } />
      <SheetContent className="sm:max-w-[600px] w-full overflow-y-auto">
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
          <SheetHeader>
            <SheetTitle>{initialData ? "Edit Artikel" : "Tulis Artikel Baru"}</SheetTitle>
            <SheetDescription>
              Isi detail konten blog Anda. Gunakan format Markdown pada bagian konten.
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 grid gap-4 py-6">
            <div className="grid gap-2">
              <Label htmlFor="title">Judul Artikel</Label>
              <Input
                id="title"
                placeholder="Misal: Pentingnya Website untuk UMKM"
                {...form.register("title")}
              />
              {form.formState.errors.title && (
                <span className="text-xs text-destructive">{form.formState.errors.title.message}</span>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Kategori</Label>
                {categories.length > 0 ? (
                  <Select 
                    onValueChange={(value) => {
                      if (value) {
                        form.setValue("category", value);
                      }
                    }}
                    value={categoryValue}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id="category"
                    placeholder="Misal: Digital Marketing"
                    {...form.register("category")}
                  />
                )}
                {form.formState.errors.category && (
                  <span className="text-xs text-destructive">{form.formState.errors.category.message}</span>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  onValueChange={(value) => {
                    if (value === "draft" || value === "published") {
                      form.setValue("status", value);
                    }
                  }}
                  value={statusValue}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status Publish" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="thumbnailFile">Upload Cover / Thumbnail</Label>
              <Input
                id="thumbnailFile"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {previewImage && (
                <div className="mt-2 relative h-32 w-full rounded-md overflow-hidden border border-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="excerpt">Kutipan Pendek (Excerpt)</Label>
              <Textarea
                id="excerpt"
                placeholder="Ringkasan singkat artikel..."
                className="h-20"
                {...form.register("excerpt")}
              />
            </div>

            <div className="grid gap-2 flex-1">
              <Label htmlFor="content">Isi Konten (Markdown)</Label>
              <Textarea
                id="content"
                placeholder="Mulai menulis artikel Anda di sini..."
                className="min-h-[300px] flex-1 font-mono text-sm"
                {...form.register("content")}
              />
            </div>
          </div>
          <SheetFooter className="mt-auto py-4 border-t border-border">
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading ? "Menyimpan..." : "Simpan Artikel"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
