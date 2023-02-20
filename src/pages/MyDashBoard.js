/*eslint-disable */
import React, { Profiler } from "react";
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

export default function MyDashBoard() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let userNameShow = useSelector((state) => state.userNameShow);
  let userCountryShow = useSelector((state) => state.userCountryShow);
  let userCityShow = useSelector((state) => state.userCityShow);
  let userProfilePicShow = useSelector((state) => state.userProfilePicShow);

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
                <h5>I'm mad for headband. Jin is my true love!!!</h5>
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
                  <span className={styles.article_profile_name}>
                    {userNameShow}
                  </span>
                </div>
                <div className={styles.del_edit_btn}>
                  <FontAwesomeIcon icon={faTrashCan} />
                  <FontAwesomeIcon icon={faPenToSquare} />
                </div>
              </div>
              <div className={styles.article_content}>
                <h6>Wonderful Days</h6>
                <div></div>
                {/* <div style={{backgroundImage: `"url('${postingImageShow}')",`}}></div> */}
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
