import { createStore } from "redux";
import todoReducer from "./reducer";
const store = createStore(todoReducer);
export default store;
// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import todoReducer from "./reducer";
// const reducer = combineReducers(todoReducer);
// const store = configureStore({ reducer });
// export default store;
