import { z } from "zod";

export const profileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters.")
    .max(50, "First name must not exceed 50 characters."),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters.")
    .max(50, "Last name must not exceed 50 characters."),

  email: z.string().trim().email("Please enter a valid email address."),

  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s-]{10,15}$/, "Please enter a valid phone number."),

  role: z.string().trim().min(2, "Role is required."),

  department: z
    .string()
    .trim()
    .min(2, "Department must be at least 2 characters.")
    .max(100, "Department must not exceed 100 characters."),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
