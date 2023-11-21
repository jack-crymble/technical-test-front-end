import { configureStore } from "@reduxjs/toolkit";
import { coreApi } from "./features/core-api";
import authReducer from "./features/auth-slice";

export default configureStore({
    reducer: {
        auth: authReducer,
        coreApi: coreApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(coreApi.middleware),
});
