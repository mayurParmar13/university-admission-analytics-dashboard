import { z } from "zod";

export const admissionSchema = z.object({
  applicantName: z
    .string()
    .trim()
    .min(2, "Applicant name must be at least 2 characters.")
    .max(100, "Applicant name must not exceed 100 characters."),

  email: z.string().trim().email("Please enter a valid email address."),

  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s-]{10,15}$/, "Please enter a valid phone number."),

  program: z.string().min(1, "Please select a program."),

  status: z.enum(["Pending", "Verified", "Rejected"]),

  applicationDate: z.string().min(1, "Application date is required."),
});

export type AdmissionFormValues = z.infer<typeof admissionSchema>;
