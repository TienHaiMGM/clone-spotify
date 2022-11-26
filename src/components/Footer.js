import React, { useEffect, useState, useRef } from "react";
import styles from "../css/Footer.module.css";
import ReactAudioPlayer from "react-audio-player";
import { useSelector, useDispatch } from "react-redux";
import { getPlayer } from "../redux/features/currentlyPlayingSlice";
import { getListTrackPlaying } from "../redux/features/listTrackPlayingSlice";
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
import { Link } from "react-router-dom";

export default function Footer(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [volume, setVolume] = useState(10);
  const [durations, setDurations] = useState(0);
  const [trackCurrent, setTrackCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const audioRef = useRef();
  const inputDurationRef = useRef();
  const dispatch = useDispatch();
  const stateLogin = useSelector((state) => state.loginReducer);
  const token = stateLogin.data.token;
  const stateCurrentlyPlaying = useSelector(
    (state) => state.currentlyPlayingReducer
  );
  const stateListTracksPlaying = useSelector(
    (state) => state.listTrackPlayingReducer
  );
  const stateAlbumTracks = useSelector((state) => state.albumReducer);
  const statePlaylistTracks = useSelector((state) => state.playlistsReducer);
  const currentlyPlaying = stateCurrentlyPlaying?.data?.items;
  const listTrackPlaying = stateListTracksPlaying?.data?.listTracksPlaying;
  const dataAlbumTracks = stateAlbumTracks?.data?.tracks;
  const dataPlaylistTracks = statePlaylistTracks?.data?.playList.tracks;
  // console.log("listTrackPlaying", currentlyPlaying.artists);
  // console.log("dataAlbumTracks", dataAlbumTracks);
  // console.log("dataPlaylistTracks", dataPlaylistTracks);
  const tracks = dataAlbumTracks ? dataAlbumTracks : listTrackPlaying;
  const urlFormTracks = props?.idForUrl;
  const statePlay = props?.getIsPlaying;

  useEffect(() => {
    dispatch(getPlayer()).then((valuePlayer) => {
      dispatch(getListTrackPlaying()).then((valueListTrack) => {
        getTrackCurrent();
      });
    });
  }, []);

  function getTrackCurrent() {
    const indexTrackCurrent = listTrackPlaying?.findIndex(
      (value) => value?.id === currentlyPlaying?.id
    );
    setTrackCurrent(indexTrackCurrent);
  }

  useEffect(() => {
    if (statePlay === false) {
      setIsPlaying(false);
      setIsAutoPlay(false);
    } else if (statePlay === true) {
      setTrackCurrent(urlFormTracks);
      setIsPlaying(true);
      setIsAutoPlay(true);
    }
  }, [statePlay]);

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
    if (isShuffle) {
      setTrackCurrent(Math.floor(Math.random() * tracks.length));
    } else if (trackCurrent > 0) {
      setTrackCurrent((value) => {
        return value - 1;
      });
    }
    setIsAutoPlay(true);
    setIsPlaying(true);
  };

  const handleClickForward = () => {
    if (isShuffle) {
      setTrackCurrent(Math.floor(Math.random() * tracks.length));
    } else if (trackCurrent < tracks.length - 1) {
      setTrackCurrent((value) => {
        return value + 1;
      });
    }
    setIsAutoPlay(true);
    setIsPlaying(true);
  };

  const handleClickShuffle = () => {
    setIsShuffle((value) => !value);
  };

  return (
    <div className={styles.footer}>
      {token ? (
        <div className={styles.footerUser}>
          <div className={styles.currentlyPlaying}>
            <div className={styles.inforCurrentPlaying}>
              <img
                src={tracks[trackCurrent]?.image || currentlyPlaying?.image}
                alt={tracks[trackCurrent]?.title || currentlyPlaying?.title}
              />
              <div>
                <h6>
                  {tracks[trackCurrent]?.title || currentlyPlaying?.title}
                </h6>
                {currentlyPlaying?.artists &&
                  currentlyPlaying?.artists?.map((value, index) => {
                    return (
                      <span key={value.id}>
                        <Link to={`/artist/${value.id}`}>
                          {" "}
                          {index && index > 0 ? ", " + value.name : value.name}
                        </Link>
                      </span>
                    );
                  })}
              </div>
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
              <button onClick={() => handleClickShuffle()}>
                <FontAwesomeIcon
                  icon={faShuffle}
                  style={isShuffle && { color: "#1ed760" }}
                />
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
                  tracks[trackCurrent]?.previewUrl ||
                  currentlyPlaying?.previewUrl
                }
                volume={volume / 100}
                loop={isLoop}
                muted={isMuted}
                autoPlay={isAutoPlay}
                listenInterval={100}
                onListen={(value) => {
                  const valueTime =
                    (value / audioRef?.current?.audioEl?.current.duration) *
                    100;
                  setDurations(valueTime);
                }}
                // onAbort={(value) => {
                //   setIsAutoPlay(true);
                //   console.log(value);
                // }}
                onEnded={(value) => {
                  handleClickForward();
                }}
                // onCanPlay={(value) => {
                //   console.log(value);

                // }}
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
      ) : (
        <div className={styles.footerLogin}>
          <div>
            <p>PREVIEW OF SPOTIFY</p>
            <p>
              Sign up to get unlimited songs and podcasts with occasional ads.
              No credit card needed
            </p>
          </div>
          <button type="button" className={styles.btnFooterLogin}>
            <a href="https://www.spotify.com/vn-vi/signup?forward_url=https%3A%2F%2Fopen.spotify.com%2F">
              Sign up free
            </a>
          </button>
        </div>
      )}
    </div>
  );
}
