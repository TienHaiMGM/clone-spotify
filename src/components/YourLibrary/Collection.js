import React, { useEffect } from "react";
import styles from "../../css/YourLibrary/YourLibrary.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMyPlaylists } from "../../redux/features/playlistsSlice";
import { getLikedSongs } from "../../redux/features/likedSongsSlice";
import { useParams } from "react-router-dom";
import BoxInfoPlaylist from "../BoxInformation/BoxInfoPlaylist";

export default function Collection() {
  const dispatch = useDispatch();
  const params = useParams();
  const typePlayer = params.typePlayer;
  const stateMyPlaylists = useSelector(
    (state) => state.playlistsReducer.data.myPlaylists
  );
  const libraryLikedSongs = useSelector(
    (state) => state.likedSongsReducer?.data?.libraryLikedSongs
  );
  useEffect(() => {
    dispatch(getMyPlaylists());
    dispatch(getLikedSongs());
  }, []);

  return (
    <div className={styles.mainYourLibrary}>
      <h1>Playlists</h1>
      <div className={styles.mainContentLibrary}>
        <div className={styles.likedSongsLibrary}>
          <p>{libraryLikedSongs?.nameLikedSongs}</p>
          <h3>Liked Songs</h3>
          <span>{libraryLikedSongs?.total} liked songs</span>
        </div>
        <div className={styles.myPlaylist}>
          {stateMyPlaylists &&
            stateMyPlaylists.map((value) => {
              return (
                <div key={value.id} className={styles.tracks}>
                  <Link to={`/playlist/${value.id}`}>
                    <div>
                      <img
                        src={
                          value.image ||
                          "https://zerojackerzz.com/wp-content/uploads/2019/10/album-placeholder.png"
                        }
                        alt="choseImageMusic"
                      />
                      <h6>{value.name}</h6>
                      <p>By {value.nameOwner}</p>
                    </div>
                  </Link>
                </div>
              );
            })}
          {/* <BoxInfoPlaylist /> */}
        </div>
      </div>
    </div>
  );
}
