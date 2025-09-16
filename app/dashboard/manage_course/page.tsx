"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Course {
  id: number;
  courseName: string;
  courseCode: string;
  description?: string;
  credit: number;
  createdAt: string;
}

export default function ManageCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/admin/courses/allcourse`
        );
        setCourses(res.data);
      } catch (err) {
        setMessage("❌ Failed to load courses");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Delete course
  const handleDelete = async (id: number) => {
  if (!confirm("Are you sure you want to delete this course?")) return;

  try {
    const res = await axios.delete(`/api/delete_course/${id}`);
    setCourses((prev) => prev.filter((course) => course.id !== id));
    setMessage(res.data.message || "✅ Course deleted successfully");
  } catch (err: any) {
    console.error("Delete failed:", err);
    setMessage(err.response?.data?.message || "❌ Failed to delete course");
  }
};



  // Edit redirect
  const handleEdit = (id: number) => {
    window.location.href = `/dashboard/edit/${id}`;
  };

  return (
    <div>
      <div className="relative flex items-center justify-center mb-6">
      <Link href="/dashboard"><ArrowLeft className="absolute left-0 cursor-pointer text-gray-600 hover:text-gray-900" /></Link>
      <h1 className="text-2xl font-semibold">📋 Manage Courses</h1>
    </div>
      {message && (
        <div className="mb-4 p-3 rounded bg-gray-100 text-gray-700">
          {message}
        </div>
      )}

      {loading ? (
        <p>Loading courses...</p>
      ) : courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Course Name</th>
                <th className="p-3 border">Course Code</th>
                <th className="p-3 border">Description</th>
                <th className="p-3 border">Credit</th>
                <th className="p-3 border">Created At</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{course.id}</td>
                  <td className="p-3 border">{course.courseName}</td>
                  <td className="p-3 border">{course.courseCode}</td>
                  <td className="p-3 border">{course.description || "—"}</td>
                  <td className="p-3 border">{course.credit}</td>
                  <td className="p-3 border">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 border flex gap-2">
                    <Link
                      href={`/dashboard/edit_course/${course.id}`}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
