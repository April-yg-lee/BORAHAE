/*eslint-disable */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import styles from "./SignInMain.module.css";
import LogoTitle from "../components/LogoTitle";
import { useNavigate } from "react-router-dom";
import {db} from '../index.js'
import "firebase/firestore"; 

export default function SignInMain() {


  let navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.signin_contents}>
        <LogoTitle></LogoTitle>
        <section className={styles.input_box}>
          <input
            className={styles.email_input}
            type='email'
            placeholder='&nbsp;Enter your email'
          ></input>
          <input
            className={styles.pw_input}
            type='password'
            placeholder='&nbsp;Enter your password'
          ></input>
        </section>
        <section className={styles.signin_btn_box}>
          <button
            onClick={() => {
              navigate("/mainboard");
            }}
            className={styles.signin_btn}
          >
            SIGN IN
          </button>
          <button  onClick={() => {
              navigate("/signinquestions");
            }} className={styles.signup_btn}>SIGN UP</button>
        </section>
        <section className={styles.othermode_box}>
          <h4>Other modes</h4>
        </section>
      </div>
    </div>
  );
}
