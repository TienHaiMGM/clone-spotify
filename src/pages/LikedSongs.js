import React from "react";
import "../css/Frames.css";
import styles from "../css/LikedSongs/LikedSongs.module.css";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import HeaderLikedSongs from "../components/LikedSongs/HeaderLikedSongs";
import MainLikedSongs from "../components/LikedSongs/MainLikedSongs";

export default function LikedSongs() {
  const backgroundColor = "#412f7e";
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
            <MainLikedSongs />
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
