import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  data: {},
};

export const getGenre = createAsyncThunk(
  "genre/getGenre",
  async (arg, thunkApI) => {
    const genreId = arg.genreId;
    const token = thunkApI.getState().loginReducer.data.token;
    const res = await axios.get(
      `https://api.spotify.com/v1/browse/categories/${genreId}/playlists/?country=VN`,
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

const genreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGenre.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getGenre.fulfilled, (state, action) => {
        state.loading = false;
        const itemsGenre = action.payload.playlists.items;
        const playlistGenre = [];
        itemsGenre?.map((value) => {
          playlistGenre.push({
            title: value.name,
            id: value.id,
            type: value.type,
            image: value.images[0]?.url,
            description: value.description,
          });
          return playlistGenre;
        });
        state.data.playlistGenre = playlistGenre;
      })
      .addCase(getGenre.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

// export const {} = genreSlice.actions;

export default genreSlice.reducer;
