import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { startLoading, stopLoading } from './loadingSlice';
import { API_URL } from '@env';
const baseUrl = API_URL;

export const login = createAsyncThunk(
    'communityLogin',
    async (formdata, { dispatch }) => {
        try {
            dispatch(startLoading());
            const response = await axios.post(`${baseUrl}/communityLogin`, formdata);
            if (response.status === 200 && response.data && !response.data.error) {
                return {
                    user: response,
                };
            } else {
                // console.log("---------------------------------", response.data.msg);
                return { user: response }
            }
        } catch (error) {
            if (error.response) {
                const errorMsg = error.response.data.msg || 'Login failed';
                return {
                    user: errorMsg,
                };
            }
        } finally {
            dispatch(stopLoading());
        }
    }
);


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        error: null,
        userLogged: false,
        userDetails: null
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.userLogged = false;
            state.userDetails = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.userDetails = action.payload;
                state.userLogged = true;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload?.message || 'Login failed';
                state.userLogged = false;
                state.user = null;
                state.userDetails = null;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

