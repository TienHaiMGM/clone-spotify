import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../css/Artist/MainArtist.module.css";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertMsToMinutesSeconds } from "../../utils/convertTime";
import { setPlaying } from "../../redux/features/currentlyPlayingSlice";

export default function ArtistListTracks(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [idPlaying, setIdPlaying] = useState(null);
  const dispatch = useDispatch();
  const spanRef = useRef();
  const artistTracks = useSelector(
    (state) => state.artistReducer.data.artistTracks
  );
  const currentlyPlaying = useSelector(
    (state) => state.currentlyPlayingReducer.data.playing
  );

  useEffect(() => {
    dispatch(setPlaying({ id: idPlaying, isPlaying: isPlaying }));
  }, [isPlaying, idPlaying]);
  useEffect(() => {
    if (idPlaying !== currentlyPlaying.id) {
      console.log("idPlaying", idPlaying);
      console.log("currentlyPlaying", currentlyPlaying.id);
      console.log("props.isPlaying", props.isPlaying);
    }
  }, [idPlaying]);

  const handleClickTogglePlayPause = (id) => {
    if (isPlaying === false) {
      setIsPlaying(true);
      setIdPlaying(id);
    } else {
      setIsPlaying(false);
    }
    console.log("event", id);
  };

  return (
    <div>
      <div className={styles.track}>
        <div>
          <div className={styles.numberTrack}>
            <span
              ref={spanRef}
              onClick={() => handleClickTogglePlayPause(props.value.id)}
            >
              <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
            </span>
            <p>{props.index + 1}</p>
          </div>
          <img src={props.value.image} alt={props.value.title} />
          <p>{props.value.title}</p>
        </div>
        <p>{props.value.popularity} (popularity)</p>
        <p>{convertMsToMinutesSeconds(props.value.duration)}</p>
      </div>
    </div>
  );
}
