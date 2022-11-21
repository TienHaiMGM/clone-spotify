import React from 'react'
import { createUseStyles } from 'react-jss'

import styles from '../css/YourLibrary.module.css';
import Header from '../components/Header';
import Playlists from '../pages/Playlists';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const useStyles = createUseStyles({
  headerLibrary: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop:'10px',
    '& a': {
      marginRight: "50px",
      textDecoration: "none",
      color: 'white',
      fontWeight: 'bold',
      fontSize: '0.9em',
      opacity: '0.9',
    },
  },
})

export default function YourLibrary() {
  const classes = useStyles()
  return (
    <div className={styles.yourLibrary}>
      <nav><Navbar /></nav>
      <header>
        <Header>
          <div className={classes.headerLibrary}>
            <span><Link to='/collection/playlists'>Playlists</Link></span>
            <span><Link to='/collection/podcasts'>Podcasts</Link></span>
            <span><Link to='/collection/artists'>Artists</Link></span>
            <span><Link to='/collection/albums'>Albums</Link></span>
          </div>
        </Header>
      </header>
      <main><Playlists /></main>
      <footer><Footer /></footer>
    </div>
  )
}
