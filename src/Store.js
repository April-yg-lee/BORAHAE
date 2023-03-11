import { configureStore, createSlice } from "@reduxjs/toolkit";

let userUidShow = createSlice({
  name: "userUidShow", // state 이름
  initialState: "",
  reducers: {
    setUserUidShow(state, action) {
      return state = action.payload;
    },
  },
});

let userNameShow = createSlice({
  name: "userNameShow", // state 이름
  initialState: "name",
  reducers: {
    setUserNameShow(state, action) {
      return state = action.payload;
    },
  },
});

let userCityShow = createSlice({
  name: "userCityShow", // state 이름
  initialState: "city",
  reducers: {
    setUserCityShow(state, action) {
      return state = action.payload;
    },
  },
});

let userCountryShow = createSlice({
  name: "userCountryShow", // state 이름
  initialState: "country",
  reducers: {
    setUserCountryShow(state, action) {
      return state = action.payload;
    },
  },
});

let userIntroShow = createSlice({
  name: "userIntroShow", // state 이름
  initialState: "Intro",
  reducers: {
    setUserIntroShow(state, action) {
      return state = action.payload;
    },
  },
});

let userProfilePicShow = createSlice({
  name: "userProfilePicShow", // state 이름
  initialState: "country",
  reducers: {
    setUserProfilePicShow(state, action) {
      return state = action.payload;
    },
  },
});

// export part
export let { setUserUidShow } = userUidShow.actions;
export let { setUserNameShow } = userNameShow.actions;
export let { setUserCityShow } = userCityShow.actions;
export let { setUserCountryShow } = userCountryShow.actions;
export let { setUserIntroShow } = userIntroShow.actions;
export let { setUserProfilePicShow } = userProfilePicShow.actions;

export default configureStore({
  reducer: {
    userUidShow: userUidShow.reducer,
    userNameShow: userNameShow.reducer,
    userCityShow: userCityShow.reducer,
    userCountryShow: userCountryShow.reducer,
    userIntroShow: userIntroShow.reducer,
    userProfilePicShow: userProfilePicShow.reducer,
  },
});
