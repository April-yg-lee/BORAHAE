/**
* @author April
* @purpose Mainboard 에서 user 이름 > 클릭시 보이는 화면 구현
Dashboard, profile, sign-out 으로 이동시킬 수 있는 페이지  
* @date 2023.03.11 
* @update
*/

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
            <div
              className={styles.edit_section}
              onClick={() => {
                navigate("/mydashboard");
              }}
            >
              <div className={styles.edit_title}>
                <FontAwesomeIcon className={styles.edit_icon} icon={faFile} />
                <h4>Dashboard</h4>
              </div>
              <button className={styles.next_btn}>&gt;</button>
            </div>
          </section>
          <section className={styles.article_box}>
            <h3>Setting</h3>
            <div
              className={styles.edit_section}
              onClick={() => {
                navigate("/profileedit");
              }}
            >
              <div className={styles.edit_title}>
                <FontAwesomeIcon className={styles.edit_icon} icon={faFile} />
                <h4>Profile</h4>
              </div>
              <button className={styles.next_btn}>&gt;</button>
            </div>
          </section>
          <section className={styles.article_box}>
            <h3>Sign Out</h3>
            <div
              className={styles.edit_section}
              onClick={() => {
                navigate("/signoutedit");
              }}
            >
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
