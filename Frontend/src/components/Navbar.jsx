import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Hamburger and Close icons

const navItems = [
  { name: "Home", to: "/" },
  { name: "Buy Now", to: "/buy" },
  { name: "Track Order", to: "/track" },
  { name: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">MyShop</div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                    : "text-gray-700 hover:text-blue-600"
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Hamburger Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="flex flex-col gap-4 mt-4 md:hidden">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                    : "text-gray-700 hover:text-blue-600"
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
