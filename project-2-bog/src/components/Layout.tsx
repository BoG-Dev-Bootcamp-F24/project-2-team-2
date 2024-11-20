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
