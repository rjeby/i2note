import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slices/dataSlice";
import homeReducer from "./slices/homeSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    home: homeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
