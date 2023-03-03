/*eslint-disable */


import React, { useState } from "react";
import styles from "./SignInRegister.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import BackBtn from "../components/BackBtn";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../index.js";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import Spinner from "../components/Spinner";

export default function SignInRegister() {
  let navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userIntro, setUserIntro] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userCountry, setUserCountry] = useState("");
  let [file, setFile] = useState();
  let [fileNameShow, setFileNameShow] = useState("");
  let [loading, setLoading] = useState(false);

  let listContent;

  if (loading) {
    listContent = <Spinner />;
  }


  let signUpRg_checker = (name, email, pw, city, country, intro) => {
    if (name == "" && !isNaN(name)) {
      return false;
    }
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
      return false;
      // Please enter a valid email address.
    }
    const passPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (pw == "" && pw.length < 6 && pw.match(passPattern)) {
      return false;
    }
    if (city == "" && !isNaN(city)) {
      return false;
    }
    if (country == "" && !isNaN(country)) {
      return false;
    }
    if (intro == "" && !isNaN(intro)) {
      return false;
    }
    return true;
  };

  let uploadUserInfoForSignUp = () => {
    let imgCreateDate = new Date();
    let storageRef = storage.ref();
    let savePath = storageRef.child(
      "profileImage/" + "profile_" + imgCreateDate
    );
    let upload = savePath.put(file);

    // firebase code
    upload.on(
      "state_changed",
      null,
      (error) => {
        console.error("실패사유는", error);
      },
      () => {
        upload.snapshot.ref.getDownloadURL().then((profileUrl) => {
          firebase
            .auth()
            .createUserWithEmailAndPassword(userEmail, userPassword)
            .then((result) => {
              result.user.updateProfile({
                displayName: userName,
              });
              let userInfo = {
                name: userName,
                city: userCity,
                country: userCountry,
                intro: userIntro,
                uid: result.user.uid,
                profileImage: profileUrl,
              };
              db.collection("user").doc(result.user.uid).set({ userInfo })
                .then(() => {
                  setLoading(false);
                  navigate("/");
                });
            });
        });
      }
    );
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <BackBtn></BackBtn>
          {listContent}
          <div className={styles.slide}>
            <h1 className={styles.title}>
              Congrats!
              <span>
                <FontAwesomeIcon className={styles.heart_icon} icon={faHeart} />
              </span>{" "}
              <br></br> Quick Registration
            </h1>
            <section className={styles.input_box}>
              <div className={styles.btn_container}>
                <div className={styles.button_wrap}>
                  <label className={styles.button} htmlFor='upload'>
                    + Profile Picture
                  </label>
                  <input
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      let hidePath = e.target.value
                        .split("/")
                        .pop()
                        .split("\\")
                        .pop();
                      setFileNameShow(hidePath);
                    }}
                    id='upload'
                    type='file'
                  ></input>
                  <span className={styles.file_name}>{fileNameShow}</span>
                </div>
              </div>
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
              <textarea
                onChange={(e) => {
                  setUserIntro(e.target.value);
                }}
                value={userIntro}
                className={styles.input_Q}
                type='text'
                placeholder='Introduce yourself...😎'
              ></textarea>
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
                    userCountry,
                    userIntro
                  ) == true
                ) {
                  setLoading(true);
                  uploadUserInfoForSignUp();
                }
              }}
              className={styles.confirm_btn}
            >
              &gt;
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
