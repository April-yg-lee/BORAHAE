/*eslint-disable */
import React, { Profiler, useEffect, useState } from "react";
import styles from "./MainBoard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Location from "../components/Location";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseLike,
} from "../Store";
import { db, storage } from "../index.js";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/database";
// import 'firebase/storage';

export default function MainBoard() {
  let test = ["h1", "h2"];
  let tmpArray = [];

  // get data from firebase
  let object = db.collection("post")
    .get()
    .then((result) => {
      result.forEach((doc) => {
        tmpArray.push(doc.data());
        console.log(tmpArray);
        // tmpArray.map((a, i)=> {
        //   console.log(i);
        // })
        // console.log(doc.data());
        
      });
    });

    // console.log(tmpArray[0]);
    // console.log(tmpArray[1]);

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

          {test.map(function (a, i) {
            return (
              <section className={styles.article_box} key={i}>
                <article
                  onClick={() => {
                    navigate("/personalpage");
                  }}
                  className={styles.article}
                >
                  <div className={styles.article_title}>
                    <div className={styles.article_profile_img}></div>
                    <span className={styles.article_profile_name}>April</span>
                  </div>
                  <div className={styles.article_content}>
                    <h6>Everything will be fine with JK smile</h6>
                    <div></div>
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
                      <span className={styles.like_num}>{like}</span>
                    </div>
                    <span className={styles.post_time}>3 hours ago</span>
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
