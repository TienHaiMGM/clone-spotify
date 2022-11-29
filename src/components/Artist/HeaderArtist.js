import React from "react";
import { useSelector } from "react-redux";
import Verified from "../../assets/images/Verified.png";
import styles from "../../css/Artist/HeaderArtist.module.css";

export default function HeaderArtist() {
  const infoArtist = useSelector(
    (state) => state?.artistReducer?.data.infoArtist
  );
  return (
    <div className={styles.headerArtist}>
      <div className={styles.infoArtist}>
        <div>
          <img
            className={styles.verifiedIcon}
            src={Verified}
            alt="verifiedIcon"
          />
          <span>Verified Artist</span>
        </div>
        <h1>{infoArtist && infoArtist.name}</h1>
        <p>{infoArtist && infoArtist.totalFollowers} followers</p>
      </div>
    </div>
  );
}
