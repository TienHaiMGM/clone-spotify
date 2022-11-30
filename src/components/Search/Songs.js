import React from "react";
import styles from "../../css/Search/ResultUserSearch.module.css";
import { convertMsToMinutesSeconds } from "../../utils/convertTime";
import { Link } from "react-router-dom";

export default function Songs(props) {
  return (
    <div className={styles.mainSongs}>
      <div className={styles.songsInfo}>
        <img src={props.value.images} alt="" />
        <div>
          <h6>{props.value.title} </h6>
          <Link
            to={`/artist/${props.value.idArtists}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <p>{props.value.artists}</p>
          </Link>
        </div>
      </div>
      <div>
        <p>{convertMsToMinutesSeconds(props.value.duration)}</p>
      </div>
    </div>
  );
}
