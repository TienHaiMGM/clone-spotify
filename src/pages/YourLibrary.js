import React from 'react'
import styles from '../css/YourLibrary.module.css';

import Header from '../components/Header';
import Playlists from '../pages/Playlists';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function YourLibrary() {
  return (
    <div className={styles.yourLibrary}>
      <nav><Navbar /></nav>
      <header><Header /></header>
      <main><Playlists /></main>
      <footer><Footer /></footer>
    </div>
  )
}
