import React from "react";
import styles from "../../css/Search/ResultUserSearch.module.css";
import { convertMsToMinutesSeconds } from "../../utils/convertTime";

export default function Songs(props) {
  return (
    <div className={styles.mainSongs}>
      <div className={styles.songsInfo}>
        <img src={props.value.images} alt="" />
        <div>
          <h6>{props.value.title} </h6>
          <p>{props.value.artists}</p>
        </div>
      </div>
      <div>
        <p>{convertMsToMinutesSeconds(props.value.duration)}</p>
      </div>
    </div>
  );
}
