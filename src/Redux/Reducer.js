import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: JSON.parse(sessionStorage.getItem("isLoggedIn")) || false,
  restaurantsData: [],
  suggestions: [],
  restaurant: JSON.parse(localStorage.getItem("restaurant")) || [],
  bookmark: JSON.parse(localStorage.getItem("bookmark")) || [],
  loginDetails: {
    username: "",
    password: "",
  },
};
export const reducerSlice = createSlice({
  name: "reducer",
  initialState,
  reducers: {
    setRestaurantsData: (state, action) => {
      state.restaurantsData = action.payload;
    },
    setSuggestions: (state, action) => {
      state.suggestions = action.payload;
    },
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
    },
    setBookmark: (state, action) => {
      state.bookmark = action.payload;
    },
    setLoginDetails: (state, action) => {
      state.loginDetails = action.payload;
    },
    setIsLogged: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const {
  setRestaurantsData,
  setSuggestions,
  setRestaurant,
  setLoginDetails,
  setBookmark,
  setIsLogged,
} = reducerSlice.actions;
export default reducerSlice.reducer;
