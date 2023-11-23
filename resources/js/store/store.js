import { configureStore } from "@reduxjs/toolkit";
import { coreApi } from "./features/core-api";
import authReducer from "./features/auth-slice";
import { REGISTER, persistReducer, persistStore } from "redux-persist";

import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        coreApi: coreApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: { ignoreActions: [REGISTER] },
        }).concat(coreApi.middleware),
});

export const persistor = persistStore(store);
