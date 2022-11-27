import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Frames from "../components/Frames";
import HeaderPlaylists from "../components/Playlist/HeaderPlaylists";
import MainPlaylist from "../components/Playlist/MainPlaylist";
import styles from "../css/Playlist/Playlist.module.css";
import { getPlaylist } from "../redux/features/playlistsSlice";

export default function Playlist() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [idForUrl, setIdForUrl] = useState();
  const params = useParams();
  const playlistId = params.playlistId;
  const backgroundColor = "#e26521";
  const dispatch = useDispatch();
  const statePlaylists = useSelector((state) => state.playlistsReducer);

  const getIdForUrl = (id) => {
    setIdForUrl(id);
  };
  const getIsPlaying = (state) => {
    setIsPlaying(state);
  };
  useEffect(() => {
    dispatch(getPlaylist({ playlistId }));
  }, []);
  return (
    <Frames
      backgroundHeader={backgroundColor}
      idForUrl={idForUrl}
      getIsPlaying={isPlaying}
    >
      <div className={styles.playlist}>
        <div
          className={styles.headerPlaylists}
          style={{ backgroundColor: backgroundColor }}
        >
          <HeaderPlaylists />
        </div>
        <div className={styles.mainPlaylists}>
          <MainPlaylist getIdForUrl={getIdForUrl} getIsPlaying={getIsPlaying} />
        </div>
      </div>
    </Frames>
  );
}
