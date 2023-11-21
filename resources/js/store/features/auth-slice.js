import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authenticated: false,
    authenticating: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
});

// export const {} = authSlice.actions

export default authSlice.reducer;
