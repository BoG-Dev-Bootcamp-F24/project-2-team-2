import React from "react";
import Sidebar from "./Sidebar";
import TrainingLogs from "./TrainingLogs";
import TopBar from "./TopBar";

const Layout = () => {
  return (
    <>
      <TopBar />
      <div className="flex min-h-screen bg-gray-600">
        <Sidebar />

        <main className="flex-grow p-6 bg-white shadow-md">
          <TrainingLogs />
        </main>
      </div>
    </>
  );
};

export default Layout;
