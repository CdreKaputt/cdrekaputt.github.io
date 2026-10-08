import { ActionError, defineAction } from "astro:actions";
import { z } from "astro/zod";
import { env } from "cloudflare:workers";

const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

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
      "cf-turnstile-response": z
        .string({ error: "Please complete the verification." })
        .min(1, "Please complete the verification."),
    }),
    handler: async (input, context) => {
      if (input.website) return { ok: true };

      const res = await fetch(SITEVERIFY_URL, {
        method: "POST",
        body: new URLSearchParams({
          secret: env.TURNSTILE_SECRET_KEY,
          response: input["cf-turnstile-response"],
          remoteip: context.request.headers.get("CF-Connecting-IP") ?? "",
        }),
      });
      const outcome = (await res.json()) as { success: boolean };

      if (!outcome.success) {
        throw new ActionError({
          code: "FORBIDDEN",
          message: "Verification failed. Please try again.",
        });
      }

      // TODO: forward to the form service
      return { ok: true };
    },
  }),
};
