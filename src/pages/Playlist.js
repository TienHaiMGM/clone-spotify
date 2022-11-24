import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Frames from "../components/Frames";
import HeaderPlaylists from "../components/Playlist/HeaderPlaylists";
import MainPlaylist from "../components/Playlist/MainPlaylist";
import styles from "../css/Playlist/Playlist.module.css";
import { getPlaylist } from "../redux/features/playlistsSlice";

export default function Playlist() {
  const params = useParams();
  const playlistId = params.playlistId;
  const backgroundColor = "#e26521";
  const dispatch = useDispatch();
  const statePlaylists = useSelector((state) => state.playlistsReducer);
  console.log(statePlaylists);
  useEffect(() => {
    dispatch(getPlaylist({ playlistId }));
  }, []);
  return (
    <Frames backgroundHeader={backgroundColor}>
      <div className={styles.playlist}>
        <div
          className={styles.headerPlaylists}
          style={{ backgroundColor: backgroundColor }}
        >
          <HeaderPlaylists statePlaylists={statePlaylists} />
        </div>
        <div className={styles.mainPlaylists}>
          <MainPlaylist statePlaylists={statePlaylists} />
        </div>
      </div>
    </Frames>
  );
}
