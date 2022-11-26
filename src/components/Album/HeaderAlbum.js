import React from "react";
import styles from "../../css/Album/HeaderAlbum.module.css";
import {
  convertDateToYear,
  convertMsToHoursMinutes,
} from "../../utils/convertTime";
import { useSelector } from "react-redux";

export default function HeaderAlbum() {
  const dataAlbumTracks = useSelector((state) => state.albumReducer);
  const dataAlbum = dataAlbumTracks.data;
  const totalDuration = dataAlbum?.tracks?.reduce((total, value) => {
    return total + value.duration;
  }, 0);

  return (
    <div>
      <div className={styles.headerAlbum}>
        <div className={styles.imageHeaderAlbum}>
          <img src={dataAlbum.image} alt={dataAlbum.name} />
        </div>
        <div className={styles.contentHeaderAlbum}>
          <h6>{dataAlbum.type?.toUpperCase()}</h6>
          <h1>{dataAlbum.name}</h1>
          <div>
            <span>{dataAlbum?.artist?.name}</span>
            <span>{convertDateToYear(dataAlbum.releaseDate)}</span>
            <span>{dataAlbum.total} songs</span>
            <span>{convertMsToHoursMinutes(totalDuration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
