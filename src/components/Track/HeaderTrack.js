import React from "react";
import styles from "../../css/Track/HeaderTrack.module.css";

export default function HeaderTrack() {
  return (
    <div className={styles.headerTrack}>
      <div className={styles.imageHeaderTrack}>
        <img
          src={
            "https://i.scdn.co/image/ab67616d0000b27380fa6021c21b4c0a2f3072f7"
          }
          alt={""}
        />
      </div>
      <div className={styles.contentHeaderTrack}>
        <h6>Song</h6>
        <h1>Forever Young</h1>
        <div>
          <span>Undressd</span>
          <span>2019</span>
          <span> 3:21</span>
        </div>
      </div>
    </div>
  );
}
