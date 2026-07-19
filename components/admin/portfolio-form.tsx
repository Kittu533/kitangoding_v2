"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { createPortfolio, updatePortfolio } from "@/app/admin/(dashboard)/portfolio/actions";
import { optimizeImageForServerAction } from "@/lib/admin-image-upload";

const formSchema = z.object({
  name: z.string().min(1, "Nama proyek wajib diisi"),
  categoryId: z.string().min(1, "Kategori wajib diisi"),
  thumbnail: z.string().optional(),
  result: z.string().optional(),
  role: z.string().max(255, "Role maksimal 255 karakter").optional(),
  features: z.string().optional(),
  gallery: z.array(z.string()).max(2, "Maksimal 2 screenshot tambahan").optional(),
});

type PortfolioFormProps = {
  initialData?: {
    id: string;
    name: string;
    categoryId: string | null;
    thumbnail: string | null;
    result: string | null;
    role: string | null;
    features: string[];
    gallery: string[];
  };
  categories: { id: string; name: string }[];
  trigger?: React.ReactElement;
};

export function PortfolioForm({ initialData, categories, trigger }: PortfolioFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [processingImage, setProcessingImage] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>(initialData?.thumbnail || "");
  const [galleryImages, setGalleryImages] = useState<string[]>(initialData?.gallery || []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      categoryId: initialData?.categoryId || "",
      thumbnail: initialData?.thumbnail || "",
      result: initialData?.result || "",
      role: initialData?.role || "",
      features: initialData?.features.join("\n") || "",
      gallery: initialData?.gallery || [],
    },
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    setProcessingImage(true);

    try {
      const optimizedImage = await optimizeImageForServerAction(file);
      setPreviewImage(optimizedImage);
      form.setValue("thumbnail", optimizedImage);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal memproses gambar");
    } finally {
      setProcessingImage(false);
    }
  };

  const handleGalleryChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 2 - galleryImages.length);
    if (files.length === 0) {
      toast.error("Maksimal 2 screenshot tambahan");
      return;
    }

    setProcessingImage(true);

    try {
      const uploadedImages = await Promise.all(files.map((file) => optimizeImageForServerAction(file)));
      const nextGallery = [...galleryImages, ...uploadedImages].slice(0, 2);
      setGalleryImages(nextGallery);
      form.setValue("gallery", nextGallery);
      e.target.value = "";
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal memproses gambar");
    } finally {
      setProcessingImage(false);
    }
  };

  function removeGalleryImage(index: number) {
    const nextGallery = galleryImages.filter((_, imageIndex) => imageIndex !== index);
    setGalleryImages(nextGallery);
    form.setValue("gallery", nextGallery);
  }

  const categoryIdValue = useWatch({ control: form.control, name: "categoryId" }) ?? "";

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (processingImage) {
      toast.error("Tunggu gambar selesai diproses");
      return;
    }

    setLoading(true);
    
    const response = initialData
      ? await updatePortfolio(initialData.id, values)
      : await createPortfolio(values);

    setLoading(false);

    if (response.success) {
      toast.success(initialData ? "Portfolio berhasil diupdate" : "Portfolio berhasil ditambahkan");
      setOpen(false);
      form.reset();
      setPreviewImage("");
      setGalleryImages([]);
    } else {
      toast.error(response.error || "Terjadi kesalahan");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        trigger ?? (
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            Tambah Proyek
          </Button>
        )
      } />
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-[425px]">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{initialData ? "Edit Proyek" : "Tambah Proyek"}</DialogTitle>
            <DialogDescription>
              Isi detail proyek portfolio di bawah ini. Klik simpan untuk menerapkan.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nama Proyek</Label>
              <Input
                id="name"
                placeholder="Misal: Website Toko Kopi"
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <span className="text-xs text-destructive">{form.formState.errors.name.message}</span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="categoryId">Kategori</Label>
              <Select 
                onValueChange={(value) => {
                  if (value) {
                    form.setValue("categoryId", value);
                  }
                }}
                value={categoryIdValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.categoryId && (
                <span className="text-xs text-destructive">{form.formState.errors.categoryId.message}</span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="thumbnailFile">Upload Gambar Thumbnail</Label>
              <Input
                id="thumbnailFile"
                type="file"
                accept="image/*"
                disabled={processingImage}
                onChange={handleImageChange}
              />
              {processingImage && (
                <span className="text-xs text-muted-foreground">Gambar sedang diperkecil sebelum dikirim.</span>
              )}
              {previewImage && (
                <div className="mt-2 relative h-32 w-full rounded-md overflow-hidden border border-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="result">Hasil / Result</Label>
              <Textarea
                id="result"
                placeholder="Misal: Meningkatkan konversi 200%"
                {...form.register("result")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="galleryFiles">Screenshot Tambahan</Label>
              <Input
                id="galleryFiles"
                type="file"
                accept="image/*"
                disabled={processingImage || galleryImages.length >= 2}
                multiple
                onChange={handleGalleryChange}
              />
              <p className="text-xs text-muted-foreground">Upload maksimal 2 gambar. Bersama thumbnail utama, detail proyek menampilkan 3 pilihan gambar.</p>
              {galleryImages.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                  {galleryImages.map((image, index) => (
                    <div key={image} className="relative overflow-hidden rounded-md border border-border">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img alt={`Screenshot tambahan ${index + 1}`} className="h-24 w-full object-cover" src={image} />
                      <button
                        className="w-full border-t border-border px-2 py-1.5 text-xs font-medium text-destructive hover:bg-muted"
                        onClick={() => removeGalleryImage(index)}
                        type="button"
                      >
                        Hapus
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                placeholder="Misal: UI/UX Design dan Frontend Development"
                {...form.register("role")}
              />
              {form.formState.errors.role && (
                <span className="text-xs text-destructive">{form.formState.errors.role.message}</span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="features">Fitur Utama</Label>
              <Textarea
                id="features"
                placeholder={"Satu fitur per baris\nKatalog produk\nForm pemesanan"}
                rows={5}
                {...form.register("features")}
              />
              <p className="text-xs text-muted-foreground">Tulis satu fitur pada setiap baris.</p>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading || processingImage}>
              {loading ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
