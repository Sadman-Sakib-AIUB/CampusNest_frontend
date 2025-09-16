"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

type Course = {
  id: number;
  courseName: string;
  courseCode: string;
  description: string | null;
  credit: string;
};

export default function CourseDetails() {
  const { id } = useParams(); 
  const [course, setCourse] = useState<Course | null>(null);
 

  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/teacher/coursedetails/${id}`
        );
        setCourse(res.data);
      } catch (err: any) {
        
      } 
    };

    fetchCourse();
  }, [id]);

 

  if (!course) {
    return <p className="text-center mt-10 text-gray-500">No course found</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {course.courseName}
      </h2>

      <div className="space-y-4 text-gray-700">
        <p>
          <span className="font-semibold">Course ID:</span> {course.id}
        </p>
        <p>
          <span className="font-semibold">Course Code:</span> {course.courseCode}
        </p>
        <p>
          <span className="font-semibold">Credit:</span> {course.credit}
        </p>
        <p>
          <span className="font-semibold">Description:</span>{" "}
          {course.description || "No description available"}
        </p>
      </div>
    </div>
  );
}
