"use client";

import { addCourseSchema } from "@/schema/courseSchema";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

// ✅ Validation function
const validateForm = (formData: Record<string, any>) => {
  const result = addCourseSchema.safeParse(formData);

  if (!result.success) {
    const formattedErrors: Record<string, string> = {};
    result.error.issues.forEach((err) => {
      formattedErrors[err.path[0] as string] = err.message;
    });
    return { success: false, errors: formattedErrors };
  }
  return { success: true, data: result.data, errors: {} };
};

export default function EditCoursePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [formData, setFormData] = useState({
    courseName: "",
    courseCode: "",
    description: "",
    credit: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // ✅ Fetch course by ID
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/admin/courses/show/${id}`
        );
        const course = res.data;
        setFormData({
          courseName: course.courseName || "",
          courseCode: course.courseCode || "",
          description: course.description || "",
          credit: course.credit ?? "",
        });
      } catch (err) {
        setErrors({ form: "❌ Failed to load course details." });
      } finally {
        setFetching(false);
      }
    };

    if (id) fetchCourse();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log(e.target);
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear field error
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      credit: Number(formData.credit), // ensure numeric
    };

    // ✅ validate with Zod
    const validation = validateForm(dataToSend);
    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);
    try {
      await axios.patch(
        `/api/updatecourse/${id}`,
        validation.data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      router.push("/dashboard/manage_course");
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        setErrors({
          form: error.response.data.message || "Update failed",
        });
      } else {
        setErrors({ form: "Something went wrong" });
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <p>Loading course...</p>;

  return (
    <div className="max-w-2xl mx-auto p-8 ">
      <div className="relative flex items-center justify-center mb-6">
        <Link href="/dashboard"><ArrowLeft className="absolute left-0 cursor-pointer text-gray-600 hover:text-gray-900" /></Link>
      <h1 className="text-2xl font-semibold">✏️ Edit Course</h1>
      </div>
      {errors.form && (
        <div className="mb-4 p-3 rounded bg-red-100 text-red-700">
          {errors.form}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        {/* Course Name */}
        <div>
          <label className="block font-medium mb-1">Course Name</label>
          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            className={`w-full border rounded-lg p-2 ${
              errors.courseName ? "border-red-500" : ""
            }`}
          />
          {errors.courseName && (
            <p className="text-red-500 text-sm">{errors.courseName}</p>
          )}
        </div>

        {/* Course Code */}
        <div>
          <label className="block font-medium mb-1">Course Code</label>
          <input
            type="text"
            name="courseCode"
            value={formData.courseCode}
            onChange={handleChange}
            className={`w-full border rounded-lg p-2 ${
              errors.courseCode ? "border-red-500" : ""
            }`}
          />
          {errors.courseCode && (
            <p className="text-red-500 text-sm">{errors.courseCode}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className={`w-full border rounded-lg p-2 ${
              errors.description ? "border-red-500" : ""
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        {/* Credit */}
        <div>
          <label className="block font-medium mb-1">Credit</label>
          <input
            type="number"
            name="credit"
            value={formData.credit}
            onChange={handleChange}
            className={`w-full border rounded-lg p-2 ${
              errors.credit ? "border-red-500" : ""
            }`}
          />
          {errors.credit && (
            <p className="text-red-500 text-sm">{errors.credit}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Course"}
        </button>
      </form>
    </div>
  );
}
