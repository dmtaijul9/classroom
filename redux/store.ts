import { configureStore } from "@reduxjs/toolkit";
import quizeSlice from "./resolvers/quizeSlice";

const store = configureStore({
  reducer: {
    quiz: quizeSlice,
  },
});

export default store;
