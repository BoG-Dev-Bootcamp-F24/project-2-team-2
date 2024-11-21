import React, { useState } from "react";
import styles from "./CreateAnimalForm.module.css";

interface Animal {
  name: string;
  owner: string;
  breed: string;
  hoursTrained: number | null;
  profilePictureUrl: string;
  image?: string;
}

interface CreateAnimalFormProps {
  onClose: () => void;
  onAnimalCreated: (newAnimal: Animal) => void;
}

const CreateAnimalForm = ({
  onClose,
  onAnimalCreated,
}: CreateAnimalFormProps) => {
  const [name, setName] = useState("");
  const [owner, setOwner] = useState(""); // Dynamic owner input
  const [breed, setBreed] = useState("");
  const [hoursTrained, setHoursTrained] = useState<number | null>(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Check if owner is provided
    if (!owner) {
      setError("Owner (username) is required");
      return;
    }

    try {
      const response = await fetch("/api/animals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          owner,
          breed,
          hoursTrained,
          profilePictureUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create animal");
      }

      const newAnimal: Animal = {
        name,
        owner,
        breed,
        hoursTrained,
        profilePictureUrl,
      };

      onAnimalCreated(newAnimal);
      onClose();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHoursTrained(value === "" ? null : parseInt(value, 10));
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.h2}>Please enter all the information.</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Animal Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Input for owner (dynamic, user's username) */}
        <input
          className={styles.input}
          type="text"
          placeholder="Owner (Username)"
          value={owner}
          onChange={(e) => setOwner(e.target.value)} // Handle owner input
          required
        />

        <input
          className={styles.input}
          type="text"
          placeholder="Breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          required
        />
        <input
          className={styles.input}
          type="number"
          placeholder="Hours Trained"
          value={hoursTrained ?? ""}
          onChange={handleHoursChange}
          required
        />
        <input
          className={styles.input}
          type="text"
          placeholder="Profile Picture URL"
          value={profilePictureUrl}
          onChange={(e) => setProfilePictureUrl(e.target.value)}
          required
        />
        <button type="submit" className={`${styles.button} ${styles.submit}`}>
          Create
        </button>
        <button type="button" className={styles.button} onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateAnimalForm;
