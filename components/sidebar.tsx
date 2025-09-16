"use client";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronRight, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Sidebar() {
  const [openCourses, setOpenCourses] = useState(false);

  const router = useRouter();


  const handleLogout = async () => {
    try {
      const res = await axios.post("/api/logout");
      if (res.status === 200) {
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };


  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col p-4 shadow-lg">
      <h2 className="text-xl font-bold mb-6 text-center">Admin Panel</h2>

      <nav className="flex flex-col gap-2">
        {/* Dashboard */}
        <Link
          href="/dashboard"
          className="px-3 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          Dashboard
        </Link>

        {/* Courses Dropdown */}
        <button
          onClick={() => setOpenCourses(!openCourses)}
          className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          <span>Courses</span>
          {openCourses ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </button>

        {openCourses && (
          <div className="ml-4 flex flex-col gap-2">
            <Link
              href="/dashboard/add_course"
              className="px-3 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              ➕ Add Course
            </Link>
            <Link
              href="/dashboard/manage_course"
              className="px-3 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              📋 Manage Course
            </Link>
          </div>
        )}

        {/* Logout */}
        <button
        onClick={handleLogout}
          
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-600 transition mt-auto"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}
