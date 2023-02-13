/*eslint-disable */
import React, { Profiler } from "react";
import styles from "./MainBoard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Location from "../components/Location";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeName, changeAge, addCount } from "../Store";
import { db } from "../index.js";
import "firebase/firestore";

export default function MainBoard() {
  // get data from firebase
  db.collection("post")
    .get()
    .then((result) => {
      result.forEach((doc) => {
        console.log(doc.data().상품명);
      });
    });

  let dispatch = useDispatch();
  let state = useSelector((state) => state);
  console.log(state.user.age);

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
              Hello, <span className={styles.name}>Kelly!&nbsp;</span>
            </h1>
            <span
              onClick={() => {
                navigate("/myinfo");
              }}
              className={styles.next_btn}
            >
              &gt;
            </span>
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
          <section className={styles.article_box}>
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
                  <span className={styles.like_heart}>💜</span>
                  <span className={styles.like_num}>18</span>
                </div>
                <span className={styles.post_time}>3 hours ago</span>
              </div>
            </article>
          </section>
          {/* <section className={styles.article_box}>
            <article className={styles.article}>
              <div className={styles.article_title}>
                <div className={styles.article_profile_img}></div>
                <span className={styles.article_profile_name}>April</span>
              </div>
              <div className={styles.article_content}>
                <h6>Everything will be fine with JK's smile</h6>
                <div></div>
              </div>
              <div className={styles.article_footer}>
                <div>
                  <span className={styles.like_heart}>💜</span>
                  <span className={styles.like_num}>18</span>
                </div>
                <span className={styles.post_time}>3 hours ago</span>
              </div>
            </article>
          </section> */}

          {/* redux practice  */}
          {/* <button onClick={()=>{
            dispatch(changeAge(10))
          }}>increase</button>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>아이템이름</th>
                <th>수량</th>
                <th>변경하기</th>
              </tr>
            </thead>
            <tbody>
              {state.items.map((a, i) => {
                return (
                  <tr key={i}>
                    <td>{state.items[i].id}</td>
                    <td>{state.items[i].name}</td>
                    <td>{state.items[i].count}</td>
                    <td><button onClick={()=>{
                      // dispatch(addCount(i));
                      dispatch(addCount(state.items[i].id));
                    }}>+</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table> */}
        </div>
      </div>
    </div>
  );
}
