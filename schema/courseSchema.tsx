import { z } from "zod";

const CourseSchema = z.object({
  courseName: z
    .string()
    .min(2, "Course Name must be at least 2 characters")
    .max(100, "Course Name must be at most 100 characters"),
  courseCode: z
    .string()
    .min(2, "Course Code must be at least 2 characters")
    .max(50, "Course Code must be at most 50 characters"),
  description: z
    .string()
    .max(500, "Description can be at most 500 characters")
    .optional(),
  credit: z.coerce
    .number()
    .positive("Credit must be a positive number"),
});

export const addCourseSchema = CourseSchema;
