"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setErrors({ message: "Email and Password are required" });
      return;
    }

    const emailRegex = /^[^\s@]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      setErrors({ message: "Please enter a valid email address" });
      return;
    }

    try {
      await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_URL}/teacher/signin`,
        data: formData,
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      router.push("/teacherDashboard");
    } catch (error: any) {
      // console.log("Login error:", error);
      const message = error.response?.data?.message || "Something went wrong";
      // console.log(message);
      if (message) {
        setErrors({ message });
      }
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg space-y-4"
      >
        <h1 className="text-3xl font-semibold text-center">Teacher Login</h1>
        <p className="text-center text-gray-600">
          Welcome back! Please log in with your email and password.
        </p>

        <div>
          <label htmlFor="email" className="block mb-1 ">
            Email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {errors.message && (
          <p className="text-red-500 text-sm text-center">{errors.message}</p>
        )}
        <div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link href="/teachersignup" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </main>
  );
}
