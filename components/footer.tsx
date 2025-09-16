import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="footer">
      <Link href="/"><Image 
        src="/logo-rbg.png"
        alt="Company Logo"
        width={100}
        height={100}
        
      /></Link>
      <h1 className="text-sm" >All rights reserved © 2025 | CampusNest</h1>
   </div>
  );
}
