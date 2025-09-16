"use client";
import React, { useState } from "react";
import { createschema } from "@/teacherschema/teacherschema";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const validateForm = (formData: FormData) => {
  const validationData = {
    ...Object.fromEntries(formData.entries()),
    nidImage: formData.get("file"),
  };

  const result = createschema.safeParse(validationData);

  if (!result.success) {
    const formattedErrors: Record<string, string> = {};
    result.error.issues.forEach((err) => {
      formattedErrors[err.path[0] as string] = err.message;
    });
    return { success: false, errors: formattedErrors };
  }
  return { success: true, data: result.data, errors: {} };
};

export default function TeacherForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const validation = validateForm(formData);
    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/teacher/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      router.push("/teacherlogin");
    } catch (error: any) {
      if (error.response?.data?.message) {
        setErrors({ form: error.response.data.message });
      } else {
        setErrors({ form: "An unexpected error occurred. Please try again." });
      }
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl p-2 px-4 bg-white rounded-2xl shadow-lg space-y-3"
      >
        <h2 className="text-3xl font-semibold text-center">
          Teacher Registration
        </h2>

        <div>
          <label className="block mb-1 font-medium">Fullname</label>
          <input
            type="text"
            name="fullname"
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.fullname && (
            <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            name="username"
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="text"
            name="email"
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">NID</label>
          <input
            type="text"
            name="nid"
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.nid && (
            <p className="text-red-500 text-sm mt-1">{errors.nid}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">NID Image</label>
          <input
            type="file"
            name="file"
            accept="image/*"
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.file && (
            <p className="text-red-500 text-sm mt-1">{errors.file}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 "
        >
          Submit
        </button>

        <p className="text-center text-sm text-gray-600">
          Do u have an account already
          <Link href="/teacherlogin" className="text-blue-600 hover:underline">
            Login Here
          </Link>
        </p>
      </form>
    </div>
  );
}
