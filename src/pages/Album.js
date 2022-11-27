import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import HeaderAlbum from "../components/Album/HeaderAlbum";
import Frames from "../components/Frames";
import styles from "../css/Album/Album.module.css";
import MainAlbum from "../components/Album/MainAlbum";
import { getAlbum } from "../redux/features/albumSlice";
import { getColorToLinearColor } from "../utils/randomColor";
import { getRandomRgba } from "../utils/randomColor";

export default function Album() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [idForUrl, setIdForUrl] = useState();
  const params = useParams();
  const albumId = params.albumId;
  const dispatch = useDispatch();
  const stateAlbum = useSelector((state) => state.albumReducer);

  //BackgroundColor
  const backgroundLinear = `linear-gradient(
      180deg,
      ${getRandomRgba(0.5)} 10%,
      rgba(18, 18, 18, 1) 60%
    )`;
  //BackgroundColor

  useEffect(() => {
    dispatch(getAlbum({ albumId }));
  }, []);

  const getIdForUrl = (id) => {
    setIdForUrl(id);
  };
  const getIsPlaying = (state) => {
    setIsPlaying(state);
  };
  const getStatePlaying = (state) => {
    setIsPlaying(state);
  };

  return (
    <div>
      <Frames
        backgroundHeader={getColorToLinearColor(backgroundLinear)}
        idForUrl={idForUrl}
        getIsPlaying={isPlaying}
      >
        <div className={styles.album} style={{ background: backgroundLinear }}>
          <div className={styles.headerAlbum}>
            <HeaderAlbum />
          </div>
          <div className={styles.mainAlbum}>
            <MainAlbum
              getIdForUrl={getIdForUrl}
              getStatePlaying={getStatePlaying}
              getIsPlaying={getIsPlaying}
              statePlaying={isPlaying}
            />
          </div>
        </div>
      </Frames>
    </div>
  );
}
