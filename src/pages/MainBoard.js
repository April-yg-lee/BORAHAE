/*eslint-disable */
import React, { useEffect, useState } from "react";
import moment from "moment";
import styles from "./MainBoard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faChevronRight, faHeartCircleBolt, faHSquare } from "@fortawesome/free-solid-svg-icons";
import Location from "../components/Location";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { increaseLike } from "../Store";
import { db, storage } from "../index.js";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/database";
// import 'firebase/storage';

export default function MainBoard() {
  const [postList, setPostList] = useState([]);
  const [trick, setTrick] = useState([]);
  const [trickLikes, setTrickLikes] = useState('');

  let dispatch = useDispatch();

  let userNameShow = useSelector((state) => state.userNameShow);
  let userUidShow = useSelector((state) => state.userUidShow);
  let userCityShow = useSelector((state) => state.userCityShow);
  let userCountryShow = useSelector((state) => state.userCountryShow);
  let userProfilePicShow = useSelector((state) => state.userProfilePicShow);

  let like = useSelector((state) => state.like);

  let navigate = useNavigate();


  // get posting time
  let currentMoment = (realTime) => {
    return moment.utc(realTime).add(8, "hours").startOf("seconds").fromNow();
  };

  // get Posts data from firebase
  const call = () => {
    let postArray = [];
    db.collection("post")
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

          db.collection("post").doc(postObject.postID).collection("likes")
            .get()
            .then((counts) => {
              postObject.likes = counts.size;

            })

          postArray.push(postObject);
          // console.log("Post Array: " + postArray);
        });
        setPostList(postArray);
      });
  };

  const toggleLikes = (postId) => {
    db.collection("post").doc(postId).collection("likes")
      .where('uid', '==', userUidShow)
      .get()
      .then((result) => {

        if (result.empty) {
          let likesData = {
            uid: userUidShow,
            likeId: uuidv4()
          }
          db.collection("post").doc(postId).collection("likes")
            .doc(likesData.likeId)
            .set(likesData)
            .then(() => {
              console.log('like 추가함');
              setTrickLikes('add');
            })

        } else {

          result.forEach((doc) => {
            let dataUid = doc.data().uid;
            let dataLikeId = doc.data().likeId;

            if (dataUid) {
              db.collection("post").doc(postId).collection("likes")
                .doc(dataLikeId)
                .delete()
                .then(() => {
                  console.log('like 제거함');
                  setTrickLikes('remove');
                })
            }
          })
        }

      })

  }

  useEffect(() => {
    call();
  }, [trickLikes]);

  // console.log("data : " + postList);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button
          onClick={() => {
            navigate("/inbox");
          }}
          className={styles.chat_btn}
        >
          My Chat &gt;
        </button>
        <div>
          <div className={styles.name_box}>
            <h1 className={styles.title}>
              Hello,{" "}
              <span className={styles.name}>
                {userNameShow}!{" "}
                <span
                  onClick={() => {
                    navigate("/myinfo");
                  }}
                >
                  <FontAwesomeIcon
                    // className={styles.heart_icon}
                    icon={faChevronRight}
                  />
                </span>
              </span>
            </h1>
          </div>
          <Location></Location>
          <h3 className={styles.postYourToday}>Post Your Today</h3>
          <button
            onClick={() => {
              navigate("/postingpage");
            }}
            className={styles.post_btn}
          >
            +
          </button>
        </div>

        <div className={styles.slide}>
          <div className={styles.mainBoard_option}>
            <span className={styles.option_all}>All</span>
            <span className={styles.option_nearby} onClick={() => {
              navigate("/nearby");
            }}>Nearby</span>
          </div>

          {postList.map(function (a, i) {
            return (
              <section className={styles.article_box} key={i}>
                <article
                  onClick={() => {
                    navigate("/personalpage", {
                      state: {
                        uid: a.uid
                      }
                    });
                  }}
                  className={styles.article}
                >
                  <div className={styles.article_title}>
                    <div
                      className={styles.article_profile_img}
                      style={{ backgroundImage: `url('${a.profileImage}')` }}
                    ></div>
                    <span className={styles.article_profile_name}>
                      {a.userName}
                    </span>
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
                          toggleLikes(a.postID);
                        }}
                        className={styles.like_heart}
                      >
                        {" "}
                        <FontAwesomeIcon
                          className={styles.heart_icon}
                          icon={faHeart}
                        />
                        <FontAwesomeIcon
                          className={styles.heart_icon}
                          icon={faHSquare}
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
