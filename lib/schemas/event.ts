"server-only";
import z from "zod";

export const eventSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z
    .string()
    .refine((date) => {
      const now = new Date();
      return new Date(date) > now;
    })
    .transform((date) => new Date(date)),
  location: z.string(),
});
