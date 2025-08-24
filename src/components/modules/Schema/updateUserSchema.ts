import * as z from "zod";

export const updateUserZodSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name cannot exceed 50 characters.")
    .optional(),

  email: z
    .union([z.string().email("Invalid email format."), z.literal("")])
    .optional(),

  address: z
    .string()
    .max(100, "Address cannot exceed 100 characters.")
    .optional(),

  phone: z
    .string()
    .regex(/^(01)[3-9]\d{8}$/, {
      message:
        "Phone number must be a valid number (11 digits, starting with 01 followed by 3-9).",
    })
    .optional(),

  // picture: z.string().url("Must be a valid URL.").optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserZodSchema>;
