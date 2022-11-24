import React from "react";
import { useParams } from "react-router-dom";
import Frames from "../components/Frames";
import styles from "../css/Artist/Artist.module.css";
import HeaderArtist from '../components/Artist/HeaderArtist'
import MainArtist from '../components/Artist/MainArtist'

export default function Artist() {
  const params = useParams();
  const artistId = params.artistId;
  const background = "transparent";
  return (
    <div>
      <Frames backgroundHeader={background}>
        <div className={styles.artist}>
          <div className={styles.headerArtist}>
            <HeaderArtist />
          </div>
          <div className={styles.MainArtist}>
            <MainArtist />
          </div>
        </div>
      </Frames>
    </div>
  );
}
