/*eslint-disable */
import React from "react";
import styles from "./SignInQuestions.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function SignInQuestions() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button className={styles.back_btn}>&lt;&nbsp;&nbsp;Back</button>
        <div className={styles.slide}>
          <h1 className={styles.title}>
            Sign Up <br></br> Questions
          </h1>
          <h4 className={styles.subTitle}>These are simple questions for sign up.</h4>
          <div className={styles.input_box}>
            <input className={styles.input_Q} type='text' placeholder='When is BTS debut date? (ex: 20231225)'></input>
            <input className={styles.input_Q} type='text' placeholder='Who is the leader of BTS?'></input>
            <input className={styles.input_Q} type='text' placeholder='How many members are in BTS?'></input>
          </div>
        <div className={styles.confirm_btn}>&gt;</div>
        </div>
      </div>
    </div>
  );
}
