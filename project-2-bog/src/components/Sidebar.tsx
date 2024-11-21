"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="bg-gray-100 w-64 h-screen p-6 shadow-md flex flex-col justify-between">
      <div className="flex items-center mb-8">
        <img src="/file.svg" alt="Progress Logo" className="w-8 h-8 mr-2" />
        <h1 className="text-xl font-bold text-black">Progress</h1>
      </div>

      <ul>
        <li className="mb-4">
          <Link
            href="/"
            className={`flex items-center ${
              pathname === "/" ? "text-red-500" : "text-gray-600"
            } font-semibold`}
          >
            Training logs
          </Link>
        </li>
        <li className="mb-4">
          <Link
            href="/Animals"
            className={`flex items-center ${
              pathname === "/Animals" ? "text-red-500" : "text-gray-600"
            } hover:text-black`}
          >
            Animals
          </Link>
        </li>
        <li className="mt-8 text-gray-600">Admin access</li>
        <li className="mb-4">
          <a
            href="/allTraining"
            className="flex items-center text-gray-600 hover:text-black"
          >
            All training
          </a>
        </li>
        <li className="mb-4">
          <a
            href="/allAnimals"
            className="flex items-center text-gray-600 hover:text-black"
          >
            All animals
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center text-gray-800 hover:text-black"
          >
           All users
          </a>
        </li>
      </ul>

      <div className="mt-auto bg-gray-600 p-4 rounded-lg flex items-center">
        <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-grey-600 font-bold mr-3">
          L
        </div>
        <div>
          <p>Long Lam</p>
          <p className="text-sm text-gray-400">Admin</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
