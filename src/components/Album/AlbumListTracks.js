import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import styles from "../../css/Album/MainAlbum.module.css";
import { convertMsToMinutesSeconds } from "../../utils/convertTime";

export default function AlbumListTracks(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const dataTracks = props.dataTracks;
  const number = props.number;
  const tracks = {
    name: dataTracks.name,
    ids: dataTracks.id,
    type: dataTracks.type,
    url: dataTracks["preview_url"],
    duration: dataTracks["duration_ms"],
    artist: dataTracks.artists[0].name,
  };

  const handleClickPlay = () => {
    props.getIdForUrl(tracks);
    setIsPlaying(true);
  };
  const handleClickPause = () => {
    props.getIdForUrl(null);
    setIsPlaying(false);
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
          <h6>{tracks.name}</h6>
          <p>{tracks.artist}</p>
        </div>
      </div>
      <div className={styles.info}>
        <p>{convertMsToMinutesSeconds(tracks.duration)}</p>
      </div>
    </div>
  );
}
