/*eslint-disable */

import React, { Profiler } from "react";
import styles from "./ProfileEdit.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import ProfileEditTop from '../components/ProfileEditTop';
import { useNavigate } from "react-router-dom";

export default function ProfileEdit() {
  let navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button  onClick={() => {
            navigate(-1);
          }} className={styles.back_btn}>&lt; Back</button>
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
              <h6>Introduction</h6>
              <textarea
                className={styles.edit_name}
                type='text'
                placeholder='I am mad for headband. Jin is my true love!!!'
              ></textarea>
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
              <button  onClick={() => {
            navigate('/mainboard');
          }} className={styles.save_btn}>SAVE</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
