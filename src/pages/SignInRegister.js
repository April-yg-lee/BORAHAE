/*eslint-disable */
import React, { useState } from "react";
import styles from "./SignInRegister.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faHeart } from "@fortawesome/free-solid-svg-icons";
import BackBtn from "../components/BackBtn";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../index.js";
import firebase from 'firebase';

export default function SignInRegister() {
 
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userCountry, setUserCountry] = useState("");


  let navigate = useNavigate();
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
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              value={userName}
              className={styles.input_Q}
              type='text'
              placeholder='Enter your name...'
            ></input>
            <input
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
              value={userEmail}
              className={styles.input_Q}
              type='email'
              placeholder='Enter your email...'
            ></input>
            <input
              onChange={(e) => {
                setUserPassword(e.target.value);
              }}
              value={userPassword}
              className={styles.input_Q}
              type='password'
              placeholder='Enter your password...'
            ></input>
            <input
              onChange={(e) => {
                setUserCity(e.target.value);
              }}
              value={userCity}
              className={styles.input_Q}
              type='text'
              placeholder='Enter your city (ex: Vancouver)'
            ></input>
            <input
              onChange={(e) => {
                setUserCountry(e.target.value);
              }}
              value={userCountry}
              className={styles.input_Q}
              type='text'
              placeholder='Enter your country (ex: Canada)'
            ></input>
          </section>
          <div
            onClick={() => {
              firebase
                .auth()
                .createUserWithEmailAndPassword(userEmail, userPassword)
                .then((result) => {
                  console.log(result);
                  console.log(result.user);
                });
              navigate("/");
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
