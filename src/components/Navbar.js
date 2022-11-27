import {
  faHouse,
  faMagnifyingGlass,
  faPlus,
  faShieldHeart,
  faTableList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";
import React from "react";
import { Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import styles from "../css/Navbar.module.css";
import "../css/PopupLogin.css";
import {
  popupLibrary,
  popupLikedSongs,
  popupCreatePlaylist,
} from "../data/popup";
import {
  createPlaylist,
  unfollowPlaylist,
  deleteItemsToPlaylist,
} from "../redux/features/playlistsSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const stateLogin = useSelector((state) => state.loginReducer);
  const tokens = stateLogin?.data?.token;
  const stateMyPlaylist = useSelector(
    (state) => state.playlistsReducer.data.myPlaylists
  );
  console.log("stateMyPlaylist", stateMyPlaylist);
  // HANDLE POPUP
  const driverLibrary = new Driver();
  driverLibrary.defineSteps(popupLibrary);
  const driverLikedSongs = new Driver();
  driverLikedSongs.defineSteps(popupLikedSongs);
  const driverCreatePlaylist = new Driver();
  driverCreatePlaylist.defineSteps(popupCreatePlaylist);
  const handleClickPopupLibrary = () => {
    if (tokens === null) {
      driverLibrary.start();
    }
  };
  const handleClickPopupLikedSongs = () => {
    if (tokens === null) {
      driverLikedSongs.start();
    }
  };
  const handleClickPopupCreatePlaylist = () => {
    if (tokens === null) {
      driverCreatePlaylist.start();
    } else {
      // dispatch(createPlaylist());
      // dispatch(deleteItemsToPlaylist());
      dispatch(unfollowPlaylist());
    }
  };

  return (
    <div className={styles.sideBar}>
      <div className={`${styles.navbar}`}>
        <img src={Logo} alt="logo" />
        <Nav className={styles.menu}>
          <div className={styles.headMenu}>
            <Link className={styles.menuLink} to="/">
              <FontAwesomeIcon icon={faHouse} />
              <span>Home</span>
            </Link>
            <Link className={styles.menuLink} to="/search">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <span>Search</span>
            </Link>
            <Link
              id="popupLibrary"
              onClick={() => handleClickPopupLibrary()}
              className={styles.menuLink}
              to="/collection/playlists"
            >
              <FontAwesomeIcon icon={faTableList} />
              <span>Your Library</span>
            </Link>
            <div className={styles.footMenu}>
              <Link
                id="popupCreatePlaylist"
                onClick={() => handleClickPopupCreatePlaylist()}
                className={styles.menuLink}
                to=""
              >
                <FontAwesomeIcon icon={faPlus} />
                <span>Create Playlist</span>
              </Link>
              <Link
                id="popupLikedSongs"
                onClick={() => handleClickPopupLikedSongs()}
                className={styles.menuLink}
                to="/collection/tracks"
              >
                <FontAwesomeIcon icon={faShieldHeart} />
                <span>Liked Songs</span>
              </Link>
            </div>
          </div>
        </Nav>
        <div className={styles.footNav}>
          <a
            href="https://www.spotify.com/vn-vi/legal/cookies-policy/"
            target="blank"
          >
            Cookies
          </a>
          <a
            href="https://www.spotify.com/vn-vi/legal/privacy-policy/"
            target="blank"
          >
            Privacy
          </a>
        </div>
      </div>
      <div className={styles.myPlaylist}>
        {stateMyPlaylist &&
          stateMyPlaylist?.map((value) => {
            return <p key={value.id}>{value.name}</p>;
          })}
      </div>
    </div>
  );
}
