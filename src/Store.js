import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user", // state 이름
  initialState: { name: "kim", age: 20 },
  reducers: {
    changeName(state) {
      state.name = "park";
    },
    changeAge(state, action) {
      state.age += action.payload;
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
      let 번호 = state.findIndex((a)=>{ return a.id === action.payload })
      state[번호].count++;
      // state[action.payload].count++;
    },
  },
});

// export part
export let { changeName, changeAge} = user.actions;
export let { addCount} = items.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    items: items.reducer,
  },
});