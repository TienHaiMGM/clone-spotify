import {
  faCirclePause,
  faCirclePlay,
  faClock,
  faEllipsis,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "animate.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../css/Playlist/MainPlaylist.module.css";
import {
  followPlaylist,
  getMyPlaylists,
  unfollowPlaylist,
} from "../../redux/features/playlistsSlice";
import MainListTracks from "./MainListTracks";
import { setPlaying } from "../../redux/features/currentlyPlayingSlice";
import AlertSuccessSave from "../AlertSuccessSave";

export default function MainPlaylist(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [idPlaying, setIdPlaying] = useState(null);
  const [isCheckFollow, setIsCheckFollow] = useState(false);
  const [responseStatus, setResponseStatus] = useState("");
  const dispatch = useDispatch();
  const statePlaylists = useSelector((state) => state.playlistsReducer);
  const items = statePlaylists?.data?.playList?.tracks;
  const playlistId = statePlaylists?.data?.playList.id;
  const currentlyPlaying = useSelector(
    (state) => state.currentlyPlayingReducer.data.playing
  );

  useEffect(() => {
    setIsCheckFollow(props.isCheckFollow);
  }, [props.isCheckFollow]);

  useEffect(() => {
    currentlyPlaying.isPlaying ? setIsPlaying(true) : setIsPlaying(false);
  }, [currentlyPlaying.isPlaying]);

  const handleClickTogglePlayPause = () => {
    setIsPlaying((value) => {
      dispatch(setPlaying({ id: idPlaying, isPlaying: !value }));
      return !value;
    });
  };
  const handleCLickLiked = () => {
    if (isCheckFollow) {
      dispatch(unfollowPlaylist({ playlistId })).then((value) => {
        if (value.meta.requestStatus === "fulfilled") {
          setResponseStatus("Removed");
        }
        return dispatch(getMyPlaylists());
      });
    } else {
      dispatch(followPlaylist({ playlistId })).then((value) => {
        if (value.meta.requestStatus === "fulfilled") {
          setResponseStatus("Added");
        }
        return dispatch(getMyPlaylists());
      });
    }
    setIsCheckFollow((value) => !value);
  };
  return (
    <div className={styles.mainPlaylist}>
      <div className={styles.mainPlaylistBtn}>
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
              isCheckFollow
                ? "animate__animated animate__headShake"
                : "animate__bounceOut"
            }
            onClick={() => handleCLickLiked()}
            style={isCheckFollow ? { color: "#1ed760" } : { color: "white" }}
            icon={faHeart}
          />
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
            <p>ALBUM</p>
            <p>DATE ADDED</p>
            <p>
              <FontAwesomeIcon icon={faClock} />
            </p>
          </div>
        </div>
        <div className={styles.itemMainListTracks}>
          {items &&
            items?.map((value, index) => {
              return (
                <MainListTracks key={index} tracks={value} number={index} />
              );
            })}
        </div>
      </div>
      {responseStatus !== "" && (
        <AlertSuccessSave responseStatus={responseStatus} type={"Playlist"} />
      )}
    </div>
  );
}
