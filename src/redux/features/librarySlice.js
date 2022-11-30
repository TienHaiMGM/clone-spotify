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
  "library/checkUserSaved",
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
//Example: dispatch(getUserSaved({typePlayer}))
export const getUserSaved = createAsyncThunk(
  "library/getUserSaved",
  async (arg, thunkApi) => {
    const token = thunkApi.getState().loginReducer.data.token;
    const typePlayer = `${arg.typePlayer}s`; // typePlayer from dispatch is missing s, typePlayer need s to get
    const response = await axios.get(
      `https://api.spotify.com/v1/me/${typePlayer}`,
      {
        params: {
          market: "ES",
          limit: "10" /* Options optional*/,
          offset: 0,
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
  "library/saveForUser",
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
  "library/removeUserSaved",
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

//Check User Follow Artist
//Example: dispatch(checkUserSaved({typePlayer, idPlayer}))
export const checkUserFollow = createAsyncThunk(
  "library/checkUserFollow",
  async (arg, thunkApi) => {
    const token = thunkApi.getState().loginReducer.data.token;
    const typePlayer = arg.typePlayer;
    const idPlayer = arg.idPlayer;
    const response = await axios.get(
      `https://api.spotify.com/v1/me/following/contains`,
      {
        params: {
          ids: idPlayer,
          type: typePlayer,
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.status;
  }
);

//Get USer Follow
export const getUserFollow = createAsyncThunk(
  "library/getUserFollow",
  async (arg, thunkApi) => {
    const token = thunkApi.getState().loginReducer.data.token;
    const typePlayer = arg.typePlayer;
    const response = await axios.get(
      `https://api.spotify.com/v1/me/following`,
      {
        params: {
          type: typePlayer,
          limit: "10",
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

//Save Follow
export const saveFollow = createAsyncThunk(
  "library/saveFollow",
  async (arg, thunkApi) => {
    const token = thunkApi.getState().loginReducer.data.token;
    console.log(token);
    const typePlayer = arg.typePlayer;
    const idPlayer = arg.idPlayer;
    const response = await axios.put(
      "https://api.spotify.com/v1/me/following",
      { ids: [idPlayer] },
      {
        params: {
          type: typePlayer,
          ids: idPlayer,
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.status;
  }
);

//Remove Follow
export const removeFollow = createAsyncThunk(
  "library/removeFollow",
  async (arg, thunkApi) => {
    const token = thunkApi.getState().loginReducer.data.token;
    const typePlayer = arg.typePlayer;
    const idPlayer = arg.idPlayer;
    const response = await axios.delete(
      `https://api.spotify.com/v1/me/following`,
      {
        params: {
          ids: idPlayer,
          type: typePlayer,
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.status;
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
        state.data = action.payload;
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
      })

      // Check user Follow
      .addCase(checkUserFollow.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(checkUserFollow.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(checkUserFollow.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      //Get User Follow
      .addCase(getUserFollow.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUserFollow.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getUserFollow.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })

      //Save User Follow
      .addCase(saveFollow.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(saveFollow.fulfilled, (state, action) => {
        state.loading = false;
        console.log("action", action.payload);
      })
      .addCase(saveFollow.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })

      //Remove User Follow
      .addCase(removeFollow.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(removeFollow.fulfilled, (state, action) => {
        state.loading = false;
        console.log("action1", action.payload);
      })
      .addCase(removeFollow.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

// export const {} = librarySlice.actions;

export default librarySlice.reducer;
