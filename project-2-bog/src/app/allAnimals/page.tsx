"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import AnimalCard from "../../components/AnimalCard";
import CreateAnimalForm from "../../components/CreateAnimalForm";
import styles from "./page.module.css";

interface Animal {
  name: string;
  breed: string;
  hoursTrained: number | null;
  profilePictureUrl: string;
  image?: string;
}

const AnimalsPage = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);

  const fetchAnimals = async () => {
    try {
      const response = await fetch("/api/admin/animals");
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
    <div className={styles.pageContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search"
            className={styles.searchInput}
          />
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
                image={animal.image}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AnimalsPage;