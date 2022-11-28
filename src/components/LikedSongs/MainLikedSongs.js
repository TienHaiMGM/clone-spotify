import React, { useState, useEffect } from "react";
import styles from "../../css/LikedSongs/MainLikedSongs.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faCirclePause,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import MainListLikedSongs from "./MainListLikedSongs";
import { getLikedSongs } from "../../redux/features/likedSongsSlice";

export default function MainLikedSongs(props) {
  const [statePlaying, setStatePlaying] = useState(false);
  const dispatch = useDispatch();
  const listTrackLikedSongs = useSelector(
    (state) => state.likedSongsReducer?.data?.listTrackLikedSongs
  );
  const dataTracks = listTrackLikedSongs;
  const statePlayingCurrent = props.statePlaying;
  useEffect(() => {
    dispatch(getLikedSongs());
  }, []);
  useEffect(() => {
    setStatePlaying(statePlayingCurrent);
  }, [statePlayingCurrent]);
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
          {dataTracks &&
            dataTracks?.map((data, index) => {
              return (
                <MainListLikedSongs
                  key={index}
                  number={index}
                  dataTracks={data}
                  getIdForUrl={props.getIdForUrl}
                  getIsPlaying={props.getIsPlaying}
                  statePlaying={statePlaying}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
