import { z } from "zod";

export const formSchema = z.object({
  details: z.string(),
  phone: z.string(),
  city: z.string(),
});
