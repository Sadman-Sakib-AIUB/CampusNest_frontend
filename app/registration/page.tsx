"use client"
import {createAdminSchema} from "@/schema/registrationSchema";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";



const validateFormData = (formData: FormData) => {
  const validationData = {
    ...Object.fromEntries(formData.entries()),
    file: formData.get("file") as File,
  };

  const result = createAdminSchema.safeParse(validationData);
  // console.log(result);

  if (!result.success) {
    const formattedErrors: Record<string, string> = {};
    result.error.issues.forEach(err => {
      formattedErrors[err.path[0] as string] = err.message;
    });
    return { success: false, errors: formattedErrors };
  }
  return { success: true, data: result.data, errors: {} };
};

export default function Registration() {

  const router = useRouter();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    // console.log(e.currentTarget);

    const formData = new FormData (e.currentTarget);

    const validation = validateFormData(formData);

    if(!validation.success){
      setErrors(validation.errors);
      return;
    }

     try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/admin/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log("Server response:", response.data);

      router.push("/login");


    } catch (error: any) {
      if (error.response?.data?.message) {
        // console.log(error.response?.data?.message)
        setErrors({ form: error.response.data.message });
      } 
      else {
        setErrors({ form: "An unexpected error occurred. Please try again." });
      }
    }


  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-white px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name (full width) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              placeholder="John Doe"
              className="w-full px-4 py-2 border rounded-lg border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
            {errors.fullname && (
              <p className="text-red-500 text-xs mt-1">{errors.fullname}</p>
            )}
          </div>

          {/* Grid for two columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="johndoe"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="text"
                name="email"
                placeholder="john.doe@gmail.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                placeholder="01700000000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              <input
                type="text"
                name="age"
                placeholder="22"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
              {errors.age && (
                <p className="text-red-500 text-xs mt-1">{errors.age}</p>
              )}
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload File
              </label>
              <input
                type="file"
                name="file"
                className="w-full border border-gray-300 px-3 py-2 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
              {errors.file && (
                <p className="text-red-500 text-xs mt-1">{errors.file}</p>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-sky-600 text-white font-medium rounded-lg shadow hover:bg-sky-700 transition-all duration-200"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-600 text-center mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-sky-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

