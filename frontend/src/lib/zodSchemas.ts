import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const signupSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }).max(15, { message: "Name must be at most 15 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(30, { message: "Password must be less than 30 characters" })
    .regex(/(?=.*[0-9])(?=.*[a-zA-Z])/, {
      message: "Password must contain at least one letter and one number",
    }),
});
