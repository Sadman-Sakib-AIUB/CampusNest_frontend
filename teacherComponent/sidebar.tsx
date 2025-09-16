"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = async () => {
  try {
    await axios.post("/api/teacher/logout");
    router.push("/teacherlogin"); // redirect after logout
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

  return (
    <aside className="fixed top-16 left-0 w-64 h-full bg-gray-800 text-white shadow-lg">
      <ul className="flex flex-col gap-4 p-6">
        <li>
          <Link href="/teacherDashboard" className="block hover:text-blue-400">
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            href="/teacherDashboard/settings"
            className="block hover:text-blue-400"
          >
            Settings
          </Link>
        </li>

        <li>
          <button onClick={handleLogout} className="block hover:text-red-400">
            Logout
          </button>
        </li>
      </ul>
    </aside>
  );
}
