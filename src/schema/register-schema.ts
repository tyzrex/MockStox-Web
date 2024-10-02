import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({
      required_error: "Name is required",
    })
    .min(1)
    .max(30),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email",
    }),
  password: z.string({
    required_error: "Password is required",
  }),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
