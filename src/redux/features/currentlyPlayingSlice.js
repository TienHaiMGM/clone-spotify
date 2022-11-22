import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";

const initialState = {
    loading: false,
    error: false,
    data: {
        actions: {},
        items: {},
        player: {},
    }
}

export const getCurrentlyPlaying = createAsyncThunk(
    'currentlyPlaying/getCurrentlyPlaying',
    async (arg, thunkApI) => {
        const token = thunkApI.getState().loginReducer.data.token;
        const res = await axios.get(
            "https://api.spotify.com/v1/me/player/currently-playing?country=VN",
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

export const getPlayer = createAsyncThunk(
    'currentlyPlaying/getPlayer',
    async (arg, thunkApI) => {
        const token = thunkApI.getState().loginReducer.data.token;
        const res = await axios.get(
            "https://api.spotify.com/v1/me/player",
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        )
        return res.data
    }
)

const currentlyPlayingSlice = createSlice({
    name: 'currentlyPlayingSlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder

            //Currently Playing Track
            .addCase(getCurrentlyPlaying.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getCurrentlyPlaying.fulfilled, (state, action) => {
                state.loading = false;
                const track = action.payload.item;
                if (track) {
                    const items = {
                        title: track.name,
                        id: track.id,
                        type: track.type,
                        image: track.album.images[1].url,
                        artists: track.artists[0].name,
                    }
                    state.data.items = items;
                }
            })
            .addCase(getCurrentlyPlaying.rejected, (state, action) => {
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
                console.log("player", action.payload)
            })
            .addCase(getPlayer.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
    }
})

export const { } = currentlyPlayingSlice.actions;

export default currentlyPlayingSlice.reducer;