import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux'

import store from './redux/store'
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './App';
import Search from './pages/Search';
import YourLibrary from './pages/YourLibrary';
import LikedSongs from './pages/LikedSongs';

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
    path: "/collection/playlists",
    element: <YourLibrary />,
  },
  {
    path: "/collection/tracks",
    element: <LikedSongs />,
  },

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider >,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
