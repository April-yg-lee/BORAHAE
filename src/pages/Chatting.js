/*eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import styles from "./Chatting.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBell,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import { useFirestoreQuery } from './hooks';
// Components
import Message from './Message';




export default function Chatting() {

  const db = firebase.firestore();
  const messagesRef = db.collection('messages');
  const messages = useFirestoreQuery(
    messagesRef.orderBy('createdAt', 'desc').limit(100)
  );

  const [newMessage, setNewMessage] = useState('');

  const inputRef = useRef();
  const bottomListRef = useRef();

  let userUidShow = useSelector((state) => state.userUidShow);
  // userUidShow = "VQ8KcHXf9JMqOxGHDGsgTj3pfBq1";

  // const { uid, displayName, photoURL } = user;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const handleOnChange = e => {
    setNewMessage(e.target.value);
  };

  const handleOnSubmit = e => {
    e.preventDefault();

    const trimmedMessage = newMessage.trim();
    if (trimmedMessage) {
      // Add new message in Firestore
      messagesRef.add({
        text: trimmedMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        userUidShow,
        // displayName,
        // photoURL,
      });
      // Clear input field
      setNewMessage('');
      // Scroll down to the bottom of the list
      bottomListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };



  let navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <header className={styles.chat_header}>
          <button onClick={() => {
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
            {/* <li>
              <span className={styles.chat_myAnswer}>
                Hi, I'm Kelly! How are you?
              </span>
            </li>
            <li>
              <span className={styles.chat_yourAnswer}>
                Hello! It's so nice to meet you!
              </span>
            </li> */}

            {
              messages
                ?.sort((first, second) =>
                  first?.createdAt?.seconds <= second?.createdAt?.seconds ? -1 : 1
                )
                ?.map(message => (
                  <li key={message.id}>
                    <span className={styles.chat_myAnswer}>
                      {message.text}
                    </span>
                  </li>
                ))

            /* {messages
              ?.sort((first, second) =>
                first?.createdAt?.seconds <= second?.createdAt?.seconds ? -1 : 1
              )
              ?.map(message => (
                <li key={message.id}>
                  <Message {...message} />
                </li>
              ))} */}
          </ul>
          <footer ref={bottomListRef}>
            {/* <form
              onSubmit={handleOnSubmit}> */}
            <input
              ref={inputRef}
              className={styles.input_part}
              type='text'
              placeholder='Type here...'
              value={newMessage}
              onChange={handleOnChange}
            ></input>
            <button type="submit" onClick={handleOnSubmit} disabled={!newMessage} className={styles.input_btn}>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
            {/* </form> */}
          </footer>
        </div>
      </div>
    </div>
  );
}

// Chatting.propTypes = {
//   user: PropTypes.shape({
//     uid: PropTypes.string,
//     displayName: PropTypes.string,
//     photoURL: PropTypes.string,
//   }),
// };
