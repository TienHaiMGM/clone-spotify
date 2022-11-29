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

export default function MainPlaylist(props) {
  const [statePlaying, setStatePlaying] = useState(false);
  const [isCheckFollow, setIsCheckFollow] = useState(false);
  const dispatch = useDispatch();
  const statePlaylists = useSelector((state) => state.playlistsReducer);
  const items = statePlaylists?.data?.playList?.tracks;
  const playlistId = statePlaylists?.data?.playList.id;

  useEffect(() => {
    setIsCheckFollow(props.isCheckFollow);
  }, [props.isCheckFollow]);
  const handleClickTogglePlayPause = () => {
    setStatePlaying((state) => {
      return !state;
    });
  };
  const handleCLickLiked = () => {
    if (isCheckFollow) {
      dispatch(unfollowPlaylist({ playlistId }));
    } else {
      dispatch(followPlaylist({ playlistId }));
    }
    setIsCheckFollow((value) => !value);
    dispatch(getMyPlaylists());
  };
  return (
    <div className={styles.mainPlaylist}>
      <div className={styles.mainPlaylistBtn}>
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
                <MainListTracks
                  getIdForUrl={props.getIdForUrl}
                  getIsPlaying={props.getIsPlaying}
                  key={index}
                  tracks={value}
                  number={index}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
