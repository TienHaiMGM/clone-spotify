import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Frames from "../components/Frames";
import HeaderPlaylists from "../components/Playlist/HeaderPlaylists";
import MainPlaylist from "../components/Playlist/MainPlaylist";
import styles from "../css/Playlist/Playlist.module.css";
import {
  checkFollowPlaylist,
  getPlaylist,
} from "../redux/features/playlistsSlice";
import { getColorToLinearColor, getRandomRgba } from "../utils/randomColor";

export default function Playlist() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [idForUrl, setIdForUrl] = useState();
  const [isCheckFollow, setIsCheckFollow] = useState(false);
  const params = useParams();
  const playlistId = params.playlistId;
  const dispatch = useDispatch();
  const statePlaylists = useSelector((state) => state.playlistsReducer);

  //BackgroundColor
  const backgroundLinear = `linear-gradient(
    180deg,
    ${getRandomRgba(0.5)} 10%,
    rgba(18, 18, 18, 1) 60%
  )`;
  //BackgroundColor

  const getIdForUrl = (id) => {
    setIdForUrl(id);
  };
  const getIsPlaying = (state) => {
    setIsPlaying(state);
  };
  useEffect(() => {
    dispatch(getPlaylist({ playlistId }));
    dispatch(checkFollowPlaylist({ playlistId })).then((value) => {
      setIsCheckFollow(value.payload[0]);
    });
  }, [playlistId]);

  return (
    <Frames
      backgroundHeader={getColorToLinearColor(backgroundLinear)}
      idForUrl={idForUrl}
      getIsPlaying={isPlaying}
    >
      <div className={styles.playlist} style={{ background: backgroundLinear }}>
        <div className={styles.headerPlaylists}>
          <HeaderPlaylists />
        </div>
        <div className={styles.mainPlaylists}>
          <MainPlaylist
            getIdForUrl={getIdForUrl}
            getIsPlaying={getIsPlaying}
            isCheckFollow={isCheckFollow}
          />
        </div>
      </div>
    </Frames>
  );
}
