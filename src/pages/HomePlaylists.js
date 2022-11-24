import React from "react";
import { useSelector } from "react-redux";
import Categories from "../components/HomePlaylists/Categories";
import styles from "../css/HomePlaylists/HomePlaylists.module.css";

export default function HomePlaylists() {
  const stateCategories = useSelector((state) => state.categoriesReducer);
  return (
    <div className={styles.playlists}>
      <div>
        {" "}
        <Categories name="Mood" type={stateCategories.data.categories.mood} />
      </div>
      <div>
        {" "}
        <Categories
          name="Trending"
          type={stateCategories.data.categories.trending}
        />
      </div>
      <div>
        {" "}
        <Categories name="Albums" type={stateCategories.data.albums} />
      </div>
    </div>
  );
}
