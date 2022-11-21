import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { getToken, getUsers } from './redux/features/loginSlice';
import { getCategories, getCategorie, getAlbums } from './redux/features/playListSlice'

import Header from './components/Header';
import Playlists from './pages/Playlists';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './App.css';
import { getTokenFromUrl } from './data/spotify';
import PopupLogin from './components/PopupLogin';



function App() {
  const [token, setToken] = useState(null);

  const stateLogin = useSelector((state) => state.loginReducer)
  const statePlaylist = useSelector((state)=>state.playListRuducer)
  console.log("alb",statePlaylist)
  const dispatch = useDispatch();

  useEffect(() => {
    const hash = getTokenFromUrl();
    // window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      setToken(_token);
      dispatch(getToken(_token));
      dispatch(getUsers({_token}));
      dispatch(getCategories());
      dispatch(getCategorie());
      dispatch(getAlbums());
    }
  }, [])

  return (
    <div className="home">
      <nav><Navbar token={token} /></nav>
      <header><Header ></Header ></header>
      <main><Playlists >
      </Playlists ></main>
      <footer><Footer /></footer>
    </div>
  );
}

export default App;
