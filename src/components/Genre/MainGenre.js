import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../../css/Genre/MainGenre.module.css";

export default function MainGenre(props) {
  const statePlaylistGenre = useSelector(
    (state) => state.genreReducer.data.playlistGenre
  );
  console.log("statePlaylistGenre", statePlaylistGenre);
  return (
    <div className={styles.mainGenre}>
      <div>
        <h3>Popular {props.nameFromSearchParams} playlists</h3>
      </div>
      <div className={styles.gridTracks}>
        {statePlaylistGenre &&
          statePlaylistGenre?.map((value) => {
            return (
              <div key={value.id} className={styles.tracks}>
                <Link to={`/${value.type}/${value.id}`}>
                  <div>
                    <img src={value.image} alt={value.title} />
                    <h6>{value.title}</h6>
                    <p>{value.description}</p>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}
