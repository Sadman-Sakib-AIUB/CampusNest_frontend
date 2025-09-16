"use client";
import { BookOpen, Users, BarChart3, Settings } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📊 Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">
        Welcome back! Here’s an overview of your campus management system.
      </p>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white shadow rounded-2xl p-5 flex items-center gap-4">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">120</h2>
            <p className="text-gray-500 text-sm">Total Courses</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-2xl p-5 flex items-center gap-4">
          <div className="bg-green-100 text-green-600 p-3 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">45</h2>
            <p className="text-gray-500 text-sm">Active Teachers</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-2xl p-5 flex items-center gap-4">
          <div className="bg-yellow-100 text-yellow-600 p-3 rounded-xl">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">300+</h2>
            <p className="text-gray-500 text-sm">Enrolled Students</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-2xl p-5 flex items-center gap-4">
          <div className="bg-purple-100 text-purple-600 p-3 rounded-xl">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">10</h2>
            <p className="text-gray-500 text-sm">Pending Tasks</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-2xl p-6 hover:shadow-lg transition">
          <h3 className="font-semibold text-gray-700 mb-2">Manage Courses</h3>
          <p className="text-gray-500 text-sm mb-4">
            Add, edit, or delete courses offered for (Fall 25-26 semester).
          </p>
          <Link
            href="/dashboard/manage_course"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go
          </Link>
        </div>

        <div className="bg-white shadow rounded-2xl p-6 hover:shadow-lg transition">
          <h3 className="font-semibold text-gray-700 mb-2">Add Course</h3>
          <p className="text-gray-500 text-sm mb-4">
            Add new course for the Fall 25-26 semester.
          </p>
          <Link
            href="/dashboard/add_course"
            className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Go
          </Link>
        </div>

        <div className="bg-white shadow rounded-2xl p-6 hover:shadow-lg transition">
          <h3 className="font-semibold text-gray-700 mb-2">All Courses</h3>
          <p className="text-gray-500 text-sm mb-4">
            View full list of available courses for the (Fall 25-26) semester.
          </p>
          <Link
            href="/dashboard/manage_course"
            className="inline-block px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
          >
            Go
          </Link>
        </div>
      </div>
    </div>
  );
}
