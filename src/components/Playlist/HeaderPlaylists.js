import React from "react";
import styles from "../../css/Playlist/HeaderPlaylists.module.css";
import { useSelector } from "react-redux";
import { convertMsToHoursMinutes } from "../../utils/convertTime";

export default function HeaderPlaylists() {
  const statePlaylists = useSelector((state) => state.playlistsReducer);
  const dataPlaylists = statePlaylists?.data?.playList;
  console.log("dataPlaylists", dataPlaylists);
  return (
    <div className={styles.headerPlaylist}>
      <div className={styles.imageHeaderPlaylist}>
        <img
          src={
            dataPlaylists.image ||
            "https://zerojackerzz.com/wp-content/uploads/2019/10/album-placeholder.png"
          }
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
