// app/dashboard/layout.tsx
import React from "react";
import Navbar from "@/teacherComponent/navbar";
import Sidebar from "@/teacherComponent/sidebar";
import Footer from "@/teacherComponent/footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 ml-64 bg-gray-50">{children}</main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
