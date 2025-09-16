import Link from "next/link";
import { GraduationCap, Users, BookOpen, BarChart3 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Campus Management Made Simple 🎓
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8">
          Manage courses, students, and faculty all in one place. 
          Our system helps institutions save time, improve efficiency, 
          and stay organized.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/login"
            className="px-6 py-3 bg-sky-600 text-white font-medium rounded-lg shadow hover:bg-sky-700 transition-all"
          >
            Get Started
          </Link>
          <Link
            href="/registration"
            className="px-6 py-3 bg-gray-100 text-gray-800 font-medium rounded-lg shadow hover:bg-gray-200 transition-all"
          >
            Register
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose Our System?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-sky-50 rounded-xl p-6 text-center shadow hover:shadow-md transition">
              <GraduationCap className="w-12 h-12 text-sky-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Student Management
              </h3>
              <p className="text-gray-600 text-sm">
                Track student records, enrollment, and performance effortlessly.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-sky-50 rounded-xl p-6 text-center shadow hover:shadow-md transition">
              <Users className="w-12 h-12 text-sky-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Faculty Management
              </h3>
              <p className="text-gray-600 text-sm">
                Organize teacher profiles, course assignments, and schedules.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-sky-50 rounded-xl p-6 text-center shadow hover:shadow-md transition">
              <BarChart3 className="w-12 h-12 text-sky-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Reports & Analytics
              </h3>
              <p className="text-gray-600 text-sm">
                Generate performance reports and track institutional progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-16 bg-sky-600 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Transform Your Campus?
        </h2>
        <p className="text-lg text-sky-100 mb-8">
          Join hundreds of institutions using our platform to simplify campus management.
        </p>
        <Link
          href="/registration"
          className="px-8 py-4 bg-white text-sky-700 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
        >
          Get Started Now
        </Link>
      </section>
    </div>
  );
}
