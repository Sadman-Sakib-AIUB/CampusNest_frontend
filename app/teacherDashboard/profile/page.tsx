import Link from "next/link";
import React from "react";
import axios from "axios";
import { cookies } from "next/headers";

export default async function TeacherProfile() {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_URL}/teacher/profile`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  const teacher = res.data.teacher;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-xl p-10 border border-gray-200">
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-blue-600 text-white flex items-center justify-center rounded-full text-3xl font-bold uppercase">
            {teacher.fullname[0]}
          </div>
          <h2 className="text-2xl font-semibold mt-4 text-gray-800">
            {teacher.fullname}
          </h2>
          <p className="text-gray-500 mt-1">@{teacher.username}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div className="p-4 bg-gray-50 rounded-xl shadow-sm">
            <p className="font-medium text-gray-500">Email</p>
            <p className="mt-1 text-gray-800">{res.data.email}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl shadow-sm">
            <p className="font-medium text-gray-500">Phone</p>
            <p className="mt-1 text-gray-800">{teacher.phone}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl shadow-sm">
            <p className="font-medium text-gray-500">NID</p>
            <p className="mt-1 text-gray-800">{teacher.nid}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl shadow-sm">
            <p className="font-medium text-gray-500">Username</p>
            <p className="mt-1 text-gray-800">{teacher.username}</p>
          </div>
        </div>

        <div className="flex justify-center mt-8 gap-6">
          <Link
            href="/teacherDashboard/profile/edit_profile"
            className="px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-xl hover:bg-blue-600 hover:text-white  duration-500 transition"
          >
            Update Profile
          </Link>
          <Link
            href="/teacherDashboard/profile/change_password"
            className="px-6 py-3 border border-yellow-500 text-yellow-500 font-medium rounded-xl hover:bg-yellow-500 hover:text-white  duration-500 transition"
          >
            Change Password
          </Link>
        </div>
      </div>
    </div>
  );
}
