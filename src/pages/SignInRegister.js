/*eslint-disable */
import React, { useState } from "react";
import styles from "./SignInRegister.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faHeart } from "@fortawesome/free-solid-svg-icons";
import BackBtn from "../components/BackBtn";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../index.js";
import { useDispatch, useSelector } from "react-redux";
import { setUserNameShow, setUserCountryShow, setUserCityShow } from "../Store";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

export default function SignInRegister() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userCountry, setUserCountry] = useState("");

  function signUpRg_checker(name, email, pw, city, country) {
    if (name == "" && !isNaN(name)) {
      console.log("name");
      return false;
    }
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
      console.log("email");
      return false;
      // Please enter a valid email address.
    }
    const passPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (pw == "" && pw.length < 6 && pw.match(passPattern)) {
      console.log("password");
      return false;
    }
    return true;
  }

  let navigate = useNavigate();
  let dispatch = useDispatch();
  let userCountryShow = useSelector((state) => state.userCountryShow);
  let userCityShow = useSelector((state) => state.userCityShow);

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
              placeholder='Enter your name. (ex: Jimin)'
            ></input>
            <input
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
              value={userEmail}
              className={styles.input_Q}
              type='email'
              placeholder='Enter your email. (ex: bts@army.com)'
            ></input>
            <input
              onChange={(e) => {
                setUserPassword(e.target.value);
              }}
              value={userPassword}
              className={styles.input_Q}
              type='password'
              placeholder='Enter your password. (min 6 characters)'
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
              if (
                signUpRg_checker(
                  userName,
                  userEmail,
                  userPassword,
                  userCity,
                  userCountry
                ) == true
              ) {
                firebase
                  .auth()
                  .createUserWithEmailAndPassword(userEmail, userPassword)
                  .then((result) => {
                    result.user.updateProfile({ displayName: userName });
                    let userInfo = {
                      name: userName,
                      email: userEmail,
                      city: userCity,
                      country: userCountry,
                      uid: result.user.uid,
                    };
                    db.collection("user")
                      .doc(result.user.uid)
                      .set({ userInfo });
                    navigate("/");
                  });
              }
              // get data from firebase
              // db.collection("user")
              //   .get()
              //   .then((result) => {
              //     result.forEach((doc) => {
              //       dispatch(setUserNameShow(doc.data().userInfo.name));
              //       dispatch(setUserCityShow(doc.data().userInfo.city));
              //       dispatch(setUserCountryShow(doc.data().userInfo.country));
              //     });
              //   });
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
