/*eslint-disable */
import React, { useState, useEffect, Profiler } from "react";
import moment from "moment";
import styles from "./PersonalPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { db, storage } from "../index.js";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";

export default function PersonalPage() {
  let navigate = useNavigate();

  const { state } = useLocation();
  const [userInfo, setUserInfo] = useState({});
  let [postList, setPostList] = useState([]);
  const [trick, setTrick] = useState([]);
  const db = firebase.firestore();

  // get posting time
  let currentMoment = (realTime) => {
    return moment.utc(realTime).add(8, "hours").startOf("seconds").fromNow();
  };

  let userUidShow = useSelector((state) => state.userUidShow);
  let userNameShow = useSelector((state) => state.userNameShow);
  let userCountryShow = useSelector((state) => state.userCountryShow);
  let userCityShow = useSelector((state) => state.userCityShow);
  let userIntroShow = useSelector((state) => state.userIntroShow);
  let userProfilePicShow = useSelector((state) => state.userProfilePicShow);

  const call = () => {
    if (state.uid) {
      db.collection("user")
        .where("userInfo.uid", "==", state.uid)
        .get()
        .then((result) => {
          result.forEach((doc) => {
            setUserInfo(doc.data().userInfo);
          });
        });
    }
  };

  useEffect(() => {
    call();
    personalPagecall();
  }, []);

  // get Posts data from firebase
  let personalPagecall = () => {
    let postArray = [];
    if (state.uid) {
      db.collection("post")
        .where("uid", "==", state.uid)
        .orderBy("date", "desc")
        .get()
        .then((result) => {
          result.forEach((doc) => {
            let postObject = doc.data();

            db.collection("user")
              .where('userInfo.uid', '==', postObject.uid)
              .get()
              .then((info) => {
                info.forEach((infoDoc) => {

                  postObject.userName = infoDoc.data().userInfo.name;
                  postObject.profileImage = infoDoc.data().userInfo.profileImage;
                  setTrick(postObject); // 조회 후 렌더링을 위한 꼼수
                })
              })

            postArray.push(postObject);
          });
          setPostList(postArray);
        });
    }
  };

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
        <div className={styles.slide}>
          <section className={styles.article_box}>
            <article className={styles.article}>
              <div className={styles.title_box}>
                <div className={styles.article_title}>
                  <div
                    className={styles.article_big_profile_img}
                    style={{
                      backgroundImage: `url('${userInfo.profileImage}')`,
                    }}
                  ></div>
                  <span className={styles.article_profile_name}>
                    {userInfo.name}
                  </span>
                </div>
                <button
                  onClick={() => {
                    navigate("/chatting", {
                      state: {
                        uid: userInfo.uid,
                        name: userInfo.name,
                        profileImage: userInfo.profileImage,
                      },
                    });
                  }}
                  className={styles.chat_btn}
                >
                  Chat
                </button>
              </div>
              <div className={styles.introduce}>
                <h4>
                  {userInfo.city}, {userInfo.country}
                </h4>
                <h5>{userInfo.intro}</h5>
              </div>
            </article>
          </section>
          <div className={styles.mainBoard_option}>
            <span className={styles.option_all}>Recent</span>
          </div>
          {postList.map(function (a, i) {
            return (
              <section className={styles.article_box} key={i}>
                <article className={styles.article}>
                  <div className={styles.article_title}>
                    <div
                      className={styles.article_profile_img}
                      style={{ backgroundImage: `url('${a.profileImage}')` }}
                    ></div>
                    <span className={styles.article_profile_name}>
                      {a.userName}
                    </span>
                    <div className={styles.del_edit_btn}></div>
                  </div>
                  <div className={styles.article_content}>
                    <h6>{a.content}</h6>
                    <div
                      style={{ backgroundImage: `url('${a.postingImage}')` }}
                    ></div>
                  </div>
                  <div className={styles.article_footer}>
                    <div>
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(increaseLike());
                        }}
                        className={styles.like_heart}
                      >
                        {" "}
                        <FontAwesomeIcon
                          className={styles.heart_icon}
                          icon={faHeart}
                        />
                        &nbsp;
                      </span>
                      <span className={styles.like_num}>{a.likes}</span>
                    </div>
                    <span className={styles.post_time}>
                      {currentMoment(a.date)}
                    </span>
                  </div>
                </article>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
