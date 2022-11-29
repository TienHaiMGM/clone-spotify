import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getValue } from "@testing-library/user-event/dist/utils";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  data: {
    libraryLikedSongs: [],
    listTrackLikedSongs: [],
  },
};

export const getLikedSongs = createAsyncThunk(
  "likedSongs/getBrowse",
  async (arg, thunkApI) => {
    const token = thunkApI.getState().loginReducer.data.token;
    const res = await axios.get("https://api.spotify.com/v1/me/tracks", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

const likedSongsSlice = createSlice({
  name: "likedSongs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Get Liked Songs
      .addCase(getLikedSongs.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getLikedSongs.fulfilled, (state, action) => {
        state.loading = false;
        const dataLikedSongs = action.payload;
        const nameLikedSongs = dataLikedSongs?.items?.reduce((all, value) => {
          const nameArtist = value.track.artists[0].name;
          const title = value.track.name;
          const nameAndTitle = nameArtist + " (" + title + ")";
          return `${all + nameAndTitle} - `;
        }, "");

        const libraryLikedSongs = {
          total: dataLikedSongs.total,
          nameLikedSongs: nameLikedSongs,
        };
        state.data.libraryLikedSongs = libraryLikedSongs;

        const listTrackLikedSongs = [];
        dataLikedSongs.items.map((value) => {
          listTrackLikedSongs.push({
            title: value.track.name,
            id: value.track.id,
            type: value.track.type,
            image: value.track.album.images[0]?.url,
            artists: value.track.artists,
            duration: value.track["duration_ms"],
            previewUrl: value.track["preview_url"],
            daysAdd: value["added_at"],
            album: value.track.album,
          });
          return listTrackLikedSongs;
        });

        state.data.listTrackLikedSongs = listTrackLikedSongs;
      })

      .addCase(getLikedSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

// export const {} = likedSongsSlice.actions;

export default likedSongsSlice.reducer;
