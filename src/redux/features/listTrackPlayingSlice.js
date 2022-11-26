import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  data: {
    listTracksPlaying: [],
  },
};

export const getListTrackPlaying = createAsyncThunk(
  "listTrackPlayingSlice/getListTrackPlaying",
  async (arg, thunkApI) => {
    const token = thunkApI.getState().loginReducer.data.token;
    const contextHref =
      thunkApI.getState().currentlyPlayingReducer.data?.player?.contextHref;
    const res = await axios?.get(`${contextHref}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

const listTrackPlayingSlice = createSlice({
  name: "listTrackPlaying",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Currently Playing Track
      .addCase(getListTrackPlaying.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getListTrackPlaying.fulfilled, (state, action) => {
        state.loading = false;
        const dataListTracks = action.payload;
        console.log("test", dataListTracks);
        const listTracksPlaying = action.payload.tracks.items;
        const listTrack = [];
        switch (dataListTracks.type) {
          case "playlist":
            listTracksPlaying?.map((value) => {
              listTrack.push({
                title: value.track.name,
                id: value.track.id,
                type: value.track.type,
                image: value.track.album.images[0].url,
                artists: value.track.artists,
                duration: value.track["duration_ms"],
                previewUrl: value.track["preview_url"],
              });
            });
            state.data.listTracksPlaying = listTrack;
            break;
          case "album":
            listTracksPlaying?.map((value) => {
              listTrack.push({
                title: value.name,
                id: value.id,
                type: value.type,
                image: dataListTracks.images[0].url,
                artists: value.artists[0].name,
                duration: value["duration_ms"],
                previewUrl: value["preview_url"],
              });
            });
            state.data.listTracksPlaying = listTrack;
            break;
          default:
            state.data.listTracksPlaying = listTrack;
        }
      })
      .addCase(getListTrackPlaying.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const {} = listTrackPlayingSlice.actions;

export default listTrackPlayingSlice.reducer;
