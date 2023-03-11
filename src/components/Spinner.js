/**
* @author April
* @purpose 최종 SIgn up 클릭 후 로딩시간에 스피너 / profile 수정시 save버튼 클릭 후 로딩시간에 스피너 / 포스팅 하고 submit버튼 클릭 후 로딩시간에 스피너 
* @date 2023.03.11 
* @update
*/

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
