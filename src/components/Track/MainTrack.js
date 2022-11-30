import {
  faCirclePause,
  faCirclePlay,
  faEllipsis,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "animate.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../css/Track/MainTrack.module.css";
import {
  removeUserSavedTracks,
  saveTracksForUser,
} from "../../redux/features/trackSlice";
import AlertSuccessSave from "../AlertSuccessSave";
import { setPlaying } from "../../redux/features/currentlyPlayingSlice";

export default function MainTrack(props) {
  const [statePlaying, setStatePlaying] = useState(false);
  const [isCheckUserSavedTrack, setIsCheckUserSavedTrack] = useState(false);
  const [responseStatus, setResponseStatus] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [idPlaying, setIdPlaying] = useState(null);
  const dispatch = useDispatch();
  const stateTrack = useSelector((state) => state.trackReducer);
  const lyricsTrack = stateTrack?.data?.lyrics;
  const trackId = stateTrack?.data?.track?.id;

  useEffect(() => {
    dispatch(setPlaying({ id: idPlaying, isPlaying: isPlaying }));
  }, [isPlaying]);

  const handleClickTogglePlayPause = (id) => {
    if (isPlaying === false) {
      setIsPlaying(true);
      setIdPlaying(id);
    } else {
      setIsPlaying(false);
    }
  };
  useEffect(() => {
    setIsCheckUserSavedTrack(props.isCheckUserSavedTrack);
  }, [props.isCheckUserSavedTrack]);

  useEffect(() => {
    const responseTime = setTimeout(() => {
      setResponseStatus("");
    }, 3000);
    return () => {
      clearTimeout(responseTime);
    };
  }, [responseStatus]);

  const handleCLickLiked = () => {
    if (isCheckUserSavedTrack) {
      dispatch(removeUserSavedTracks({ trackId })).then((value) => {
        if (value.meta.requestStatus === "fulfilled") {
          setResponseStatus("Removed");
        }
      });
    } else {
      dispatch(saveTracksForUser({ trackId })).then((value) => {
        if (value.meta.requestStatus === "fulfilled") {
          setResponseStatus("Added");
        }
      });
    }
    setIsCheckUserSavedTrack((value) => !value);
  };

  return (
    <div className={styles.mainTrack}>
      <div className={styles.mainTrackBtn}>
        <span>
          <FontAwesomeIcon
            onClick={() => handleClickTogglePlayPause()}
            className={styles.iconPlay}
            icon={isPlaying ? faCirclePause : faCirclePlay}
          />
        </span>
        <span>
          <FontAwesomeIcon
            className={
              isCheckUserSavedTrack
                ? "animate__animated animate__headShake"
                : "animate__bounceOut"
            }
            onClick={() => handleCLickLiked()}
            style={
              isCheckUserSavedTrack ? { color: "#1ed760" } : { color: "white" }
            }
            icon={faHeart}
          />
        </span>
        <span>
          <FontAwesomeIcon icon={faEllipsis} />
        </span>
      </div>
      <div className={styles.lyricsTrack}>
        <h3>Lyrics</h3>
        {lyricsTrack
          ? lyricsTrack.map((value, index) => {
              return <p key={index}>{value.words}</p>;
            })
          : "Lyrics is available in spotify"}
      </div>
      {responseStatus !== "" && (
        <AlertSuccessSave
          responseStatus={responseStatus}
          type={"Liked Songs"}
        />
      )}
    </div>
  );
}
