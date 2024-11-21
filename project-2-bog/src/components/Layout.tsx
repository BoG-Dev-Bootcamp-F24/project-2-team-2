// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Sidebar from "../components/Sidebar"; // Assuming Sidebar is in components
// import "./globals.css";

// interface HomeProps {
//   userData: any;
// }

// export default function Home({ userData }: HomeProps) {
//   const router = useRouter();

//   useEffect(() => {
//     console.log(userData);
//     if (!userData) {
//       router.push("/account/login");
//     }
//   }, [userData]);

//   const fullName = userData?.fullName || "";
//   const email = userData?.email || "";

//   return (
//     <div className="flex">
//       <Sidebar fullName={fullName} email={email} />
//       <div className="flex-1 p-6">{/* Other content goes here */}</div>
//     </div>
//   );
// }

import React from "react";
import Sidebar from "./Sidebar";
import TrainingLogs from "./TrainingLogs";

const Layout = () => {
  return (
    <>
      <div className="flex min-h-screen bg-gray-600">
        <Sidebar />

        <main className="flex-grow p-6 bg-white shadow-md">
          <div className="mb-6 flex justify-between items-center border-b pb-4">
            <input
              type="text"
              placeholder="Search"
              className="border px-4 py-2 rounded-md w-full max-w-xs focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <TrainingLogs />
        </main>
      </div>
    </>
  );
};

export default Layout;
