import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  data: {},
};
export const getTrack = createAsyncThunk(
  "track/getTrack",
  async (arg, thunkApI) => {
    const trackId = arg.trackId;
    const token = thunkApI.getState().loginReducer.data.token;
    const res = await axios.get(
      `https://api.spotify.com/v1/tracks/${trackId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  }
);

export const getAlbumTrack = createAsyncThunk(
  "track/getAlbumTrack",
  async (arg, thunkApI) => {
    // const trackId = arg.trackId;
    const token = thunkApI.getState().loginReducer.data.token;
    const res = await axios.get(
      `https://api.spotify.com/v1/albums/6TVfiWmo8KtflUAmkK9gGF?limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  }
);

export const getLyricsTrack = createAsyncThunk(
  "track/getLyricsTrack",
  async (arg, thunkApI) => {
    const trackId = arg.trackId;
    const token = thunkApI.getState().loginReducer.data.token;
    const res = await axios.get(
      `https://spotify-lyric-api.herokuapp.com/?trackid=${trackId}`
    );
    return res.data;
  }
);

const trackSlice = createSlice({
  name: "track",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Get Track
      .addCase(getTrack.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getTrack.fulfilled, (state, action) => {
        state.loading = false;
        console.log("getTrack   ", action.payload);
      })
      .addCase(getTrack.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })

      //Get Lyrics
      .addCase(getLyricsTrack.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getLyricsTrack.fulfilled, (state, action) => {
        state.loading = false;
        state.data.lyrics = action.payload.lines;
        console.log("getLyricsTrack   ", action.payload);
      })
      .addCase(getLyricsTrack.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      //
      .addCase(getAlbumTrack.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAlbumTrack.fulfilled, (state, action) => {
        state.loading = false;
        console.log("getAlbumTrack   ", action.payload);
      })
      .addCase(getAlbumTrack.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const {} = trackSlice.actions;

export default trackSlice.reducer;
