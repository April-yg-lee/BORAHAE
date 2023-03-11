/**
* @author April
* @purpose Profile 이미지와 이름을 보여줄 수 있도록 구현
* @date 2023.03.11 
* @update
*/

import React from "react";
import styles from "../pages/Myinfo.module.css";
import { useSelector } from "react-redux";

export default function ProfileEditTop() {
  let userNameShow = useSelector((state) => state.userNameShow);
  let userProfilePicShow = useSelector((state) => state.userProfilePicShow);

  return (
    <div className={styles.profile_box}>
      <div
        className={styles.profile_img}
        style={{ backgroundImage: `url('${userProfilePicShow}')` }}
      ></div>
      <h2 className={styles.profile_name}>{userNameShow}</h2>
    </div>
  );
}
