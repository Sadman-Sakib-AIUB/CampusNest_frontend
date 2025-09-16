"use client";
import { useState } from "react";
import axios from "axios";
import { addCourseSchema } from "@/schema/courseSchema";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const validateFormData = (formData: FormData) => {
  const validationData = {
    ...Object.fromEntries(formData.entries()),
    file: formData.get("file") as File,
  };

  const result = addCourseSchema.safeParse(validationData);

  if (!result.success) {
    const formattedErrors: Record<string, string> = {};
    result.error.issues.forEach((err) => {
      formattedErrors[err.path[0] as string] = err.message;
    });
    return { success: false, errors: formattedErrors };
  }
  return { success: true, data: result.data, errors: {} };
};

export default function AddCoursePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    courseName: "",
    courseCode: "",
    description: "",
    credit: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const rawForm = new FormData(e.currentTarget as HTMLFormElement);
    const validation = validateFormData(rawForm);

    if (!validation.success) {
      setErrors(validation.errors as typeof errors);
      return;
    }

    try {
      await axios.post("/api/add_course", validation.data, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage("✅ Course added successfully!");
      setFormData({
        courseName: "",
        courseCode: "",
        description: "",
        credit: "",
      });
      setErrors({});

      router.push("/dashboard/manage_course");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "❌ Failed to add course.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      {/* Header */}
      <div className="relative flex items-center justify-center mb-10">
        <Link href="/dashboard">
          <ArrowLeft className="absolute left-0 cursor-pointer text-gray-600 hover:text-gray-900" />
        </Link>
        <h2 className="text-2xl font-bold text-gray-800">➕ Add New Course</h2>
      </div>

      {/* Message */}
      {message && (
        <div className="mb-4 p-3 rounded bg-gray-100 text-gray-700">
          {message}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Course Name */}
        <div>
          <label className="block font-medium mb-1">Course Name</label>
          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 ${
              errors.courseName ? "border-red-500" : ""
            }`}
          />
          {errors.courseName && (
            <p className="text-red-500 text-sm mt-1">{errors.courseName}</p>
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
            className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 ${
              errors.courseCode ? "border-red-500" : ""
            }`}
          />
          {errors.courseCode && (
            <p className="text-red-500 text-sm mt-1">{errors.courseCode}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">
            Description (Optional)
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 ${
              errors.description ? "border-red-500" : ""
            }`}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
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
            className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 ${
              errors.credit ? "border-red-500" : ""
            }`}
          />
          {errors.credit && (
            <p className="text-red-500 text-sm mt-1">{errors.credit}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Saving..." : "Save Course"}
        </button>
      </form>
    </div>
  );
}
