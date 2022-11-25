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

export default function Track() {
  const dispatch = useDispatch();
  const stateTrack = useSelector((state) => state.trackReducer);
  console.log("stateTrack", stateTrack);
  const params = useParams();
  const trackId = params.trackId;
  useEffect(() => {
    dispatch(getTrack({ trackId }));
    dispatch(getAlbumTrack());
    dispatch(getLyricsTrack({ trackId }));
  }, []);
  return (
    <div>
      <Frames>
        <div className={styles.track}>
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
