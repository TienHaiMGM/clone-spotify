import React, { useEffect, useState, useRef } from "react";
import styles from "../css/Footer.module.css";
import ReactAudioPlayer from "react-audio-player";
import { useSelector, useDispatch } from "react-redux";
import {
  getListTrackPlaying,
  getPlayer,
} from "../redux/features/currentlyPlayingSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faImage,
  faCirclePause,
  faCirclePlay,
  faShuffle,
  faForwardStep,
  faBackwardStep,
  faRotate,
  faVolumeHigh,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function Footer(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [volume, setVolume] = useState(20);
  const [durations, setDurations] = useState(0);
  const [trackCurrent, setTrackCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef();
  const inputDurationRef = useRef();
  const dispatch = useDispatch();
  const stateCurrentlyPlaying = useSelector(
    (state) => state.currentlyPlayingReducer
  );
  const currentlyPlaying = stateCurrentlyPlaying.data.items;
  const currentlyUrl = currentlyPlaying.url;
  console.log("currentlyPlaying", currentlyUrl);
  const stateAlbum = props?.stateAlbum;
  const tracks = stateAlbum?.data?.tracks?.items;
  const urlFormTracks = props?.idForUrl;

  useEffect(() => {
    dispatch(getListTrackPlaying());
    dispatch(getPlayer());
  }, []);

  useEffect(() => {
    tracks?.map((value, index) => {
      if (urlFormTracks === null) {
        setIsPlaying(false);
        setIsAutoPlay(false);
      }
      if (urlFormTracks && value?.id === urlFormTracks?.ids) {
        setTrackCurrent(index);
        setIsPlaying(true);
        setIsAutoPlay(true);
      }
    });
  }, [urlFormTracks]);
  // console.log("urlFormTracks", urlFormTracks);
  // console.log("currentlyPlaying", currentlyPlaying);
  useEffect(() => {
    const audioEl = audioRef?.current?.audioEl.current;
    if (isPlaying) {
      audioEl?.play();
    } else {
      audioEl?.pause();
    }
  }, [isPlaying]);

  const handleTogglePlayPause = () => {
    setIsPlaying((value) => {
      return !value;
    });
  };

  const handleOnChangeVolume = (e) => {
    setVolume(e);
  };
  const handleOnChangeDuration = (e) => {
    const audioEl = audioRef?.current?.audioEl.current;
    audioEl.currentTime = (audioEl.duration / 100) * e;
    setDurations((value) => {
      return e;
    });
  };

  const handleClickBackward = () => {
    if (trackCurrent > 0) {
      setTrackCurrent((value) => {
        return value - 1;
      });
    }
    setIsAutoPlay(true);
    setIsPlaying(true);
  };

  const handleClickForward = () => {
    if (trackCurrent < tracks?.length - 1) {
      setTrackCurrent((value) => {
        return value + 1;
      });
    }
    setIsAutoPlay(true);
    setIsPlaying(true);
  };

  return (
    <div className={styles.footer}>
      <div className={styles.footerUser}>
        <div className={styles.currentlyPlaying}>
          <img src={currentlyPlaying?.image} alt="My Tam" />
          <div>
            <h6>{currentlyPlaying?.title}</h6>
            <p>{currentlyPlaying?.artists}</p>
          </div>
          <div className={styles.iconButton}>
            <button>
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <button>
              <FontAwesomeIcon icon={faImage} />
            </button>
          </div>
        </div>

        <div className={styles.audio}>
          <div className={styles.buttonPlayers}>
            <button>
              <FontAwesomeIcon icon={faShuffle} />
            </button>
            <button onClick={() => handleClickBackward()}>
              <FontAwesomeIcon icon={faBackwardStep} />
            </button>
            <button
              onClick={() => handleTogglePlayPause()}
              className={styles.buttonPlay}
            >
              <FontAwesomeIcon
                style={isPlaying && { display: "none" }}
                icon={faCirclePlay}
              />
              <FontAwesomeIcon
                style={!isPlaying && { display: "none" }}
                icon={faCirclePause}
              />
            </button>
            <button onClick={() => handleClickForward()}>
              <FontAwesomeIcon icon={faForwardStep} />
            </button>
            <button
              onClick={() =>
                setIsLoop((value) => {
                  return !value;
                })
              }
            >
              <FontAwesomeIcon
                style={isLoop && { color: "#1ed760" }}
                icon={faRotate}
              />
            </button>
            <ReactAudioPlayer
              ref={audioRef}
              src={
                (tracks && tracks[trackCurrent]["preview_url"]) || currentlyUrl
              }
              volume={volume / 100}
              loop={isLoop}
              muted={isMuted}
              autoPlay={isAutoPlay}
              listenInterval={100}
              onListen={(value) => {
                const valueTime =
                  (value / audioRef?.current?.audioEl?.current.duration) * 100;
                setDurations(valueTime);
              }}
              onAbort={(value) => {
                setIsAutoPlay(true);
              }}
            />
          </div>
          <div className={styles.buttonDuration}>
            <input
              ref={inputDurationRef}
              onChange={(e) => handleOnChangeDuration(Number(e.target.value))}
              className={styles.duration}
              style={{
                backgroundSize: `${durations}% 100%`,
              }}
              type="range"
              max={"100"}
              value={durations.toString()}
            />
          </div>
        </div>
        <div>
          <button className={styles.buttonVolume} type="button">
            {isMuted ? (
              <FontAwesomeIcon
                onClick={() => setIsMuted((value) => !value)}
                icon={faVolumeXmark}
              />
            ) : (
              <FontAwesomeIcon
                onClick={() => setIsMuted((value) => !value)}
                icon={faVolumeHigh}
              />
            )}
            <input
              onChange={(e) => handleOnChangeVolume(Number(e.target.value))}
              className={styles.volume}
              value={volume}
              style={{ backgroundSize: `${volume}% 100%` }}
              type="range"
              max="100"
            />
          </button>
        </div>
      </div>

      <div className={styles.footerLogin}>
        <div>
          <p>PREVIEW OF SPOTIFY</p>
          <p>
            Sign up to get unlimited songs and podcasts with occasional ads. No
            credit card needed
          </p>
        </div>
        <button type="button">Sign up free</button>
      </div>
    </div>
  );
}
