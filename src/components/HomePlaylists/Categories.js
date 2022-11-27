import React from "react";
import InfoTracks from "./InfoTracks";
import styles from "../../css/HomePlaylists/Categories.module.css";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

export default function Categories(props) {
  return (
    <div className={styles.categories}>
      <h1>{props.name}</h1>
      <div>
        {props?.type?.map((value, index) => {
          return <InfoTracks key={index} value={value} />;
        })}
      </div>
    </div>
  );
}
