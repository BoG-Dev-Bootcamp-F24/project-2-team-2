"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

interface Log {
  _id?: string;
  date: string;
  title: string;
  animal: string;
  hours: string;
  description: string;
}

export default function AllTrainingLogs() {
  const [logs, setLogs] = useState<Log[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await fetch("/api/admin/training");
      if (!response.ok) throw new Error("Failed to fetch logs");
      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  return (
    <>
      <TopBar />
      <div className="flex min-h-screen bg-gray-600">
        {" "}
        <Sidebar />
        <main className="flex-grow p-6 bg-white shadow-md">
          {" "}
          <div className={styles.searchContainer}>
            <h2 className="text-xl font-semibold text-gray-700">
              All Training Logs
            </h2>
          </div>
          <div className={styles.logsContainer}>
            {logs.map((log) => (
              <div key={log._id} className={styles.card}>
                <div className={styles.cardContent}>
                  <div className={styles.dateBox}>
                    <span className={styles.dateNumber}>
                      {log.date.split(" ")[0]}
                    </span>
                    <span className={styles.dateText}>
                      {log.date.split(" ")[1]}
                    </span>
                  </div>

                  <div className={styles.logInfo}>
                    <h3 className={styles.logTitle}>
                      {log.title} · {log.hours}
                    </h3>
                    <p className={styles.animalInfo}>{log.animal}</p>
                    <p className={styles.description}>{log.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
