import { configureStore, createSlice } from "@reduxjs/toolkit";

let userUidShow = createSlice({
  name: "userUidShow", // state 이름
  initialState: "hey",
  reducers: {
    setUserUidShow(state, action) {
      return state = action.payload;
    },
  },
});

let userNameShow = createSlice({
  name: "userNameShow", // state 이름
  initialState: "hey",
  reducers: {
    setUserNameShow(state, action) {
      return state = action.payload;
    },
  },
});

let userCityShow = createSlice({
  name: "userCityShow", // state 이름
  initialState: "hey",
  reducers: {
    setUserCityShow(state, action) {
      return state = action.payload;
    },
  },
});

let userCountryShow = createSlice({
  name: "userCountryShow", // state 이름
  initialState: "hey",
  reducers: {
    setUserCountryShow(state, action) {
      return state = action.payload;
    },
  },
});

let stock = createSlice({
  name: "stock",
  initialState: [10, 11, 12],
});

let items = createSlice({
  name: "items",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    addCount(state, action) {
      let 번호 = state.findIndex((a) => {
        return a.id === action.payload;
      });
      state[번호].count++;
      // state[action.payload].count++;
    },
  },
});

let like = createSlice({
  name: "like", // state 이름
  initialState: 0,
  reducers: {
    increaseLike(state) {
      return (state = state + 1);
    },
  },
});

// export part
export let { setUserUidShow } = userUidShow.actions;
export let { setUserNameShow, changeName, changeAge } = userNameShow.actions;
export let { setUserCityShow } = userCityShow.actions;
export let { setUserCountryShow } = userCountryShow.actions;
export let { addCount } = items.actions;
export let { increaseLike } = like.actions;

export default configureStore({
  reducer: {
    userUidShow: userUidShow.reducer,
    userNameShow: userNameShow.reducer,
    userCityShow: userCityShow.reducer,
    userCountryShow: userCountryShow.reducer,
    stock: stock.reducer,
    items: items.reducer,
    like: like.reducer,
  },
});
