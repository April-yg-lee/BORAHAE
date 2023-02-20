/*eslint-disable */
import React, { useState, useEffect } from 'react';
import styles from "./Inbox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faComment } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import firebase from 'firebase/app';
import { useSelector } from "react-redux";

export default function SignInQuestions() {

  let navigate = useNavigate();
  let userUidShow = useSelector((state) => state.userUidShow);
  console.log(userUidShow);

  const [chatList, setChatList] = useState([]);
  let tmpList = [];

  const db = firebase.firestore();
  const call = () => {
    db.collection("chatroom")
      .where('member', 'array-contains', userUidShow)
      .get()
      .then((result) => {
        result.forEach((doc) => {
          let tmp = doc.data();
          console.log(tmp);
          tmpList.push(tmp);
        });
        setChatList(tmpList);
      });

  }

  useEffect(() => {
    call();

  }, []);

  console.log('data : ' + chatList);

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

            {
              chatList.map((list, idx) => (
                <article
                  onClick={() => {
                    navigate("/chatting");
                  }}
                  className={styles.chat_each}
                  key={idx}
                >
                  <div className={styles.profile_img}></div>
                  <div className={styles.chat_mes_box}>
                    <span className={styles.chat_mes_name}>Eva</span>
                    <span className={styles.chat_mes_text}>{list.lastestMessage}</span>
                  </div>
                  <span className={styles.chat_counter}>3</span>
                </article>

              ))}


          </section>
        </div>
      </div>
    </div>
  );
}
