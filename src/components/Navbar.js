import {
  faFileImage,
  faHouse,
  faMagnifyingGlass,
  faPlus,
  faShieldHeart,
  faTableList,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";
import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AlbumPlaceHolder from "../assets/images/AlbumPlaceHolder.png";
import Logo from "../assets/images/Logo.png";
import ContextMenu from "../components/ContextMenu";
import styles from "../css/Navbar.module.css";
import "../css/PopupLogin.css";
import {
  popupCreatePlaylist,
  popupLibrary,
  popupLikedSongs,
} from "../data/popup";
import {
  createPlaylist,
  editDetailPlaylist,
  editImagePlaylist,
  getMyPlaylists,
} from "../redux/features/playlistsSlice";

export default function Navbar() {
  const [namePlaylist, setNamePlaylist] = useState(0);
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [targetContextMenu, setTargetContextMenu] = useState();
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [showEditDetail, setShowEditDetail] = useState(false);
  const [editNamePlaylist, setEditNamePlaylist] = useState("");
  const [editDescriptionPlaylist, setEditDescriptionPlaylist] = useState("");
  const [urlEditImagePlaylist, setUrlEditImagePlaylist] = useState();
  const [base64ImagePlaylist, setBase64ImagePlaylist] = useState();
  const dispatch = useDispatch();
  const stateLogin = useSelector((state) => state.loginReducer);
  const tokens = stateLogin?.data?.token;
  const statePlaylist = useSelector(
    (state) => state.playlistsReducer.data.playList
  );
  useEffect(() => {
    if (tokens) {
      dispatch(getMyPlaylists());
    }
  }, [tokens]);

  /*Right Click Context Menu*/
  useEffect(() => {
    document.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });
    const element = document.getElementById("contextMenuRightClick");
    element?.addEventListener("contextmenu", (event) => {
      handleContextMenu(event);
    });
    document.addEventListener("click", (event) => {
      handleRemoveContextMenu(event);
    });
    return () => {
      element?.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", handleContextMenu);
    };
  }, []);

  const handleContextMenu = (event) => {
    const nameAttribute = event.target.getAttribute("name");
    setAnchorPoint({ x: event.pageX, y: event.pageY });
    if (nameAttribute) {
      setTargetContextMenu(nameAttribute);
      setShowContextMenu(true);
    } else {
      setShowContextMenu(false);
    }
  };
  const handleRemoveContextMenu = (event) => {
    setShowContextMenu(false);
  };

  const stateMyPlaylist = useSelector(
    (state) => state.playlistsReducer.data.myPlaylists
  );
  useEffect(() => {
    setNamePlaylist((value) => {
      const namePlaylistTemp = `My Playlist #${stateMyPlaylist.length + 1}`;
      const check = stateMyPlaylist?.every((value) => {
        return value.name !== namePlaylistTemp;
      });
      if (check) {
        return `My Playlist #${stateMyPlaylist.length + 1}`;
      } else return `My Playlist #${stateMyPlaylist.length + 2}`;
    });
  }, [stateMyPlaylist]);

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
      dispatch(createPlaylist({ namePlaylist })).then((value) => {
        dispatch(getMyPlaylists());
      });
      // dispatch(createPlaylist());
      // dispatch(deleteItemsToPlaylist());
      // dispatch(unfollowPlaylist());
    }
  };

  //Edit Name + description + image cho playlist
  useEffect(() => {
    setEditNamePlaylist(statePlaylist.name);
    setEditDescriptionPlaylist(statePlaylist.description);
  }, [statePlaylist]);

  const handleClickSubmit = () => {
    setShowEditDetail(false);
    dispatch(
      editImagePlaylist({ base64ImagePlaylist, targetContextMenu })
    ).then((value) => {
      dispatch(getMyPlaylists());
    });
    dispatch(
      editDetailPlaylist({
        targetContextMenu,
        editNamePlaylist,
        editDescriptionPlaylist,
      })
    ).then((value) => {
      dispatch(getMyPlaylists());
    });
  };
  //get thong tin de show tu ben context menu
  const getShowEditDetail = (value) => {
    setShowEditDetail(value);
  };

  //Xu ly image uploaded
  const handleOnchangeUploadImage = (value) => {
    const url = window.URL.createObjectURL(value);
    setUrlEditImagePlaylist(url);
    getBase64(value);
  };
  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result.replace("data:image/jpeg;base64,", "");
      setBase64ImagePlaylist(base64String);
    };
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
      <div id="contextMenuRightClick" className={`${styles.myPlaylist}`}>
        {stateMyPlaylist &&
          stateMyPlaylist?.map((value) => (
            <Link key={value.id} to={`/playlist/${value.id}`}>
              <p name={value.id}>{value.name}</p>
            </Link>
          ))}
      </div>
      <div style={showContextMenu ? { display: "block" } : { display: "none" }}>
        <ContextMenu
          anchorPoint={anchorPoint}
          targetContextMenu={targetContextMenu}
          getShowEditDetail={getShowEditDetail}
        />
      </div>
      <div style={showEditDetail ? { display: "block" } : { display: "none" }}>
        <div className={styles.blurBackground}></div>
        <div className={styles.editDetails}>
          <div>
            <h1>Edit Details</h1>
            <span
              onClick={() => setShowEditDetail(false)}
              className={styles.iconX}
            >
              <FontAwesomeIcon icon={faX} />
            </span>
          </div>
          <div>
            <div className={styles.editImage}>
              <img
                className={styles.imageHolder}
                src={urlEditImagePlaylist || AlbumPlaceHolder}
                alt=""
              />
              <span className={styles.chooseImage}>
                <label htmlFor="uploadImage">
                  <FontAwesomeIcon
                    className={styles.iconFileImage}
                    icon={faFileImage}
                  />
                  <p>Choose Photo</p>
                </label>
                <input
                  onChange={(e) => handleOnchangeUploadImage(e.target.files[0])}
                  id="uploadImage"
                  type="file"
                  value=""
                  // accept="image/png, image/jpeg"
                />
              </span>
            </div>
            <form>
              <input
                onChange={(e) => setEditNamePlaylist(e.target.value)}
                className={styles.editName}
                type="text"
                placeholder="New Name Playlist"
                value={editNamePlaylist || ""}
              />
              <textarea
                onChange={(e) => setEditDescriptionPlaylist(e.target.value)}
                className={styles.editDescription}
                rows="3"
                cols="35"
                value={editDescriptionPlaylist || ""}
                placeholder="New playlist description"
              />
              <button onClick={() => handleClickSubmit()} type="submit">
                Save
              </button>
            </form>
          </div>
          <p>
            By proceeding, you agree to give Spotify access to the image you
            choose to upload. Please make sure you have the right to upload the
            image.
          </p>
        </div>
      </div>
    </div>
  );
}
