/*eslint-disable */
import React, { useEffect, useState } from "react";
import moment from "moment";
import styles from "./MainBoard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Location from "../components/Location";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { increaseLike } from "../Store";
import { db, storage } from "../index.js";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/database";
import { current } from "@reduxjs/toolkit";
// import 'firebase/storage';

export default function MainBoard() {
  const [postList, setPostList] = useState([]);


  let currentMoment = (realTime) => {
    return moment.utc(realTime).add(8, 'hours').startOf("seconds").fromNow();
  };

  // get data from firebase
  let call = () => {
    let postArray = [];
    db.collection("post")
      .get()
      .then((result) => {
        result.forEach((doc) => {
          postArray.push(doc.data());
          console.log("Post Array: " + postArray);
        });
        setPostList(postArray);
      });
  };

  useEffect(() => {
    call();
  }, []);

  console.log("data : " + postList);

  let dispatch = useDispatch();

  let userNameShow = useSelector((state) => state.userNameShow);
  let userCityShow = useSelector((state) => state.userCityShow);
  let userCountryShow = useSelector((state) => state.userCountryShow);

  let like = useSelector((state) => state.like);

  let navigate = useNavigate();

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
            <span className={styles.option_nearby}>Nearby</span>
          </div>

          {postList.map(function (a, i) {
            return (
              <section className={styles.article_box} key={i}>
                <article
                  onClick={() => {
                    navigate("/personalpage");
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
