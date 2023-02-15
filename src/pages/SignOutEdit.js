/*eslint-disable */

import React, { Profiler } from "react";
import styles from "./SignOutEdit.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import ProfileEditTop from "../components/ProfileEditTop";
import { useNavigate } from "react-router-dom";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

export default function SignOutEdit() {
  let navigate = useNavigate();
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
              <h5>Do you really want to sign out?</h5>
            </section>
            <div className={styles.btn_section}>
              <button
                onClick={() => {
                  firebase.auth().signOut();
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
