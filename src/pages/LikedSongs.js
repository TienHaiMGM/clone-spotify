import React from "react";
import "../css/Frames.css";
import styles from "../css/LikedSongs.module.css";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import HomePlaylists from "../pages/HomePlaylists";

export default function LikedSongs() {
  return (
    <div className={`${styles.likedSongs} Frames`}>
      <nav>
        <Navbar />
      </nav>
      <header>
        <Header />
      </header>
      <main>
        <HomePlaylists />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
