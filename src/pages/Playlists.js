import React from 'react';
import { useSelector } from 'react-redux';
import Categories from '../components/Categories';
import styles from '../css/Playlists.module.css';

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
