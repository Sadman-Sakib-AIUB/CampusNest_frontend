import { z } from "zod";
const teacherSchema = z.object({
  fullname: z.string().nonempty({ message: "Fullname is required" }),
  username: z
    .string()
    .nonempty({ message: "Username is required" })
    .regex(/^[A-Za-z\s]+$/, { message: "Name must contain only alphabets" }),
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  phone: z.string().nonempty({ message: "Phone is required" }),
  password: z.string().min(8, { message: "Password minimum length is 8" }),
  nid: z.string().regex(/^\d{10}$|^\d{13}$/, {
    message: "NID must be exactly 10 or 13 numbers",
  }),

  file: z
    .instanceof(File, { message: "NID Image is required" })
    .refine((file) => file.size > 0, { message: "NID Image cannot be empty" }),
});
export const createschema = teacherSchema;
export const updateSchema = teacherSchema.omit({
  password: true,
  file: true,
  username: true,
  email: true,
});
