import React from "react";

import "../css/Frames.css";
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";

export default function Frames(props) {
  return (
    <div className="Frames">
      <nav>
        <Navbar />
      </nav>
      <header>
        <Header backgroundHeader={props.backgroundHeader}></Header>
      </header>
      <main>{props.children}</main>
      <footer>
        <Footer
          stateAlbum={props.stateAlbum}
          idForUrl={props.idForUrl}
          getIsPlaying={props.getIsPlaying}
        />
      </footer>
    </div>
  );
}
