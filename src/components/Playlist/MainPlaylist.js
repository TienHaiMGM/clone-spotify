import {
  faCirclePlay,
  faCirclePause,
  faClock,
  faEllipsis,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styles from "../../css/Playlist/MainPlaylist.module.css";
import MainListTracks from "./MainListTracks";
import { useSelector } from "react-redux";
export default function MainPlaylist() {
  const [statePlaying, setStatePlaying] = useState(false);
  const statePlaylists = useSelector((state) => state.playlistsReducer);
  const items = statePlaylists?.data?.playList?.tracks;
  const handleClickTogglePlayPause = () => {
    setStatePlaying((state) => {
      return !state;
    });
  };
  return (
    <div className={styles.mainPlaylist}>
      <div className={styles.mainPlaylistBtn}>
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
          {items &&
            items?.map((value, index) => {
              return (
                <MainListTracks key={index} tracks={value} number={index + 1} />
              );
            })}
        </div>
      </div>
    </div>
  );
}
