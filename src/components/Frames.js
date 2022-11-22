import React from 'react'

import '../css/Frames.css'
import Header from './Header';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Frames(props) {
    return (
        <div className='Frames'>
            <nav><Navbar /></nav>
            <header><Header backgroundHeader={props.backgroundHeader}></Header ></header>
            <main>{props.children}</main>
            <footer><Footer /></footer>
        </div>
    )
}
