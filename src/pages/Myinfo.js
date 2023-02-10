/*eslint-disable */

import React, { Profiler } from "react";
import styles from "./Myinfo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faPenToSquare,
  faRightFromBracket,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import ProfileEditTop from '../components/ProfileEditTop';

export default function Myinfo() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button className={styles.back_btn}>&lt; Back</button>
        <ProfileEditTop></ProfileEditTop>
        <div className={styles.slide}>
          <section className={styles.article_box}>
            <h3>Profile</h3>
            <div className={styles.edit_section}>
              <div className={styles.edit_title}>
                <FontAwesomeIcon className={styles.edit_icon} icon={faFile} />
                <h4>Profile</h4>
              </div>
              <button className={styles.next_btn}>&gt;</button>
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
              <button className={styles.next_btn}>&gt;</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
