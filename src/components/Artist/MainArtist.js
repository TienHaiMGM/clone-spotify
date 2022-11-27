import React, { useState } from "react";
import styles from "../../css/Artist/MainArtist.module.css";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faCirclePause,
  faEllipsis,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { convertMsToMinutesSeconds } from "../../utils/convertTime";

export default function MainArtist() {
  const [statePlaying, setStatePlaying] = useState(false);
  const artistTracks = useSelector(
    (state) => state.artistReducer.data.artistTracks
  );
  console.log(artistTracks);
  const handleClickTogglePlayPause = () => {
    setStatePlaying((state) => {
      return !state;
    });
  };
  return (
    <div className={styles.mainArtist}>
      <div className={styles.headerArtistBtn}>
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
        <button className={styles.followBtn} type="button">
          FOLLOW
        </button>
        <span>
          <FontAwesomeIcon className={styles.ellipsisIcon} icon={faEllipsis} />
        </span>
      </div>
      <div className={styles.contentMainArtist}>
        <div className={styles.popularTracks}>
          <h3>Popular</h3>
          {artistTracks &&
            artistTracks.map((value, index) => {
              return (
                <div key={value.id} className={styles.track}>
                  <div>
                    <div className={styles.numberTrack}>
                      {statePlaying ? (
                        <span onClick={() => handleClickTogglePlayPause()}>
                          <FontAwesomeIcon icon={faPause} />
                        </span>
                      ) : (
                        <span
                          onClick={() => {
                            handleClickTogglePlayPause();
                          }}
                        >
                          <FontAwesomeIcon icon={faPlay} />
                        </span>
                      )}
                      <p>{index + 1}</p>
                    </div>
                    <img src={value.image} alt={value.title} />
                    <p>{value.title}</p>
                  </div>
                  <p>123123view</p>
                  <p>{convertMsToMinutesSeconds(value.duration)}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
