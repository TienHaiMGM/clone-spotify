import React, { useEffect } from "react";
import styles from "../../css/Search/MainSearch.module.css";
import { getRandomColor } from "../../utils/randomColor";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSearch } from "../../redux/features/searchSlice";
import { memo } from "react";

function MainSearch() {
  const stateSearch = useSelector((state) => state.searchReducer);
  const stateBrowse = stateSearch?.data?.browse;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSearch());
  }, []);
  return (
    <div className={styles.mainSearch}>
      <h1>Browse all</h1>
      <div className={styles.gridSearch}>
        {stateBrowse &&
          stateBrowse.map((value) => {
            return (
              <Link
                to={{
                  pathname: `/genre/${value.id}`,
                  search: `?name=${value.name}`,
                }}
                className={styles.browseSearch}
                style={{ backgroundColor: getRandomColor() }}
                key={value.id}
              >
                <h3>{value.name}</h3>
                <img src={value.image} alt={value.name} />
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default memo(MainSearch);
