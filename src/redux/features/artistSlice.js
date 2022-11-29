import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  data: {},
};

export const getArtistTrack = createAsyncThunk(
  "track/getArtistTrack",
  async (arg, thunkApI) => {
    // const trackId = arg.trackId;
    const token = thunkApI.getState().loginReducer.data.token;
    const artistId = arg.artistId;
    const res = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=ES`,
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

export const getArtist = createAsyncThunk(
  "track/getArtist",
  async (arg, thunkApI) => {
    // const trackId = arg.trackId;
    const token = thunkApI.getState().loginReducer.data.token;
    const artistId = arg.artistId;
    const res = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}`,
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

const artistSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Get artist Track
      .addCase(getArtistTrack.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getArtistTrack.fulfilled, (state, action) => {
        state.loading = false;
        const dataArtistTracks = action.payload.tracks;
        const artistTracks = [];
        dataArtistTracks.map((value) => {
          artistTracks.push({
            title: value.name,
            id: value.id,
            type: value.type,
            image: value.album.images[0].url,
            artists: value.artists,
            previewUrl: value["preview_url"],
            duration: value["duration_ms"],
            popularity: value.popularity,
          });
          return artistTracks;
        });
        state.data.artistTracks = artistTracks;
      })
      .addCase(getArtistTrack.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })

      //Get Artist
      .addCase(getArtist.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getArtist.fulfilled, (state, action) => {
        state.loading = false;
        const dataArtist = action.payload;
        const infoArtist = {
          name: dataArtist.name,
          id: dataArtist.id,
          type: dataArtist.type,
          image: dataArtist.images[0].url,
          totalFollowers: dataArtist.followers.total,
        };
        state.data.infoArtist = infoArtist;
      })
      .addCase(getArtist.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

// export const {} = artistSlice.actions;

export default artistSlice.reducer;
