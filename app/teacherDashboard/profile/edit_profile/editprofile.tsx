"use client";
import { updateSchema } from "@/teacherschema/teacherschema";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

// Validation function
const validateForm = (formData: Record<string, any>) => {
  const result = updateSchema.safeParse(formData);

  if (!result.success) {
    const formattedErrors: Record<string, string> = {};
    result.error.issues.forEach((err) => {
      formattedErrors[err.path[0] as string] = err.message;
    });
    return { success: false, errors: formattedErrors };
  }
  return { success: true, data: result.data, errors: {} };
};

export default function UpdateProfile({ initialData }: { initialData: any }) {
  const router = useRouter();

  // Merge top-level and teacher fields
  const [formData, setFormData] = useState({
    ...initialData.teacher,
    email: initialData.email,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataToSend = {
      fullname: formData.fullname,
      phone: formData.phone,
      nid: formData.nid,
    };

    // validate fields
    const validation = validateForm(dataToSend);
    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.patch("/api/teacher/update-profile", dataToSend, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(res.data);
      router.push("/teacherDashboard/profile");
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        setErrors({ form: error.response.data.message || "Update failed" });
      } else {
        setErrors({ form: "Something went wrong" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
       <div className="max-w-3xl mx-auto mt-12 p-10 rounded-3xl bg-white/10 backdrop-blur-lg shadow-2xl border border-white/20 relative">
  
      <div
        onClick={() => router.back()}
        className="absolute top-6 left-6 flex items-center text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-6 h-6 mr-2" />
        <span className="text-sm font-medium">Back</span>
      </div>

      <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-10 text-center tracking-tight">
        Update Profile
      </h2>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-gray-800 dark:text-gray-200 font-semibold mb-2 text-sm uppercase tracking-wide">
            Full Name
          </label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-800/50 border text-gray-900 dark:text-gray-100 placeholder-gray-400 shadow-sm focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition-all duration-300 ${
              errors.fullname ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your full name"
          />
          {errors.fullname && (
            <p className="text-red-500 text-xs mt-1">{errors.fullname}</p>
          )}
        </div>

        {/* Username (read-only) */}
        <div className="mb-4">
          <label className="block text-gray-800 dark:text-gray-200 font-semibold mb-2 text-sm uppercase tracking-wide">
            Username
          </label>
          <input
            type="text"
            value={formData.username}
            readOnly
            className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 cursor-not-allowed"
          />
        </div>

        {/* Email (read-only) */}
        <div className="mb-4">
          <label className="block text-gray-800 dark:text-gray-200 font-semibold mb-2 text-sm uppercase tracking-wide">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            readOnly
            className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 cursor-not-allowed"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-gray-800 dark:text-gray-200 font-semibold mb-2 text-sm uppercase tracking-wide">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-800/50 border text-gray-900 dark:text-gray-100 placeholder-gray-400 shadow-sm focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition-all duration-300 ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        {/* NID */}
        <div className="mb-4">
          <label className="block text-gray-800 dark:text-gray-200 font-semibold mb-2 text-sm uppercase tracking-wide">
            NID
          </label>
          <input
            type="text"
            name="nid"
            value={formData.nid}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-800/50 border text-gray-900 dark:text-gray-100 placeholder-gray-400 shadow-sm focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition-all duration-300 ${
              errors.nid ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your NID"
          />
          {errors.nid && (
            <p className="text-red-500 text-xs mt-1">{errors.nid}</p>
          )}
        </div>

        {/* Save Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-gray-800 font-semibold shadow-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
