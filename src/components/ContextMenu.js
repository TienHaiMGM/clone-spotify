import React, { useState, useEffect } from "react";
import styles from "../css/ContextMenu.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  unfollowPlaylist,
  getMyPlaylists,
  renamePlaylist,
  editDetailPlaylist,
  getPlaylist,
  addItemsToPlaylist,
} from "../redux/features/playlistsSlice";

export default function ContextMenu(props) {
  const dispatch = useDispatch();
  const anchorPointX = props.anchorPoint.x;
  const anchorPointY = props.anchorPoint.y;
  const playlistId = props.targetContextMenu;

  const handleClickDelete = () => {
    dispatch(unfollowPlaylist({ playlistId })).then((value) => {
      dispatch(getMyPlaylists());
    });
  };
  const handleClickRename = () => {
    dispatch(addItemsToPlaylist());
  };
  const handleClickCreatePlaylist = () => {};

  const handleClickEditDetails = () => {
    dispatch(getPlaylist({ playlistId }));
    props.getShowEditDetail(true);
  };

  return (
    <div className={styles.contextMenu}>
      <div
        className={styles.listMenu}
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
    </div>
  );
}
