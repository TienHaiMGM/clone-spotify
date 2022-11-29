import React from "react";
import { Link } from "react-router-dom";
import styles from "../../css/BoxInformation/BoxInfoPlaylist.module.css";
import { capitalizeFirstLowercaseRest } from "../../utils/convertText";

export default function BoxInfoPlaylist(props) {
  return (
    <div className={styles.boxInfoPlaylist}>
      <Link to={"/"}>
        <div>
          <img
            src="https://i.scdn.co/image/ab67706f000000023f3b3a036d4186b3270bc10c"
            alt=""
          />
          <h3>Morten Mix</h3>
          <p>David Guetta, Afrojack, Nik & Jay and More</p>
        </div>
      </Link>
    </div>
  );
}
