import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, getUsers } from "./redux/features/loginSlice";
import {
  getCategories,
  getCategorie,
  getAlbums,
  getArtists,
} from "./redux/features/categoriesSlice";

import Header from "./components/Header";
import HomePlaylists from "./pages/HomePlaylists";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./App.css";
import { getTokenFromUrl } from "./data/spotify";

function App() {
  const [token, setToken] = useState();
  const stateLogin = useSelector((state) => state.loginReducer);
  const stateCategories = useSelector((state) => state.categoriesReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const hash = getTokenFromUrl();
    const _token = hash.access_token;
    window.location.hash = "";

    if (_token) {
      setToken(_token);
      dispatch(login(_token));
      dispatch(getUsers({ _token }));
    }
    dispatch(getCategories());
    dispatch(getCategorie());
    dispatch(getAlbums());
    dispatch(getArtists());
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
