import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'

import styles from '../css/Header.module.css'
import { loginUrl } from '../data/spotify'

export default function Header(props) {
    return (
        <div className={styles.header}>
            <div className={styles.forwardAndBackward}>
                <span><FontAwesomeIcon icon={faAngleLeft} /></span>
                <span><FontAwesomeIcon icon={faAngleRight} /></span>
            </div>
            {/* */}
            <div>{props.children}</div>

            <div className={styles.myHeader}>
                <a href='https://www.spotify.com/vn-vi/premium/?utm_source=app&utm_medium=desktop&utm_campaign=upgrade' target="blank">Premium</a>
                <a href='https://support.spotify.com/vn-vi/' target="blank">Support</a>
                <a href='https://www.spotify.com/vn-vi/download/windows/' target="blank">Download</a>
            </div>
            <div className={styles.signupAndLogin}>
                <button className={styles.signUp} type='button'>
                    <a href={""}>Sign up</a>
                </button>
                <button className={styles.logIn} type='button'>
                    <a href={loginUrl}>Log in</a>
                </button>
            </div>
        </div>
    )
}
