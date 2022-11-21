import React from 'react'
import styles from '../css/Footer.module.css';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div>
        <p>PREVIEW OF SPOTIFY</p>
        <p>Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed</p>
      </div>
      <button type='button'>Sign up free</button>
    </div>
  )
}
