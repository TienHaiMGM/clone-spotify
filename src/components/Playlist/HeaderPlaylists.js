import React from "react";
import styles from "../../css/Playlist/HeaderPlaylists.module.css";
import { useSelector } from "react-redux";
import { convertMsToHoursMinutes } from "../../utils/convertTime";
import AlbumPlaceHolder from "../../assets/images/AlbumPlaceHolder.png";

export default function HeaderPlaylists() {
  const statePlaylists = useSelector((state) => state.playlistsReducer);
  const dataPlaylists = statePlaylists?.data?.playList;
  return (
    <div className={styles.headerPlaylist}>
      <div className={styles.imageHeaderPlaylist}>
        <img
          src={dataPlaylists.image || AlbumPlaceHolder}
          alt={dataPlaylists.name}
        />
      </div>
      <div className={styles.contentHeaderPlaylist}>
        <h6>{dataPlaylists.type?.toUpperCase()}</h6>
        <h1>{dataPlaylists.name}</h1>
        <p>{dataPlaylists.description}</p>
        <div>
          <span className={styles.brandName}>{dataPlaylists.nameOwner}</span>
          <span>{dataPlaylists.followers} followers</span>
          <span>{dataPlaylists.total} songs</span>
          <span>{convertMsToHoursMinutes(dataPlaylists.totalDuration)}</span>
        </div>
      </div>
    </div>
  );
}
