import React from "react";
import styles from "./AnimalCard.module.css";

interface AnimalCardProps {
  image?: string;
  name: string;
  breed: string;
  owner: string;
  hoursTrained: number;
  birthMonth: string;
  date: number | null;
  year: number | null;
  notes: string;
}

const AnimalCard = ({
  image = "/doggooo.avif",
  name,
  breed,
  owner,
  hoursTrained,
}: AnimalCardProps) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.image} />
      <div className={styles.content}>
        <div className={styles.ownerRow}>
          <div className={styles.ownerIcon}>
            {owner.charAt(0).toUpperCase()}
          </div>
          <div className={styles.detailsBox}>
            <h3 className={styles.name}>
              {name} - {breed}
            </h3>
            <p className={styles.details}>
              {owner} - Trained {hoursTrained} hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;
