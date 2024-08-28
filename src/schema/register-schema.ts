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
  password: z
    .string({
      required_error: "Password is required",
    })
    .regex(
      //one number one special char one uppercase and more than 8 char
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Password must contain atleast one number, one special character, one uppercase letter and must be atleast 8 characters"
    ),
  re_password: z.string({
    required_error: "Password is required",
  }),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
