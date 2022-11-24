import React from "react";
import styles from "../../css/Playlist/MainPlaylist.module.css";
import {
  convertDaysAdded,
  convertMsToMinutesSeconds,
} from "../../utils/convertTime";

export default function MainListTracks(props) {
  const tracks = {
    daysAdd: props.tracks["added_at"],
    track: {
      name: props.tracks.track.name,
      type: props.tracks.track.type,
      id: props.tracks.track.id,
      artists: props.tracks.track.artists,
      duration: props.tracks.track["duration_ms"],
      album: {
        name: props.tracks.track.album.name,
        id: props.tracks.track.album.id,
        image: props.tracks.track.album.images[0].url,
        type: props.tracks.track.album.type,
      },
    },
  };
  const artist = props.tracks.track.artists?.reduce((artist, value) => {
    artist.push(value.name);
    return artist;
  }, []);

  // console.log(props.tracks)
  // console.log('tracks',tracks)
  return (
    <div className={styles.mainListTracks}>
      <div className={styles.track}>
        <p>{props.number}</p>
        <div className={styles.infoTrack}>
          <img src={tracks.track.album.image} alt="" />
          <div>
            <h6>{tracks.track.name}</h6>
            <p>{artist.join(", ")}</p>
          </div>
        </div>
      </div>
      <div className={styles.info}>
        <p>{tracks.track.album.name}</p>
        <p>{convertDaysAdded(tracks.daysAdd)} days ago</p>
        <p>{convertMsToMinutesSeconds(tracks.track.duration)}</p>
      </div>
    </div>
  );
}
