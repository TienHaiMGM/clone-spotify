import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  data: {},
};

export const getAlbum = createAsyncThunk(
  "album/getAlbum",
  async (arg, thunkApI) => {
    const albumId = arg.albumId;
    const token = thunkApI.getState().loginReducer.data.token;
    const res = await axios.get(
      `https://api.spotify.com/v1/albums/${albumId}/?country=VN`,
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

const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAlbum.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAlbum.fulfilled, (state, action) => {
        state.loading = false;
        const albums = action.payload;
        const album = {
          name: albums.name,
          type: albums.type,
          copyrights: albums.copyrights,
          id: albums.id,
          image: albums?.images[0]?.url,
          total: albums["total_tracks"],
          artist: {
            id: albums.artists[0].id,
            name: albums.artists[0].name,
            type: albums.artists[0].type,
          },
          tracks: albums.tracks,
          releaseDate: albums["release_date"],
        };
        state.data = album;
      })
      .addCase(getAlbum.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const {} = albumSlice.actions;

export default albumSlice.reducer;
