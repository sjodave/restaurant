import { configureStore } from "@reduxjs/toolkit";
import reducerReducer from "./Reducer";
export const store = configureStore({
  reducer: {
    reduxStore: reducerReducer,
  },
});
