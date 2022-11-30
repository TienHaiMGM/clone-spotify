import {
  faCirclePause,
  faCirclePlay,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../css/Artist/MainArtist.module.css";
import ArtistListTracks from "../Artist/ArtistListTracks";
import { setPlaying } from "../../redux/features/currentlyPlayingSlice";
import {
  removeFollow,
  saveFollow,
  checkUserFollow,
} from "../../redux/features/librarySlice";
import AlertSuccessSave from "../../redux/features/librarySlice";

export default function MainArtist() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [idPlaying, setIdPlaying] = useState(null);
  const [isSavedTrack, setIsSavedTrack] = useState(false);
  const [isCheckUserSaved, setIsCheckUserSaved] = useState(false);
  const [responseStatus, setResponseStatus] = useState("");
  const dispatch = useDispatch();
  const artistTracks = useSelector(
    (state) => state.artistReducer.data.artistTracks
  );
  const infoArtist = useSelector(
    (state) => state.artistReducer.data.infoArtist
  );
  const typePlayer = infoArtist?.type;
  const idPlayer = infoArtist?.id;
  const currentlyPlaying = useSelector(
    (state) => state.currentlyPlayingReducer.data.playing
  );

  useEffect(() => {
    currentlyPlaying.isPlaying ? setIsPlaying(true) : setIsPlaying(false);
  }, [currentlyPlaying.isPlaying]);

  const handleClickTogglePlayPause = () => {
    setIsPlaying((value) => {
      dispatch(setPlaying({ id: idPlaying, isPlaying: !value }));
      return !value;
    });
  };

  //USer Save and Remove Save
  useEffect(() => {
    if (idPlayer) {
      dispatch(checkUserFollow({ typePlayer, idPlayer })).then((value) => {
        setIsCheckUserSaved(value.payload[0]);
      });
    }
  }, [typePlayer, idPlayer]);

  const handleCLickLiked = () => {
    if (isCheckUserSaved) {
      dispatch(removeFollow({ typePlayer, idPlayer })).then((value) => {
        if (value.meta.requestStatus === "fulfilled") {
          setResponseStatus("Removed");
        }
      });
    } else {
      dispatch(saveFollow()).then((value) => {
        // if (value.meta.requestStatus === "fulfilled") {
        //   setResponseStatus("Added");
        // }
      });
    }
    setIsCheckUserSaved((value) => !value);
  };

  useEffect(() => {
    const responseTime = setTimeout(() => {
      setResponseStatus("");
    }, 3000);
    return () => {
      clearTimeout(responseTime);
    };
  }, [responseStatus]);

  return (
    <div className={styles.mainArtist}>
      <div className={styles.headerArtistBtn}>
        <span>
          <FontAwesomeIcon
            onClick={() => handleClickTogglePlayPause()}
            className={styles.iconPlay}
            icon={isPlaying ? faCirclePause : faCirclePlay}
          />
        </span>
        <button
          onClick={() => handleCLickLiked()}
          className={styles.followBtn}
          type="button"
        >
          {isCheckUserSaved ? "FOLLOWING" : "FOLLOW"}
        </button>
        <span>
          <FontAwesomeIcon className={styles.ellipsisIcon} icon={faEllipsis} />
        </span>
      </div>
      <div className={styles.contentMainArtist}>
        <div className={styles.popularTracks}>
          <h3>Popular</h3>
          {artistTracks &&
            artistTracks.map((value, index) => {
              return (
                <ArtistListTracks
                  key={value.id}
                  isPlaying={false}
                  value={value}
                  index={index}
                />
              );
            })}
        </div>
      </div>
      <div></div>
    </div>
  );
}
