import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  data: {},
};

//Check User's Saved Tracks/Albums/AudioBooks/Episodes/Shows
//Example: dispatch(checkUserSaved({typePlayer, idPlayer}))
export const checkUserSaved = createAsyncThunk(
  "playList/checkUserSaved",
  async (arg, thunkApi) => {
    const token = thunkApi.getState().loginReducer.data.token;
    const typePlayer = `${arg.typePlayer}s`; // typePlayer from dispatch is missing s, typePlayer need s to get
    const idPlayer = arg.idPlayer;
    const response = await axios.get(
      `https://api.spotify.com/v1/me/${typePlayer}/contains`,
      {
        params: {
          ids: idPlayer,
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

//Get User's Saved Tracks/Albums/AudioBooks/Episodes/Shows
//Example: dispatch(getUserSaved({typePlayer, idPlayer}))
export const getUserSaved = createAsyncThunk(
  "playList/getUserSaved",
  async (arg, thunkApi) => {
    const token = thunkApi.getState().loginReducer.data.token;
    const typePlayer = `${arg.typePlayer}s`; // typePlayer from dispatch is missing s, typePlayer need s to get
    const response = await axios.get(
      `https://api.spotify.com/v1/me/${typePlayer}`,
      {
        params: {
          //   market: "ES",
          //   limit: "10",      /* Options optional*/
          //   offset: 0,
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

//Save Tracks/Albums/AudioBooks/Episodes/Shows for Current User
//Example: dispatch(saveForUser({typePlayer, idPlayer}))
export const saveForUser = createAsyncThunk(
  "playList/saveForUser",
  async (arg, thunkApi) => {
    const token = thunkApi.getState().loginReducer.data.token;
    const typePlayer = `${arg.typePlayer}s`; // typePlayer from dispatch is missing s, typePlayer need s to get
    const idPlayer = arg.idPlayer;
    const response = await axios.put(
      `https://api.spotify.com/v1/me/${typePlayer}`,
      "",
      {
        params: {
          ids: idPlayer,
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

//Remove Users' Saved Tracks/Albums/AudioBooks/Episodes/Shows for Current User
//Example: dispatch(removeUserSaved({typePlayer, idPlayer}))
export const removeUserSaved = createAsyncThunk(
  "playList/removeUserSaved",
  async (arg, thunkApi) => {
    const token = thunkApi.getState().loginReducer.data.token;
    const typePlayer = `${arg.typePlayer}s`; // typePlayer from dispatch is missing s, typePlayer need s to get
    const idPlayer = arg.idPlayer;
    const response = await axios.delete(
      `https://api.spotify.com/v1/me/${typePlayer}`,
      {
        params: {
          ids: idPlayer,
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

const librarySlice = createSlice({
  name: "librarySlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Check User's Saved Tracks/Albums/AudioBooks/Episodes/Shows
      .addCase(checkUserSaved.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(checkUserSaved.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(checkUserSaved.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      //Get User's Saved Tracks/Albums/AudioBooks/Episodes/Shows
      .addCase(getUserSaved.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUserSaved.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getUserSaved.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })

      //Save Tracks/Albums/AudioBooks/Episodes/Shows for Current User
      .addCase(saveForUser.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(saveForUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(saveForUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })

      //Remove Users' Saved Tracks/Albums/AudioBooks/Episodes/Shows for Current User
      .addCase(removeUserSaved.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(removeUserSaved.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(removeUserSaved.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

// export const {} = librarySlice.actions;

export default librarySlice.reducer;
