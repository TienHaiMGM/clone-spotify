import React from 'react'
import { useParams } from 'react-router-dom';
import Frames from '../components/Frames';


export default function Album() {
  const params = useParams();
  const albumId = params.albumId;
  return (
    <div>
      <Frames></Frames>
    </div>
  )
}
