import React from "react";
import styles from "../../css/Artist/HeaderArtist.module.css";

export default function HeaderArtist() {
  return (
    <div className={styles.mainArtist}>
      <div className={styles.infoArtist}>
        <span>Verified Artist</span>
        <h1>Acvicii</h1>
        <p>29,909021 monthly listeners</p>
      </div>
      <img
        src="https://i.scdn.co/image/ab6761610000e5eb09bf4814c6585e1f69dfeef7"
        alt=""
      />
    </div>
  );
}
