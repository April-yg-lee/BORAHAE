import { configureStore, createSlice } from "@reduxjs/toolkit";

const userUidShow = createSlice({
  name: "userUidShow", // state 이름
  initialState: "hey",
  reducers: {
    setUserUidShow(state, action) {
      return (state = action.payload);
    },
  },
});

const userNameShow = createSlice({
  name: "userNameShow", // state 이름
  initialState: "name",
  reducers: {
    setUserNameShow(state, action) {
      return (state = action.payload);
    },
  },
});

const userCityShow = createSlice({
  name: "userCityShow", // state 이름
  initialState: "city",
  reducers: {
    setUserCityShow(state, action) {
      return (state = action.payload);
    },
  },
});

const userCountryShow = createSlice({
  name: "userCountryShow", // state 이름
  initialState: "country",
  reducers: {
    setUserCountryShow(state, action) {
      return (state = action.payload);
    },
  },
});

const userIntroShow = createSlice({
  name: "userIntroShow", // state 이름
  initialState: "Intro",
  reducers: {
    setUserIntroShow(state, action) {
      return (state = action.payload);
    },
  },
});

const userProfilePicShow = createSlice({
  name: "userProfilePicShow", // state 이름
  initialState: "country",
  reducers: {
    setUserProfilePicShow(state, action) {
      return (state = action.payload);
    },
  },
});

// export part
export const { setUserUidShow } = userUidShow.actions;
export const { setUserNameShow } = userNameShow.actions;
export const { setUserCityShow } = userCityShow.actions;
export const { setUserCountryShow } = userCountryShow.actions;
export const { setUserIntroShow } = userIntroShow.actions;
export const { setUserProfilePicShow } = userProfilePicShow.actions;

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
