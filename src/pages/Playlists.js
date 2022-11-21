import React from 'react'
import Categories from '../components/Categories';
import Tracks from '../components/Tracks';
import styles from '../css/Playlists.module.css';
import { useSelector, useDispatch } from 'react-redux';

export default function Playlists() {
  const statePlaylist = useSelector((state)=>state.playListRuducer)
  return (
    <div className={styles.playlists}>
      <div> <Categories name="Mood" type={statePlaylist.data.categories.mood}/></div>
      <div> <Categories name="Trending" type={statePlaylist.data.categories.trending}/></div>
      <div> <Categories name="Albums" type={statePlaylist.data.albums}/></div>
    </div>
  )
}
