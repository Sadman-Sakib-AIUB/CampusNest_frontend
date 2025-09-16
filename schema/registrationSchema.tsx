import { z } from "zod";

export const RegistrationSchema = z.object({
  fullname: z
    .string()
    .regex(/^[A-Za-z\s]+$/, { message:"Name must contain only alphabets"})
    .max(25, { message:"Name is too long"}),

  username: z
    .string()
    .min(3,{ message: "Username must be at least 3 characters"}),

  email: z
    .string()
    .email("Invalid email address"),

  password: z
    .string()
    .regex(/^(?=.*[a-z]).{6,}$/, { message: "Password must be at least 6 characters and contain at least one lowercase letter"}),

  phone: z
    .string()
    .regex(/^01\d{9}$/, { message: "Phone number must start with 01 and be 11 digits long"}),

  age: z
    .string()
    .transform((val) => Number(val)) 
    .refine((val) => val >= 18, { message: "Age must be older than 18" }),
    
  file: z
    .custom<File>((v) => v instanceof File)
    .refine((file) => file.size > 0, { message: "Please select a PDF" }),
});


export const createAdminSchema = RegistrationSchema;