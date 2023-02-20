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

  const [chatList, setChatList] = useState([]);
  const [trick, setTrick] = useState([]);

  const db = firebase.firestore();
  const call = () => {
    let tmpList = [];
    db.collection("chatroom")
      .where('member', 'array-contains', userUidShow)
      .get()
      .then((result) => {
        result.forEach((doc) => {
          let tmp = doc.data();

          db.collection("user")
            .where('userInfo.uid', '==', tmp.member[1])
            .get()
            .then((info) => {
              info.forEach((infoDoc) => {

                tmp.name = infoDoc.data().userInfo.name;
                tmp.profileImage = infoDoc.data().userInfo.profileImage;
                setTrick(tmp); // 조회 후 렌더링을 위한 꼼수
              })
            })

          tmpList.push(tmp);
        });
        setChatList(tmpList);
      });

  }

  useEffect(() => {
    call();

  }, []);

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
              chatList.map((list) => (
                <article
                  onClick={() => {
                    navigate("/chatting");
                  }}
                  className={styles.chat_each}
                >
                  <div className={styles.profile_img} style={{ backgroundImage: `url('${list.profileImage}')` }}></div>
                  <div className={styles.chat_mes_box}>
                    <span className={styles.chat_mes_name}>{list.name}</span>
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
