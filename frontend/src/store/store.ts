import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./Slices/auth";
import { workspaceReducer } from "./Slices/workspace";

const store = configureStore({
    reducer: {
        auth: authReducer,
        workspace: workspaceReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
