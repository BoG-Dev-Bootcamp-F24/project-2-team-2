import React from "react";
import Link from "next/link";

const TopBar = () => {
  return (
    <div className="topbar-container flex justify-between items-center sticky top-0 z-50 px-5 py-2.5 bg-white shadow-md border-b-2 border-black">
      <div className="flex items-center">
        <Link href="/">
          <img
            src="/logo.png"
            alt="Logo"
            className="topbar-logo h-8 w-auto mr-4 cursor-pointer"
          />
        </Link>
        <span className="topbar-title text-lg font-bold text-[#333]">
          Progress
        </span>
      </div>
    </div>
  );
};

export default TopBar;
