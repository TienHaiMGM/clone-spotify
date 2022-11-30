import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  data: {
    items: {},
    player: {},
    playing: {
      id: null,
      isPlaying: false,
    },
  },
};

export const getPlayer = createAsyncThunk(
  "currentlyPlaying/getPlayer",
  async (arg, thunkApI) => {
    const token = thunkApI.getState().loginReducer.data.token;
    const res = await axios.get("https://api.spotify.com/v1/me/player", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

const currentlyPlayingSlice = createSlice({
  name: "currentlyPlayingSlice",
  initialState,
  reducers: {
    setPlaying: (state, action) => {
      state.data.playing.id = action.payload.id;
      state.data.playing.isPlaying = action.payload.isPlaying;
    },
  },
  extraReducers: (builder) => {
    builder
      //Player
      .addCase(getPlayer.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getPlayer.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload;
        if (data.item) {
          const items = {
            title: data.item.name,
            id: data.item.id,
            type: data.item.type,
            image: data.item.album.images[0].url,
            artists: data.item.artists,
            previewUrl: data.item["preview_url"],
            duration: data.item["duration_ms"],
          };
          state.data.items = items;
        }
        if (data) {
          const player = {
            progress: data["progress_ms"],
            repeat: data["repeat_state"],
            shuffle: data["shuffle_state"],
            isPlaying: data["is_playing"],
            contextHref: data.context?.href,
          };
          state.data.player = player;
        }
      })

      .addCase(getPlayer.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { setPlaying } = currentlyPlayingSlice.actions;

export default currentlyPlayingSlice.reducer;
