import React, { useState } from "react";
import styles from "./CreateAnimalForm.module.css";

interface CreateAnimalFormProps {
  onClose: () => void;
  onAnimalCreated: () => void;
}

const CreateAnimalForm = ({
  onClose,
  onAnimalCreated,
}: CreateAnimalFormProps) => {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [hoursTrained, setHoursTrained] = useState<number>(0);
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/animals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, breed, hoursTrained, profilePictureUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to create animal");
      }

      onAnimalCreated();
      onClose();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className={styles["form-container"]}>
      <h2>Create Animal</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Hours Trained"
          value={hoursTrained}
          onChange={(e) => setHoursTrained(parseInt(e.target.value, 10))}
          required
        />
        <input
          type="text"
          placeholder="Profile Picture URL"
          value={profilePictureUrl}
          onChange={(e) => setProfilePictureUrl(e.target.value)}
          required
        />
        <button type="submit">Create</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateAnimalForm;
