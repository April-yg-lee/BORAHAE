/*eslint-disable */
import React, { useState, useEffect, Profiler } from "react";
import styles from "./PersonalPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { db, storage } from "../index.js";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";

export default function PersonalPage() {
  let navigate = useNavigate();

  const { state } = useLocation();
  const [userInfo, setUserInfo] = useState({});
  const db = firebase.firestore();

  const call = () => {
    if (state.uid) {

      db.collection("user")
        .where('userInfo.uid', '==', state.uid)
        .get()
        .then((result) => {
          result.forEach((doc) => {
            setUserInfo(doc.data().userInfo);
          })
        })

    }
  }

  useEffect(() => {
    call();

  }, []);


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button onClick={() => {
          navigate(-1);
        }} className={styles.back_btn}>&lt; Back</button>
        <div className={styles.slide}>
          <section className={styles.article_box}>
            <article className={styles.article}>
              <div className={styles.title_box}>
                <div className={styles.article_title}>
                  <div className={styles.article_big_profile_img} style={{ backgroundImage: `url('${userInfo.profileImage}')` }}></div>
                  <span className={styles.article_profile_name}>{userInfo.name}</span>
                </div>
                <button onClick={() => {
                  navigate('/chatting', {
                    state: {
                      uid: userInfo.uid
                      , name: userInfo.name
                      , profileImage: userInfo.profileImage
                    }
                  });
                }} className={styles.chat_btn}>Chat</button>
              </div>
              <div className={styles.introduce}>
                <h4>{userInfo.city}, {userInfo.country}</h4>
                <h5>
                  32. Web Developer. BTS 💜 OT7. JK Biased. <br></br>Currently
                  living in Vancouver. Let's chill!
                </h5>
              </div>
            </article>
          </section>
          <div className={styles.mainBoard_option}>
            <span className={styles.option_all}>Recent</span>
          </div>
          <section className={styles.article_box}>
            <article className={styles.article}>
              <div className={styles.title_box}>
                <div className={styles.article_title}>
                  <div className={styles.article_profile_img}></div>
                  <span className={styles.article_profile_name}>April</span>
                </div>
                {/* <div className={styles.del_edit_btn}>
                  <FontAwesomeIcon icon={faTrashCan} />
                  <FontAwesomeIcon icon={faPenToSquare} />
                </div> */}
              </div>
              <div className={styles.article_content}>
                <h6>Everything will be fine with JK's smile</h6>
                <div></div>
              </div>
              <div className={styles.article_footer}>
                <div>
                  <span className={styles.like_heart}>
                    {" "}
                    <FontAwesomeIcon icon={faHeart} />
                  </span>
                  <span className={styles.like_num}>18</span>
                </div>
                <span className={styles.post_time}>3 hours ago</span>
              </div>
            </article>
          </section>
        </div>
      </div>
    </div>
  );
}
