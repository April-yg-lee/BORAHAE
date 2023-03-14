/**
* @author April & Noah 
* @purpose Sign in 한 user의 개인페이지 구현 
 user 본인의 소개글, user본인의 포스팅한 글만 보여짐, user본인 글 delete 기능 구현 
* @date 2023.03.11 
* @update
*/

/*eslint-disable */
import React, { useState, useEffect } from "react";
import moment from "moment";
import styles from "./MyDashBoard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeartSpinner from "../components/HeartSpinner";
import { v4 as uuidv4 } from "uuid";
import { db } from "../index.js";
import "firebase/firestore";
import "firebase/database";

export default function MyDashBoard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [trick, setTrick] = useState([]);
  const [trickLikes, setTrickLikes] = useState("");

  const [postList, setPostList] = useState([]);

  const userUidShow = useSelector((state) => state.userUidShow);
  const userNameShow = useSelector((state) => state.userNameShow);
  const userCountryShow = useSelector((state) => state.userCountryShow);
  const userCityShow = useSelector((state) => state.userCityShow);
  const userIntroShow = useSelector((state) => state.userIntroShow);
  const userProfilePicShow = useSelector((state) => state.userProfilePicShow);

  let heartPosition;
  if (loading) {
    heartPosition = <HeartSpinner />;
  }

  // get posting time
  const currentMoment = (realTime) => {
    return moment.utc(realTime).add(7, "hours").startOf("seconds").fromNow();
  };

  // get Posts data from firebase
  const postCall = () => {
    let postArray = [];
    db.collection("post")
      .where("uid", "==", userUidShow)
      .orderBy("date", "desc")
      .get()
      .then((result) => {
        result.forEach((doc) => {
          let postObject = doc.data();

          db.collection("post")
            .doc(postObject.postID)
            .collection("likes")
            .get()
            .then((counts) => {
              postObject.likes = counts.size;
              setTrick(postObject);
            });

          postArray.push(postObject);
        });
        setPostList(postArray);
      });
  };

  // code by Noah
  // toggle the number of likes by clicking
  const toggleLikes = (postId) => {
    setLoading(true);
    db.collection("post")
      .doc(postId)
      .collection("likes")
      .where("uid", "==", userUidShow)
      .get()
      .then((result) => {
        if (result.empty) {
          const likesData = {
            uid: userUidShow,
            likeId: uuidv4(),
          };
          db.collection("post")
            .doc(postId)
            .collection("likes")
            .doc(likesData.likeId)
            .set(likesData)
            .then(() => {
              setTrickLikes(`${postId}add`);
              setLoading(false);
            });
        } else {
          result.forEach((doc) => {
            let dataUid = doc.data().uid;
            let dataLikeId = doc.data().likeId;

            if (dataUid) {
              db.collection("post")
                .doc(postId)
                .collection("likes")
                .doc(dataLikeId)
                .delete()
                .then(() => {
                  setLoading(false);
                  setTrickLikes(`${postId}remove`);
                });
            }
          });
        }
      });
  };

  useEffect(() => {
    postCall();
  }, [trickLikes]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button
          onClick={() => {
            navigate("/mainboard");
          }}
          className={styles.back_btn}
        >
          &lt; Main Board
        </button>
        <div className={styles.slide}>
          <section className={styles.article_box}>
            <article className={styles.article}>
              <div className={styles.title_box}>
                <div className={styles.article_title}>
                  <div
                    className={styles.article_big_profile_img}
                    style={{ backgroundImage: `url('${userProfilePicShow}')` }}
                  ></div>
                  <span className={styles.article_profile_name}>
                    {userNameShow}
                  </span>
                </div>
                <button
                  onClick={() => {
                    navigate("/inbox");
                  }}
                  className={styles.chat_btn}
                >
                  Inbox
                </button>
              </div>
              <div className={styles.introduce}>
                <h4>
                  {userCityShow}, {userCountryShow}
                </h4>
                <h5>{userIntroShow}</h5>
              </div>
            </article>
          </section>
          <div className={styles.mainBoard_option}>
            <span className={styles.option_all}>Recent</span>
          </div>
          {heartPosition}

          {postList.map(function (a, i) {
            return (
              <section className={styles.article_box} key={i}>
                <article className={styles.article}>
                  <div className={styles.article_title}>
                    <div
                      className={styles.article_profile_img}
                      style={{
                        backgroundImage: `url('${userProfilePicShow}')`,
                      }}
                    ></div>
                    <span className={styles.article_profile_name}>
                      {userNameShow}
                    </span>
                    <div className={styles.del_edit_btn}>
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        onClick={() => {
                          let copy = [...postList];
                          copy.splice(i, 1); // i번째자리에서 1개 삭제
                          setPostList(copy);

                          db.collection("post")
                            .doc(a.postID)
                            .delete()
                            .catch((error) => {
                              console.error("Error removing document: ", error);
                            });
                        }}
                      />
                    </div>
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
