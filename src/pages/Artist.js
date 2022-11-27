import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Frames from "../components/Frames";
import styles from "../css/Artist/Artist.module.css";
import HeaderArtist from "../components/Artist/HeaderArtist";
import MainArtist from "../components/Artist/MainArtist";
import { useSelector, useDispatch } from "react-redux";
import { getArtistTrack } from "../redux/features/artistSlice";
import { getRandomRgba } from "../utils/randomColor";

export default function Artist() {
  const dispatch = useDispatch();
  const params = useParams();
  const artistId = params.artistId;
  const background = "#0b0c10";
  const backgroundLinear = `linear-gradient(
    180deg,
    ${getRandomRgba(0.5)} 10%,
    rgba(18, 18, 18, 1) 60%
  )`;
  useEffect(() => {
    dispatch(getArtistTrack({ artistId }));
  }, []);
  return (
    <div>
      <Frames backgroundHeader={background}>
        <div className={styles.artist} style={{ background: backgroundLinear }}>
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
