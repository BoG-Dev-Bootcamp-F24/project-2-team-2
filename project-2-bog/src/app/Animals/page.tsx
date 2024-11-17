"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import AnimalCard from "../../components/AnimalCard";
import CreateAnimalForm from "../../components/CreateAnimalForm";
import styles from "./page.module.css";

interface Animal {
  name: string;
  breed: string;
  owner: string;
  hoursTrained: number;
  image: string;
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
    <div className={styles.pageContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search"
            className={styles.searchInput}
          />
          <button onClick={handleCreateNew} className={styles.createButton}>
            + Create new
          </button>
        </div>

        {showForm ? (
          <CreateAnimalForm
            onClose={() => setShowForm(false)}
            onCreate={(newAnimal: Animal) =>
              setAnimals([...animals, newAnimal])
            }
          />
        ) : (
          <div className={styles.gridContainer}>
            {animals.map((animal) => (
              <AnimalCard
                key={animal.breed + animal.owner}
                name={animal.name}
                breed={animal.breed}
                owner={animal.owner}
                hoursTrained={animal.hoursTrained}
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
