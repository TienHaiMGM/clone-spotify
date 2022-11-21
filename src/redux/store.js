import {configureStore} from '@reduxjs/toolkit';
import loginSlice from './features/loginSlice';
import playListSlice from './features/playListSlice'
import currentlyPlayingSlice from './features/currentlyPlayingSlice'

export default configureStore({
  reducer: {
    loginReducer: loginSlice,
    playListRuducer: playListSlice,
    currentlyPlayingRuducer: currentlyPlayingSlice,
  },
});