import React from "react";
import styles from "../../css/Track/HeaderTrack.module.css";
import { useSelector } from "react-redux";
import {
  convertMsToMinutesSeconds,
  convertDateToYear,
} from "../../utils/convertTime";

export default function HeaderTrack() {
  const stateTrack = useSelector((state) => state?.trackReducer);
  const track = stateTrack?.data?.track;
  console.log(stateTrack);
  return (
    <div className={styles.headerTrack}>
      <div className={styles.imageHeaderTrack}>
        <img src={track?.image} alt={track?.title} />
      </div>
      <div className={styles.contentHeaderTrack}>
        <h6>Song</h6>
        <h1>{track?.title}</h1>
        <div>
          <span>{track?.artists}</span>
          <span>{convertDateToYear(track?.releaseDate)}</span>
          <span> {convertMsToMinutesSeconds(track?.duration)}</span>
        </div>
      </div>
    </div>
  );
}
