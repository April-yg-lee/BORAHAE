import React from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import styles from "./Spinner.module.css";


export default function Spinner() {

  return (
    <div className={styles.eachSpinner}>
      <PacmanLoader color='#58FBDA' size={10} />
    </div>
  );
}
