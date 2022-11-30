import React from "react";
import styles from "../css/AlertSuccessSave.module.css";

export default function AlertSuccessSave(props) {
  return (
    <div className={`${styles.alertSuccess} `}>
      <span>
        {props.responseStatus} to Your {props.type}
      </span>
    </div>
  );
}
