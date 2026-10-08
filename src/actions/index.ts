import { defineAction } from "astro:actions";
import { z } from "astro/zod";

export const server = {
  contact: defineAction({
    accept: "form",
    input: z.object({
      name: z
        .string()
        .trim()
        .min(1, "Please enter your name.")
        .max(100, "Please keep your name under 100 characters."),
      email: z.email("Please enter a valid email address."),
      message: z
        .string()
        .trim()
        .min(10, "Please write at least 10 characters.")
        .max(5000, "Please keep your message under 5,000 characters.")
        .optional(),
      website: z.string().optional(),
    }),
    handler: async (input) => {
      if (input.website) return { ok: true };

      // TODO: forward to the form service
      return { ok: true };
    },
  }),
};
