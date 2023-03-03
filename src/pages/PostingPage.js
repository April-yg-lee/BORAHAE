/*eslint-disable */

import React, { useState } from "react";
import styles from "./PostingPage.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { db, storage } from "../index.js";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";
import Spinner from "../components/Spinner";

export default function PostingPage() {
  let navigate = useNavigate();

  let [content, setContent] = useState("");
  let [file, setFile] = useState();
  let [fileNameShow, setFileNameShow] = useState("");
  let [loading, setLoading] = useState(false);

  let userNameShow = useSelector((state) => state.userNameShow);
  let userUidShow = useSelector((state) => state.userUidShow);
  let userCountryShow = useSelector((state) => state.userCountryShow);
  let userCityShow = useSelector((state) => state.userCityShow);

  let listContent;

  if (loading) {
    listContent = <Spinner />;
  }


  const addPost = () => {
    setLoading(true);
    let imgCreateDate = new Date();
    let storageRef = storage.ref();
    let savePath = storageRef.child(
      "postingImage/" + "posting_" + imgCreateDate
    );
    let upload = savePath.put(file);
    // firebase code
    upload.on(
      "state_changed",
      null,

      //에러시 동작하는 함수
      (error) => {
        console.error("실패사유는", error);
      },
      // 성공시 동작하는 함수
      () => {
        upload.snapshot.ref.getDownloadURL().then((postingUrl) => {
          console.log("업로드된 경로는", postingUrl);
          let saveData = {
            content: content,
            date: formattedTimestamp(),
            postingImage: postingUrl,
            uid: userUidShow,
            city: userCityShow,
            country: userCountryShow,
            postID: uuidv4(),
          };
          db.collection("post")
            .doc(saveData.postID)
            .set(saveData)
            .then(() => {
              setLoading(false);
              navigate("/mydashboard");
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    );
  };

  const formattedTimestamp = () => {
    const dateObj = new Date();
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    const date = ('0' + dateObj.getDate()).slice(-2);
    const year = dateObj.getFullYear();
    const currentDate = year + '-' + month + '-' + date;
    const currentTime = dateObj.toTimeString().split(" ")[0];
    return `${currentDate} ${currentTime}`;
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
        {listContent}
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
                <textarea
                  type='text'
                  placeholder='Type here...'
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                ></textarea>
                <div className={styles.btn_container}>
                  <div className={styles.button_wrap}>
                    <label className={styles.button} htmlFor='upload'>
                      + Picture
                    </label>

                    <input
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                        let hidePath = e.target.value
                          .split("/")
                          .pop()
                          .split("\\")
                          .pop();
                        setFileNameShow(hidePath);
                      }}
                      name='upload'
                      id='upload'
                      type='file'
                    ></input>
                    <span className={styles.file_name}>{fileNameShow}</span>
                  </div>
                </div>

                <div className={styles.btn_section}>
                  <button onClick={addPost} className={styles.submit_btn}>
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
