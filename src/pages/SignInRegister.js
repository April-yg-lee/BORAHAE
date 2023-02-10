/*eslint-disable */
import React from "react";
import styles from "./SignInRegister.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faHeart } from "@fortawesome/free-solid-svg-icons";
import BackBtn from '../components/BackBtn';
import SignUpBtn from '../components/SignUpBtn';

export default function SignInRegister() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <BackBtn></BackBtn>
        <div className={styles.slide}>
          <h1 className={styles.title}>
            Congrats!
            <span>
              <FontAwesomeIcon className={styles.heart_icon} icon={faHeart} />
            </span>{" "}
            <br></br> Quick Registration
          </h1>
          <section className={styles.input_box}>
            <input
              className={styles.input_Q}
              type='text'
              placeholder='Enter your name...'
            ></input>
            <input
              className={styles.input_Q}
              type='email'
              placeholder='Enter your email'
            ></input>
            <input
              className={styles.input_Q}
              type='password'
              placeholder='Enter your password'
            ></input>
            <input
              className={styles.input_Q}
              type='text'
              placeholder='Enter your city (ex: Vancouver)'
            ></input>
            <input
              className={styles.input_Q}
              type='text'
              placeholder='Enter your country (ex: Canada)'
            ></input>
          </section>
          <SignUpBtn></SignUpBtn>
        </div>
      </div>
    </div>
  );
}
