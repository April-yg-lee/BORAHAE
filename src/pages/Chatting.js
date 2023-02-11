/*eslint-disable */
import React from "react";
import styles from "./Chatting.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBell,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Chatting() {
  let navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <header className={styles.chat_header}>
          <button  onClick={() => {
              navigate(-1);
            }} className={styles.back_btn}>&lt;&nbsp;&nbsp;</button>
          <div className={styles.profile_img}></div>
          <span className={styles.chatting_name}>April</span>
        </header>
        <div className={styles.slide}>
          <ul className={styles.chat_section}>
            <li className={styles.date_box}>
              <span className={styles.date}>11.01</span>
            </li>
            <li>
              <span className={styles.chat_myAnswer}>
                Hi, I'm Kelly! How are you?
              </span>
            </li>
            <li>
              <span className={styles.chat_yourAnswer}>
                Hello! It's so nice to meet you!
              </span>
            </li>
          </ul>
          <footer>
            <input
              className={styles.input_part}
              type='text'
              placeholder='Type here...'
            ></input>
            <button className={styles.input_btn}>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}
