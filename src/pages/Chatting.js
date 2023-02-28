/*eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import styles from "./Chatting.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBell,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
// Components


export default function Chatting() {

  let navigate = useNavigate();
  const userUidShow = useSelector((state) => state.userUidShow);
  const { state } = useLocation();
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState('');

  const db = firebase.firestore();
  let tmpList = [];
  console.log('roomID 잇나? : ' + state.roomId);

  const call = () => {

    if (state.roomId) {
      setRoomId(state.roomId);
      db.collection("chatroom").doc(state.roomId).collection("messages")
        .where('roomId', '==', roomId)
        .orderBy('createdAt', 'asc')
        .onSnapshot((result) => {
          result.forEach((doc) => {
            tmpList.push(doc.data());
          })
          setMessages(tmpList);
        })

    } else {

      const newRoomId = uuidv4();
      const newRoomData = {
        host: userUidShow
        , lastestAt: new Date()
        , lastestMessage: ''
        , member: [userUidShow, state.uid]
        , roomId: newRoomId
      }
      db.collection("chatroom").doc(newRoomId)
        .set(newRoomData)
        .then(() => {
          setRoomId(newRoomId);

        });
    }
  }

  const addMessage = () => {
    console.log('입력시 roomId : ' + roomId);
    let newMessage = {
      createdAt: new Date()
      , message: document.querySelector('#inputMessage').value
      , roomId: roomId
      , uid: userUidShow
    }

    db.collection("chatroom").doc(roomId).collection("messages").add(newMessage);

    

    document.querySelector('#inputMessage').value = '';
  }

  useEffect(() => {
    call();

  }, []);


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <header className={styles.chat_header}>
          <button onClick={() => {
            navigate(-1);
          }} className={styles.back_btn}>&lt;&nbsp;&nbsp;</button>
          <div className={styles.profile_img} style={{ backgroundImage: `url('${state.profileImage}')` }}></div>
          <span className={styles.chatting_name}>{state.name}</span>
        </header>
        <div className={styles.slide}>
          <ul className={styles.chat_section}>
            <li className={styles.date_box}>
              <span className={styles.date}>11.01</span>
            </li>
            {
              messages.map((list, idx) => (
                <li key={idx}>
                  <span className={list.uid == userUidShow ? styles.chat_myAnswer : styles.chat_yourAnswer}>
                    {list.message}
                  </span>
                </li>
              ))
            }
          </ul>
          <footer>
            <input
              className={styles.input_part}
              type='text'
              id='inputMessage'
              placeholder='Type here...'
            ></input>
            <button type="submit" onClick={addMessage} className={styles.input_btn}>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}