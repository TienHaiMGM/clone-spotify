import React from "react";
import styles from "../../css/LikedSongs/HeaderLikedSongs.module.css";
import { useSelector } from "react-redux";

export default function HeaderLikedSongs() {
  return (
    <div className={styles.headerLikedSongs}>
      <div className={styles.imageHeaderLikedSongs}>
        <img
          src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
          alt="logo Liked Songs"
        />
      </div>
      <div className={styles.contentHeaderLikedSongs}>
        <h6>PLAYLIST</h6>
        <h1>Liked Songs</h1>
        <div>
          <span className={styles.brandName}>megamind</span>
          <span>2 songs</span>
        </div>
      </div>
    </div>
  );
}
