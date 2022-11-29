import React, { useState } from "react";
import "../css/Frames.css";
import styles from "../css/LikedSongs/LikedSongs.module.css";

import Footer from "../components/Footer";
import Header from "../components/Header";
import HeaderLikedSongs from "../components/LikedSongs/HeaderLikedSongs";
import MainLikedSongs from "../components/LikedSongs/MainLikedSongs";
import Navbar from "../components/Navbar";

export default function LikedSongs() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [idForUrl, setIdForUrl] = useState();
  const backgroundColor = "#412f7e";
  const getIdForUrl = (id) => {
    setIdForUrl(id);
  };
  const getIsPlaying = (state) => {
    setIsPlaying(state);
  };
  return (
    <div className="Frames">
      <nav>
        <Navbar />
      </nav>
      <header>
        <Header backgroundHeader={backgroundColor} />
      </header>
      <main>
        <div className={styles.likedSongs}>
          <div
            className={styles.headerLikedSongs}
            style={{ backgroundColor: backgroundColor }}
          >
            <HeaderLikedSongs />
          </div>
          <div className={styles.mainLikedSongs}>
            <MainLikedSongs
              getIdForUrl={getIdForUrl}
              getIsPlaying={getIsPlaying}
            />
          </div>
        </div>
      </main>
      <footer>
        <Footer idForUrl={idForUrl} getIsPlaying={isPlaying} />
      </footer>
    </div>
  );
}
