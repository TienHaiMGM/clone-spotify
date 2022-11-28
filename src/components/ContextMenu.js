import React from "react";
import styles from "../css/ContextMenu.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  unfollowPlaylist,
  getMyPlaylists,
  renamePlaylist,
  editDetailPlaylist,
} from "../redux/features/playlistsSlice";

export default function ContextMenu(props) {
  const dispatch = useDispatch();
  const anchorPointX = props.anchorPoint.x;
  const anchorPointY = props.anchorPoint.y;
  const idPlaylist = props.targetContextMenu;
  const newName = "tienahi";
  const newDescription = "mo ta";

  const handleClickDelete = () => {
    dispatch(unfollowPlaylist({ idPlaylist })).then((value) => {
      dispatch(getMyPlaylists());
    });
  };
  const handleClickRename = () => {};
  const handleClickCreatePlaylist = () => {};
  const handleClickEditDetails = () => {
    dispatch(editDetailPlaylist({ idPlaylist, newName, newDescription }));
  };
  return (
    <div
      className={styles.contextMenu}
      style={{ left: anchorPointX, top: anchorPointY }}
    >
      <ul>
        <li>Go to playlist radio</li>
        <li>Add to profile</li>
        <li onClick={() => handleClickEditDetails()}>Edit details</li>
        <li>Create similar playlist</li>
        <li onClick={() => handleClickDelete()}>Delete</li>
        <li onClick={() => handleClickRename()}>Rename</li>
        <li onClick={() => handleClickCreatePlaylist()}>Create playlist</li>
        <li>Create folder</li>
        <li>Share</li>
      </ul>
    </div>
  );
}
