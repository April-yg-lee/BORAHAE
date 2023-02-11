/*eslint-disable */
import React from "react";
import styles from "./Inbox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faComment } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function SignInQuestions() {
  let navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <header className={styles.inbox_header}>
          <button
            onClick={() => {
              navigate(-1);
            }}
            className={styles.back_btn}
          >
            &lt;&nbsp;&nbsp;Back
          </button>
          <div className={styles.inbox}>
            <FontAwesomeIcon icon={faComment} />
            <span>INBOX</span>
          </div>
          <FontAwesomeIcon className={styles.bell_icon} icon={faBell} />
        </header>
        <div className={styles.slide}>
          <div className={styles.mainBoard_option}>
            <span className={styles.option_all}>Chat</span>
          </div>
          <section className={styles.chat_section}>
            <article
              onClick={() => {
                navigate("/chatting");
              }}
              className={styles.chat_each}
            >
              <div className={styles.profile_img}></div>
              <div className={styles.chat_mes_box}>
                <span className={styles.chat_mes_name}>Eva</span>
                <span className={styles.chat_mes_text}>Are you ok?</span>
              </div>
              <span className={styles.chat_counter}>3</span>
            </article>
            <article className={styles.chat_each}>
              <div className={styles.profile_img}></div>
              <div className={styles.chat_mes_box}>
                <span className={styles.chat_mes_name}>Eva</span>
                <span className={styles.chat_mes_text}>Are you ok?</span>
              </div>
              <span className={styles.chat_counter}>3</span>
            </article>
          </section>
        </div>
      </div>
    </div>
  );
}
