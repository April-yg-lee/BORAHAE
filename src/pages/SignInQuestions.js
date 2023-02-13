/*eslint-disable */
import React, { useState } from "react";
import BackBtn from "../components/BackBtn";
import styles from "./SignInQuestions.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeSwitch } from "../Store";

export default function SignInQuestions() {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let [Q1_input, setQ1_input] = useState("");
  let [Q2_input, setQ2_input] = useState("");
  let [Q3_input, setQ3_input] = useState("");

  let switches = useSelector((state) => state.switches);

  function signUpQ_checker(Q1, Q2, Q3) {
    if (Q1 == "20130613") {
      if (Q2 == "RM" || Q2 == "Rap Monster") {
        if (Q3 == "7") {
          return true;
        }
      }
    }
  }

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
              onChange={(e) => {
                setQ1_input(e.target.value);
              }}
              value={Q1_input}
              className={styles.input_Q}
              type='text'
              placeholder='When is BTS debut date? (ex: 20231225)'
            ></input>
            <input
              onChange={(e) => {
                setQ2_input(e.target.value);
              }}
              value={Q2_input}
              className={styles.input_Q}
              type='text'
              placeholder='Who is the leader of BTS?'
            ></input>
            <input
              onChange={(e) => {
                setQ3_input(e.target.value);
              }}
              value={Q3_input}
              className={styles.input_Q}
              type='text'
              placeholder='How many members are in BTS? (ex: 5)'
            ></input>
          </section>
          <button
            onClick={() => {
              if (signUpQ_checker(Q1_input, Q2_input, Q3_input) == true) {
                navigate("/signinregister");
              } 
            }}
            className={styles.confirm_btn}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
