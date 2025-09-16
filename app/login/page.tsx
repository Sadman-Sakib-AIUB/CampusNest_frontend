"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (form.email as HTMLInputElement).value.trim();
    const password = (form.password as HTMLInputElement).value.trim();

    const newErrors: { email?: string; password?: string } = {};

    // Email validation
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!email.includes("@")) {
      newErrors.email = "Email must contain '@'.";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    // If validation failed → stop
    if (Object.keys(newErrors).length > 0) return;

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/admin/login`,
        { email, password }, // send JSON, not FormData
        { withCredentials: true }
      );

      router.push("/dashboard");
    } catch (error: any) {
      const message = error.response?.data?.message || "Invalid Email and Password";

      // create fresh error object
      setErrors({ password: message });
    }
  };


  return (
    <div className="min-h-screen flex gap-10 items-center justify-center bg-gradient-to-br from-sky-100 to-white px-4">
      <Link href="/"><img src="./logo-rbg.png" alt="" width={500} height={500} /></Link>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Login
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E-mail Address
            </label>
            <input
              type="text"
              name="email"
              placeholder="john.doe@gmail.com"
              className={`w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
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
              className={`w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-sky-600 text-white font-medium rounded-lg shadow hover:bg-sky-700 transition-all duration-200"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-600 text-center mt-6">
          Don’t have an account?{" "}
          <Link
            href="/registration"
            className="text-sky-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
