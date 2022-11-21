import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getTokenFromUrl } from '../../data/spotify';

const initialState = {
    loading: false,
    data: {
        token:localStorage.getItem('token'),
        user:JSON.parse(localStorage.getItem('user')),
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
        login: (state, action) => {
            localStorage.setItem('token', action.payload);
            const token = action.payload
            state.data.token = token;
        },
        logout: (state, action) => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            state.data.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                localStorage.setItem('user',JSON.stringify(action.payload));
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

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;