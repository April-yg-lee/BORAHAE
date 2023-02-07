/*eslint-disable */
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import styles from './SignInMain.module.css';

export default function SignInMain() {
  return (
   
    <div className={styles.container}>
      <div className={styles.signin_contents}>
        <FontAwesomeIcon icon={faHeart} className={styles.b_logo} />
        <h2 className={styles.b_title}>BORAHAE</h2>
        <div className={styles.input_box}>
          <input
            className={styles.email_input}
            type='email'
            placeholder='&nbsp;Enter your email'
          ></input>
          <input
            className={styles.pw_input}
            type='password'
            placeholder='&nbsp;Enter your password'
          ></input>
        </div>
        <div className={styles.signin_btn_box}>
          <button className={styles.signin_btn}>SIGN IN</button>
          <button className={styles.signup_btn}>SIGN UP</button>
        </div>
        <div className={styles.othermode_box}>
          <h4>Other modes</h4>
        </div>
      </div>
    </div>
  )
}
