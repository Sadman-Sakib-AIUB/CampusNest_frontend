import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Sidebar from "@/components/sidebar";

export default function DasboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <div className="flex flex-col min-h-screen">
        {/* Top Navbar */}
        <Navbar />

        {/* Sidebar + Main Content */}
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 bg-gray-100">{children}</main>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    
  );
}
