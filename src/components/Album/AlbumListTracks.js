import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import styles from "../../css/Album/MainAlbum.module.css";
import { convertMsToMinutesSeconds } from "../../utils/convertTime";
import { Link } from "react-router-dom";

export default function AlbumListTracks(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const dataTracks = props.dataTracks;
  const number = props.number + 1;
  const statePlayingCurrent = props.statePlaying;
  useEffect(() => {
    setIsPlaying(statePlayingCurrent);
  }, [statePlayingCurrent]);

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
    <div className={styles.albumListTracks}>
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
          <h6>{dataTracks.title}</h6>
          <p>
            <Link to={`/artist/${dataTracks.artists[0].id}`}>
              {dataTracks.artists[0].name}
            </Link>
          </p>
        </div>
      </div>
      <div className={styles.info}>
        <p>{convertMsToMinutesSeconds(dataTracks.duration)}</p>
      </div>
    </div>
  );
}
