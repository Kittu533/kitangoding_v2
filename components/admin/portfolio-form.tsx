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

const formSchema = z.object({
  name: z.string().min(1, "Nama proyek wajib diisi"),
  categoryId: z.string().min(1, "Kategori wajib diisi"),
  thumbnail: z.string().optional(),
  result: z.string().optional(),
});

type PortfolioFormProps = {
  initialData?: {
    id: string;
    name: string;
    categoryId: string | null;
    thumbnail: string | null;
    result: string | null;
  };
  categories: { id: string; name: string }[];
  trigger?: React.ReactElement;
};

export function PortfolioForm({ initialData, categories, trigger }: PortfolioFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>(initialData?.thumbnail || "");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      categoryId: initialData?.categoryId || "",
      thumbnail: initialData?.thumbnail || "",
      result: initialData?.result || "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Ukuran file maksimal 2MB");
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

  const categoryIdValue = useWatch({ control: form.control, name: "categoryId" }) ?? "";

  async function onSubmit(values: z.infer<typeof formSchema>) {
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
      <DialogContent className="sm:max-w-[425px]">
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
              <Label htmlFor="result">Hasil / Result</Label>
              <Textarea
                id="result"
                placeholder="Misal: Meningkatkan konversi 200%"
                {...form.register("result")}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
