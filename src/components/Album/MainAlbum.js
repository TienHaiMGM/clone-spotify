import React from "react";
import {
  faCirclePlay,
  faClock,
  faEllipsis,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../css/Album/MainAlbum.module.css";
import AlbumListTracks from "./AlbumListTracks";

export default function MainAlbum(props) {
  const dataTracks = props?.stateAlbum?.data?.tracks?.items;

  return (
    <div className={styles.mainAlbum}>
      <div className={styles.mainAlbumBtn}>
        <span>
          <FontAwesomeIcon className={styles.iconPlay} icon={faCirclePlay} />
        </span>
        <span>
          <FontAwesomeIcon icon={faHeart} />
        </span>
        <span>
          <FontAwesomeIcon icon={faEllipsis} />
        </span>
      </div>
      <div className={styles.listTracks}>
        <div className={styles.headerListTracks}>
          <div className={styles.titleHeader}>
            <p>#</p>
            <p>TITLE</p>
          </div>
          <div className={styles.info}>
            <p>
              <FontAwesomeIcon icon={faClock} />
            </p>
          </div>
        </div>
        <div className={styles.itemMainListTracks}>
          {dataTracks &&
            dataTracks.map((data, index) => {
              return (
                <AlbumListTracks
                  key={index}
                  number={index + 1}
                  dataTracks={data}
                  getIdForUrl={props.getIdForUrl}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
