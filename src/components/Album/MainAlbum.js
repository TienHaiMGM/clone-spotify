import {
  faCirclePause,
  faCirclePlay,
  faClock,
  faEllipsis,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../css/Album/MainAlbum.module.css";
import AlbumListTracks from "./AlbumListTracks";
import { setPlaying } from "../../redux/features/currentlyPlayingSlice";
import AlertSuccessSave from "../AlertSuccessSave";
import {
  checkUserSaved,
  removeUserSaved,
  saveForUser,
} from "../../redux/features/librarySlice";

export default function MainAlbum(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [idPlaying, setIdPlaying] = useState(null);
  const [isSavedTrack, setIsSavedTrack] = useState(false);
  const [isCheckUserSaved, setIsCheckUserSaved] = useState(false);
  const [responseStatus, setResponseStatus] = useState("");
  const dispatch = useDispatch();
  const dataAlbumTracks = useSelector((state) => state.albumReducer);
  const typePlayer = dataAlbumTracks.data.type;
  const idPlayer = dataAlbumTracks.data.id;
  const dataTracks = dataAlbumTracks?.data?.tracks;
  const currentlyPlaying = useSelector(
    (state) => state.currentlyPlayingReducer.data.playing
  );
  useEffect(() => {
    currentlyPlaying.isPlaying ? setIsPlaying(true) : setIsPlaying(false);
  }, [currentlyPlaying.isPlaying]);

  const handleClickTogglePlayPause = () => {
    setIsPlaying((value) => {
      dispatch(setPlaying({ id: idPlaying, isPlaying: !value }));
      return !value;
    });
  };

  useEffect(() => {
    if (idPlayer) {
      dispatch(checkUserSaved({ typePlayer, idPlayer })).then((value) => {
        setIsCheckUserSaved(value.payload[0]);
      });
    }
  }, [typePlayer, idPlayer]);
  const handleCLickLiked = () => {
    if (isCheckUserSaved) {
      dispatch(removeUserSaved({ typePlayer, idPlayer })).then((value) => {
        if (value.meta.requestStatus === "fulfilled") {
          setResponseStatus("Removed");
        }
      });
    } else {
      dispatch(saveForUser({ typePlayer, idPlayer })).then((value) => {
        if (value.meta.requestStatus === "fulfilled") {
          setResponseStatus("Added");
        }
      });
    }
    setIsCheckUserSaved((value) => !value);
  };

  useEffect(() => {
    const responseTime = setTimeout(() => {
      setResponseStatus("");
    }, 3000);
    return () => {
      clearTimeout(responseTime);
    };
  }, [responseStatus]);

  return (
    <div className={styles.mainAlbum}>
      <div className={styles.mainAlbumBtn}>
        <span>
          <FontAwesomeIcon
            onClick={() => handleClickTogglePlayPause()}
            className={styles.iconPlay}
            icon={isPlaying ? faCirclePause : faCirclePlay}
          />
        </span>
        <span>
          <FontAwesomeIcon
            className={
              isCheckUserSaved
                ? "animate__animated animate__headShake"
                : "animate__bounceOut"
            }
            onClick={() => handleCLickLiked()}
            style={isCheckUserSaved ? { color: "#1ed760" } : { color: "white" }}
            icon={faHeart}
          />
        </span>
        <span>
          <FontAwesomeIcon icon={faEllipsis} />
        </span>
      </div>
      <div className={styles.listTracks}>
        <div className={styles.headerListTracks}>
          <div className={styles.titleHeader}>
            <p>#</p>
            <p>TITLE</p>
          </div>
          <div className={styles.info}>
            <p>
              <FontAwesomeIcon icon={faClock} />
            </p>
          </div>
        </div>
        <div className={styles.itemMainListTracks}>
          {dataTracks &&
            dataTracks.map((data, index) => {
              return (
                <AlbumListTracks key={index} number={index} dataTracks={data} />
              );
            })}
        </div>
      </div>
      {responseStatus !== "" && (
        <AlertSuccessSave responseStatus={responseStatus} type={"Album"} />
      )}
    </div>
  );
}
