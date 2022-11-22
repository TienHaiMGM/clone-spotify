import { faCirclePlay, faClock, faEllipsis, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styles from '../css/MainPlaylist.module.css'
import MainListTracks from './MainListTracks'

export default function MainPlaylist(props) {
    const items = props.statePlaylists.data.playList.tracks.items;
    return (
        <div className={styles.mainPlaylist}>
            <div className={styles.mainPlaylistBtn}>
                <span><FontAwesomeIcon className={styles.iconPlay} icon={faCirclePlay} /></span>
                <span><FontAwesomeIcon icon={faHeart} /></span>
                <span><FontAwesomeIcon icon={faEllipsis} /></span>
            </div>
            <div className={styles.listTracks}>
                <div className={styles.headerListTracks}>
                    <div className={styles.titleHeader}>
                        <p>#</p>
                        <p>TITLE</p>
                    </div>
                    <div className={styles.info}>
                        <p>ALBUM</p>
                        <p>DATE ADDED</p>
                        <p>
                            <FontAwesomeIcon icon={faClock} />
                        </p>
                    </div>
                </div>
                <div className={styles.itemMainListTracks}>
                    {items && items?.map((value, index) => {
                        return <MainListTracks key={index} tracks={value} number={index + 1} />
                    })}
                </div>
            </div>
        </div>
    )
}
