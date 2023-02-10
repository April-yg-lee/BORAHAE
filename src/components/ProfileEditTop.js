import React from "react";
import styles from "../pages/Myinfo.module.css";

export default function ProfileEditTop() {
  return (
    <div className={styles.profile_box}>
      <div className={styles.profile_img}></div>
      <h2 className={styles.profile_name}>Kelly</h2>
    </div>
  );
}
