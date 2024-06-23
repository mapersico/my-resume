import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

import appReducer from "../app/store/app.slice";
import mainReducer from "../main/store/main.slice";

import { baseApi } from "./api";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    appReducer,
    mainReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
