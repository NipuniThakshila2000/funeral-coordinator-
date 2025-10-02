import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(4),
  email: z.string().email().optional().or(z.literal("")),
  faith: z.string().optional(),
  message: z.string().max(2000).optional(),
  urgent: z.union([z.boolean(), z.string()]).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;