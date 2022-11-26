import React from "react";
import styles from "../../css/YourLibrary/YourLibrary.module.css";
import { Link } from "react-router-dom";

export default function MainYourLibrary() {
  return (
    <div className={styles.mainYourLibrary}>
      <h1>Playlists</h1>
      <div className={styles.mainContentLibrary}>
        <div className={styles.likedSongsLibrary}>
          <p>adele</p>
          <h3>Liked Songs</h3>
          <span>2liked songs</span>
        </div>
        <div className={styles.myPlaylist}>
          <div className={styles.tracks}>
            <Link to={""}>
              <div>
                <img
                  src="https://zerojackerzz.com/wp-content/uploads/2019/10/album-placeholder.png"
                  alt="choseImageMusic"
                />
                <h6>My playlist</h6>
                <p>By megamind</p>
              </div>
            </Link>
          </div>
          <div className={styles.tracks}>
            <Link to={""}>
              <div>
                <img
                  src="https://zerojackerzz.com/wp-content/uploads/2019/10/album-placeholder.png"
                  alt="choseImageMusic"
                />
                <h6>My playlist</h6>
                <p>By megamind</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
