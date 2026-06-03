"use client";

import { useState } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
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
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { createPricing, updatePricing } from "@/app/admin/(dashboard)/pricing/actions";

const formSchema = z.object({
  name: z.string().min(1, "Nama paket wajib diisi"),
  price: z.string().min(1, "Harga wajib diisi"),
  description: z.string().optional(),
  features: z.array(
    z.object({
      value: z.string().min(1, "Fitur tidak boleh kosong")
    })
  ).optional(),
  isFeatured: z.boolean(),
});

type PricingFormProps = {
  initialData?: {
    id: string;
    name: string;
    price: string;
    description: string | null;
    features: string[] | null;
    isFeatured: boolean;
  };
  trigger?: React.ReactElement;
};

export function PricingForm({ initialData, trigger }: PricingFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Map string array to object array for react-hook-form field array
  const defaultFeatures = initialData?.features 
    ? initialData.features.map((f: string) => ({ value: f })) 
    : [{ value: "" }];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      price: initialData?.price || "",
      description: initialData?.description || "",
      features: defaultFeatures,
      isFeatured: initialData?.isFeatured || false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features",
  });
  const isFeaturedValue = useWatch({ control: form.control, name: "isFeatured" }) ?? false;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    
    // Map back to string array
    const mappedValues = {
      ...values,
      features: values.features?.map(f => f.value) || [],
    };

    const response = initialData
      ? await updatePricing(initialData.id, mappedValues)
      : await createPricing(mappedValues);

    setLoading(false);

    if (response.success) {
      toast.success(initialData ? "Paket berhasil diupdate" : "Paket berhasil ditambahkan");
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
            Tambah Paket
          </Button>
        )
      } />
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{initialData ? "Edit Paket" : "Tambah Paket"}</DialogTitle>
            <DialogDescription>
              Atur nama paket, harga, dan daftar fiturnya.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4 mt-4">
            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Nama Paket</Label>
                <Input
                  id="name"
                  placeholder="Misal: Growth"
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <span className="text-xs text-destructive">{form.formState.errors.name.message}</span>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Harga</Label>
                <Input
                  id="price"
                  placeholder="Misal: Mulai 4.5jt"
                  {...form.register("price")}
                />
                {form.formState.errors.price && (
                  <span className="text-xs text-destructive">{form.formState.errors.price.message}</span>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  placeholder="Deskripsi paket..."
                  {...form.register("description")}
                />
              </div>
              
              <div className="flex items-center space-x-2 my-2 p-3 border rounded-lg bg-muted/50">
                <Switch
                  id="isFeatured"
                  checked={isFeaturedValue}
                  onCheckedChange={(checked) => form.setValue("isFeatured", checked)}
                />
                <Label htmlFor="isFeatured" className="cursor-pointer">
                  Jadikan Paket Rekomendasi (Featured)
                </Label>
              </div>

              <div className="space-y-3">
                <Label>Daftar Fitur</Label>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-start gap-2">
                    <div className="flex-1">
                      <Input
                        placeholder="Misal: 3 Halaman Utama"
                        {...form.register(`features.${index}.value`)}
                      />
                      {form.formState.errors.features?.[index]?.value && (
                        <span className="text-xs text-destructive block mt-1">
                          {form.formState.errors.features[index]?.value?.message}
                        </span>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="shrink-0 text-muted-foreground hover:text-destructive"
                      onClick={() => remove(index)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2 w-full border-dashed"
                  onClick={() => append({ value: "" })}
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Tambah Fitur
                </Button>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter className="pt-4">
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
