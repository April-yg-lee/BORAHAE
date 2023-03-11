/**
* @author April
* @purpose 좋아요 버튼 누를때 스피너 효과 구현 / Sign In 버튼 누를때 로딩시간 지연시 스피너 효과 구현
* @date 2023.03.11 
* @update
*/

import React from "react";
import { Hearts } from "react-loader-spinner";
import styles from "./HeartSpinner.module.css";

export default function HeartSpinner() {
  return (
    <div className={styles.spinnerBox}>
      <Hearts
        height='150'
        width='150'
        color='#7259f5'
        ariaLabel='hearts-loading'
        wrapperStyle={{}}
        wrapperClass=''
        visible={true}
      />
    </div>
  );
}
