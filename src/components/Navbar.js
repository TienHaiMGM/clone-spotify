import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMagnifyingGlass, faTableList, faShieldHeart, faPlus } from '@fortawesome/free-solid-svg-icons';

import Logo from '../assets/images/Logo.png';
import styles from '../css/Navbar.module.css';
import PopupLogin from './PopupLogin';


export default function Navbar({ token }) {
  const [popup, setPopup] = useState(false)
  const handleClick = (e) => {
    setPopup(true);
  }
  return (
    <div className={styles.navbar}>
      <img src={Logo} alt="logo" />
      <Nav className={styles.menu}>
        <div className={styles.headMenu}>
          <Link className={styles.menuLink} to='/'>
            <FontAwesomeIcon icon={faHouse} />
            <span>Home</span>
          </Link>
          <Link className={styles.menuLink} to='/search'>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <span>Search</span>
          </Link>
          <Link className={styles.menuLink} to='/collection/playlists'>
            <FontAwesomeIcon icon={faTableList} />
            <span>Your Library</span>
          </Link>
          {/* <div
            style={{ display: "inline", cursor: "pointer" }}
            className={styles.menuLink}
            onClick={(e) => handleClick(e.target)}>
            <FontAwesomeIcon icon={faTableList} />
            <span>Your Library</span>
            <div className={popup ? styles.showPopup : styles.hidePopup}><PopupLogin title="Enjoy Your Library" content="Log in to see saved songs, podcasts, artists, and playlists in Your Library" /></div>
          </div> */}
          <div className={styles.footMenu}>
            <Link className={styles.menuLink} to=''>
              <FontAwesomeIcon icon={faPlus} />
              <span>Create Playlist</span>
            </Link>
            <Link className={styles.menuLink} to='/collection/tracks'>
              <FontAwesomeIcon icon={faShieldHeart} />
              <span>Liked Songs</span>
            </Link>
          </div>
        </div>
      </Nav>
      <div className={styles.footNav}>
        <a href="https://www.spotify.com/vn-vi/legal/cookies-policy/" target='blank'>Cookies</a>
        <a href="https://www.spotify.com/vn-vi/legal/privacy-policy/" target='blank'>Privacy</a>
      </div>
    </div>
  )
}
