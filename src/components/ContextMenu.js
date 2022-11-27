import React from "react";
import styles from "../css/ContextMenu.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  unfollowPlaylist,
  getMyPlaylists,
} from "../redux/features/playlistsSlice";

export default function ContextMenu(props) {
  const dispatch = useDispatch();
  const anchorPointX = props.anchorPoint.x;
  const anchorPointY = props.anchorPoint.y;
  const idPlaylist = props.targetContextMenu;

  const handleClickDelete = () => {
    dispatch(unfollowPlaylist({ idPlaylist })).then((value) => {
      dispatch(getMyPlaylists());
    });
  };
  return (
    <div
      className={styles.contextMenu}
      style={{ left: anchorPointX, top: anchorPointY }}
    >
      <ul>
        <li>Add to queue</li>
        <li>Go to playlist radio</li>
        <li>Add to profile</li>
        <li>Edit details</li>
        <li>Create similar playlist</li>
        <li onClick={() => handleClickDelete()}>Delete</li>
        <li>Rename</li>
        <li>Create playlist</li>
        <li>Create folder</li>
        <li>Share</li>
      </ul>
    </div>
  );
}
