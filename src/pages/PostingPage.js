/*eslint-disable */

import React, { Profiler, useMemo, useState } from "react";
import styles from "./PostingPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { setUserNameShow, increaseLike } from "../Store";
import { db, storage } from "../index.js";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";
import Spinner from "../components/Spinner";

export default function PostingPage() {
  // db.collection('post').doc('post3').set({content: 'Love you!'})
  console.log('포스팅 등록 화면 들어옴');
  let [content, setContent] = useState("");
  let [file, setFile] = useState();
  let [fileNameShow, setFileNameShow] = useState("");
  let [loading, setLoading] = useState(false);

  console.log('처음 content : ' + content);

  let listContent;

  if (loading) {
    listContent = <Spinner />;
  }

  let dispatch = useDispatch();
  let navigate = useNavigate();

  let userNameShow = useSelector((state) => state.userNameShow);
  let userUidShow = useSelector((state) => state.userUidShow);
  let userCountryShow = useSelector((state) => state.userCountryShow);
  let userCityShow = useSelector((state) => state.userCityShow);


  const addPost = () => {
    console.log('포스팅 전 스피너 전 for TEST');
    setLoading(true);
    let imgCreateDate = new Date();
    let storageRef = storage.ref();
    let savePath = storageRef.child(
      "postingImage/" + "posting_" + imgCreateDate
    );
    let upload = savePath.put(file);
    console.log('포스팅 업로드 시작 전');
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
        console.log('포스팅 업로드 성공 로직 고고 : ' + content);
        upload.snapshot.ref
          .getDownloadURL()
          .then((postingUrl) => {

            console.log(
              "업로드된 경로는",
              postingUrl
            );
            let saveData = {
              content: content,
              date: formattedTimestamp(),
              postingImage: postingUrl,
              likes: 0,
              uid: userUidShow,
              city: userCityShow,
              country: userCountryShow,
              postID: uuidv4(),
            };
            console.log('포스팅 파일업로드 완료 디비 전');
            console.log('업로드 후 content : ' + content);
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

            setFile("");
            setContent("");
            setFileNameShow("");
            console.log('초기화 후 content : ' + content);
            console.log('포스팅 파일업로드 완료 디비 후');

          });
      }
    );
  }


  const formattedTimestamp = () => {
    const convertDate = new Date();
    // console.log(`convertDate: ${convertDate}`)
    const ISOdate = convertDate.toISOString().split("T")[0];
    // console.log(`ISOdate: ${ISOdate}`)
    // const dateForSubtract = new Date(Date.parse(ISOdate) - 24 * 60 * 60 * 1000);
    // console.log(`dateForSubtract: ${dateForSubtract}`)
    // const currentDate = dateForSubtract.toLocaleDateString("sv", {
    //   timeZone: "UTC",
    // });
    // console.log(`currentDate: ${currentDate}`)
    const currentTime = convertDate.toTimeString().split(" ")[0];
    // console.log(`currentTime: ${currentTime}`)

    return `${ISOdate} ${currentTime}`;
  };


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {listContent}
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
                  <button
                    onClick={addPost}
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