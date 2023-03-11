/**
 * @author April & Noah
 * @purpose Main Dashboard에서 Nearby 카테코리 클릭하면  나랑 동일한 도시, 나라의 user 의 포스트만 보여짐
 * @date 2023.03.11
 * @update
 */

/*eslint-disable */
import React, { useEffect, useState } from "react";
import moment from "moment";
import styles from "./Nearby.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faChevronRight,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import Location from "../components/Location";
import HeartSpinner from "../components/HeartSpinner";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { db } from "../index.js";
import "firebase/firestore";
import "firebase/database";

export default function Nearby() {
  const navigate = useNavigate();

  const [nearbyPostList, setNearbyPostList] = useState([]);
  const [trick, setTrick] = useState([]);
  const [trickLikes, setTrickLikes] = useState("");
  const [loading, setLoading] = useState(false);

  const userUidShow = useSelector((state) => state.userUidShow);

  const userNameShow = useSelector((state) => state.userNameShow);
  const userCityShow = useSelector((state) => state.userCityShow);
  const userCountryShow = useSelector((state) => state.userCountryShow);

  let heartPosition;
  if (loading) {
    heartPosition = <HeartSpinner />;
  }

  // get posting time
  const currentMoment = (realTime) => {
    return moment.utc(realTime).add(8, "hours").startOf("seconds").fromNow();
  };

  // get Posts data from firebase
  const postCall = () => {
    let postArray = [];
    db.collection("post")
      .where("city", "==", userCityShow)
      .where("country", "==", userCountryShow)
      .orderBy("date", "desc")
      .get()
      .then((result) => {
        result.forEach((doc) => {
          let postObject = doc.data();

          if (postObject.uid != userUidShow) {
            db.collection("user")
              .where("userInfo.uid", "==", postObject.uid)
              .get()
              .then((info) => {
                info.forEach((infoDoc) => {
                  postObject.userName = infoDoc.data().userInfo.name;
                  postObject.profileImage =
                    infoDoc.data().userInfo.profileImage;
                  setTrick(postObject); // 조회 후 렌더링을 위한 꼼수
                });
              });

            db.collection("post")
              .doc(postObject.postID)
              .collection("likes")
              .get()
              .then((counts) => {
                postObject.likes = counts.size;
              });

            postArray.push(postObject);
          }
        });
        setNearbyPostList(postArray);
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
          let likesData = {
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
            navigate("/inbox");
          }}
          className={styles.chat_btn}
        >
          <FontAwesomeIcon icon={faCommentDots} />
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
            <span
              className={styles.option_all}
              onClick={() => {
                navigate("/mainboard");
              }}
            >
              All
            </span>
            <span className={styles.option_nearby}>Nearby</span>
          </div>
          {heartPosition}

          {nearbyPostList.map(function (a, i) {
            return (
              <section className={styles.article_box} key={i}>
                <article
                  onClick={() => {
                    navigate("/personalpage", {
                      state: {
                        uid: a.uid,
                      },
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
