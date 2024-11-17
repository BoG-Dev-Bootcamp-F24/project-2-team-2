import React from "react";
import styles from "./AnimalCard.module.css";

interface AnimalCardProps {
  image: string;
  name: string;
  breed: string;
  owner: string;
  hoursTrained: number;
}

const AnimalCard = ({
  image,
  name,
  breed,
  owner,
  hoursTrained,
}: AnimalCardProps) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.image} />
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.details}>Breed: {breed}</p>
      <p className={styles.details}>Owner: {owner}</p>
      <p className={styles.details}>
        Hours Trained:{" "}
        <span className={styles.hoursTrained}>{hoursTrained}</span>
      </p>
    </div>
  );
};

export default AnimalCard;
