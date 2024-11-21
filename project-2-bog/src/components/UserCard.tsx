import React from "react";
import styles from "./UserCard.module.css";

interface UserCardProps {
  fullName: string;
  email: string;
  isAdmin: boolean;
}

const UserCard = ({ fullName, email, isAdmin }: UserCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.profilePicture}>
        <div className={styles.avatar}>{fullName.charAt(0).toUpperCase()}</div>
      </div>
      <div className={styles.detailsBox}>
        <h3 className={styles.name}>{fullName}</h3>
        <p className={styles.email}>{"Atlanta, Georgia"}</p>
        <p className={styles.role}>{isAdmin ? "Admin" : "User"}</p>
      </div>
    </div>
  );
};

export default UserCard;
