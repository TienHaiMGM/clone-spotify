import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import HeaderAlbum from "../components/Album/HeaderAlbum";
import Frames from "../components/Frames";
import styles from "../css/Album/Album.module.css";
import MainAlbum from "../components/Album/MainAlbum";
import { getAlbum } from "../redux/features/albumSlice";

export default function Album() {
  const [isPlaying, setIsPlaying] = useState(false);
  const params = useParams();
  const albumId = params.albumId;
  const dispatch = useDispatch();
  const stateAlbum = useSelector((state) => state.albumReducer);
  const backgroundColor = "#3e3e3e";
  const [idForUrl, setIdForUrl] = useState();
  useEffect(() => {
    dispatch(getAlbum({ albumId }));
  }, []);

  const getIdForUrl = (id) => {
    setIdForUrl(id);
  };
  const getIsPlaying = (isPlaying) => {
    setIsPlaying(isPlaying);
  };
  return (
    <div>
      <Frames
        backgroundHeader={backgroundColor}
        idForUrl={idForUrl}
        getIsPlaying={getIsPlaying}
        stateAlbum={stateAlbum}
      >
        <div className={styles.album}>
          <div
            className={styles.headerAlbum}
            style={{ backgroundColor: backgroundColor }}
          >
            <HeaderAlbum stateAlbum={stateAlbum} />
          </div>
          <div className={styles.mainAlbum}>
            <MainAlbum getIdForUrl={getIdForUrl} stateAlbum={stateAlbum} />
          </div>
        </div>
      </Frames>
    </div>
  );
}
