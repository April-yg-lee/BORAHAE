/**
 * @author April
 * @purpose 원하는 내용으로 프로필 사진 포함 user information update 기능 구현
 * @date 2023.03.11
 * @update
 */
/*eslint-disable */
import React, { useState, useEffect } from "react";
import styles from "./ProfileEdit.module.css";
import ProfileEditTop from "../components/ProfileEditTop";
import Spinner from "../components/Spinner";
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

export default function ProfileEdit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");
  const [userIntro, setUserIntro] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [file, setFile] = useState();
  const [fileNameShow, setFileNameShow] = useState("");
  const [loading, setLoading] = useState(false);

  let listContent;
  if (loading) {
    listContent = <Spinner />;
  }

  // state from redux
  const userNameShow = useSelector((state) => state.userNameShow);
  const userUidShow = useSelector((state) => state.userUidShow);
  const userCountryShow = useSelector((state) => state.userCountryShow);
  const userCityShow = useSelector((state) => state.userCityShow);
  const userIntroShow = useSelector((state) => state.userIntroShow);
  const userProfilePicShow = useSelector((state) => state.userProfilePicShow);

  // set original user information after loading first
  useEffect(() => {
    setUserName(userNameShow);
    setUserIntro(userIntroShow);
    setUserCountry(userCountryShow);
    setUserCity(userCityShow);
    setFile(userProfilePicShow);
  }, []);

  // update(edit) user information into firebase
  const updateUserInfo = () => {
    const imgCreateDate = new Date();
    const storageRef = storage.ref();
    const savePath = storageRef.child(
      "profileImage/" + "profile_" + imgCreateDate
    );
    const upload = savePath.put(file);

    // firebase code
    upload.on(
      "state_changed",
      null,
      (error) => {
        console.error("실패사유는", error);
      },
      // 성공시 동작하는 함수
      () => {
        upload.snapshot.ref.getDownloadURL().then((profileUrl) => {
          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              db.collection("user")
                .where("userInfo.uid", "==", userUidShow)
                .get()
                .then((result) => {
                  result.forEach((doc) => {
                    dispatch(setUserUidShow(doc.data().userInfo.uid));
                    dispatch(setUserCityShow(userCity));
                    dispatch(setUserCountryShow(userCountry));
                    dispatch(setUserNameShow(userName));
                    dispatch(setUserIntroShow(userIntro));
                    if (fileNameShow) {
                      dispatch(setUserProfilePicShow(profileUrl));
                    } else {
                      profileUrl = userProfilePicShow;
                    }

                    const userInfo = {
                      name: userName,
                      intro: userIntro,
                      city: userCity,
                      country: userCountry,
                      uid: userUidShow,
                      profileImage: profileUrl,
                    };
                    db.collection("user").doc(userUidShow).set({
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
  };

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
        {listContent}
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
                      const hidePath = e.target.value
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
                  updateUserInfo();
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
