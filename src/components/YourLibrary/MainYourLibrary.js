import React, { useEffect } from "react";
import styles from "../../css/YourLibrary/YourLibrary.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMyPlaylists } from "../../redux/features/playlistsSlice";

export default function MainYourLibrary() {
  const dispatch = useDispatch();
  const stateMyPlaylists = useSelector(
    (state) => state.playlistsReducer.data.myPlaylists
  );
  console.log(stateMyPlaylists);
  useEffect(() => {
    dispatch(getMyPlaylists());
  }, []);
  return (
    <div className={styles.mainYourLibrary}>
      <h1>Playlists</h1>
      <div className={styles.mainContentLibrary}>
        <div className={styles.likedSongsLibrary}>
          <p>adele</p>
          <h3>Liked Songs</h3>
          <span>2liked songs</span>
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
        </div>
      </div>
    </div>
  );
}
