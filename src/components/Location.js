/**
* @author April
* @purpose user 의 도시, 나라 정보 보여주도록 구현
* @date 2023.03.11 
* @update
*/

/*eslint-disable */
import React, { Profiler } from "react";
import styles from "../pages/MainBoard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

export default function Location() {
  const userCityShow = useSelector((state) => state.userCityShow);
  const userCountryShow = useSelector((state) => state.userCountryShow);

  return (
    <h3 className={styles.subTitle}>
      <FontAwesomeIcon icon={faLocationDot} />
      &nbsp;{userCityShow}, {userCountryShow}
    </h3>
  );
}
