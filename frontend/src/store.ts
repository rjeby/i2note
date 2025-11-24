import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "@/slices/dataSlice";
import homeReducer from "@/slices/homeSlice";
import toastReducer from "@/slices/toastSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    home: homeReducer,
    toast: toastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
