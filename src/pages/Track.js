import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Frames from "../components/Frames";
import styles from "../css/Track/Track.module.css";
import HeaderTrack from "../components/Track/HeaderTrack";
import MainTrack from "../components/Track/MainTrack";
import {
  getTrack,
  getAlbumTrack,
  getLyricsTrack,
} from "../redux/features/trackSlice";
import { useSelector, useDispatch } from "react-redux";
import { getRandomRgba } from "../utils/randomColor";

export default function Track() {
  const dispatch = useDispatch();
  const stateTrack = useSelector((state) => state.trackReducer);
  console.log("stateTrack", stateTrack);
  const params = useParams();
  const trackId = params.trackId;
  const backgroundLinear = `linear-gradient(
    180deg,
    ${getRandomRgba(0.5)} 10%,
    rgba(18, 18, 18, 1) 60%
  )`;
  console.log(backgroundLinear);
  useEffect(() => {
    dispatch(getTrack({ trackId }));
    dispatch(getAlbumTrack());
    dispatch(getLyricsTrack({ trackId }));
  }, []);
  return (
    <div>
      <Frames>
        <div className={styles.track} style={{ background: backgroundLinear }}>
          <div className={styles.headerTrack}>
            <HeaderTrack />
          </div>
          <div className={styles.mainTrack}>
            <MainTrack />
          </div>
        </div>
      </Frames>
    </div>
  );
}
