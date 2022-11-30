import React, { useState, useEffect } from "react";
import styles from "../../css/LikedSongs/MainLikedSongs.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
  convertDaysAdded,
  convertMsToMinutesSeconds,
} from "../../utils/convertTime";
import { setPlaying } from "../../redux/features/currentlyPlayingSlice";
import { useDispatch } from "react-redux";

export default function MainListLikedSongs(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [idPlaying, setIdPlaying] = useState(null);
  const dispatch = useDispatch();
  const tracks = props?.dataTracks;
  const number = props.number + 1;
  const statePlayingCurrent = props.statePlaying;
  useEffect(() => {
    setIsPlaying(statePlayingCurrent);
  }, [statePlayingCurrent]);

  useEffect(() => {
    dispatch(setPlaying({ id: idPlaying, isPlaying: isPlaying }));
  }, [isPlaying, idPlaying]);

  const handleClickTogglePlayPause = (id) => {
    if (isPlaying === false) {
      setIsPlaying(true);
      setIdPlaying(id);
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <div className={styles.mainListTracks}>
      <div className={styles.track}>
        <span onClick={() => handleClickTogglePlayPause(tracks.id)}>
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </span>
        <p>{number}</p>
        <div className={styles.infoTrack}>
          <img src={tracks.image} alt="" />
          <div>
            <h6>
              <Link to={`/track/${tracks.id}`}>{tracks.title}</Link>
            </h6>
            {tracks?.artists &&
              tracks?.artists?.map((value, index) => {
                return (
                  <span key={value.id}>
                    <Link to={`/artist/${value.id}`}>
                      {" "}
                      {index && index > 0 ? ", " + value.name : value.name}
                    </Link>
                  </span>
                );
              })}
          </div>
        </div>
      </div>
      <div className={styles.info}>
        <p>
          <Link to={`/album/${tracks.album.id}`}>{tracks.album.name}</Link>
        </p>
        <p>{convertDaysAdded(tracks.daysAdd)} days ago</p>
        <p>{convertMsToMinutesSeconds(tracks.duration)}</p>
      </div>
    </div>
  );
}
