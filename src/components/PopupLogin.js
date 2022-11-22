import { faCaretLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "../css/PopupLogin.module.css";

export default function PopupLogin({ title, content }) {
  return (
    <div className={styles.position}>
      <FontAwesomeIcon className={styles.shape} icon={faCaretLeft} />
      <div className={styles.popupLogin}>
        <h1>{title}</h1>
        <p>{content}</p>
        <div className={styles.choseButton}>
          <button className={styles.notNow} type="button">
            <a href="">Not Now</a>
          </button>
          <button className={styles.logIn} type="button">
            <a href="">Log in</a>
          </button>
        </div>
      </div>
      <a onClick={""}>
        <FontAwesomeIcon className={styles.iconClose} icon={faXmark} />
      </a>
    </div>
  );
}
