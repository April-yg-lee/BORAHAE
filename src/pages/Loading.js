import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.signin_contents}>
        <FontAwesomeIcon icon={faHeart} className={styles.b_logo} />
        <h2 className={styles.b_title}>BORAHAE</h2>
      </div>
    </div>
  );
}
