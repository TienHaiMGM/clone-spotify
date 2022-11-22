import React from 'react'
import {useParams} from 'react-router-dom';
import Frames from '../components/Frames';

export default function Episode() {
    const params = useParams();
    const episodeId = params.episodeId;
  return (
    <div>
      <Frames></Frames>
    </div>
  )
}
