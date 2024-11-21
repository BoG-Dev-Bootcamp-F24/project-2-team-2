"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import TrainingLogItem from "./TrainingLogItem";
import TopBar from "../components/TopBar";
import styles from "./TrainingLogs.module.css";

interface Log {
  _id?: string;
  date: string;
  title: string;
  animal: string;
  hours: string;
  description: string;
}

const TrainingLogs = () => {
  const getCurrentDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} - ${year}`;
  };

  const [logs, setLogs] = useState<Log[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLog, setEditingLog] = useState<Log | null>(null);
  const [newLog, setNewLog] = useState<Log>({
    date: getCurrentDate(),
    title: "",
    animal: "",
    hours: "",
    description: "",
  });

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await fetch("/api/training-logs");
      if (!response.ok) {
        throw new Error("Failed to fetch logs");
      }
      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (editingLog) {
      setEditingLog((prev) => ({ ...prev!, [name]: value }));
    } else {
      setNewLog((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingLog) {
        const response = await fetch(`/api/training-logs`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingLog),
        });

        if (!response.ok) throw new Error("Failed to update log");
      } else {
        const response = await fetch("/api/training-logs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newLog),
        });

        if (!response.ok) throw new Error("Failed to create log");
      }
      await fetchLogs();
      setNewLog({
        date: "",
        title: "",
        animal: "",
        hours: "",
        description: "",
      });
      setEditingLog(null);
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error saving log:", error);
    }
  };

  const handleEdit = (log: Log) => {
    setEditingLog(log);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/training-logs?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete log");

      await fetchLogs();
    } catch (error) {
      console.error("Error deleting log:", error);
    }
  };

  return (
    <>
      <TopBar />
      <div className={styles.pageContainer}>
        {" "}
        <Sidebar />
        <main className={styles.mainContent}>
          {" "}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-700">
              Training logs
            </h2>
            <button
              onClick={() => {
                setEditingLog(null);
                setIsFormOpen(!isFormOpen);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-150"
            >
              + Create New
            </button>
          </div>
          {isFormOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow p-6 w-full max-w-lg mx-4"
              >
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                  {editingLog ? "Edit Training Log" : "New Training Log"}
                </h3>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    className="w-full border border-gray-700 rounded p-2 text-gray-700"
                    value={editingLog ? editingLog.title : newLog.title}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Animal
                  </label>
                  <input
                    type="text"
                    name="animal"
                    className="w-full border border-gray-700 rounded p-2 text-gray-700"
                    value={editingLog ? editingLog.animal : newLog.animal}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Total hours trained
                  </label>
                  <input
                    type="text"
                    name="hours"
                    className="w-full border border-gray-700 rounded p-2 text-gray-700"
                    value={editingLog ? editingLog.hours : newLog.hours}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Date
                  </label>
                  <input
                    type="text"
                    name="date"
                    className="w-full border border-gray-700 rounded p-2 text-gray-700"
                    placeholder="e.g., 20 Oct - 2023"
                    value={editingLog ? editingLog.date : newLog.date}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Note
                  </label>
                  <textarea
                    name="description"
                    className="w-full border border-gray-700 rounded p-2 text-gray-700"
                    rows={4}
                    value={
                      editingLog ? editingLog.description : newLog.description
                    }
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsFormOpen(false);
                      setEditingLog(null);
                    }}
                    className="px-4 py-2 border border-gray-700 rounded text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    {editingLog ? "Update" : "Save"}
                  </button>
                </div>
              </form>
            </div>
          )}
          {logs.map((log) => (
            <TrainingLogItem
              key={log._id}
              log={log}
              onEdit={() => handleEdit(log)}
            />
          ))}
        </main>
      </div>
    </>
  );
};

export default TrainingLogs;
