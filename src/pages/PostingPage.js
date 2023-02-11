/*eslint-disable */

import React, { Profiler } from "react";
import styles from "./PostingPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function PostingPage() {
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
            Hello, <span className={styles.name}>Kelly!&nbsp;</span>
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
                <input type='text' placeholder='Type here...'></input>
                <div className={styles.picture}>
                  <button>+</button>
                  <span>Picture</span>
                </div>
                <div className={styles.btn_section}>
                  <button
                    onClick={() => {
                      navigate("/personalpage");
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
