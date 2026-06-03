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
import { createTestimonial, updateTestimonial } from "@/app/admin/(dashboard)/testimonials/actions";

const formSchema = z.object({
  name: z.string().min(1, "Nama klien wajib diisi"),
  role: z.string().optional(),
  quote: z.string().min(1, "Isi testimoni wajib diisi"),
  avatar: z.string().optional(),
});

type TestimonialFormProps = {
  initialData?: {
    id: string;
    name: string;
    role: string | null;
    quote: string;
    avatar: string | null;
  };
  trigger?: React.ReactElement;
};

export function TestimonialForm({ initialData, trigger }: TestimonialFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      role: initialData?.role || "",
      quote: initialData?.quote || "",
      avatar: initialData?.avatar || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    
    const response = initialData
      ? await updateTestimonial(initialData.id, values)
      : await createTestimonial(values);

    setLoading(false);

    if (response.success) {
      toast.success(initialData ? "Testimoni berhasil diupdate" : "Testimoni berhasil ditambahkan");
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
            Tambah Testimoni
          </Button>
        )
      } />
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{initialData ? "Edit Testimoni" : "Tambah Testimoni"}</DialogTitle>
            <DialogDescription>
              Isi detail ulasan dari klien di bawah ini. Klik simpan untuk menerapkan.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nama Klien</Label>
              <Input
                id="name"
                placeholder="Misal: Dina Pramesti"
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <span className="text-xs text-destructive">{form.formState.errors.name.message}</span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role / Perusahaan (Opsional)</Label>
              <Input
                id="role"
                placeholder="Misal: Owner, Sahabat Kopi"
                {...form.register("role")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="avatar">URL Avatar (Opsional)</Label>
              <Input
                id="avatar"
                placeholder="https://..."
                {...form.register("avatar")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quote">Isi Testimoni</Label>
              <Textarea
                id="quote"
                placeholder="Testimoni positif klien..."
                className="h-24"
                {...form.register("quote")}
              />
              {form.formState.errors.quote && (
                <span className="text-xs text-destructive">{form.formState.errors.quote.message}</span>
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
