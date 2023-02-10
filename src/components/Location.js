/*eslint-disable */
import React, { Profiler } from "react";
import styles from "../pages/MainBoard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function Location() {
  return (
    <h3 className={styles.subTitle}>
      <FontAwesomeIcon icon={faLocationDot} />
      &nbsp;Vancouver, Canada
    </h3>
  );
}
