import React from 'react'
import styles from '../css/Tracks.module.css'

export default function Tracks(props) {
    
    return (
        <div className={styles.tracks}>
            <div>
                <img src={props.value.images} />
                <h6>{props.value.title}</h6>
                <p>{props.value.description || props.value.artists}</p>
            </div>
        </div>
    )
}
