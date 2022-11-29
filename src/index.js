import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import App from "./App";
import Search from "./pages/Search";
import YourLibrary from "./pages/YourLibrary";
import LikedSongs from "./pages/LikedSongs";
import Playlist from "./pages/Playlist";
import Album from "./pages/Album";
import Episode from "./pages/Episode";
import Track from "./pages/Track";
import Show from "./pages/Show";
import Artist from "./pages/Artist";
import Genre from "./pages/Genre";
import ResultUserSearch from "./components/Search/ResultUserSearch";
import ProtectRouter from "./components/ProtectRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/search/:searchId",
    element: <ResultUserSearch />,
  },
  {
    path: "/genre/:genreId",
    element: <Genre />,
  },
  {
    path: "/collection/:typePlayer",
    element: (
      <ProtectRouter>
        <YourLibrary />,
      </ProtectRouter>
    ),
  },
  {
    path: "/collection/tracks",
    element: (
      <ProtectRouter>
        <LikedSongs />,
      </ProtectRouter>
    ),
  },
  {
    path: "/playlist/:playlistId",
    element: <Playlist />,
  },
  {
    path: "/album/:albumId",
    element: <Album />,
  },
  {
    path: "/artist/:artistId",
    element: <Artist />,
  },
  {
    path: "/track/:trackId",
    element: <Track />,
  },
  {
    path: "/show/:showId",
    element: <Show />,
  },
  {
    path: "/episode/:episodetId",
    element: <Episode />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
