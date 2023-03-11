/**
* @author Noah
* @purpose  
* @date 2023.03.11 
* @update
*/

/*eslint-disable */
import React, { useState, useEffect } from "react";
import styles from "./Inbox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCheckDouble, faComment } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/app";
import { useSelector } from "react-redux";

export default function SignInQuestions() {
  let navigate = useNavigate();

  const [chatList, setChatList] = useState([]);
  const [trick, setTrick] = useState([]);

  const userUidShow = useSelector((state) => state.userUidShow);

  const db = firebase.firestore();
  const call = () => {
    db.collection("chatroom")
      .where("member", "array-contains", userUidShow)
      .orderBy("lastestAt", "desc")
      .onSnapshot((result) => {
        let tmpList = [];
        result.forEach((doc) => {
          let tmp = doc.data();

          db.collection("user")
            .where(
              "userInfo.uid",
              "==",
              userUidShow == tmp.member[0] ? tmp.member[1] : tmp.member[0]
            )
            .get()
            .then((info) => {
              info.forEach((infoDoc) => {
                tmp.name = infoDoc.data().userInfo.name;
                tmp.profileImage = infoDoc.data().userInfo.profileImage;
              });
            });

          db.collection("chatroom")
            .doc(tmp.roomId)
            .collection("isRead")
            .where("uid", "==", userUidShow)
            .get()
            .then((result) => {
              result.forEach((doc) => {
                const date = doc.data().readAt;

                db.collection("chatroom")
                  .doc(tmp.roomId)
                  .collection("messages")
                  .where("createdAt", ">", date)
                  .get()
                  .then((result) => {
                    if (result.size > 99) {
                      tmp.newMessageCount = "100+";
                    } else {
                      tmp.newMessageCount = result.size;
                    }
                    setTrick(tmp); // 조회 후 렌더링을 위한 꼼수
                  });
              });
            });

          tmpList.push(tmp);
        });
        setChatList(tmpList);
      });
  };

  const countArea = (cnt) => {
    if (cnt > 0) {
      return <span className={styles.chat_counter}>{cnt}</span>;
    } else {
      return (
        <span>
          {" "}
          <FontAwesomeIcon icon={faCheckDouble} className={styles.chat_check} />
        </span>
      );
    }
  };

  //알림 권한 요청
  const getNotificationPermission = () => {
    // 브라우저 지원 여부 체크
    if (!("Notification" in window)) {
      console.log("데스크톱 알림을 지원하지 않는 브라우저입니다.");
    }
    // 데스크탑 알림 권한 요청
    Notification.requestPermission(function (result) {
      // 권한 거절
      if (result == "denied") {
        Notification.requestPermission();
        console.log(
          "알림을 차단하셨습니다.\n브라우저의 사이트 설정에서 변경하실 수 있습니다."
        );
        return false;
      } else if (result == "granted") {
        console.log("알림을 허용하셨습니다.");
      }
    });
  };

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
          <FontAwesomeIcon
            onClick={getNotificationPermission}
            className={styles.bell_icon}
            icon={faBell}
          />
        </header>
        <div className={styles.slide}>
          <div className={styles.mainBoard_option}>
            <span className={styles.option_all}>Chat</span>
          </div>
          <section className={styles.chat_section}>
            {chatList.map((list, idx) => (
              <article
                onClick={() => {
                  navigate("/chatting", {
                    state: {
                      roomId: list.roomId,
                      name: list.name,
                      profileImage: list.profileImage,
                    },
                  });
                }}
                className={styles.chat_each}
                key={idx}
              >
                <div
                  className={styles.profile_img}
                  style={{ backgroundImage: `url('${list.profileImage}')` }}
                ></div>
                <div className={styles.chat_mes_box}>
                  <span className={styles.chat_mes_name}>{list.name}</span>
                  <span className={styles.chat_mes_text}>
                    {list.lastestMessage}
                  </span>
                </div>
                {countArea(list.newMessageCount)}
              </article>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
