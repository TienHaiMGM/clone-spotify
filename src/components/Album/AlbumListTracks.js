import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../css/Album/MainAlbum.module.css";
import { convertMsToMinutesSeconds } from "../../utils/convertTime";
import { useSelector, useDispatch } from "react-redux";
import { setPlaying } from "../../redux/features/currentlyPlayingSlice";

export default function AlbumListTracks(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [idPlaying, setIdPlaying] = useState(null);
  const dispatch = useDispatch();
  const dataTracks = props.dataTracks;
  const number = props.number + 1;
  const currentlyPlaying = useSelector(
    (state) => state.currentlyPlayingReducer.data.playing
  );

  useEffect(() => {
    dispatch(setPlaying({ id: idPlaying, isPlaying: isPlaying }));
  }, [isPlaying, idPlaying, dispatch]);

  const handleClickTogglePlayPause = (id) => {
    if (isPlaying === false) {
      setIsPlaying(true);
      setIdPlaying(id);
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <div className={styles.albumListTracks}>
      <div className={styles.track}>
        <span onClick={() => handleClickTogglePlayPause(dataTracks.id)}>
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </span>
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
