"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { toast } from "sonner";
import { PlusIcon } from "@heroicons/react/24/outline";
import { createCategory, updateCategory } from "@/app/admin/(dashboard)/categories/actions";

const formSchema = z.object({
  name: z.string().min(1, "Nama kategori wajib diisi"),
});

type CategoryFormProps = {
  initialData?: {
    id: string;
    name: string;
  };
  trigger?: React.ReactElement;
};

export function CategoryForm({ initialData, trigger }: CategoryFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    
    const response = initialData
      ? await updateCategory(initialData.id, values)
      : await createCategory(values);

    setLoading(false);

    if (response.success) {
      toast.success(initialData ? "Kategori berhasil diupdate" : "Kategori berhasil ditambahkan");
      setOpen(false);
      form.reset();
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
            Tambah Kategori
          </Button>
        )
      } />
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{initialData ? "Edit Kategori" : "Tambah Kategori"}</DialogTitle>
            <DialogDescription>
              Buat kategori baru untuk mengelompokkan proyek portofolio Anda.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Nama Kategori</Label>
              <Input
                id="name"
                placeholder="Misal: Company Profile"
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <span className="text-xs text-destructive">{form.formState.errors.name.message}</span>
              )}
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
