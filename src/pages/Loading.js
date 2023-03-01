import React from "react";
import styles from "./Loading.module.css";
import LogoTitle from "../components/LogoTitle";

export default function Loading() {
  return (
    <div className={styles.container}>
      <section className={styles.signin_contents}>
        <LogoTitle></LogoTitle>
      </section>
    </div>
  );
}
