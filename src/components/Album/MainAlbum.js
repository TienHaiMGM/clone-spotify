import React, { useState, useEffect } from "react";
import {
  faCirclePause,
  faCirclePlay,
  faClock,
  faEllipsis,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../css/Album/MainAlbum.module.css";
import AlbumListTracks from "./AlbumListTracks";
import { useSelector } from "react-redux";

export default function MainAlbum(props) {
  const [statePlaying, setStatePlaying] = useState(false);
  const dataAlbumTracks = useSelector((state) => state.albumReducer);
  const dataTracks = dataAlbumTracks?.data?.tracks;
  const statePlayingCurrent = props.statePlaying;
  useEffect(() => {
    setStatePlaying(statePlayingCurrent);
  }, [statePlayingCurrent]);
  const handleClickTogglePlayPause = () => {
    setStatePlaying((state) => {
      return !state;
    });
  };
  console.log("statePlaying", statePlaying);
  return (
    <div className={styles.mainAlbum}>
      <div className={styles.mainAlbumBtn}>
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
            <p>
              <FontAwesomeIcon icon={faClock} />
            </p>
          </div>
        </div>
        <div className={styles.itemMainListTracks}>
          {dataTracks &&
            dataTracks.map((data, index) => {
              return (
                <AlbumListTracks
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
