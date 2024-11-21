"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="bg-gray-100 w-64 h-screen p-6 shadow-md flex flex-col justify-between">
      <ul>
        <li className="mb-4">
          <Link
            href="/"
            className={`flex items-center ${
              pathname === "/"
                ? "text-red-500 font-bold"
                : "text-gray-600 font-bold"
            }`}
          >
            <img
              src="/logo1.svg"
              alt="Training logs icon"
              className="w-6 h-6 mr-3"
            />
            Training logs
          </Link>
        </li>
        <li className="mb-4">
          <Link
            href="/Animals"
            className={`flex items-center ${
              pathname === "/Animals"
                ? "text-red-500 font-bold"
                : "text-gray-600 font-bold"
            } hover:text-black`}
          >
            <img src="/logo2.svg" alt="Animals icon" className="w-6 h-6 mr-3" />
            Animals
          </Link>
        </li>
        <li className="mt-8 text-gray-600 font-bold">Admin access</li>
        <li className="mb-4">
          <Link
            href="/allTraining"
            className={`flex items-center ${
              pathname === "/allTraining"
                ? "text-red-500 font-bold"
                : "text-gray-600 font-bold"
            } hover:text-black`}
          >
            <img
              src="/logo3.svg"
              alt="All training icon"
              className="w-6 h-6 mr-3"
            />
            All training
          </Link>
        </li>
        <li className="mb-4">
          <Link
            href="/allAnimals"
            className={`flex items-center ${
              pathname === "/allAnimals"
                ? "text-red-500 font-bold"
                : "text-gray-600 font-bold"
            } hover:text-black`}
          >
            <img
              src="/logo4.svg"
              alt="All animals icon"
              className="w-6 h-6 mr-3"
            />
            All animals
          </Link>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center text-gray-800 font-bold hover:text-black"
          >
            <img
              src="/logo5.svg"
              alt="All users icon"
              className="w-6 h-6 mr-3"
            />
            All users
          </a>
        </li>
      </ul>

      <div className="mt-auto bg-gray-500 p-4 rounded-lg flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-gray-600 font-bold mr-3">
            L
          </div>
          <div>
            <p>Long Lam</p>
            <p className="text-sm text-gray-400">Admin</p>
          </div>
        </div>
        <a href="/account/login" className="hover:opacity-80 transition">
          <img src="/logout.svg" alt="Logout" className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
