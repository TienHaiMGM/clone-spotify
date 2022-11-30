import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  data: {},
};

export const getBrowse = createAsyncThunk(
  "search/getBrowse",
  async (arg, thunkApI) => {
    const token = thunkApI.getState().loginReducer.data.token;
    const res = await axios.get(
      "https://api.spotify.com/v1/browse/categories?country=US&offset=1",
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

export const getSearch = createAsyncThunk(
  "search/getSearch",
  async (arg, thunkApI) => {
    const token = thunkApI.getState().loginReducer.data.token;
    const inputUserSearch = arg.inputSearch;
    console.log(inputUserSearch);
    const res = await axios.get(
      `https://api.spotify.com/v1/search?q=${inputUserSearch}&type=track,artist,album,playlist&include_external=audio&limit=6&offset=6&country=US`,
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

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Get Browse
      .addCase(getBrowse.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getBrowse.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        const browses = action.payload.categories.items;
        const browse = [];
        browses.map((value) => {
          browse.push({
            id: value.id,
            name: value.name,
            image: value.icons[0].url,
          });
          return browse;
        });
        state.data.browse = browse;
      })
      .addCase(getBrowse.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })

      //Get Search
      .addCase(getSearch.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getSearch.fulfilled, (state, action) => {
        state.loading = false;
        const search = action.payload;
        console.log("search", search);

        const dataAlbums = [];
        search?.albums?.items?.map((value) => {
          dataAlbums.push({
            title: value.name,
            id: value.id,
            type: value.type,
            images: value.images[0].url,
            artists: value.artists[0].name,
          });
          return dataAlbums;
        });

        const dataArtists = [];
        search?.artists?.items?.map((value) => {
          dataArtists.push({
            title: value.name,
            id: value.id,
            type: value.type,
            images: value?.images[0]?.url,
          });
          return dataArtists;
        });

        const dataPlaylists = [];
        search?.playlists?.items?.map((value) => {
          dataPlaylists.push({
            title: value.name,
            id: value.id,
            type: value.type,
            images: value.images[0].url,
            description: value.owner["display_name"],
          });
          return dataPlaylists;
        });

        const dataTracks = [];
        search?.tracks?.items?.map((value) => {
          dataTracks.push({
            title: value.name,
            id: value.id,
            type: value.type,
            images: value.album.images[0].url,
            artists: value.artists[0].name,
            idArtists: value.artists[0].id,
            duration: value["duration_ms"],
          });
          return dataTracks;
        });
        const dataSearch = {
          dataAlbums: dataAlbums,
          dataArtists: dataArtists,
          dataPlaylists: dataPlaylists,
          dataTracks: dataTracks,
        };
        state.data.resultSearch = dataSearch;
      })

      .addCase(getSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

// export const {} = searchSlice.actions;

export default searchSlice.reducer;
