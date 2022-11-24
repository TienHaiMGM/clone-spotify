import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, getUsers } from "./redux/features/loginSlice";
import {
  getCategories,
  getCategorie,
  getAlbums,
  getArtist,
} from "./redux/features/categoriesSlice";
import {
  getCurrentlyPlaying,
  getPlayer,
} from "./redux/features/currentlyPlayingSlice";

import Header from "./components/Header";
import HomePlaylists from "./pages/HomePlaylists";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./App.css";
import { getTokenFromUrl } from "./data/spotify";
import PopupLogin from "./components/PopupLogin";

function App() {
  const [token, setToken] = useState();

  const stateLogin = useSelector((state) => state.loginReducer);
  const stateCategories = useSelector((state) => state.categoriesReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      setToken(_token);
      dispatch(login(_token));
      dispatch(getUsers({ _token }));
    }
    dispatch(getCategories());
    dispatch(getArtist());
    dispatch(getCategorie());
    dispatch(getAlbums());
    dispatch(getCurrentlyPlaying());
    dispatch(getPlayer());
  }, []);

  return (
    <div className="home">
      <nav>
        <Navbar />
      </nav>
      <header>
        <Header></Header>
      </header>
      <main>
        <HomePlaylists></HomePlaylists>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
