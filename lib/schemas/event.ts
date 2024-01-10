"server-only";
import z from "zod";

const FIVE_HUNDRED_KB = 500000;
const imageSchema = z
  .any()
  .refine(
    (file) => file?.size <= FIVE_HUNDRED_KB,
    "Your uploaded image is too large. Please upload an image smaller than 500KB.",
  )
  .refine(
    (file) =>
      ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
        file?.type,
      ),
    "Only .jpg, .jpeg, .png and .webp formats are supported.",
  );

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
  // image: imageSchema,
});
