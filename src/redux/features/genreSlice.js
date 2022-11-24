import { faL } from "@fortawesome/free-solid-svg-icons";
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
      `https://api.spotify.com/v1/albums/${genreId}/?country=VN`,
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
        console.log(action.payload);
      })
      .addCase(getGenre.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const {} = genreSlice.actions;

export default genreSlice.reducer;
