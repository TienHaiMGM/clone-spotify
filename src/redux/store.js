import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/loginSlice";
import categoriesSlice from "./features/categoriesSlice";
import currentlyPlayingSlice from "./features/currentlyPlayingSlice";
import playlistsSlice from "./features/playlistsSlice";
import albumSlice from "./features/albumSlice";
import searchSlice from "./features/searchSlice";
import genreSlice from "./features/genreSlice";
import trackSlice from "./features/trackSlice";
import listTrackPlayingSlice from "./features/listTrackPlayingSlice";
import artistSlice from "./features/artistSlice";
import likedSongsSlice from "./features/likedSongsSlice";
import librarySlice from "./features/librarySlice";

export default configureStore({
  reducer: {
    loginReducer: loginSlice,
    categoriesReducer: categoriesSlice,
    currentlyPlayingReducer: currentlyPlayingSlice,
    playlistsReducer: playlistsSlice,
    albumReducer: albumSlice,
    searchReducer: searchSlice,
    genreReducer: genreSlice,
    trackReducer: trackSlice,
    listTrackPlayingReducer: listTrackPlayingSlice,
    artistReducer: artistSlice,
    likedSongsReducer: likedSongsSlice,
    libraryReducer: librarySlice,
  },
});
