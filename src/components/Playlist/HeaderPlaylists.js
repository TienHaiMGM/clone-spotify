import React from "react";
import styles from "../../css/Playlist/HeaderPlaylists.module.css";
import { useSelector } from "react-redux";

export default function HeaderPlaylists() {
  const statePlaylists = useSelector((state) => state.playlistsReducer);
  const dataPlaylists = statePlaylists?.data?.playList;

  return (
    <div className={styles.headerPlaylist}>
      <div className={styles.imageHeaderPlaylist}>
        <img src={dataPlaylists.image} alt={dataPlaylists.name} />
      </div>
      <div className={styles.contentHeaderPlaylist}>
        <h6>{dataPlaylists.type?.toUpperCase()}</h6>
        <h1>{dataPlaylists.name}</h1>
        <p>{dataPlaylists.description}</p>
        <div>
          <span className={styles.brandName}>Spotify</span>
          <span>23.510 likes</span>
          <span>{dataPlaylists.total} songs</span>
          <span>4 hr 55 min</span>
        </div>
      </div>
    </div>
  );
}
