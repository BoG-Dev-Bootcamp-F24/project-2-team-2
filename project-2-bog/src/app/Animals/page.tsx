"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import AnimalCard from "../../components/AnimalCard";
import CreateAnimalForm from "../../components/CreateAnimalForm";
import TopBar from "../../components/TopBar";
import styles from "./page.module.css";

interface Animal {
  name: string;
  breed: string;
  hoursTrained: number | null;
  profilePictureUrl: string;
  birthMonth: string;
  date: number | null;
  year: number | null;
  notes: string;
  image?: string;
}

const AnimalsPage = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);

  const fetchAnimals = async () => {
    try {
      const response = await fetch("/api/animals");
      if (!response.ok) {
        throw new Error("Failed to fetch animals");
      }
      const data: Animal[] = await response.json();
      setAnimals(data);
    } catch (err) {
      console.error("Error fetching animals:", err);
    }
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  const handleCreateNew = () => setShowForm(true);

  return (
    <>
      <TopBar />
      <div className={styles.pageContainer}>
        <Sidebar />
        <main className={styles.mainContent}>
          <div className={styles.searchContainer}>
            <h2 className="text-xl font-semibold text-gray-700">Animals</h2>

            <button onClick={handleCreateNew} className={styles.createButton}>
              + Create new
            </button>
          </div>

          {showForm ? (
            <CreateAnimalForm
              onClose={() => setShowForm(false)}
              onAnimalCreated={(newAnimal: Animal) =>
                setAnimals([...animals, newAnimal])
              }
            />
          ) : (
            <div className={styles.gridContainer}>
              {animals.map((animal) => (
                <AnimalCard
                  key={animal.breed + animal.name}
                  name={animal.name}
                  breed={animal.breed}
                  owner="Long Lam"
                  hoursTrained={animal.hoursTrained ?? 0}
                  birthMonth={animal.birthMonth}
                  date={animal.date ?? 0}
                  year={animal.year ?? 0}
                  notes={animal.notes}
                  image={animal.image}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default AnimalsPage;
