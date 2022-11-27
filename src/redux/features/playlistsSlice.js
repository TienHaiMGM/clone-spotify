import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  data: {
    playList: [],
    myPlaylists: [],
  },
};

export const getPlaylist = createAsyncThunk(
  "playList/getPlaylist",
  async (arg, thunkApI) => {
    const idPlaylist = arg.playlistId;
    const token = thunkApI.getState().loginReducer.data.token;
    const res = await axios.get(
      `https://api.spotify.com/v1/playlists/${idPlaylist}?country=VN`,
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

export const getMyPlaylists = createAsyncThunk(
  "playList/getMyPlaylists",
  async (arg, thunkApi) => {
    const token = thunkApi.getState().loginReducer.data.token;
    const res = await axios.get(
      `	https://api.spotify.com/v1/me/playlists?limit=10&offset=0`,
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

export const createPlaylist = createAsyncThunk(
  "playList/createPlaylist",
  async (arg, thunkApi) => {
    const token = thunkApi.getState().loginReducer.data.token;
    const userID = thunkApi.getState().loginReducer.data.user.id;
    const namePlaylist = arg.namePlaylist;
    const response = await axios.post(
      `https://api.spotify.com/v1/users/${userID}/playlists`,
      {
        name: namePlaylist,
        description: "New playlist description",
        public: false,
      },
      {
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

export const unfollowPlaylist = createAsyncThunk(
  "playList/unfollowPlaylist",
  async (arg, thunkApi) => {
    const token = thunkApi.getState().loginReducer.data.token;
    const idPlaylist = arg.idPlaylist;
    const response = await axios.delete(
      `https://api.spotify.com/v1/playlists/${idPlaylist}/followers`,
      {
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

export const addItemsToPlaylist = createAsyncThunk(
  "playList/addItemsToPlaylist",
  async (arg, thunkApi) => {
    const token = thunkApi.getState().loginReducer.data.token;
    const idPlaylist = "4wvxZG5MubqOwaNtSJEUf5";
    const idTrack = "3zYBfVC5Fo17ICTMJwqNKP";
    const res = await axios.post(
      `https://api.spotify.com/v1/playlists/${idPlaylist}/tracks`,
      "",
      {
        params: {
          position: "1",
          uris: `spotify:track:${idTrack}`,
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  }
);

export const deleteItemsToPlaylist = createAsyncThunk(
  "playList/deleteItemsToPlaylist",
  async (arg, thunkApi) => {
    const token = thunkApi.getState().loginReducer.data.token;
    const idPlaylist = "4wvxZG5MubqOwaNtSJEUf5";
    const idTrack = "3zYBfVC5Fo17ICTMJwqNKP";
    const response = await axios.delete(
      `https://api.spotify.com/v1/playlists/${idPlaylist}/tracks`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          tracks: [
            {
              uri: `spotify:track:${idTrack}`,
            },
          ],
        },
      }
    );
    return response.data;
  }
);
const playlistsSlice = createSlice({
  name: "playlistsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlaylist.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        const playlists = action.payload;
        const trackPlaylist = [];
        playlists?.tracks?.items?.map((value) => {
          trackPlaylist?.push({
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
        });
        const totalDuration = playlists?.tracks?.items?.reduce(
          (total, value) => {
            return total + Number(value.track["duration_ms"]);
          },
          0
        );
        const playList = {
          image: playlists?.images[0]?.url,
          name: playlists.name,
          type: playlists.type,
          id: playlists.id,
          description: playlists.description,
          total: playlists.tracks.total,
          tracks: trackPlaylist,
          nameOwner: playlists.owner["display_name"],
          followers: playlists.followers.total,
          totalDuration: totalDuration,
        };
        state.data.playList = playList;
        console.log("test", playList);
        console.log("playlist", action.payload);
      })
      .addCase(getPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })

      //Get my playlist
      .addCase(getMyPlaylists.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getMyPlaylists.fulfilled, (state, action) => {
        state.loading = false;
        const dataMyPlaylists = action.payload.items;
        const myPlaylists = [];
        dataMyPlaylists.map((value) => {
          myPlaylists.push({
            name: value.name,
            type: value.type,
            id: value.id,
            nameOwner: value.owner["display_name"],
            image: value?.images[0]?.url,
          });
        });
        state.data.myPlaylists = myPlaylists;
      })
      .addCase(getMyPlaylists.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })

      //Create playlist
      .addCase(createPlaylist.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createPlaylist.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })

      //Delete playlist
      .addCase(unfollowPlaylist.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(unfollowPlaylist.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(unfollowPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })

      //Add Item to Playlist
      .addCase(addItemsToPlaylist.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addItemsToPlaylist.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addItemsToPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })

      //Delete Items to Playlist
      .addCase(deleteItemsToPlaylist.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteItemsToPlaylist.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteItemsToPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const {} = playlistsSlice.actions;

export default playlistsSlice.reducer;
