import z from "zod";

export const createAccountSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be atleas 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z.email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be less than 50 characters"),

  role: z.string().min(1, "Please select a role"),

  department: z.string().min(1, "Please select a department"),

  designation: z.string().min(1, "Please select a designation"),
});

// Login Schema
export const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),

  password: z.string().min(1, "Password is required"),
});

// Register Schema
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be atleas 2 characters")
      .max(50, "Name must be less than 50 characters")
      .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
    email: z.email("Please enter a valid email address"),
    organizationName: z
      .string()
      .min(2, "Name must be atleas 2 characters")
      .max(50, "Name must be less than 50 characters")
      .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be less than 50 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type CreateAccountData = z.infer<typeof createAccountSchema>;
export type RegisterAccountData = z.infer<typeof registerSchema>;
export type LoginAccountData = z.infer<typeof loginSchema>;

export type RegisterApiData = Omit<RegisterAccountData, "confirmPassword">;
