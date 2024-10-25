import { z } from "zod";

export const loginSchema = z.object({
  phonenum: z
    .number()
    .int()
    .refine((num) => String(num).length === 10, {
      message: "Phone number must be exactly 10 digits",
    }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const signupSchema = z.object({
  phonenum: z
    .number()
    .int({ message: "Phone number must be an integer" })
    .refine((num) => String(num).length === 10, {
      message: "Phone number must be exactly 10 digits",
    }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(20, { message: "Password must be at most 20 characters long" })
    .regex(/(?=.*[A-Z])/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/(?=.*[0-9])/, {
      message: "Password must contain at least one number",
    })
    .regex(/(?=.*[!@#$%^&*(),.?":{}|<>])/, {
      message: "Password must contain at least one special character",
    }),
  department: z
    .number()
    .int()
    .min(1, { message: "Department must be between 1 and 6" })
    .max(6, { message: "Department must be between 1 and 6" }),
  role: z
    .number()
    .int()
    .min(1, { message: "Role must be between 1 and 4" })
    .max(4, { message: "Role must be between 1 and 4" }),
});
