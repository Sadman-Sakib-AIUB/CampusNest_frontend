import Link from "next/link";
import { getTeacherUsername } from "./getusername";

export default async function Navbar() {
  const username = await getTeacherUsername();
  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-blue-600 text-white flex items-center justify-between px-6 shadow-md z-50">
      <div>
        <Link href="/teacherDashboard">
          <h1 className="text-xl font-bold cursor-pointer">Shop Management</h1>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-2xl">🧝</span>
        <Link
          href="/teacherDashboard/profile"
          className="text-lg font-medium hover:text-gray-200"
        >
          {username}
        </Link>
      </div>
    </header>
  );
}



