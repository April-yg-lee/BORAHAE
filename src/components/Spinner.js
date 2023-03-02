import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
import styles from "./Spinner.module.css";

export default function Spinner() {
  return (
    <div className={styles.spinnerBox}>
      <PacmanLoader color='#7259f5' size={15} />
    </div>
  );
}
