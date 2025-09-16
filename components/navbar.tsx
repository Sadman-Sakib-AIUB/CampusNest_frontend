import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { cookies } from "next/headers";
import { User } from "lucide-react";

export default async function Navbar() {
  let username: string | null = null;

  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt")?.value;

    if (jwt) {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/admin/profile`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      username =res.data.admin?.username || null;
    }
  } catch (error) {
    console.error("Failed to fetch profile:", error);
  }

  return (
    <header className="w-full bg-white shadow-md h-20 px-10 py-">
      <div className="max-w-9xl mx-auto flex items-center justify-between  py-3">
        {/* Left - Logo */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image
            src="/logo-rbg.png"
            alt="Company Logo"
            width={100}
            height={100}
          />
          
        </Link>

        

        {/* Right - User Section */}
        <div className="flex items-center gap-3">
          {username ? (
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-3 rounded-full text-xl">
              <User className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-800">{username}</span>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
