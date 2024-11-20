import React from "react";
import styles from "./AnimalCard.module.css";

interface AnimalCardProps {
  image?: string;
  name: string;
  breed: string;
  owner: string;
  hoursTrained: number;
}

const AnimalCard = ({
  image = "/dog.svg",
  name,
  breed,
  owner,
  hoursTrained,
}: AnimalCardProps) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.image} />
      <h3 className={styles.name}>
        {name} - {breed}
      </h3>
      <p className={styles.details}>
        {owner} - Trained {hoursTrained} hours
      </p>
    </div>
  );
};

export default AnimalCard;
