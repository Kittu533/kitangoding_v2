import { z } from "zod";

export const serviceSchema = z.object({
  title: z.string().min(1, "Nama layanan wajib diisi"),
  description: z.string().optional(),
  price: z.string().optional(),
  icon: z.string().optional(),
});

export type ServiceInput = z.infer<typeof serviceSchema>;
