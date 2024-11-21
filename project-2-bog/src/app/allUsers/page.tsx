"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import UserCard from "../../components/UserCard";

interface User {
  _id?: string;
  fullName: string;
  email: string;
  isAdmin: boolean;
}

export default function AllUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <>
      <TopBar />
      <div className="flex min-h-screen bg-gray-600">
        <Sidebar />
        <main className="flex-grow p-6 bg-white shadow-md">
          <div className={styles.searchContainer}>
            <h2 className="text-xl font-semibold text-gray-700">All Users</h2>
          </div>
          <div className={styles.logsContainer}>
            {users.map((user) => (
              <UserCard
                key={user._id}
                fullName={user.fullName}
                email={user.email}
                isAdmin={user.isAdmin}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
