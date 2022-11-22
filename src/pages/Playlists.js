import React from 'react'
import Categories from '../components/Categories';
import Tracks from '../components/Tracks';
import styles from '../css/Playlists.module.css';
import { useSelector, useDispatch } from 'react-redux';

export default function Playlists() {
  const stateCategories = useSelector((state)=>state.categoriesReducer)
  return (
    <div className={styles.playlists}>
      <div> <Categories name="Mood" type={stateCategories.data.categories.mood}/></div>
      <div> <Categories name="Trending" type={stateCategories.data.categories.trending}/></div>
      <div> <Categories name="Albums" type={stateCategories.data.albums}/></div>
    </div>
  )
}
