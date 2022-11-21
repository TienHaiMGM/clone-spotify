import React from 'react'
import styles from '../css/Footer.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faImage, faCirclePause, faCirclePlay, faShuffle, faForwardStep, faBackwardStep, faRotate } from '@fortawesome/free-solid-svg-icons';
import I_Knew_You_Were_Trouble_Taylor from '../assets/audios/I_Knew_You_Were_Trouble_Taylor.mp3'

export default function Footer() {
  const stateCurrentlyPlaying = useSelector((state) => state.currentlyPlayingRuducer);
  const currentlyPlaying = stateCurrentlyPlaying.data.items;

  return (
    <div className={styles.footer}>

      <div className={styles.footerUser}>

        <div className={styles.currentlyPlaying}>
          <img src={currentlyPlaying.image} alt='My Tam' />
          <div >
            <h6>{currentlyPlaying.title}</h6>
            <p>{currentlyPlaying.artists}</p>
          </div>
          <div className={styles.iconButton}>
            <button><FontAwesomeIcon icon={faHeart} /></button>
            <button
            >
              <FontAwesomeIcon icon={faImage} />
            </button>
          </div>
        </div>

        <div className={styles.audio}>
          <div className={styles.buttonPlayers}>
            <button>
              <FontAwesomeIcon icon={faShuffle} />
            </button>
            <button>
              <FontAwesomeIcon icon={faBackwardStep} />
            </button>
            <button className={styles.buttonPlay}>
              <FontAwesomeIcon icon={faCirclePlay} />
            </button>
            {/* <button>
              <FontAwesomeIcon icon={faCirclePause} />
            </button> */}
            <button>
              <FontAwesomeIcon icon={faForwardStep} />
            </button>
            <button>
              <FontAwesomeIcon icon={faRotate} />
            </button>
          </div>
          <div className={styles.buttonAjust}>

          </div>
        </div>
      </div>


      <div className={styles.footerLogin}>
        <div>
          <p>PREVIEW OF SPOTIFY</p>
          <p>Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed</p>
        </div>
        <button type='button'>Sign up free</button>
      </div>

    </div>
  )
}
