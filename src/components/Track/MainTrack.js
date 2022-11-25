import React from "react";
import {
  faCirclePlay,
  faClock,
  faEllipsis,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../css/Track/MainTrack.module.css";
import { useSelector } from "react-redux";

export default function MainTrack() {
  const stateTrack = useSelector((state) => state.trackReducer);
  const lyricsTrack = stateTrack?.data?.lyrics;
  console.log("lyricsTrack", lyricsTrack);
  return (
    <div className={styles.mainTrack}>
      <div className={styles.mainTrackBtn}>
        <span>
          <FontAwesomeIcon className={styles.iconPlay} icon={faCirclePlay} />
        </span>
        <span>
          <FontAwesomeIcon icon={faHeart} />
        </span>
        <span>
          <FontAwesomeIcon icon={faEllipsis} />
        </span>
      </div>
      <div className={styles.lyricsTrack}>
        <h3>Lyrics</h3>
        {lyricsTrack &&
          lyricsTrack.map((value) => {
            return <p>{value.words}</p>;
          })}
      </div>
    </div>
  );
}
