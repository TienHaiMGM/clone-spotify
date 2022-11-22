import React from 'react';
import { useParams } from 'react-router-dom';
import Frames from '../components/Frames';


export default function Track() {
    const params = useParams();
    const trackId = useParams.trackId;
  return (
    <div>
      <Frames></Frames>
    </div>
  )
}
