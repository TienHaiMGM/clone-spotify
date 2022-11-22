import React from 'react';
import { useParams } from 'react-router-dom';
import Frames from '../components/Frames';


export default function Artist() {
    const params = useParams();
    const artistId = params.artistId;
  return (
    <div>
      <Frames></Frames>
    </div>
  )
}
