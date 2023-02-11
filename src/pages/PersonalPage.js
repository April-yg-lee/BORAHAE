/*eslint-disable */
import React, { Profiler } from "react";
import styles from "./PersonalPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function PersonalPage() {
  let navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button onClick={() => {
            navigate(-1);
          }} className={styles.back_btn}>&lt; Back</button>
        <div className={styles.slide}>
          <section className={styles.article_box}>
            <article className={styles.article}>
              <div className={styles.title_box}>
                <div className={styles.article_title}>
                  <div className={styles.article_big_profile_img}></div>
                  <span className={styles.article_profile_name}>April</span>
                </div>
                <button onClick={() => {
            navigate('/chatting');
          }} className={styles.chat_btn}>Chat</button>
              </div>
              <div className={styles.introduce}>
                <h4>Vancouver, Canada</h4>
                <h5>
                  32. Web Developer. BTS 💜 OT7. JK Biased. <br></br>Currently
                  living in Vancouver. Let's chill!
                </h5>
              </div>
            </article>
          </section>
          <div className={styles.mainBoard_option}>
            <span className={styles.option_all}>Recent</span>
          </div>
          <section className={styles.article_box}>
            <article className={styles.article}>
              <div className={styles.title_box}>
                <div className={styles.article_title}>
                  <div className={styles.article_profile_img}></div>
                  <span className={styles.article_profile_name}>April</span>
                </div>
                <div className={styles.del_edit_btn}>
                  <FontAwesomeIcon icon={faTrashCan} />
                  <FontAwesomeIcon icon={faPenToSquare} />
                </div>
              </div>
              <div className={styles.article_content}>
                <h6>Everything will be fine with JK's smile</h6>
                <div></div>
              </div>
              <div className={styles.article_footer}>
                <div>
                  <span className={styles.like_heart}>
                    {" "}
                    <FontAwesomeIcon icon={faHeart} />
                  </span>
                  <span className={styles.like_num}>18</span>
                </div>
                <span className={styles.post_time}>3 hours ago</span>
              </div>
            </article>
          </section>
        </div>
      </div>
    </div>
  );
}
