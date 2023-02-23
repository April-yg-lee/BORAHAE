/*eslint-disable */
import React, { Profiler, useState, useEffect } from "react";
import moment from "moment";
import styles from "./MyDashBoard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserNameShow,
  changeName,
  changeAge,
  addCount,
  increaseLike,
} from "../Store";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../index.js";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/database";

export default function MyDashBoard() {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let userUidShow = useSelector((state) => state.userUidShow);
  let userNameShow = useSelector((state) => state.userNameShow);
  let userCountryShow = useSelector((state) => state.userCountryShow);
  let userCityShow = useSelector((state) => state.userCityShow);
  let userIntroShow = useSelector((state) => state.userIntroShow);
  let userProfilePicShow = useSelector((state) => state.userProfilePicShow);

  let [postList, setPostList] = useState([]);

  // get posting time
  let currentMoment = (realTime) => {
    return moment.utc(realTime).add(8, "hours").startOf("seconds").fromNow();
  };

  // get Posts data from firebase
  let call = () => {
    let postArray = [];
    db.collection("post")
      .where("uid", "==", userUidShow)
      .orderBy("date", "desc")
      .get()
      .then((result) => {
        result.forEach((doc) => {
          postArray.push(doc.data());
          // console.log("Post Array: " + postArray);
        });
        setPostList(postArray);
      });
  };

  useEffect(() => {
    call();
  }, []);

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
                    <div className={styles.del_edit_btn}>
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        onClick={() => {
                          // let copy = [...postList];
                          // copy.splice(i, 1); // i번째자리에서 1개 삭제
                          // setPostList(copy);
                          // var jobskill_ref = db.collection('job_skills').where('postID','==','50ea82d1-f176-49d9-b8d3-f000cf172d8c');
                          // let batch = db.batch();
                          // console.log(jobskill_ref);
                          // console.log(batch);
                          // jobskill_ref
                          //   .get()
                          //   .then(snapshot => {
                          //     snapshot.docs.forEach(doc => {
                          //       console.log(doc.ref);
                          //       batch.delete(doc.ref);
                          //     });
                          //     return batch.commit();
                          //   })
                          // db.collection("post")
                          // .where("postID", "==", '50ea82d1-f176-49d9-b8d3-f000cf172d8c')
                          // .delete()
                          // .then(()=>{
                          //   console.log('deleted!')
                          // })
                          // .catch((err)=>{
                          //   console.log(err);
                          // })
                          // db.collection("post")
                          //   .doc('VOXAh4RrZ06LWVotNb1C')
                          //   .delete()
                          //   .then(() => {
                          //     console.log("Document successfully deleted!");
                          //   })
                          //   .catch((error) => {
                          //     console.error("Error removing document: ", error);
                          //   });
                        }}
                      />
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        onClick={() => {
                          navigate("/postingedit");
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
