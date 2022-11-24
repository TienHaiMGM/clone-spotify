import React from "react";
import { Link } from "react-router-dom";
import styles from "../../css/HomePlaylists/Tracks.module.css";
import { capitalizeFirstLowercaseRest } from "../../utils/convertText";

export default function Tracks(props) {
  const link = `/${props.value.type}/${props.value.id}`;
  return (
    <div className={styles.tracks}>
      <Link to={link}>
        <div>
          <img src={props.value.images} alt={props.value.title} />
          <h6>{props.value.title}</h6>
          <p>
            {props.value.description ||
              props.value.artists ||
              capitalizeFirstLowercaseRest(props.value.type)}
          </p>
        </div>
      </Link>
    </div>
  );
}
