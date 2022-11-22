import React from 'react'
import styles from '../css/LikedSongs.module.css';
import '../css/Frames.css'

import Header from '../components/Header';
import Playlists from '../pages/Playlists';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function LikedSongs() {
  return (
    <div className={`${styles.likedSongs} Frames`}>
      <nav><Navbar /></nav>
      <header><Header /></header>
      <main><Playlists /></main>
      <footer><Footer /></footer>
    </div>
  )
}
