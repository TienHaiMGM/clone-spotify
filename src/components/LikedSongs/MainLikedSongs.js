import {
  faCirclePause,
  faCirclePlay,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../css/LikedSongs/MainLikedSongs.module.css";
import { getLikedSongs } from "../../redux/features/likedSongsSlice";
import MainListLikedSongs from "./MainListLikedSongs";
import { setPlaying } from "../../redux/features/currentlyPlayingSlice";

export default function MainLikedSongs() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [idPlaying, setIdPlaying] = useState(null);
  const dispatch = useDispatch();
  const listTrackLikedSongs = useSelector(
    (state) => state.likedSongsReducer?.data?.listTrackLikedSongs
  );
  const dataTracks = listTrackLikedSongs;
  const currentlyPlaying = useSelector(
    (state) => state.currentlyPlayingReducer.data.playing
  );

  useEffect(() => {
    dispatch(getLikedSongs());
  }, []);

  useEffect(() => {
    currentlyPlaying.isPlaying ? setIsPlaying(true) : setIsPlaying(false);
  }, [currentlyPlaying.isPlaying]);
  const handleClickTogglePlayPause = () => {
    setIsPlaying((value) => {
      dispatch(setPlaying({ id: idPlaying, isPlaying: !value }));
      return !value;
    });
  };

  return (
    <div className={styles.mainLikedSongs}>
      <div className={styles.mainLikedSongsBtn}>
        <span>
          <FontAwesomeIcon
            onClick={() => handleClickTogglePlayPause()}
            className={styles.iconPlay}
            icon={isPlaying ? faCirclePause : faCirclePlay}
          />
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
          {dataTracks &&
            dataTracks?.map((data, index) => {
              return (
                <MainListLikedSongs
                  key={index}
                  number={index}
                  dataTracks={data}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
