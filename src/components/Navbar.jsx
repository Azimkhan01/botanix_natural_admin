"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full border-b  px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-green-600">
        Botanix Natural
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 text-gray-700">
        <Link href="/enquiry" className="hover:text-green-600 transition">
          Enquiry
        </Link>
        <Link href="/contact" className="hover:text-green-600 transition">
          Contact
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white z-10 border-b shadow-md flex flex-col items-center gap-4 py-4 md:hidden">
          <Link
            href="/enquiry"
            className="text-gray-700 text-lg hover:text-green-600"
            onClick={() => setIsOpen(false)}
          >
            Enquiry
          </Link>
          <Link
            href="/contact"
            className="text-gray-700 text-lg hover:text-green-600"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
