import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getGenre } from "../../redux/features/genreSlice";

export default function Genre() {
  const params = useParams();
  const genreId = params.genreId;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGenre({ genreId }));
  }, []);
  console.log(genreId);
  return <div>Genre</div>;
}
