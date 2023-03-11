/**
 * @author April
 * @purpose Sign-out 하기 전 마지막단계 confirm page 구현
 * @date 2023.03.11
 * @update
 */
/*eslint-disable */
import React from "react";
import styles from "./SignOutEdit.module.css";
import ProfileEditTop from "../components/ProfileEditTop";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import firebase from "firebase";
import {
  setUserUidShow,
  setUserNameShow,
  setUserCityShow,
  setUserCountryShow,
  setUserIntroShow,
  setUserProfilePicShow,
} from "../Store";
import "firebase/firestore";
import "firebase/auth";

export default function SignOutEdit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
            <h3>Sign Out</h3>
            <section className={styles.edit_section}>
              <h4>Do you really want to sign out?</h4>
            </section>
            <div className={styles.btn_section}>
              <button
                onClick={() => {
                  firebase.auth().signOut();

                  dispatch(setUserUidShow(""));
                  dispatch(setUserNameShow(""));
                  dispatch(setUserCityShow(""));
                  dispatch(setUserCountryShow(""));
                  dispatch(setUserIntroShow(""));
                  dispatch(setUserProfilePicShow(""));
                  navigate("/");
                }}
                className={styles.signOut_btn}
              >
                Confirm
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
