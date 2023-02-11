/*eslint-disable */
import React from "react";
import BackBtn from "../components/BackBtn";
import styles from "./SignInQuestions.module.css";
import { useNavigate } from "react-router-dom";

export default function SignInQuestions() {
  let navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <BackBtn></BackBtn>
        <div className={styles.slide}>
          <h1 className={styles.title}>
            Sign Up <br></br> Questions
          </h1>
          <h4 className={styles.subTitle}>
            These are simple questions for sign up.
          </h4>
          <section className={styles.input_box}>
            <input
              className={styles.input_Q}
              type='text'
              placeholder='When is BTS debut date? (ex: 20231225)'
            ></input>
            <input
              className={styles.input_Q}
              type='text'
              placeholder='Who is the leader of BTS?'
            ></input>
            <input
              className={styles.input_Q}
              type='text'
              placeholder='How many members are in BTS?'
            ></input>
          </section>
          <div
            onClick={() => {
              navigate('/signinregister');
            }}
            className={styles.confirm_btn}
          >
            &gt;
          </div>
        </div>
      </div>
    </div>
  );
}
