import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  data: {
    items: {},
    player: {},
  },
};

export const getListTrackPlaying = createAsyncThunk(
  "currentlyPlaying/getListTrackPlaying",
  async (arg, thunkApI) => {
    const token = thunkApI.getState().loginReducer.data.token;
    const res = await axios.get(
      "https://api.spotify.com/v1/me/player/recently-played",
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
        console.log("current", action.payload);
      })
      .addCase(getListTrackPlaying.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })

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
            image: data.item.album.images[1].url,
            artists: data.item.artists[0].name,
            url: data.item["preview_url"],
          };
          state.data.items = items;
        }
        if (data) {
          const player = {
            progress: data["progress_ms"],
            repeat: data["repeat_state"],
            shuffle: data["shuffle_state"],
            isPlaying: data["is_playing"],
            contextHref: data.context.href,
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

export const {} = currentlyPlayingSlice.actions;

export default currentlyPlayingSlice.reducer;
