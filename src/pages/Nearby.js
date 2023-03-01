/*eslint-disable */
import React, { useEffect, useState } from "react";
import moment from "moment";
import styles from "./Nearby.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Location from "../components/Location";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { increaseLike } from "../Store";
import { db } from "../index.js";
import "firebase/firestore";
import "firebase/database";

export default function Nearby() {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const [nearbyPostList, setNearbyPostList] = useState([]);
  const [trick, setTrick] = useState([]);

  let userUidShow = useSelector((state) => state.userUidShow);

  let userNameShow = useSelector((state) => state.userNameShow);
  let userCityShow = useSelector((state) => state.userCityShow);
  let userCountryShow = useSelector((state) => state.userCountryShow);

  // get posting time
  let currentMoment = (realTime) => {
    return moment.utc(realTime).add(8, "hours").startOf("seconds").fromNow();
  };

  // get Posts data from firebase
  let call = () => {
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

            postArray.push(postObject);
          }
        });
        setNearbyPostList(postArray);
      });
  };

  // console.log(nearbyPostList)

  useEffect(() => {
    call();
  }, []);

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
