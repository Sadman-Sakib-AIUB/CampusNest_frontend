"use client";


import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {

  return ( 
    <footer className="bg-black text-white py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">Student</h3>
          <p className="text-gray-400">
            student work.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-blue-400">Home</a></li>
            <li><a href="/dashboard" className="hover:text-blue-400">Dashboard</a></li>
            <li><a href="/profile" className="hover:text-blue-400">Profile</a></li>
            <li><a href="/login" className="hover:text-blue-400">Login</a></li>
          </ul>
        </div>

        {/* Contact + Social */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p className="text-gray-300">123 Main Street, Dhaka, Bangladesh</p>
          <p className="text-gray-300">Email: jakaria53@gmail.com</p>
          <p className="text-gray-300">Phone: +880 1234 567890</p>
          

          <h3 className="text-xl font-bold mt-6 mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 rounded-full bg-sky-400 hover:bg-sky-500 transition">
              <FaTwitter />
            </a>
            <a href="#" className="p-2 rounded-full bg-pink-500 hover:bg-pink-600 transition">
              <FaInstagram />
            </a>
            <a href="#" className="p-2 rounded-full bg-blue-700 hover:bg-blue-800 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Student info. All rights reserved.
      </div>
    </footer>
  );
}
