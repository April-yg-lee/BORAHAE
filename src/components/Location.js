/*eslint-disable */
import React, { Profiler } from "react";
import styles from "../pages/MainBoard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

export default function Location() {
  let userCityShow = useSelector((state) => state.userCityShow);
  let userCountryShow = useSelector((state) => state.userCountryShow);

  return (
    <h3 className={styles.subTitle}>
      <FontAwesomeIcon icon={faLocationDot} />
      &nbsp;{userCityShow}, {userCountryShow}
    </h3>
  );
}
