import React, { useState } from "react";
import {
  faCirclePlay,
  faClock,
  faEllipsis,
  faHeart,
  faCirclePause,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../css/Track/MainTrack.module.css";
import { useSelector } from "react-redux";

export default function MainTrack() {
  const [statePlaying, setStatePlaying] = useState(false);
  const stateTrack = useSelector((state) => state.trackReducer);
  const lyricsTrack = stateTrack?.data?.lyrics;
  const handleClickTogglePlayPause = () => {
    setStatePlaying((state) => {
      return !state;
    });
  };
  return (
    <div className={styles.mainTrack}>
      <div className={styles.mainTrackBtn}>
        {statePlaying ? (
          <span>
            <FontAwesomeIcon
              onClick={() => handleClickTogglePlayPause()}
              className={styles.iconPlay}
              icon={faCirclePause}
            />
          </span>
        ) : (
          <span>
            <FontAwesomeIcon
              onClick={() => handleClickTogglePlayPause()}
              className={styles.iconPlay}
              icon={faCirclePlay}
            />
          </span>
        )}
        <span>
          <FontAwesomeIcon icon={faHeart} />
        </span>
        <span>
          <FontAwesomeIcon icon={faEllipsis} />
        </span>
      </div>
      <div className={styles.lyricsTrack}>
        <h3>Lyrics</h3>
        {lyricsTrack
          ? lyricsTrack.map((value, index) => {
              return <p key={index}>{value.words}</p>;
            })
          : "Lyrics is available in spotify"}
      </div>
    </div>
  );
}
