/**
* @author April
* @purpose 페이지를 이전페이지로 이동시키는 버튼구현
* @date 2023.03.11 
* @update
*/

import React from "react";
import styles from "../pages/SignInQuestions.module.css";
import { useNavigate } from "react-router-dom";

export default function BackBtn() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate(-1);
      }}
      className={styles.back_btn}
    >
      &lt;&nbsp;&nbsp;Back
    </button>
  );
}
