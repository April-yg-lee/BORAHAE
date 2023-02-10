/*eslint-disable */

import React, { Profiler } from "react";
import styles from "./SignOutEdit.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function SignOutEdit() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button className={styles.back_btn}>&lt; Back</button>
        <div className={styles.profile_box}>
          <div className={styles.profile_img}></div>
          <h2 className={styles.profile_name}>Kelly</h2>
        </div>
        <div className={styles.slide}>
          <section className={styles.article_box}>
            <h3>Profile</h3>
            <section className={styles.edit_section}>
              <h5>Do you really want to sign out?</h5>
            </section>
            <div className={styles.btn_section}>
              <button className={styles.signOut_btn}>SIGN OUT</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
