"use client";
import React, { useState } from "react";
import axios from "axios";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const passwordSchema = z.object({
  oldPassword: z.string().min(8, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Confirm password is required"),
});

const validateForm = (formData: FormData) => {
  const validationData = {
    ...Object.fromEntries(formData.entries()),
    
  };

  const result = passwordSchema.safeParse(validationData);

  if (!result.success) {
    const formattedErrors: Record<string, string> = {};
    result.error.issues.forEach((err) => {
      formattedErrors[err.path[0] as string] = err.message;
    });
    return { success: false, errors: formattedErrors };
  }
  return { success: true, data: result.data, errors: {} };
};

export default function ChangePassword() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const validation = validateForm(formData);

    // console.log(formData);

    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }

    if (
      validation.data &&
      validation.data.oldPassword === validation.data.newPassword
    ) {
      setErrors({
        ...validation.errors,
        newPassword: "New password must be different from current password",
      });
      return;
    }

    if (
      validation.data &&
      validation.data.newPassword !== validation.data.confirmPassword
    ) {
      setErrors({
        ...validation.errors,
        confirmPassword: "New password and confirm password do not match",
      });
      return;
    }

    try {
      await axios.patch("/api/teacher/change-password", formData);
      alert("Password updated successfully");
      router.push("/teacherDashboard/profile");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response?.data?.message.includes("Old")) {
          setErrors({
            oldPassword: "Old password is incorrect",
          });
          return;
        }
      }
      // console.log("Failed to update password:", error);
    }
  };
  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-white/60 to-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-10 mt-10 transition-all duration-300">
      <div
        onClick={() => router.back()}
        className="absolute top-6 left-6 flex items-center text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-6 h-6 mr-2" />
        <span className="text-sm font-medium">Back</span>
      </div>

      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">
        🔒 Change Password
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Old Password */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-sm tracking-wide">
            Old Password
          </label>
          <input
            type="password"
            name="oldPassword"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 focus:bg-white focus:border-yellow-400 focus:ring-4 focus:ring-yellow-200 transition-all duration-300 placeholder-gray-400"
            placeholder="Enter current password"
          />
          <p className="h-5 text-red-500 text-xs mt-1">
            {errors.oldPassword || ""}
          </p>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-sm tracking-wide">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 focus:bg-white focus:border-yellow-400 focus:ring-4 focus:ring-yellow-200 transition-all duration-300 placeholder-gray-400"
            placeholder="Enter new password"
          />
          <p className="h-5 text-red-500 text-xs mt-1">
            {errors.newPassword || ""}
          </p>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-sm tracking-wide">
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 focus:bg-white focus:border-yellow-400 focus:ring-4 focus:ring-yellow-200 transition-all duration-300 placeholder-gray-400"
            placeholder="Confirm new password"
          />
          <p className="h-5 text-red-500 text-xs mt-1">
            {errors.confirmPassword || ""}
          </p>
        </div>

        {/* Change Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 font-semibold rounded-xl shadow-lg hover:from-yellow-500 hover:to-yellow-600 focus:ring-4 focus:ring-yellow-200 transition-all duration-300"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
}
