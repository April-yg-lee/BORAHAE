/*eslint-disable */
import React, { useState } from "react";
import BackBtn from "../components/BackBtn";
import styles from "./SignInQuestions.module.css";
import { useNavigate } from "react-router-dom";

export default function SignInQuestions() {
  let navigate = useNavigate();

  let [Q1_input, setQ1_input] = useState("");
  let [Q2_input, setQ2_input] = useState("");
  let [Q3_input, setQ3_input] = useState("");
  const [warning, setWarning] = useState(false);

  function WarningBox() {
    return (
      <div className={styles.warning}>
        <h4>Aren't you army? Try again😥💜</h4>
      </div>
    );
  }

  let signUpQ_checker = (Q1, Q2, Q3) => {
    if (Q1 == "20130613") {
      if (Q2 == "RM" || Q2 == "Rap Monster") {
        if (Q3 == "7") {
          setWarning(false);
          return true;
        }
      }
    }
    setWarning(true);
  };

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
            {warning == true ? <WarningBox></WarningBox> : null}
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
