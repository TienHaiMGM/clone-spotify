import React from "react";
import styles from "../../css/Artist/HeaderArtist.module.css";
import Verified from "../../assets/images/Verified.png";

export default function HeaderArtist() {
  return (
    <div className={styles.mainArtist}>
      <div className={styles.infoArtist}>
        <div>
          <img
            className={styles.verifiedIcon}
            src={Verified}
            alt="verifiedIcon"
          />
          <span>Verified Artist</span>
        </div>
        <h1>Acvicii</h1>
        <p>29,909021 monthly listeners</p>
      </div>
    </div>
  );
}
