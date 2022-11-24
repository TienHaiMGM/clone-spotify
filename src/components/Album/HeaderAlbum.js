import React from "react";
import styles from "../../css/Album/HeaderAlbum.module.css";
import {
  convertDateToYear,
  convertMsToHoursMinutes,
} from "../../utils/convertTime";

export default function HeaderAlbum(props) {
  const dataAlbum = props.stateAlbum.data;
  const totalDuration = dataAlbum?.tracks?.items?.reduce((total, value) => {
    return total + value["duration_ms"];
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
