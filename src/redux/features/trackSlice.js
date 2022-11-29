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

export const checkUserSavedTracks = createAsyncThunk(
  "playList/checkUserSavedTracks",
  async (arg, thunkApi) => {
    const token = thunkApi.getState().loginReducer.data.token;
    const trackId = arg.trackId;
    const response = await axios.get(
      "https://api.spotify.com/v1/me/tracks/contains",
      {
        params: {
          ids: trackId,
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

export const saveTracksForUser = createAsyncThunk(
  "playList/saveTracksForUser",
  async (arg, thunkApi) => {
    const token = thunkApi.getState().loginReducer.data.token;
    const trackId = arg.trackId;
    const response = await axios.put(
      "https://api.spotify.com/v1/me/tracks",
      "",
      {
        params: {
          ids: trackId,
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

export const removeUserSavedTracks = createAsyncThunk(
  "playList/removeUserSavedTracks",
  async (arg, thunkApi) => {
    const token = thunkApi.getState().loginReducer.data.token;
    const trackId = arg.trackId;
    const response = await axios.delete(
      "https://api.spotify.com/v1/me/tracks",
      {
        params: {
          ids: trackId,
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

export const getLyricsTrack = createAsyncThunk(
  "track/getLyricsTrack",
  async (arg, thunkApI) => {
    const trackId = arg.trackId;
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
        const dataTrack = action.payload;
        const track = {
          title: dataTrack.name,
          id: dataTrack.id,
          type: dataTrack.type,
          image: dataTrack.album.images[0].url,
          releaseDate: dataTrack.album["release_date"],
          artists: dataTrack.artists[0].name,
          duration: dataTrack["duration_ms"],
          previewUrl: dataTrack["preview_url"],
        };
        state.data.track = track;
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
      })
      .addCase(getLyricsTrack.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })

      // Get Album Track
      .addCase(getAlbumTrack.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAlbumTrack.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getAlbumTrack.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })

      // Check User Saved Tracks
      .addCase(checkUserSavedTracks.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(checkUserSavedTracks.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(checkUserSavedTracks.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })

      // Save Track for User
      .addCase(saveTracksForUser.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(saveTracksForUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(saveTracksForUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })

      // Remove User's Saved Track
      .addCase(removeUserSavedTracks.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(removeUserSavedTracks.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(removeUserSavedTracks.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

// export const {} = trackSlice.actions;

export default trackSlice.reducer;
