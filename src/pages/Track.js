import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Frames from "../components/Frames";
import HeaderTrack from "../components/Track/HeaderTrack";
import MainTrack from "../components/Track/MainTrack";
import styles from "../css/Track/Track.module.css";
import {
  checkUserSavedTracks,
  getAlbumTrack,
  getLyricsTrack,
  getTrack,
} from "../redux/features/trackSlice";
import { getRandomRgba } from "../utils/randomColor";

export default function Track() {
  const [isCheckUserSavedTrack, setIsCheckUserSavedTrack] = useState(false);
  const dispatch = useDispatch();
  const stateTrack = useSelector((state) => state.trackReducer);
  const params = useParams();
  const trackId = params.trackId;
  const backgroundLinear = `linear-gradient(
    180deg,
    ${getRandomRgba(0.5)} 10%,
    rgba(18, 18, 18, 1) 60%
  )`;
  useEffect(() => {
    dispatch(getTrack({ trackId }));
    dispatch(getAlbumTrack());
    dispatch(getLyricsTrack({ trackId }));
    dispatch(checkUserSavedTracks({ trackId })).then((value) => {
      setIsCheckUserSavedTrack(value.payload[0]);
    });
  }, []);

  return (
    <div>
      <Frames>
        <div className={styles.track} style={{ background: backgroundLinear }}>
          <div className={styles.headerTrack}>
            <HeaderTrack />
          </div>
          <div className={styles.mainTrack}>
            <MainTrack isCheckUserSavedTrack={isCheckUserSavedTrack} />
          </div>
        </div>
      </Frames>
    </div>
  );
}
