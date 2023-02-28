import React from "react";
import { Hearts } from "react-loader-spinner";
import styles from "./HeartSpinner.module.css";

export default function HeartSpinner() {
  return (
    <div className={styles.spinnerBox}>
      <Hearts
        height='150'
        width='150'
        color='#7259f5'
        ariaLabel='hearts-loading'
        wrapperStyle={{}}
        wrapperClass=''
        visible={true}
      />
    </div>
  );
}
