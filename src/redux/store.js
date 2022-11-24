import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/loginSlice";
import categoriesSlice from "./features/categoriesSlice";
import currentlyPlayingSlice from "./features/currentlyPlayingSlice";
import playlistsSlice from "./features/playlistsSlice";
import albumSlice from "./features/albumSlice";

export default configureStore({
  reducer: {
    loginReducer: loginSlice,
    categoriesReducer: categoriesSlice,
    currentlyPlayingReducer: currentlyPlayingSlice,
    playlistsReducer: playlistsSlice,
    albumReducer: albumSlice,
  },
});
