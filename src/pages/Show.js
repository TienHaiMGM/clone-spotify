import React from "react";
import { useParams } from "react-router-dom";
import Frames from "../components/Frames";

export default function Show() {
  const params = useParams();
  const showId = params.showId;
  return (
    <div>
      <Frames></Frames>
    </div>
  );
}
