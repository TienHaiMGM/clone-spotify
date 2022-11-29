import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Frames from "../components/Frames";
import MainGenre from "../components/Genre/MainGenre";
import styles from "../css/Genre/Genre.module.css";
import { getGenre } from "../redux/features/genreSlice";

export default function Genre() {
  const params = useParams();
  const genreId = params.genreId;
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(window.location.search);
  const nameFromSearchParams = searchParams.getAll("name");
  useEffect(() => {
    dispatch(getGenre({ genreId }));
  }, []);
  return (
    <div>
      <Frames>
        <div className={styles.genre}>
          <div className={styles.headerGenre}>
            <h1>{nameFromSearchParams}</h1>
          </div>
          <div className={styles.mainGenre}>
            <MainGenre nameFromSearchParams={nameFromSearchParams} />
          </div>
        </div>
      </Frames>
    </div>
  );
}
