/*eslint-disable */

import React, { useState, useEffect } from "react";
import styles from "./ProfileEdit.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import ProfileEditTop from "../components/ProfileEditTop";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserUidShow,
  setUserNameShow,
  setUserCityShow,
  setUserCountryShow,
  setUserIntroShow,
  setUserProfilePicShow,
} from "../Store";

import { db, storage } from "../index.js";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/database";
import Spinner from "../components/Spinner";

export default function ProfileEdit() {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const [userName, setUserName] = useState("");
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

  let userNameShow = useSelector((state) => state.userNameShow);
  let userUidShow = useSelector((state) => state.userUidShow);
  let userCountryShow = useSelector((state) => state.userCountryShow);
  let userCityShow = useSelector((state) => state.userCityShow);
  let userIntroShow = useSelector((state) => state.userIntroShow);
  let userProfilePicShow = useSelector((state) => state.userProfilePicShow);

  useEffect(() => {
    setUserName(userNameShow);
    setUserIntro(userIntroShow);
    setUserCountry(userCountryShow);
    setUserCity(userCityShow);
    setFile(userProfilePicShow);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {listContent}
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
              <div className={styles.btn_container}>
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
              </div>
              <h6>Name</h6>
              <input
                className={styles.edit_name}
                type='text'
                defaultValue={userNameShow}
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
                  setLoading(true);
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

                    //에러시 동작하는 함수
                    (error) => {
                      console.error("실패사유는", error);
                    },
                    // 성공시 동작하는 함수
                    () => {
                      upload.snapshot.ref
                        .getDownloadURL()
                        .then((profileUrl) => {
                          firebase.auth().onAuthStateChanged((user) => {
                            if (user) {
                              db.collection("user")
                                .where("userInfo.uid", "==", userUidShow)
                                .get()
                                .then((result) => {
                                  result.forEach((doc) => {
                                    dispatch(
                                      setUserUidShow(doc.data().userInfo.uid)
                                    );
                                    dispatch(setUserCityShow(userCity));
                                    dispatch(setUserCountryShow(userCountry));
                                    dispatch(setUserNameShow(userName));
                                    dispatch(setUserIntroShow(userIntro));
                                    if (fileNameShow) {
                                      dispatch(setUserProfilePicShow(profileUrl));
                                    } else {
                                      profileUrl = userProfilePicShow;
                                    }

                                    let userInfo = {
                                      name: userName,
                                      intro: userIntro,
                                      city: userCity,
                                      country: userCountry,
                                      uid: userUidShow,
                                      profileImage: profileUrl,
                                    };
                                    db.collection("user")
                                      .doc(userUidShow)
                                      .set({
                                        userInfo,
                                      });

                                  });
                                  setLoading(false);
                                  navigate("/mainboard");
                                });
                            }
                          });
                        });
                    }
                  );
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
