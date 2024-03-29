/**
* @author Noah
* @purpose user끼리 채팅하기 위한 화면 구현
* @date 2023.03.11 
* @update
*/

/*eslint-disable */
import React, { useEffect, useState } from "react";
import styles from "./Chatting.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase/app";


export default function Chatting() {
  const navigate = useNavigate();

  const userUidShow = useSelector((state) => state.userUidShow);
  const { state } = useLocation();
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [chatHost, setChatHost] = useState("");
  const [chatMember, setChatMember] = useState([]);

  const db = firebase.firestore();

  if (state.roomId) {
    setRoomId(state.roomId);
    state.roomId = "";
  }

  const call = () => {

    if (roomId) {
      db.collection("chatroom")
        .doc(roomId)
        .collection("messages")
        .where("roomId", "==", roomId)
        .orderBy("createdAt", "asc")
        .onSnapshot((result) => {
          let tmpList = [];
          result.forEach((doc) => {
            tmpList.push(doc.data());
          });
          setMessages(tmpList);
        });

      getChatRoomInfo(roomId);
    } else {

      db.collection("chatroom")
        .where("member", "array-contains", (userUidShow || state.uid) || (state.uid || userUidShow))
        .get()
        .then((result) => {

          if (result.empty) {
            createNewChatRoom();
          } else {
            let isCorrectMember = false;
            result.forEach((doc) => {
              const data = doc.data();
              if (data.member.includes(userUidShow) && data.member.includes(state.uid)) {
                isCorrectMember = true;
                setRoomId(data.roomId);
              }

            });

            if (!isCorrectMember) {
              createNewChatRoom();
            }

          }

        })
    }
  };

  const createNewChatRoom = () => {
    const newRoomId = uuidv4();
    const newRoomData = {
      host: userUidShow,
      lastestAt: new Date(),
      lastestMessage: "",
      member: [userUidShow, state.uid],
      roomId: newRoomId,
    };
    db.collection("chatroom")
      .doc(newRoomId)
      .set(newRoomData)
      .then(() => {
        setRoomId(newRoomId);
        getChatRoomInfo(newRoomId);
      });
    const hostRead = { readAt: newRoomData.lastestAt, uid: newRoomData.member[0] };
    db.collection("chatroom").doc(newRoomId).collection("isRead")
      .doc(newRoomData.member[0])
      .set(hostRead);
    const guestRead = { readAt: newRoomData.lastestAt, uid: newRoomData.member[1] };
    db.collection("chatroom").doc(newRoomId).collection("isRead")
      .doc(newRoomData.member[1])
      .set(guestRead);
  };

  const getChatRoomInfo = (roomId) => {
    db.collection("chatroom")
      .where("roomId", "==", roomId)
      .get()
      .then((result) => {
        result.forEach((doc) => {
          setChatHost(doc.data().host);
          setChatMember(doc.data().member);
        });
      });
  };

  const addMessage = () => {
    const newMessage = {
      createdAt: new Date(),
      message: document.querySelector("#inputMessage").value,
      roomId: roomId,
      uid: userUidShow,
    };

    db.collection("chatroom")
      .doc(roomId)
      .collection("messages")
      .add(newMessage);

    const latestInfo = {
      host: chatHost,
      lastestAt: newMessage.createdAt,
      lastestMessage: newMessage.message,
      member: chatMember,
      roomId: roomId,
    };

    db.collection("chatroom")
      .doc(roomId)
      .set(latestInfo);

    // new Notification(userNameShow, { body: newMessage.message });
    document.querySelector("#inputMessage").value = "";

  };

  const readAt = () => {
    const isRead = {
      uid: userUidShow,
      readAt: new Date()
    };
    if (roomId) {
      db.collection("chatroom").doc(roomId).collection("isRead")
        .doc(userUidShow)
        .set(isRead);
    }
  }

  const refreshScroll = () => {
    const objArea = document.querySelector("#chattingArea");

    if (objArea) {
      objArea.scrollTop = objArea.scrollHeight;
    }

  }

  refreshScroll();
  useEffect(() => {
    call();
  }, [roomId]);

  useEffect(() => {
    refreshScroll();
    readAt();
  }, [messages]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <header className={styles.chat_header}>
          <button
            onClick={() => {
              navigate(-1);
            }}
            className={styles.back_btn}
          >
            &lt;&nbsp;&nbsp;
          </button>
          <div
            className={styles.profile_img}
            style={{ backgroundImage: `url('${state.profileImage}')` }}
          ></div>
          <span className={styles.chatting_name}>{state.name}</span>
        </header>
        <div className={styles.slide}>
          <ul id="chattingArea" className={styles.chat_section}>
            {/* <li className={styles.date_box}>
              <span className={styles.date}>11.01</span>
            </li> */}
            {messages.map((list, idx) => (
              <li key={idx}>
                <span
                  className={
                    list.uid == userUidShow
                      ? styles.chat_myAnswer
                      : styles.chat_yourAnswer
                  }
                >
                  {list.message}
                </span>
              </li>
            ))}
          </ul>
          <footer>
            <input
              className={styles.input_part}
              type='text'
              id='inputMessage'
              placeholder='Type here...'
            ></input>
            <button
              type='submit'
              onClick={addMessage}
              className={styles.input_btn}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}
