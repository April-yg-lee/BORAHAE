/*eslint-disable */

import React, { useState, useEffect } from "react";
import styles from "./ProfileEdit.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import ProfileEditTop from "../components/ProfileEditTop";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { db, storage } from "../index.js";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/database";

export default function ProfileEdit() {
  let navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userIntro, setUserIntro] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userCountry, setUserCountry] = useState("");
  let [file, setFile] = useState();
  let [fileNameShow, setFileNameShow] = useState("");

  let userNameShow = useSelector((state) => state.userNameShow);
  let userCountryShow = useSelector((state) => state.userCountryShow);
  let userCityShow = useSelector((state) => state.userCityShow);
  let userIntroShow = useSelector((state) => state.userIntroShow);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button
          onClick={() => {
            navigate(-1);
          }}
          className={styles.back_btn}
        >
          &lt; Back
        </button>
        <ProfileEditTop></ProfileEditTop>
        <div className={styles.slide}>
          <section className={styles.article_box}>
            <h3>Profile</h3>
            <section className={styles.edit_section}>
              {/* <div className={styles.btn_container}>
                <div className={styles.button_wrap}>
                  <label className={styles.button} htmlFor='upload'>
                    + Picture
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
                  <span
                    className={styles.file_name}
                    defaultValue={fileNameShow}
                  >
                    {fileNameShow}
                  </span>
                </div>
              </div> */}
              <h6>Name</h6>
              <input
                className={styles.edit_name}
                type='text'
                defaultValue={userNameShow || userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              ></input>
              <h6>Introduction</h6>
              <textarea
                className={styles.edit_name}
                type='text'
                defaultValue={userIntroShow}
                onChange={(e) => {
                  setUserIntro(e.target.value);
                }}
              ></textarea>
              <h6>City</h6>
              <input
                className={styles.edit_city}
                type='text'
                defaultValue={userCityShow}
                onChange={(e) => {
                  setUserCity(e.target.value);
                }}
              ></input>
              <h6>Country</h6>
              <input
                className={styles.edit_country}
                type='text'
                defaultValue={userCountryShow}
                onChange={(e) => {
                  setUserCountry(e.target.value);
                }}
              ></input>
            </section>
            <div className={styles.btn_section}>
              <button
                onClick={() => {
                  let changeUserInfo = {
                    name: userName,
                    intro: userIntro,
                    city: userCity,
                    country: userCountry,
                  };
                  db.collection("user")
                    .doc("HbZkGLs2bUY3vBPc0i0t7wZrlg43")
                    .set({
                      changeUserInfo
                    });
                  navigate("/mainboard");
                }}
                className={styles.save_btn}
              >
                SAVE
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
