import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    loading: false,
    data: {
        token:"",
        user:null,
    },
    error: false,
}

export const getUsers = createAsyncThunk(
    'login/users',
    async (arg, thunkAPI) => {
        const res = await axios.get(
            "https://api.spotify.com/v1/me",
            {
                headers: {
                    "Authorization": `Bearer ${arg._token}`,
                    "Content-Type": "application/json",
                }
            }
        )
        return res.data
    }
)

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState,
    reducers: {
        getToken: (state, action) => {
            const token = action.payload
            state.data.token = token;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                const user = action.payload
                state.loading = false;
                state.data.user = user;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
    }
})

export const { getToken } = loginSlice.actions;

export default loginSlice.reducer;