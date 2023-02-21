/*eslint-disable */

import React, { Profiler, useState } from "react";
import styles from "./PostingPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserNameShow,
  increaseLike,
} from "../Store";
import { db, storage } from "../index.js";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";

export default function PostingPage() {
  // db.collection('post').doc('post3').set({content: 'Love you!'})

  let [content, setContent] = useState("");
  let [file, setFile] = useState();

  let dispatch = useDispatch();
  let userNameShow = useSelector((state) => state.userNameShow);
  let navigate = useNavigate();

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
        <div>
          <h1 className={styles.title}>
            Hello, <span className={styles.name}>{userNameShow}!&nbsp;</span>
          </h1>
        </div>
        <div className={styles.slide}>
          <section className={styles.article_box}>
            <article className={styles.article}>
              <div className={styles.title_box}>
                <div className={styles.article_title}>
                  <div className={styles.article_big_profile_img}></div>
                </div>
              </div>
              <section className={styles.post_section}>
                <h4>Post your today :&#41; </h4>
                <input
                  type='text'
                  placeholder='Type here...'
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                ></input>
                <div className={styles.btn_container}>
                  <div className={styles.button_wrap}>
                    <label className={styles.button} htmlFor='upload'>
                      + Picture
                    </label>

                    <input
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                      }}
                      id='upload'
                      type='file'
                    ></input>
                  </div>
                </div>

                <div className={styles.btn_section}>
                  <button
                    onClick={() => {

                      let storageRef = storage.ref();
                      let savePath = storageRef.child(
                        "postingImage/" + file.name
                      );
                      let upload = savePath.put(file);

                      // firebase code
                      upload.on(
                        "state_changed",
                        // 변화시 동작하는 함수
                        null,
                        //에러시 동작하는 함수
                        (error) => {
                          console.error("실패사유는", error);
                        },
                        // 성공시 동작하는 함수
                        () => {
                          upload.snapshot.ref
                            .getDownloadURL()
                            .then((postingUrl) => {
                              firebase.auth().onAuthStateChanged((user) => {
                                if (user) {
                                  db.collection("user")
                                    .get()
                                    .then((result) => {
                                      result.forEach((doc) => {
                                        if (
                                          user.uid == doc.data().userInfo.uid
                                        ) {
                                          console.log(
                                            "업로드된 경로는",
                                            postingUrl
                                          );
                                          let saveData = {
                                            content: content,
                                            date: new Date(),
                                            postingImage: postingUrl,
                                            likes: 0,
                                            uid: doc.data().userInfo.uid,
                                            userName: doc.data().userInfo.name,
                                            profileImage:
                                              doc.data().userInfo.profileImage,
                                          };
                                          console.log(saveData.content);

                                          db.collection("post")
                                            .add(saveData)
                                            .then(() => {
                                              navigate("/mydashboard");
                                            })
                                            .catch((err) => {
                                              console.log(err);
                                            });
                                        }
                                      });
                                    });
                                }
                              });
                            });
                        }
                      );
                    }}
                    className={styles.submit_btn}
                  >
                    Submit
                  </button>
                </div>
              </section>
            </article>
          </section>
        </div>
      </div>
    </div>
  );
}
