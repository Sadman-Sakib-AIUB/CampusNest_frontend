"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Course = {
  id: number;
  courseName: string;
};

export default function DashboardLayout() {
  const [courses, setCourses] = useState<Course[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/teacher/viewcourse`
        );
        setCourses(res.data); 
      } catch (err: any) {
        
      } 
    };

    fetchCourses();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Courses</h2>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border border-gray-300">Course ID</th>
            <th className="p-3 border border-gray-300">Course Name</th>
            <th className="p-3 border border-gray-300 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className="hover:bg-gray-50">
              <td className="p-3 border border-gray-300">{course.id}</td>
              <td className="p-3 border border-gray-300">{course.courseName}</td>
              <td className="p-3 border border-gray-300 text-center">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={() => router.push(`/teacherDashboard/courses/${course.id}`)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}

          {courses.length === 0 && (
            <tr>
              <td colSpan={3} className="p-3 text-center text-gray-500">
                No courses found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
