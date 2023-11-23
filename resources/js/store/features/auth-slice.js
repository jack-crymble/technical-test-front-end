import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authenticated: false,
    user: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => ({
            ...state,
            authenticated: true,
            user: action.payload.user,
        }),
        logout: (state) => ({
            ...state,
            authenticated: false,
            user: null,
        }),
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
