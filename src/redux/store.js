import {configureStore} from '@reduxjs/toolkit';
import loginSlice from './features/loginSlice';
import playListSlice from './features/playListSlice'

export default configureStore({
  reducer: {
    loginReducer: loginSlice,
    playListRuducer: playListSlice,
  },
});