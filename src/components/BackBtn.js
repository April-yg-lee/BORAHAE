import React from "react";
import styles from "../pages/SignInQuestions.module.css";
import { useNavigate } from "react-router-dom";

export default function BackBtn() {
  let navigate = useNavigate();
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
