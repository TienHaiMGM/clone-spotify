import React, { useState } from "react";
import styles from "../../css/LikedSongs/MainLikedSongs.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faCirclePause,
  faHeart,
  faEllipsis,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
export default function MainLikedSongs() {
  const [statePlaying, setStatePlaying] = useState(false);
  const handleClickTogglePlayPause = () => {
    setStatePlaying((state) => {
      return !state;
    });
  };
  return (
    <div className={styles.mainLikedSongs}>
      <div className={styles.mainLikedSongsBtn}>
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
      <div className={styles.listTracks}>
        <div className={styles.headerListTracks}>
          <div className={styles.titleHeader}>
            <p>#</p>
            <p>TITLE</p>
          </div>
          <div className={styles.info}>
            <p>ALBUM</p>
            <p>DATE ADDED</p>
            <p>
              <FontAwesomeIcon icon={faClock} />
            </p>
          </div>
        </div>
        <div className={styles.itemMainListTracks}>
          {/* {items &&
        items?.map((value, index) => {
          return (
            <MainListTracks key={index} tracks={value} number={index + 1} />
          );
        })} */}
        </div>
      </div>
    </div>
  );
}
