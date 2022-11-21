import React from 'react'
import styles from '../css/Search.module.css';
import { createUseStyles } from 'react-jss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import Header from '../components/Header';
import Playlists from '../pages/Playlists';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const useStyles = createUseStyles({
  inputSearch: {
      display:"flex",
      padding:"0.7em",
      backgroundColor:"white",
      width: "60%",
      height: "2.5em",
      borderRadius: "2em", 
    '& input': {
      width: "100%",
      border: "none",
      outline: "none",
      paddingLeft: "1.2em",
    },
    '& .iconSearch':{
      fontSize: "1.3em",
      color:"#3C3B3B",
    },
  }
})

export default function Search() {
  const classes = useStyles()
  return (
    <div className={styles.search}>
      <nav><Navbar /></nav>
      <header>
        <Header >
          <div className={classes.inputSearch}>
            <FontAwesomeIcon className="iconSearch" icon={faMagnifyingGlass} />
            <input placeholder='What do you want to listen to?'></input>
          </div>
        </Header >
      </header>
      <main><Playlists /></main>
      <footer><Footer /></footer>
    </div>
  )
}
