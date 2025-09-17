// components/Navbar.tsx
"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = () => {
    if (typeof window !== "undefined") localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo / Title */}
        <div className="text-xl font-bold text-indigo-600">Student Portal</div>

        {/* Menu Links */}
        <ul className="flex gap-4 md:gap-6 items-center">
          <li>
            <Link
              href="/"
              className="px-3 py-2 rounded-md text-gray-800 hover:bg-indigo-600 hover:text-white transition-colors duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/registration"
              className="px-3 py-2 rounded-md text-gray-800 hover:bg-indigo-600 hover:text-white transition-colors duration-200"
            >
              Registration
            </Link>
          </li>
          <li>
            <Link
              href="/login"
              className="px-3 py-2 rounded-md text-gray-800 hover:bg-indigo-600 hover:text-white transition-colors duration-200"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              className="px-3 py-2 rounded-md text-gray-800 hover:bg-indigo-600 hover:text-white transition-colors duration-200"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard"
              className="px-3 py-2 rounded-md text-gray-800 hover:bg-indigo-600 hover:text-white transition-colors duration-200"
            >
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
