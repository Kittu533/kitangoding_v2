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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { PlusIcon } from "@heroicons/react/24/outline";
import { createService, updateService } from "@/app/admin/(dashboard)/services/actions";

const formSchema = z.object({
  title: z.string().min(1, "Nama layanan wajib diisi"),
  description: z.string().optional(),
  price: z.string().optional(),
  icon: z.string().optional(),
});

type ServiceFormProps = {
  initialData?: {
    id: string;
    title: string;
    description: string | null;
    price: string | null;
    icon: string | null;
  };
  trigger?: React.ReactElement;
};

export function ServiceForm({ initialData, trigger }: ServiceFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      price: initialData?.price || "",
      icon: initialData?.icon || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    
    const response = initialData
      ? await updateService(initialData.id, values)
      : await createService(values);

    setLoading(false);

    if (response.success) {
      toast.success(initialData ? "Layanan berhasil diupdate" : "Layanan berhasil ditambahkan");
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
            Tambah Layanan
          </Button>
        )
      } />
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{initialData ? "Edit Layanan" : "Tambah Layanan"}</DialogTitle>
            <DialogDescription>
              Isi detail layanan / produk di bawah ini. Klik simpan untuk menerapkan.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Nama Layanan</Label>
              <Input
                id="title"
                placeholder="Misal: Website Company Profile"
                {...form.register("title")}
              />
              {form.formState.errors.title && (
                <span className="text-xs text-destructive">{form.formState.errors.title.message}</span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Harga (Opsional)</Label>
              <Input
                id="price"
                placeholder="Misal: Mulai 2.5jt"
                {...form.register("price")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="icon">URL Ikon (Opsional)</Label>
              <Input
                id="icon"
                placeholder="https://..."
                {...form.register("icon")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                placeholder="Deskripsi layanan..."
                {...form.register("description")}
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
