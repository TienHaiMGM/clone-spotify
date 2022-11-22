import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    error: false,
    data:{
        playList:{
            image:'',
            name: '',
            type: '',
            id: '',
            total: '',
            description:'',
            tracks: {
                items:[],
            },
        }
    }
}

export const getPlaylist = createAsyncThunk(
    'playList/getPlaylist',
    async (arg, thunkApI) => {
        const idPlaylist = arg.playlistId
        const token = thunkApI.getState().loginReducer.data.token;
        const res = await axios.get(
            `https://api.spotify.com/v1/playlists/${idPlaylist}?country=VN`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            }
        )
        return res.data
    }
)

const playlistsSlice = createSlice({
    name: 'playlistsSlice',
    initialState,
    reducers: {
    
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPlaylist.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getPlaylist.fulfilled, (state, action) => {
                state.loading = false;
                const playlists = action.payload
                const playList = {
                    image: playlists.images[0].url,
                    name: playlists.name,
                    type: playlists.type,
                    id: playlists.id,
                    description:playlists.description,
                    total: playlists.tracks.total,
                    tracks: {
                        items:playlists.tracks.items,
                    }
                };
                state.data.playList = playList;
            })
            .addCase(getPlaylist.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
    }
})

export const { } = playlistsSlice.actions;

export default playlistsSlice.reducer;