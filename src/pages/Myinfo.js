/*eslint-disable */

import React, { Profiler } from "react";
import styles from "./Myinfo.module.css";
import ProfileEditTop from "../components/ProfileEditTop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Myinfo() {
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
            <h3>My</h3>
            <div className={styles.edit_section}>
              <div className={styles.edit_title}>
                <FontAwesomeIcon className={styles.edit_icon} icon={faFile} />
                <h4>Dashboard</h4>
              </div>
              <button
                onClick={() => {
                  navigate("/mydashboard");
                }}
                className={styles.next_btn}
              >
                &gt;
              </button>
            </div>
          </section>
          <section className={styles.article_box}>
            <h3>Setting</h3>
            <div className={styles.edit_section}>
              <div className={styles.edit_title}>
                <FontAwesomeIcon className={styles.edit_icon} icon={faFile} />
                <h4>Profile</h4>
              </div>
              <button
                onClick={() => {
                  navigate("/profileedit");
                }}
                className={styles.next_btn}
              >
                &gt;
              </button>
            </div>
          </section>
          <section className={styles.article_box}>
            <h3>Sign Out</h3>
            <div className={styles.edit_section}>
              <div className={styles.edit_title}>
                <FontAwesomeIcon
                  className={styles.edit_icon}
                  icon={faRightFromBracket}
                />

                <h4>Sign Out</h4>
              </div>
              <button
                onClick={() => {
                  navigate("/signoutedit");
                }}
                className={styles.next_btn}
              >
                &gt;
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
