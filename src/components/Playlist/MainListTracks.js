import React, { useState } from "react";
import styles from "../../css/Playlist/MainPlaylist.module.css";
import {
  convertDaysAdded,
  convertMsToMinutesSeconds,
} from "../../utils/convertTime";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
export default function MainListTracks(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const number = props.number + 1;
  const tracks = props.tracks;

  const handleClickPlay = () => {
    setIsPlaying(true);
    props.getIdForUrl(props.number);
    props.getIsPlaying(true);
  };
  const handleClickPause = () => {
    setIsPlaying(false);
    props.getIdForUrl(null);
    props.getIsPlaying(false);
  };

  return (
    <div className={styles.mainListTracks}>
      <div className={styles.track}>
        {isPlaying ? (
          <span onClick={() => handleClickPause()}>
            <FontAwesomeIcon icon={faPause} />
          </span>
        ) : (
          <span
            onClick={() => {
              handleClickPlay();
            }}
          >
            <FontAwesomeIcon icon={faPlay} />
          </span>
        )}
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
