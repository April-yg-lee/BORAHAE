import React from "react";
import styles from "../pages/Myinfo.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserNameShow, changeName, changeAge, addCount, increaseLike } from "../Store";

export default function ProfileEditTop() {
  let dispatch = useDispatch();
  let userNameShow = useSelector((state) => state.user);

  return (
    <div className={styles.profile_box}>
      <div className={styles.profile_img}></div>
      <h2 className={styles.profile_name}>{userNameShow}</h2>
    </div>
  );
}
