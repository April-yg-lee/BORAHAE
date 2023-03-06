import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import styles from "../pages/SignInMain.module.css";

export default function LogoTitle() {
  return (
    <>
      <FontAwesomeIcon icon={faHeart} className={styles.b_logo} />
      <h2 className={styles.b_title}>BORAHEY</h2>
    </>
  );
}
