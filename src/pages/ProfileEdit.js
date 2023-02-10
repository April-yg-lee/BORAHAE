/*eslint-disable */

import React, { Profiler } from "react";
import styles from "./ProfileEdit.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import ProfileEditTop from '../components/ProfileEditTop';

export default function ProfileEdit() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button className={styles.back_btn}>&lt; Back</button>
       <ProfileEditTop></ProfileEditTop>
        <div className={styles.slide}>
          <section className={styles.article_box}>
            <h3>Profile</h3>
            <section className={styles.edit_section}>
              <h6>Name</h6>
              <input
                className={styles.edit_name}
                type='text'
                placeholder='Kelly'
              ></input>
              <h6>City</h6>
              <input
                className={styles.edit_city}
                type='text'
                placeholder='Vancouver'
              ></input>
              <h6>Country</h6>
              <input
                className={styles.edit_country}
                type='text'
                placeholder='Canada'
              ></input>
            </section>
            <div className={styles.btn_section}>
              <button className={styles.save_btn}>SAVE</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
