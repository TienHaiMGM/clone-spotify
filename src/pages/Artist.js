import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import HeaderArtist from "../components/Artist/HeaderArtist";
import MainArtist from "../components/Artist/MainArtist";
import Frames from "../components/Frames";
import styles from "../css/Artist/Artist.module.css";
import { getArtist, getArtistTrack } from "../redux/features/artistSlice";
import { getColorToLinearColor, getRandomRgba } from "../utils/randomColor";

export default function Artist() {
  const dispatch = useDispatch();
  const params = useParams();
  const artistId = params.artistId;

  //BackgroundColor
  const backgroundLinear = `linear-gradient(
      180deg,
      ${getRandomRgba(0.5)} 10%,
      rgba(18, 18, 18, 1) 50%
    )`;
  //BackgroundColor

  useEffect(() => {
    dispatch(getArtistTrack({ artistId }));
    dispatch(getArtist({ artistId }));
  }, []);
  return (
    <div>
      <Frames backgroundHeader={getColorToLinearColor(backgroundLinear)}>
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
