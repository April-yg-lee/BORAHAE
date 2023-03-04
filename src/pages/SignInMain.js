/*eslint-disable */
import React, { useState, useEffect } from "react";
import styles from "./SignInMain.module.css";
import LogoTitle from "../components/LogoTitle";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setUserUidShow,
  setUserNameShow,
  setUserCityShow,
  setUserCountryShow,
  setUserIntroShow,
  setUserProfilePicShow,
} from "../Store";
import { db } from "../index.js";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

export default function SignInMain() {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [warning, setWarning] = useState(false);

  function WarningBox() {
    return (
      <div className={styles.warning}>
        <h4>Invalid useremail or Password</h4>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.signin_contents}>
        <LogoTitle></LogoTitle>
        <section className={styles.input_box}>
          {warning == true ? <WarningBox></WarningBox> : null}
          <input
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
            value={userEmail}
            className={styles.email_input}
            type='email'
            placeholder='&nbsp;Enter your email'
          ></input>
          <input
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
            value={userPassword}
            className={styles.pw_input}
            type='password'
            placeholder='&nbsp;Enter your password'
          ></input>
        </section>
        <section className={styles.signin_btn_box}>
          <button
            onClick={() => {
              firebase
                .auth()
                .signInWithEmailAndPassword(userEmail, userPassword)
                .then((result) => {
                  setWarning(false);
                })
                .catch((err) => {
                  setWarning(true);
                });
              // user 가 로그인 되어 있는지 확인하는 코드
              firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                  dispatch(setUserNameShow(user.displayName));
                  // get data from firebase
                  db.collection("user")
                    .where("userInfo.uid", "==", user.uid)
                    .get()
                    .then((result) => {
                      result.forEach((doc) => {
                        dispatch(setUserUidShow(doc.data().userInfo.uid));
                        dispatch(setUserNameShow(doc.data().userInfo.name));
                        dispatch(setUserCityShow(doc.data().userInfo.city));
                        dispatch(
                          setUserCountryShow(doc.data().userInfo.country)
                        );
                        dispatch(setUserIntroShow(doc.data().userInfo.intro));
                        dispatch(
                          setUserProfilePicShow(
                            doc.data().userInfo.profileImage
                          )
                        );
                        navigate("/mainboard");
                      });
                    });
                }
              });
            }}
            className={styles.signin_btn}
          >
            SIGN IN
          </button>
          <button
            onClick={() => {
              navigate("/signinquestions");
            }}
            className={styles.signup_btn}
          >
            SIGN UP
          </button>
        </section>
        <section className={styles.othermode_box}>
          <h4>BORAHAE &copy; 2023</h4>
        </section>
      </div>
    </div>
  );
}
